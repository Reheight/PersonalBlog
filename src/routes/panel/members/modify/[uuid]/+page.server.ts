import { db } from '$lib/database';
import regex from '$lib/regex';
import { resBuilder } from '$lib/res';
import type { ROLE } from '@prisma/client';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	if (locals.member.role !== 'ADMINISTRATOR' && locals.member.role !== 'AUTHOR') throw error(403);

	const targetUUID = params.uuid;

	if (!targetUUID)
		return fail(400, resBuilder(true, "You need to provide a member you'd like to modify."));

	const target = await db.member.findUnique({ where: { id: targetUUID } });

	if (!target)
		return fail(400, resBuilder(true, "The member you're trying to modify does not exist."));

	// @ts-ignore
	delete target.passwordHash;

	return target;
}) satisfies PageServerLoad;

const modify: Action = async ({ request, cookies }) => {
	const token = cookies.get('access-token');
	if (!token) return fail(400, resBuilder(true, 'You are not currently logged in.'));
	const member = await db.member.findFirst({ where: { sessions: { some: { token } } } });

	if (!member) {
		cookies.delete('access-token', { path: '/' });
		return fail(400, resBuilder(true, 'The token provided does not exist.'));
	}

	if (member.role !== 'ADMINISTRATOR' && member.role !== 'AUTHOR')
		return fail(403, resBuilder(true, 'You do not have access to this resource.'));

	const data = await request.formData();
	const values = {
		id: data.get('id'),
		username: data.get('username'),
		name: data.get('name'),
		email: data.get('email'),
		role: data.get('role')
	};

	// Member
	if (!values.id || typeof values.id !== 'string')
		return fail(400, resBuilder(true, 'You need to provide a valid user UUID.'));
	const target = await db.member.findUnique({ where: { id: values.id } });

	if (!target)
		return fail(400, resBuilder(true, "The member you're trying to update does not exist."));

	// Username
	if (!values.username || typeof values.username !== 'string')
		return fail(400, resBuilder(true, 'You need to provide a valid username.'));
	if (!values.username.match(regex.username))
		return fail(
			400,
			resBuilder(true, 'You need to provide a username that meets our requirements.')
		);

	const usernameExists =
		(await db.member.count({
			where: { username: values.username, AND: { id: { not: target.id } } }
		})) > 0;

	if (usernameExists)
		return fail(400, resBuilder(true, 'The username you are trying to use is already taken.'));

	// Name
	if (!values.name || typeof values.name !== 'string')
		return fail(400, resBuilder(true, 'You need to provide a valid name.'));
	if (!values.name.match(regex.displayName))
		return fail(400, resBuilder(true, 'Your name did not meet our strict naming rules.'));

	// Email
	if (!values.email || typeof values.email !== 'string')
		return fail(400, resBuilder(true, 'You need to provide a valid email.'));
	if (!values.email.match(regex.emailAddress))
		return fail(
			400,
			resBuilder(true, 'You need to provide an email that meets our strict naming rules.')
		);

	const emailExists =
		(await db.member.count({
			where: { emailAddress: values.email, AND: { id: { not: target.id } } }
		})) > 0;

	if (emailExists)
		return fail(400, resBuilder(true, 'The email you provided is taken by another user.'));

	// Role
	if (!values.role || typeof values.role !== 'string')
		return fail(400, resBuilder(true, 'You need to provide a valid role.'));
	if (!values.role.match(/^(ADMINISTRATOR|MODERATOR|AUTHOR|MEMBER)$/))
		return fail(400, resBuilder(true, 'You need to provide a valid role.'));

	if (target.role === 'ADMINISTRATOR' && values.role !== 'ADMINISTRATOR') {
		const totalAdministratorsWithout = await db.member.count({
			where: { role: 'ADMINISTRATOR', AND: { NOT: { id: target.id } } }
		});

		if (totalAdministratorsWithout === 0)
			return fail(
				400,
				resBuilder(
					true,
					'The player you were trying to remove as an Administrator from appears to be the last Administrator so you cannot these privileges this account.'
				)
			);
	}

	const updateTarget = await db.member.update({
		where: { id: values.id },
		data: {
			username: values.username,
			emailAddress: values.email,
			role: values.role as ROLE,
			name: values.name
		}
	});

	if (!updateTarget)
		return fail(500, resBuilder(true, 'There was an issue while updating the member!'));

	throw redirect(302, `/panel/members`);
};

export const actions: Actions = { modify };
