import { db } from '$lib/database';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const post = await db.post.findFirst({
		where: { id: params.uuid, status: true },
		include: { author: true, tags: true }
	});

	if (!post) throw error(404);
	delete post.author.emailAddress;
	delete post.author.passwordHash;
	return post;
}) satisfies PageLoad;
