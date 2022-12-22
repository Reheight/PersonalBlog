import { db } from '$lib/database';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const member = await db.member.findFirst({
		where: { username: params.username.toLowerCase() },
		include: { comments: true, posts: true }
	});

	if (!member) throw error(404);

	delete member.emailAddress;
	delete member.passwordHash;

	return member;
}) satisfies PageLoad;
