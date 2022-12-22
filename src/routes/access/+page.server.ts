import { fail, json, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import type { Action, Actions, PageServerLoad } from './$types';

import { db } from '$lib/database';
import { resBuilder } from '$lib/res';
import regex from '$lib/regex';
import type { Post, Member, TagsInPost, ROLE } from '@prisma/client';

export const load = (async ({ cookies }) => {
	const token = cookies.get('access-token');

	if (!token) return;

	const member = await db.member.findFirst({
		where: { status: true, sessions: { some: { token } } }
	});

	if (!member) {
		cookies.delete('access-token');
		return;
	}

	if (member) throw redirect(302, '/');
}) satisfies PageServerLoad;

const fetchBlogs: Action = async ({ request, cookies }) => {
	const blogs = await db.post.findMany({
		orderBy: { updatedAt: 'desc' },
		include: { author: true, tags: true }
	});

	let blogArr: {
		id: string;
		author: {
			name: string;
			username: string;
			status: boolean;
			role: ROLE;
		};
		content: string;
		createdAt: Date;
		updatedAt: Date;
		status: boolean;
		subject: string;
	}[] = [];

	for (let i = 0; i < blogs.length; i++) {
		const blog = blogs[i];

		blogArr.push({
			id: blog.id,
			author: blog.author,
			content: blog.content,
			createdAt: blog.createdAt,
			status: blog.status,
			subject: blog.subject,
			updatedAt: blog.updatedAt
		});
	}

	return { error: false, data: blogArr };
};

const register: Action = async ({ request, cookies }) => {
	const data = await request.formData();
	const username = data.get('username')?.toString().toLocaleLowerCase();
	const name = data.get('name');
	const password = data.get('password');
	const verifypassword = data.get('verifypassword');
	const email = data.get('email');
	const verifyemail = data.get('verifyemail');

	if (
		typeof username !== 'string' ||
		typeof name !== 'string' ||
		typeof password !== 'string' ||
		typeof verifypassword !== 'string' ||
		typeof email !== 'string' ||
		typeof verifyemail !== 'string' ||
		!username ||
		!name ||
		!password ||
		!email ||
		!verifypassword ||
		!verifyemail
	)
		return fail(400, resBuilder(true, 'You must provide all values that are requested.'));
	if (!username.match(regex.username))
		return fail(400, resBuilder(true, 'You must provide a valid username.'));
	if (password.length < 8) return fail(400, resBuilder(true, 'You must provide a valid password.'));
	if (!name.match(/^[a-zA-Z .']{3,25}$/))
		return fail(400, resBuilder(true, 'You need to provide a valid name.'));

	if (password !== verifypassword)
		return fail(400, resBuilder(true, 'Your two passwords need to match.'));

	if (email !== verifyemail) return fail(400, resBuilder(true, 'Your two emails need to match.'));

	const existingUsername = await db.member.findFirst({ where: { username } });

	if (existingUsername)
		return fail(400, resBuilder(true, 'The username provided is already taken.'));

	const existingEmail = await db.member.findFirst({ where: { emailAddress: email } });

	if (existingEmail)
		return fail(400, resBuilder(true, 'The email address provided is already taken.'));

	const newToken = crypto.randomUUID();
	const expireDate = new Date(new Date().setDate(new Date().getDate() + 7));

	const newMember = await db.member.create({
		data: {
			username,
			passwordHash: await bcrypt.hash(password, 10),
			emailAddress: email,
			name,
			role: 'MEMBER',
			sessions: { create: { token: newToken, expireDate } }
		}
	});

	if (!newMember)
		return fail(500, resBuilder(true, 'The server had an issue while creating your account.'));

	cookies.set('access-token', newToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(302, '/');
};

const login: Action = async ({ request, cookies }) => {
	const data = await request.formData();
	const username = data.get('username')?.toString().toLocaleLowerCase();
	const password = data.get('password');

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password)
		return fail(400, resBuilder(true, 'You must provide all values that are requested.'));
	if (!username.match(regex.username))
		return fail(400, resBuilder(true, 'You must provide a valid username.'));
	if (password.length < 8) return fail(400, resBuilder(true, 'You must provide a valid password.'));

	const member = await db.member.findFirst({ where: { username } });

	if (!member)
		return fail(400, resBuilder(true, 'The account you are trying to access does not exist!'));

	const passwordValid = await bcrypt.compare(password, member.passwordHash);

	if (!passwordValid)
		return fail(400, resBuilder(true, 'The account you are trying to access does not exist!'));

	const newToken = crypto.randomUUID();
	const expireDate = new Date(new Date().setDate(new Date().getDate() + 7));

	const authenticatedMember = await db.member.update({
		where: { id: member.id },
		data: { sessions: { create: { token: newToken, expireDate } } }
	});

	if (!authenticatedMember)
		return fail(500, resBuilder(true, 'The server had an issue creating your session!'));

	cookies.set('access-token', newToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(302, '/');
};

const logout: Action = async ({ request, cookies }) => {
	const token = cookies.get('access-token');

	if (!token) return fail(400, resBuilder(true, 'You are not currently logged in.'));

	const tokenExists = await db.session.findFirst({ where: { token } });

	if (!tokenExists) {
		cookies.delete('access-token');
		return fail(400, resBuilder(true, 'The token provided does not exist.'));
	}

	await db.session.delete({ where: { id: tokenExists.id } });

	throw redirect(302, '/');
};

export const actions: Actions = { register, login, logout, fetchBlogs };
