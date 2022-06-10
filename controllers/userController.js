import db from "../config/db.js";

export async function getUserById(req, res) {
	const { user } = res.locals;
	const { id } = req.params;

	try {
		const sumViews = await db.query(
			`SELECT SUM(views) as "visitCount" FROM "shortsUrls" WHERE "userId" = $1`,
			[id]
		);
		const visitCount = sumViews.rows[0].visitCount;

		const userUrls = await db.query(
			`SELECT id, "shortUrl", url, views as "visitCount" FROM "shortsUrls" WHERE "userId" = $1`,
			[id]
		);

		if (userUrls.rowCount === 0) {
			return res.sendStatus(404);
		}

		const shortenedUrls = userUrls.rows;

		res.send({
			id: user.id,
			name: user.name,
			visitCount,
			shortenedUrls,
		});
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}
