import { db } from '$lib/database';
import { resBuilder } from '$lib/res';
import { error, fail, redirect, type Actions, Action } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const post = await db.post.findFirst({
		where: { id: params.uuid, status: true },
		include: {
			author: {
				select: {
					id: true,
					status: true,
					name: true,
					username: true
				}
			},

			category: {
				select: { id: true, name: true, status: true }
			},

			comments: {
				select: {
					author: {
						select: {
							id: true,
							status: true,
							name: true,
							username: true
						}
					},
					content: true,
					id: true,
					status: true,
					createdAt: true,
					updatedAt: true
				}
			},
			tags: {
				select: {
					id: true,
					tag: {
						select: {
							id: true,
							name: true,
							status: true
						}
					}
				}
			}
		}
	});

	if (!post) throw error(404);

	return post;
}) satisfies PageServerLoad;

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

	throw redirect(302, `/blog/${post.id}`);
};

const deletecomment: Action = async ({ request, params, cookies }) => {
	console.log('HIT!');
	const token = cookies.get('access-token');
	if (!token) return fail(400, resBuilder(true, 'You are not currently logged in.'));

	const member = await db.member.findFirst({ where: { sessions: { some: { token } } } });

	if (!member)
		return fail(
			400,
			resBuilder(true, 'You did not provide a token that is associated with an account.')
		);

	const post = await db.post.findFirst({
		where: { id: params.uuid, status: true },
		include: { comments: true }
	});
	if (!post)
		return fail(
			500,
			resBuilder(true, "We are unable to identify the post you're trying to comment on.")
		);

	const data = await request.formData();
	const comment = data.get('comment');

	if (!comment || typeof comment !== 'string')
		return fail(400, resBuilder(true, 'You need to provide a valid comment!'));

	const _comment = post.comments.find((x) => x.id === comment);

	if (!_comment) return fail(500, resBuilder(true, 'We had an issue finding the comment!'));

	if (
		_comment.authorId !== member.id &&
		post.authorId !== member.id &&
		member.role !== 'ADMINISTRATOR'
	)
		return fail(400, resBuilder(true, 'You not now have permissions to delete this comment.'));

	await db.post.update({
		where: { id: post.id },
		data: { comments: { delete: { id: _comment!.id } } }
	});
	throw redirect(302, `/blog/${post.id}`);
};

export const actions: Actions = { comment, deletecomment };
