import { authSignInSchema, authSignUpSchema } from "../schemas/authSchemas.js";

export function validateSignUp(req, res, next) {
	const { error } = authSignUpSchema.validate(req.body, { abortEarly: false });
	if (error) {
		return res.status(422).send(error.details.map((detail) => detail.message));
	}

	next();
}

export function validateSignIn(req, res, next) {
	const { error } = authSignInSchema.validate(req.body, { abortEarly: false });
	if (error) {
		return res.status(422).send(error.details.map((detail) => detail.message));
	}

	next();
}
