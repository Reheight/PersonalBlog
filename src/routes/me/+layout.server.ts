import { db } from '$lib/database';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const token = cookies.get('access-token');

	if (!token) throw redirect(302, '/');

	const member = await db.member.findFirst({
		where: { status: true, sessions: { some: { token } } },
		select: {
			comments: { include: { post: { include: { category: true } } } },
			createdAt: true,
			emailAddress: true,
			id: true,
			name: true,
			posts: { include: { tags: { include: { tag: true } }, category: true } },
			role: true,
			sessions: true,
			status: true,
			updatedAt: true,
			username: true
		}
	});

	if (!member) {
		cookies.delete('access-token', { path: '/' });
		throw redirect(302, '/');
	}

	return member;
}) satisfies LayoutServerLoad;
