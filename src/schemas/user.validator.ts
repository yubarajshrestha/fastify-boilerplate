import * as yup from "yup";

const UserValidator = {
	create: {
		body: yup
			.object({
				name: yup.string().required("Name is required").trim(),
				email: yup.string().email().required("Email is required"),
				username: yup.string().required("Username is required"),
				password: yup.string().required("Password is required"),
			})
			.required(),
	},
	update: {
		body: yup
			.object({
				name: yup
					.string()
					.nullable()
					.test("is-empty", "Name is required", (value, context) => {
						const keys = Object.keys(context.parent);
						if (keys.includes("name") && (value === null || value === undefined || value.length === 0)) {
							return false;
						}
						return true;
					}),
				email: yup
					.string()
					.nullable()
					.test("is-empty", "Email is required", (value, context) => {
						const keys = Object.keys(context.parent);
						if (keys.includes("email") && (value === null || value === undefined || value.length === 0)) {
							return false;
						}
						return true;
					}),
				password: yup
					.string()
					.nullable()
					.test("is-empty", "Password is required", (value, context) => {
						const keys = Object.keys(context.parent);
						if (keys.includes("password") && (value === null || value === undefined || value.length === 0)) {
							return false;
						}
						return true;
					}),
			})
			.required(),
	},
};

export default UserValidator;
