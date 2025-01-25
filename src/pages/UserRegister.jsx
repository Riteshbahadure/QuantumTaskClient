import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect } from "react";
import { useRegisterUserMutation } from "../redux/api/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRegister = () => {
    const [registerUser, { isSuccess, error, isLoading }] = useRegisterUserMutation();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);

    // const { user } = useSelector()
    // console.log(user)
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            dateOfBirth: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter your name"),
            email: yup.string().email("Invalid email").required("Enter your email"),
            password: yup.string().min(6, "Password must be at least 6 characters").required("Enter your password"),
            dateOfBirth: yup.string().required("Enter your date of birth"),
        }),
        onSubmit: (values, { resetForm }) => {
            registerUser(values);
            resetForm();
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("User registered successfully!");
            navigate("/login");
        }
    }, [isSuccess]);
        useEffect(() => {
            if (user) {
                navigate("/home");
            }
        }, [user, navigate]);

    useEffect(() => {
        if (error) {
            toast.error("Unable to register user.");
        }
    }, [error]);

    return (
        <div className="flex max-sm:px-8 items-center justify-center h-screen bg-gradient-to-b from-teal-400 to-blue-500">
            <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-xl relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-teal-400 text-white text-center px-4 py-1 rounded-t-xl font-bold">
                    Register
                </div>                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-4xl text-white">&#128100;</span>
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    {/* Name Input */}
                    <div className="mb-4">
                        <input
                            {...formik.getFieldProps("name")}
                            type="text"
                            id="name"
                            placeholder="Name"
                            className={`w-full px-4 py-2 bg-gray-200 text-gray-800 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${formik.errors.name && formik.touched.name && "border border-red-500"
                                }`}
                        />
                        {formik.errors.name && formik.touched.name && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                        )}
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <input
                            {...formik.getFieldProps("email")}
                            type="email"
                            id="email"
                            placeholder="Email"
                            className={`w-full px-4 py-2 bg-gray-200 text-gray-800 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${formik.errors.email && formik.touched.email && "border border-red-500"
                                }`}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <input
                            {...formik.getFieldProps("password")}
                            type="password"
                            id="password"
                            placeholder="Password"
                            className={`w-full px-4 py-2 bg-gray-200 text-gray-800 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${formik.errors.password && formik.touched.password && "border border-red-500"
                                }`}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Date of Birth Input */}
                    <div className="mb-6">
                        <input
                            {...formik.getFieldProps("dateOfBirth")}
                            type="date"
                            id="dateOfBirth"
                            placeholder="Date of Birth"
                            className={`w-full px-4 py-2 bg-gray-200 text-gray-800 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${formik.errors.dateOfBirth && formik.touched.dateOfBirth && "border border-red-500"
                                }`}
                        />
                        {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.dateOfBirth}</p>
                        )}
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className={`w-full py-2 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-700 transition duration-300 ${isLoading && "opacity-50 cursor-not-allowed"
                            }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "Register"}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-4 text-center">
                    <p className="text-gray-300">
                        Already have an account?{" "}
                        <button onClick={()=>navigate("/login")} className="text-teal-400 hover:underline">
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
