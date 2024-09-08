import * as yup from 'yup'

const UserValidator = {
	body: yup
		.object({
			name: yup.string().required('Name is required').trim(),
			email: yup.string().email('Invalid email').required('Email is required').trim(),
			password: yup.string().required('Password is required').trim(),
		})
		.required(),
}

export default UserValidator
