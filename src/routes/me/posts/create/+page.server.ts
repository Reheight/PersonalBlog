import { page } from '$app/stores';
import { db } from '$lib/database';
import { resBuilder } from '$lib/res';
import { fail, redirect, type Actions, type Action } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({ params, locals }) => {
	if (locals.member.role !== 'ADMINISTRATOR') throw redirect(302, '/');
}) satisfies PageServerLoad;

const create: Action = async ({ request, cookies }) => {
	const token = cookies.get('access-token');
	if (!token) return fail(400, resBuilder(true, 'You are not currently logged in.'));
	const member = await db.member.findFirst({ where: { sessions: { some: { token } } } });
	if (!member) {
		cookies.delete('access-token');
		return fail(400, resBuilder(true, 'The token provided does not exist.'));
	}

	if (member.role !== 'ADMINISTRATOR')
		return fail(403, resBuilder(true, 'You do not have access to this resource.'));

	const data = await request.formData();
	const subject = data.get('subject');
	const content = data.get('content');
	const description = data.get('description');

	if (!subject || typeof subject !== 'string')
		return fail(400, resBuilder(true, 'You need to provide a valid subject for your blog post.'));
	if (!content || typeof content !== 'string')
		return fail(400, resBuilder(true, 'You need to provide content for your blog post.'));
	if (!description || typeof description !== 'string')
		return fail(
			400,
			resBuilder(true, 'You need to provide a valid description for your blog post.')
		);

	const _post = await db.post.create({
		data: {
			subject,
			content,
			description,
			authorId: member.id
		}
	});

	throw redirect(302, `/blog/${_post.id}`);
};

export const actions: Actions = { create };
