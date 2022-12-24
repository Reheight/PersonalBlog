import { db } from '$lib/database';
import { resBuilder } from '$lib/res';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const members = await db.member.findMany({
		select: {
			_count: true,
			comments: true,
			createdAt: true,
			emailAddress: true,
			id: true,
			name: true,
			posts: true,
			role: true,
			sessions: true,
			status: true,
			updatedAt: true,
			username: true
		}
	});

	return { members };
}) satisfies PageServerLoad;

const lock: Action = async ({ request, params, cookies }) => {
	const token = cookies.get('access-token');
	if (!token) return fail(400, resBuilder(true, 'You are not currently logged in.'));

	const member = await db.member.findFirst({
		where: { sessions: { some: { token, status: true } } }
	});

	if (!member)
		return fail(
			400,
			resBuilder(true, 'You did not provide a token that is associated with an account.')
		);

	if (member.role !== 'ADMINISTRATOR')
		return fail(400, resBuilder(true, 'You do not have the ability to perform this action.'));

	const data = await request.formData();

	if (!data) return fail(400, resBuilder(true, 'You need to provide data.'));

	const tID = data.get('id');

	if (!tID || typeof tID !== 'string')
		return fail(400, resBuilder(true, 'You need to provide a valid member UUID.'));

	if (tID === member.id)
		return fail(400, resBuilder(true, 'You probably should not be deactivating your own account.'));

	const target = await db.member.update({ where: { id: tID }, data: { status: false } });

	if (target.role === 'ADMINISTRATOR') {
		const totalAdministratorsWithout = await db.member.count({
			where: { role: 'ADMINISTRATOR', AND: { NOT: { id: target.id } } }
		});

		if (totalAdministratorsWithout === 0)
			return fail(
				400,
				resBuilder(
					true,
					'The player you were trying to lock is an Administrator and also appears to be the last Administrator so you cannot lock this account.'
				)
			);
	}

	if (!target)
		return fail(400, resBuilder(true, 'You did not provide a UUID that corresponds to a member.'));

	throw redirect(302, `/panel/members`);
};

const unlock: Action = async ({ request, params, cookies }) => {
	const token = cookies.get('access-token');
	if (!token) return fail(400, resBuilder(true, 'You are not currently logged in.'));

	const member = await db.member.findFirst({
		where: { sessions: { some: { token, status: true } } }
	});

	if (!member)
		return fail(
			400,
			resBuilder(true, 'You did not provide a token that is associated with an account.')
		);

	if (member.role !== 'ADMINISTRATOR')
		return fail(400, resBuilder(true, 'You do not have the ability to perform this action.'));

	const data = await request.formData();

	if (!data) return fail(400, resBuilder(true, 'You need to provide data.'));

	const tID = data.get('id');

	if (!tID || typeof tID !== 'string')
		return fail(400, resBuilder(true, 'You need to provide a valid member UUID.'));

	if (tID === member.id)
		return fail(400, resBuilder(true, 'You probably should not be activating your own account.'));

	const target = await db.member.update({ where: { id: tID }, data: { status: true } });

	if (!target)
		return fail(400, resBuilder(true, 'You did not provide a UUID that corresponds to a member.'));

	throw redirect(302, `/panel/members`);
};

export const actions: Actions = { lock, unlock };
