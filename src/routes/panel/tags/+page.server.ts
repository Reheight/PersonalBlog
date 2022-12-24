import { db } from '$lib/database';
import regex from '$lib/regex';
import { resBuilder } from '$lib/res';
import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const tags = await db.tag.findMany({
		select: {
			id: true,
			name: true,
			posts: true,
			status: true
		}
	});

	return { tags };
}) satisfies PageServerLoad;

const create: Action = async ({ request, cookies }) => {
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

	const name = data.get('name');

	if (!name || typeof name !== 'string' || !name.match(regex.cattagName))
		return fail(400, resBuilder(true, 'You need to provide a valid value for a tag.'));

	const tagExists = (await db.tag.count({ where: { name } })) > 0;

	if (tagExists) return fail(400, resBuilder(true, 'That tag seems to already exist.'));

	const newTag = await db.tag.create({ data: { name } });

	if (!newTag) return fail(500, resBuilder(true, 'We had an issue while creating the new tag.'));

	throw redirect(302, '/panel/tags');
};

const remove: Action = async ({ request, cookies }) => {
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

	const id = data.get('id');

	if (!id || typeof id !== 'string')
		return fail(400, resBuilder(true, 'You need to provide a valid value for a id.'));

	const tagExists = (await db.tag.count({ where: { id } })) > 0;

	if (!tagExists) return fail(400, resBuilder(true, 'That tag does not exist.'));

	const deletedTag = await db.tag.delete({ where: { id } });

	if (!deletedTag) return fail(500, resBuilder(true, 'We had an issue while deleting the tag.'));

	throw redirect(302, '/panel/tags');
};

export const actions: Actions = { create, remove };
