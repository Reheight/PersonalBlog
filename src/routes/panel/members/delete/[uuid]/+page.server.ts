import { db } from '$lib/database';
import { resBuilder } from '$lib/res';
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

	return target;
}) satisfies PageServerLoad;

const deletemember: Action = async ({ request, cookies }) => {
	const token = cookies.get('access-token');
	if (!token) return fail(400, resBuilder(true, 'You are not currently logged in.'));
	const member = await db.member.findFirst({ where: { sessions: { some: { token } } } });

	if (!member) {
		cookies.delete('access-token', { path: '/' });
		return fail(400, resBuilder(true, 'The token provided does not exist.'));
	}

	if (member.role !== 'ADMINISTRATOR')
		return fail(403, resBuilder(true, 'You do not have access to this resource.'));

	const data = await request.formData();
	const values = {
		id: data.get('id')
	};

	// Member
	if (!values.id || typeof values.id !== 'string')
		return fail(400, resBuilder(true, 'You need to provide a valid user UUID.'));
	const target = await db.member.findUnique({ where: { id: values.id } });

	if (!target)
		return fail(400, resBuilder(true, "The member you're trying to delete does not exist."));

	if (target.role === 'ADMINISTRATOR') {
		const totalAdministratorsWithout = await db.member.count({
			where: { role: 'ADMINISTRATOR', AND: { NOT: { id: target.id } } }
		});

		if (totalAdministratorsWithout === 0)
			return fail(
				400,
				resBuilder(
					true,
					'The player you were trying to delete is an Administrator and also appears to be the last Administrator so you cannot delete this account.'
				)
			);
	}

	const deleteTarget = await db.member.delete({
		where: { id: values.id }
	});

	if (!deleteTarget)
		return fail(500, resBuilder(true, 'There was an issue while deleting the member!'));

	throw redirect(302, `/panel/members`);
};

export const actions: Actions = { deletemember };
