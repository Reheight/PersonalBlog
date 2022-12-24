import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/database';
import type { Category, CommentInPost, ROLE, TagsInPost } from '@prisma/client';

export const GET = (async ({ url }) => {
	const blogs = await db.post.findMany({
		orderBy: { updatedAt: 'desc' },
		include: {
			author: {
				select: { name: true, status: true, role: true, username: true }
			},
			tags: {
				include: { tag: true }
			},
			category: true,
			comments: {
				include: { author: { select: { name: true, status: true, role: true, username: true } } }
			}
		}
	});

	return new Response(JSON.stringify({ error: false, data: blogs }));
}) satisfies RequestHandler;
