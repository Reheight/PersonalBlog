import { db } from '$lib/database';
import { resBuilder } from '$lib/res';
import { error, fail, redirect, type Actions, Action } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const post = await db.post.findFirst({
		where: { id: params.uuid, status: true },
		include: { author: true, tags: true }
	});

	if (!post) throw error(404);

	const comments = await db.commentInPost.findMany({
		where: { postId: post.id, status: true },
		include: { author: true },
		orderBy: { createdAt: 'asc' }
	});

	post.comments = [];

	for (let i = 0; i < comments.length; i++) {
		delete comments[i].author.emailAddress;
		delete comments[i].author.passwordHash;

		post.comments.push(comments[i]);
	}

	delete post.author.emailAddress;
	delete post.author.passwordHash;

	return post;
}) satisfies PageLoad;

const comment: Action = async ({ request, params, cookies }) => {
	const token = cookies.get('access-token');
	if (!token) return fail(400, resBuilder(true, 'You are not currently logged in.'));

	const member = await db.member.findFirst({ where: { sessions: { some: { token } } } });

	if (!member)
		return fail(
			400,
			resBuilder(true, 'You did not provide a token that is associated with an account.')
		);

	const post = await db.post.findFirst({ where: { id: params.uuid, status: true } });
	if (!post)
		return fail(
			500,
			resBuilder(true, "We are unable to identify the post you're trying to comment on.")
		);

	const data = await request.formData();
	const _comment = data.get('comment');

	if (!_comment || typeof _comment !== 'string')
		return fail(400, resBuilder(true, 'You need to provide a valid comment!'));

	const nComment = await db.post.update({
		where: { id: post.id },
		data: { comments: { create: { authorId: member.id, content: _comment } } }
	});

	if (!nComment) return fail(500, resBuilder(true, 'We had an issue while creating your comment.'));

	throw redirect(302, `/blog/${post.id}#${nComment.id}`);
};

export const actions: Actions = { comment };
