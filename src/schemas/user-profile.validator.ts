import * as yup from "yup";

const UserProfileValidator = {
	body: yup
		.object({
			name: yup.string().required("Name is required").trim(),
			email: yup.string().email("Invalid email format").required("Email is required").trim(),
			bio: yup.string().nullable(),
			profile_picture_key: yup.string().nullable(),
		})
		.required(),
};

export default UserProfileValidator;
