import { db } from '$lib/database';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const member = await db.member.findFirst({
		where: { username: params.username.toLowerCase() },
		select: {
			posts: {
				select: {
					category: { select: { id: true, name: true, status: true } },
					comments: {
						select: { author: { select: { name: true, id: true, status: true } } }
					},
					content: true,
					description: true,
					id: true,
					status: true,
					subject: true,
					createdAt: true,
					updatedAt: true,
					tags: {
						select: {
							id: true,
							tag: { select: { id: true, name: true, status: true } },
							status: true,
							createdAt: true,
							updatedAt: true
						}
					}
				}
			},

			comments: {
				select: {
					post: {
						select: {
							category: { select: { id: true, name: true, status: true } },
							status: true,
							subject: true,
							id: true
						}
					},
					id: true,
					status: true,
					content: true,
					createdAt: true,
					updatedAt: true
				}
			},

			id: true,
			name: true,
			role: true,
			status: true,
			username: true,
			createdAt: true,
			updatedAt: true
		}
	});

	if (!member) throw error(404);

	return member;
}) satisfies PageLoad;
