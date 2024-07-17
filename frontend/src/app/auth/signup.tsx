import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from "@modules/components/layout";
import PasswordConfirm from './components/password-confirm';

interface FormValues {
    username: string;
    email: string;
    password: string;
    confirm: string;
}

const SignUp = () => {
    const formik = useFormik<Partial<FormValues>>({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirm: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Username is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters long')
                .required('Password is required'),
            confirm: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Confirm Password is required')
        }),
        onSubmit: values => {
            console.log('Form values:', values);
        },
    });

    return (
        <Layout>
            <div className="flex ml-96 justify-center items-center mt-16">
                <form onSubmit={formik.handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                     
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username || ''}
                            className={`shadow appearance-none border-2 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.username && formik.errors.username ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <p className="text-red-500 text-xs italic">{formik.errors.username}</p>
                        ) : null}
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email || ''}
                            className={`shadow appearance-none border-2 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
                        ) : null}
                    </div>
                    
                    <PasswordConfirm formik={formik} /> 

                    <div className="flex items-center justify-between">
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default SignUp;
