import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "../config/db.js";

// signup
export async function signUp(req, res) {
	const { name, email, password, confirmPassword } = req.body;

	try {
		const userExists = await db.query(`SELECT * FROM users WHERE email=$1`, [
			email,
		]);
		if (userExists.rowCount > 0) return res.sendStatus(409);

		await db.query(
			`INSERT INTO users(name, email, password) VALUES ($1, $2, $3)`,
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
		const { rows: users } = await db.query(`SELECT * FROM users WHERE email=$1`, [
			email,
		]);
		const [user] = users;
		if (!user) return res.sendStatus(401);

		if (bcrypt.compareSync(password, user.password)) {
			const token = uuid();
			await db.query(`INSERT INTO sessions(token, "userId") VALUES ($1, $2)`, [
				token,
				user.id,
			]);
			return res.send({ token });
		}

		return res.sendStatus(401);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}
