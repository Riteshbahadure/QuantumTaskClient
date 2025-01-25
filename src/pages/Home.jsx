import React, { useEffect, useState } from "react";
import { useGetUserQuery, useLogoutUserMutation } from "../redux/api/userApi";
import { FaTrash, FaCog } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { data } = useGetUserQuery();
    const [logout, { isSuccess }] = useLogoutUserMutation();
    const { user } = useSelector(state => state.user);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    // Redirect to login page if user is not logged in
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    // Redirect to login page after logout success
    useEffect(() => {
        if (isSuccess) {
            navigate("/login");
        }
    }, [isSuccess, navigate]);

    return (
        <>
            {/* Navbar */}
            <div className="flex justify-between px-10 py-4 bg-gray-600 items-center text-white font-semibold shadow-lg">
                <h1 className="text-xl">User Panel</h1>
                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="bg-white text-blue-600 font-medium px-4 py-2 rounded-md  hover:bg-gray-100"
                    >
                        Your Info
                    </button>
                    {/* Dropdown */}
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
                            <div className="px-4 py-2 text-gray-700 flex flex-col items-center">
                                <p className="text-sm text-gray-500">Name : <span className="font-semibold text-black">{user?.name}</span></p>
                                <p className="text-sm text-gray-500">Email : <span className="font-semibold text-black">{user?.email}</span> </p>
                                <p className="text-sm text-gray-500 ">Date Of Birth : <span className="font-semibold text-black">{user?.dateOfBirth.split("T")[0]}</span> </p>
                                <button
                                    onClick={logout}
                                    className="mt-2 bg-red-500 px-2 py-1 rounded-lg w-44  text-white hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* User Table */}
            <div className="flex flex-col items-center mt-6">
                <div className="w-full sm:w-11/12 lg:w-10/12">
                    <div className="py-4 max-sm:px-2">
                        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-lg">
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-100 border-b">
                                        <tr>
                                            <th className="text-xs md:text-sm font-medium text-gray-900 px-4 md:px-6 py-2 md:py-4 text-left">
                                                #
                                            </th>
                                            <th className="text-xs md:text-sm font-medium text-gray-900 px-4 md:px-6 py-2 md:py-4 text-left">
                                                Name
                                            </th>
                                            <th className="text-xs md:text-sm font-medium text-gray-900 px-4 md:px-6 py-2 md:py-4 text-left">
                                                Email
                                            </th>
                                            <th className="text-xs md:text-sm font-medium text-gray-900 px-4 md:px-6 py-2 md:py-4 text-left">
                                                Date of Birth
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data &&
                                            data.map((item, i) => (
                                                <tr
                                                    key={i}
                                                    className="border-b last:border-0 hover:bg-gray-50"
                                                >
                                                    <td className="px-4 md:px-6 py-2 md:py-4 text-xs md:text-sm font-medium text-gray-900">
                                                        {i + 1}
                                                    </td>
                                                    <td className="flex items-center px-4 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-900">
                                                        <MdAccountCircle className="w-8 h-8 md:w-10 md:h-10 text-gray-500 mr-2 md:mr-3" />
                                                        {item.name}
                                                    </td>
                                                    <td className="px-4 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-500">
                                                        {item.email}
                                                    </td>
                                                    <td className="px-4 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-500">
                                                        {item.dateOfBirth.split("T")[0]}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Home;
