import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/database';
import type { ROLE, TagsInPost } from '@prisma/client';

export const GET = (async ({ url }) => {
	const blogs = await db.post.findMany({
		orderBy: { updatedAt: 'desc' },
		include: { author: true, tags: true }
	});

	let blogArr: {
		id: string;
		author: {
			name: string;
			username: string;
			status: boolean;
			role: ROLE;
		};
		tags: TagsInPost[];
		content: string;
		createdAt: Date;
		updatedAt: Date;
		status: boolean;
		subject: string;
	}[] = [];

	for (let i = 0; i < blogs.length; i++) {
		const blog = blogs[i];

		blogArr.push({
			id: blog.id,
			author: {
				name: blog.author.name,
				username: blog.author.username,
				status: blog.author.status,
				role: blog.author.role
			},
			tags: blog.tags,
			content: blog.content,
			createdAt: blog.createdAt,
			status: blog.status,
			subject: blog.subject,
			updatedAt: blog.updatedAt
		});
	}

	return new Response(JSON.stringify({ error: false, data: blogArr }));
}) satisfies RequestHandler;
