import { nanoid } from "nanoid";

import db from "../config/db.js";

export async function createShortUrl(req, res) {
	const { user } = res.locals;
	const { url } = req.body;
	const shortUrl = nanoid(8);

	if (!user) {
		return res.sendStatus(401);
	}

	if (!url) {
		return res.sendStatus(422);
	}

	try {
		await db.query(
			`INSERT INTO "shortsUrls" (url, "userId", "shortUrl") VALUES ($1, $2, $3)`,
			[url, user.id, shortUrl]
		);

		res.status(201).send(shortUrl);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}

export async function getUrl(req, res) {
	const { id } = req.params;

	try {
		const result = await db.query(
			`SELECT id, "shortUrl", url FROM "shortsUrls" WHERE id=$1`,
			[id]
		);

		if (result.rowCount === 0) {
			return res.sendStatus(404);
		}

		res.send(result.rows);
	} catch (e) {}
}