import { page } from '$app/stores';
import { db } from '$lib/database';
import { resBuilder } from '$lib/res';
import { prisma } from '@prisma/client';
import { fail, redirect, type Actions, type Action } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	if (locals.member.role !== 'ADMINISTRATOR' && locals.member.role !== 'AUTHOR')
		throw redirect(302, '/');

	const tags = await db.tag.findMany({ where: { status: true } });
	const categories = await db.category.findMany({ where: { status: true } });

	return { data: { tags, categories } };
}) satisfies PageServerLoad;

const create: Action = async ({ request, cookies }) => {
	const token = cookies.get('access-token');
	if (!token) return fail(400, resBuilder(true, 'You are not currently logged in.'));
	const member = await db.member.findFirst({ where: { sessions: { some: { token } } } });
	if (!member) {
		cookies.delete('access-token', { path: '/' });
		return fail(400, resBuilder(true, 'The token provided does not exist.'));
	}

	if (member.role !== 'ADMINISTRATOR' && member.role !== 'AUTHOR')
		return fail(403, resBuilder(true, 'You do not have access to this resource.'));

	const data = await request.formData();
	const subject = data.get('subject');
	const content = data.get('content');
	const description = data.get('description');
	const tags = data.get('tags');
	const category = data.get('category');

	if (!subject || typeof subject !== 'string')
		return fail(400, resBuilder(true, 'You need to provide a valid subject for your blog post.'));
	if (!content || typeof content !== 'string')
		return fail(400, resBuilder(true, 'You need to provide content for your blog post.'));
	if (!description || typeof description !== 'string')
		return fail(
			400,
			resBuilder(true, 'You need to provide a valid description for your blog post.')
		);
	if (!tags || typeof tags !== 'string')
		return fail(400, resBuilder(true, 'You need to provide a valid set of tags.'));
	if (!category || typeof category !== 'string')
		return fail(400, resBuilder(true, 'You need to select a valid category.'));

	const tA = tags.split(',').map((x) => ({ tagId: x }));

	console.log(tA);

	const _post = await db.post.create({
		data: {
			subject,
			content,
			description,
			authorId: member.id,
			categoryId: category,
			tags: {
				createMany: {
					data: tA,
					skipDuplicates: true
				}
			}
		}
	});

	throw redirect(302, `/blog/${_post.id}`);
};

export const actions: Actions = { create };
