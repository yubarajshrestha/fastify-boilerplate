import * as yup from "yup";

const AuthValidator = {
	register: {
		body: yup
			.object({
				provider: yup
					.string()
					.oneOf(["google", "facebook", "apple", "email"], {
						message: "Invalid provider, must be one of: google, facebook, apple, email",
					})
					.required("Provider is required")
					.trim(),
				name: yup.string().required("Name is required").trim(),
				email: yup.string().email().required("Email is required"),
				username: yup.string().required("Username is required"),
				password: yup.string().when("provider", (provider, schema) => {
					const via = provider.pop();
					switch (via) {
						case "google":
						case "facebook":
						case "apple":
							return schema.optional();
						case "email":
							return schema
								.required("Password is required")
								.min(8, "Password must be at least 8 characters")
								.matches(/[a-zA-Z]/, "Password can only contain Latin letters.");
					}
					return schema;
				}),
				provider_token: yup.string().when("provider", (provider, schema) => {
					const via = provider.pop();
					switch (via) {
						case "google":
						case "facebook":
						case "apple":
							return schema.required("Provider ID is required");
						case "email":
							return schema.optional();
					}
					return schema;
				}),
			})
			.required(),
	},
	login: {
		body: yup
			.object({
				provider: yup
					.string()
					.oneOf(
						["google", "facebook", "apple", "email"],
						"Unsupported provider, must be one of: google, facebook, apple, email",
					)
					.required("Provider is required")
					.trim(),
				email: yup.string().email().required("Email is required"),
				password: yup.string().when("provider", (provider, schema) => {
					const via = provider.pop();
					switch (via) {
						case "google":
						case "facebook":
						case "apple":
							return schema.optional();
						case "email":
							return schema
								.required("Password is required")
								.min(8, "Password must be at least 8 characters")
								.matches(/[a-zA-Z]/, "Password can only contain Latin letters.");
					}
					return schema;
				}),
				provider_token: yup.string().when("provider", (provider, schema) => {
					const via = provider.pop();
					switch (via) {
						case "google":
						case "facebook":
						case "apple":
							return schema.required("Provider ID is required");
						case "email":
							return schema.optional();
					}
					return schema;
				}),
			})
			.required(),
	},
};

export default AuthValidator;
