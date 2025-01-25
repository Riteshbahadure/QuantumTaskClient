import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect } from "react";
import { useLoginUserMutation } from "../redux/api/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserLogin = () => {
    const [loginUser, { isSuccess, error, isLoading }] = useLoginUserMutation();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().required("Enter email"),
            password: yup.string().required("Enter password"),
        }),
        onSubmit: (values, { resetForm }) => {
            loginUser(values);
            resetForm();
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("User login successfully");
            navigate("/home");
        }
    }, [isSuccess]);

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (error) {
            toast.error("Unable to login");
        }
    }, [error]);

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-teal-500 to-blue-700">
            <div className="w-full max-w-md bg-gradient-to-b from-gray-800 to-gray-900 bg-opacity-90 rounded-xl p-6 shadow-2xl relative">
                {/* Sign In Header */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-teal-400 text-white text-center px-4 py-1 rounded-t-xl font-bold">
                    SIGN IN
                </div>
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-b from-blue-400 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-4xl text-white">&#128100;</span>
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4 relative">
                        <span className="absolute left-3 top-3 text-gray-400">&#128231;</span>
                        <input
                            {...formik.getFieldProps("email")}
                            type="email"
                            id="email"
                            placeholder="username"
                            className={`w-full pl-10 py-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${formik.errors.email && formik.touched.email && "border border-red-500"
                                }`}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="mb-4 relative">
                        <span className="absolute left-3 top-3 text-gray-400">&#128274;</span>
                        <input
                            {...formik.getFieldProps("password")}
                            type="password"
                            id="password"
                            placeholder="password"
                            className={`w-full pl-10 py-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${formik.errors.password && formik.touched.password && "border border-red-500"
                                }`}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox bg-gray-800 border-gray-700 text-teal-400 mr-2" />
                            Remember me
                        </label>
                        <a href="/forgot-password" className="hover:underline text-teal-300">
                            Forgot your password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-teal-500 text-white font-bold rounded-md hover:bg-teal-600 transition duration-300 shadow-lg"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        Don't have an account?{" "}
                        <button  onClick={()=>navigate("/login")} className="text-teal-400 hover:underline">
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
