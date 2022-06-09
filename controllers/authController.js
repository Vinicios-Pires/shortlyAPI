import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "../config/db.js";

// signup
export async function signUp(req, res) {
	const { name, email, password, confirmPassword } = req.body;

	try {
		await db.query(
			`INSERT INTO users(name, email, password VALUES ($1, $2, $3, $4))`,
			[name, email, bcrypt.hashSync(password, 10)]
		);

		res.sendStatus(201);
	} catch (e) {
		console.log(e);
		res.sendStatus(422);
	}
}

// signin
export async function signIn(req, res) {
	const { email, password } = req.body;

	try {
		const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
		if (user.rowCount === 0) return res.sendStatus(401);

		if (
			user.rowCount > 1 &&
			bcrypt.compareSync(password, user.rows[0].password)
		) {
			const token = uuid();
			await db.query(`INSERT INTO sessions(token, userId) VALUES ($1, $2)`, [
				token,
				user.rows[0].id,
			]);
			return res.send({ token });
		}

		return res.sendStatus(422);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}
