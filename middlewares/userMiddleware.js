import db from "../config/db.js";

export async function getUser(req, res, next) {
	const { authorization } = req.headers;

	const token = authorization?.replace("Bearer", "").trim();

	if (!token) return res.status(401).send("No token found.");

	try {
		const { rows: sessions } = await db.query(
			`SELECT * FROM sessions WHERE token=$1`,
			[token]
		);
		const [session] = sessions;
		if (!session) return res.status(401).send("Session not found");

		const { rows: users } = await db.query(`SELECT * FROM users WHERE id=$1`, [
			session.userId,
		]);
		const [user] = users;
		if (!user) {
			return res.sendStatus(401);
		}

		res.locals.user = user;
		next();
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}
