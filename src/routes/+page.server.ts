import { db } from '$lib/database';
import { resBuilder } from '$lib/res';
import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions } from './$types';

const remove: Action = async ({ request, cookies }) => {
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
	const id = data.get('id');
	const subject = data.get('subject');
	const content = data.get('content');
	const description = data.get('description');

	if (!id || typeof id !== 'string')
		return fail(400, resBuilder(true, 'You need to provide an id of a post you wish to modify.'));

	const post = await db.post.findFirst({ where: { id } });

	if (!post) return fail(400, resBuilder(true, 'We were provided an invalid post identifier.'));

	if (post.authorId !== member.id && member.role !== 'ADMINISTRATOR')
		return fail(403, resBuilder(true, 'You do not have access to delete this post.'));

	const _post = await db.post.delete({ where: { id } });

	if (!_post)
		return fail(500, resBuilder(true, 'There was an error while updating the post you provided!'));

	throw redirect(301, `/`);
};

export const actions: Actions = { remove };
