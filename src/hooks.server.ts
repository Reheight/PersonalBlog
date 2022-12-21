import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/database';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('access-token');

	if (!session) return resolve(event);

	const member = await db.member.findFirst({
		where: { sessions: { some: { token: session } } },
		select: {
			id: true,
			name: true,
			emailAddress: true,
			role: true,
			status: true,
			createdAt: true,
			updatedAt: true
		}
	});

	if (!member) return resolve(event);

	event.locals.member = {
		id: member.id,
		name: member.name,
		email: member.emailAddress,
		role: member.role,
		status: member.status,
		createdAt: member.createdAt,
		updatedAt: member.updatedAt
	};

	return await resolve(event);
};
