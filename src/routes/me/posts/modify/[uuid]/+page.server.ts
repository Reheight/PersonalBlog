import { db } from '$lib/database';
import { resBuilder } from '$lib/res';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const post = await db.post.findFirst({
		where: { id: params.uuid, status: true },
		include: { author: true, tags: true }
	});

	if (!locals.member) throw redirect(302, '/');
	if (!post) throw error(404);

	if (locals.member.role !== 'ADMINISTRATOR' && locals.member.role !== 'AUTHOR') throw error(403);

	if (post.authorId !== locals.member.id && locals.member.role !== 'ADMINISTRATOR')
		throw error(403);

	if (!post) throw error(404);

	delete post.author.emailAddress;
	delete post.author.passwordHash;

	return post;
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
	const id = data.get('id');
	const subject = data.get('subject');
	const content = data.get('content');
	const description = data.get('description');

	if (!id || typeof id !== 'string')
		return fail(400, resBuilder(true, 'You need to provide an id of a post you wish to modify.'));

	if (!subject || typeof subject !== 'string')
		return fail(400, resBuilder(true, 'You need to provide a valid subject for your blog post.'));
	if (!content || typeof content !== 'string')
		return fail(400, resBuilder(true, 'You need to provide content for your blog post.'));
	if (!description || typeof description !== 'string')
		return fail(
			400,
			resBuilder(true, 'You need to provide a valid description for your blog post.')
		);

	const post = await db.post.findFirst({ where: { id } });

	if (!post) return fail(400, resBuilder(true, 'We were provided an invalid post identifier.'));

	if (post.authorId !== member.id && member.role !== 'ADMINISTRATOR')
		return fail(403, resBuilder(true, 'You do not have access to modify this post.'));

	const _post = await db.post.update({ where: { id }, data: { subject, content, description } });

	if (!_post)
		return fail(500, resBuilder(true, 'There was an error while updating the post you provided!'));

	throw redirect(302, `/blog/${_post.id}`);
};

export const actions: Actions = { modify };
