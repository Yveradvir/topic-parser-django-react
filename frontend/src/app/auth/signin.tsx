import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from "@modules/components/layout";
import PasswordConfirm from './components/password-confirm';
import { LaunchedAxios } from '@modules/utils/api';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { check_error } from '@modules/utils/check';
import { useState } from 'react';

interface FormValues {
    username: string;
    password: string;
    confirm: string;
    [key: string]: unknown;
}

const SignIn = () => {
    const navigate = useNavigate();
    const [global, setGlobal] = useState<null | string>(null);

    const formik = useFormik<Partial<FormValues>>({
        initialValues: {
            username: '',
            password: '',
            confirm: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
            confirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
        }),
        onSubmit: async (values: Partial<FormValues>, actions: FormikHelpers<Partial<FormValues>>) => {
            actions.setSubmitting(true);
            try {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { confirm, ...body } = values;
                const response = await LaunchedAxios.post("/core/a/token", body);

                if (response.status === 200) {
                    navigate("/home");
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    setGlobal(check_error(error));
                }
            } finally {
                actions.setSubmitting(false);
            }
        },
    });

    return (
        <Layout>
            <div className="flex ml-96 justify-center items-center mt-16">
                <form onSubmit={formik.handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

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

                    <PasswordConfirm formik={formik} />

                    <div className="flex items-center justify-between">
                        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
                            Sign Up
                        </button>
                    </div>
                    {global && (
                        <p className="text-red-500 text-xs italic">{global}</p>
                    )}
                </form>
            </div>
        </Layout>
    );
};

export default SignIn;
