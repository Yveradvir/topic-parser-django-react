import React from "react";
import { FormikProps } from "formik";

interface FormValues {
    password: string;
    confirm: string;
    [key: string]: unknown;
}

interface Props {
    formik: FormikProps<Partial<FormValues>>; // Make FormValues optional
}

const PasswordConfirm: React.FC<Props> = ({ formik }) => {
    return (
        <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
                <label
                    htmlFor="password"
                    className="block text-sm font-bold text-gray-700 mb-2"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password || ""}
                    className={`shadow appearance-none border-2 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        formik.touched.password && formik.errors.password
                            ? "border-red-500"
                            : ""
                    }`}
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-xs italic">
                        {formik.errors.password}
                    </p>
                )}
            </div>
            <div className="w-1/2">
                <label
                    htmlFor="confirm"
                    className="block text-sm font-bold text-gray-700 mb-2"
                >
                    Confirm
                </label>
                <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirm || ""}
                    className={`shadow appearance-none border-2 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        formik.touched.confirm &&
                        formik.errors.confirm
                            ? "border-red-500"
                            : ""
                    }`}
                />
                {formik.touched.confirm &&
                    formik.errors.confirm && (
                        <p className="text-red-500 text-xs italic">
                            {formik.errors.confirm}
                        </p>
                    )}
            </div>
        </div>
    );
};

export default PasswordConfirm;
