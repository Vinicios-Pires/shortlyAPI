import { nanoid } from "nanoid";

import db from "../config/db.js";

export async function createShortUrl(req, res) {
	const { user } = res.locals;
	const { url } = req.body;

	const shortUrl = nanoid(8);

	if (!user) {
		return res.sendStatus(401);
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

		await db.query(`UPDATE "shortsUrls" SET views = views + 1 WHERE id = $1`, [
			id,
		]);
		res.send(result.rows);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}

export async function deleteUrl(req, res) {
	const { user } = res.locals;
	const { id } = req.params;

	if (!user) {
		return res.sendStatus(401);
	}

	try {
		const result = await db.query(
			`SELECT * FROM "shortsUrls" WHERE id = $1 AND "userId" = $2`,
			[id, user.id]
		);
		if (result.rowCount === 0) {
			res.sendStatus(404);
		} else {
			await db.query(`DELETE FROM "shortsUrls" WHERE id = $1 AND "userId" = $2`, [
				id,
				user.id,
			]);
			return res.sendStatus(204);
		}
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}

export async function getRanking(req, res) {
	try {
		const result = await db.query(`
		SELECT u.id, u.name, COUNT(s."shortUrl") as "linksCount", SUM(s.views) as "visitCount"  
		FROM users u
		JOIN "shortsUrls" s ON s."userId" = u.id
		GROUP BY u.id
		ORDER BY "visitCount" DESC
		LIMIT 10`);

		res.status(200).send(result.rows);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}
