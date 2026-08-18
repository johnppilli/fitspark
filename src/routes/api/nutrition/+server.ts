import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { calculateLine } from '$lib/server/nutrition';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const lines = body?.lines;

	if (!Array.isArray(lines)) {
		return json({ error: 'lines must be an array of strings' }, { status: 400 });
	}

	const cleaned = lines.map((l) => String(l).trim()).filter(Boolean).slice(0, 20);
	const apiKey = env.FDC_API_KEY || 'DEMO_KEY';

	const results = await Promise.all(cleaned.map((line) => calculateLine(line, apiKey)));

	return json({ results: results.filter(Boolean) });
};
