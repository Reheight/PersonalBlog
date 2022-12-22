import { db } from '$lib/database';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const token = cookies.get('access-token');

	if (!token) throw redirect(302, '/');

	const member = await db.member.findFirst({
		where: { status: true, sessions: { some: { token } } }
	});

	if (!member) {
		cookies.delete('access-token');
		throw redirect(302, '/');
	}

	if (member.role !== 'ADMINISTRATOR') throw redirect(302, '/');
}) satisfies LayoutServerLoad;
