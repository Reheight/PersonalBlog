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
			id: string;
			name: string;
			username: string;
			status: boolean;
			role: ROLE;
		};
		tags: TagsInPost[];
		content: string;
		description: string;
		createdAt: Date;
		updatedAt: Date;
		status: boolean;
		subject: string;
	}[] = [];

	function getTag(tagid: string) {
		let tag: { id: string; name?: string } = { id: tagid };

		return tag;
	}

	for (let i = 0; i < blogs.length; i++) {
		const blog = blogs[i];

		blogArr.push({
			id: blog.id,
			author: {
				id: blog.authorId,
				name: blog.author.name,
				username: blog.author.username,
				status: blog.author.status,
				role: blog.author.role
			},
			tags: blog.tags,
			content: blog.content,
			description: blog.description,
			createdAt: blog.createdAt,
			status: blog.status,
			subject: blog.subject,
			updatedAt: blog.updatedAt
		});
	}

	return new Response(JSON.stringify({ error: false, data: blogArr }));
}) satisfies RequestHandler;
