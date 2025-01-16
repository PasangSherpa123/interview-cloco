import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router";
import { registerUser } from "../api/authApi"; // Replace with your actual API call
import { successToast } from "../Helpers/toasterData";
import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
      address: "",
      dob: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().trim().required("First name is required."),
      last_name: Yup.string().trim().required("Last name is required."),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
      phone: Yup.string()
        .min(10, "Phone number must be at least 10 characters")
        .max(20, "Phone number must be at most 20 characters")
        .matches(/^\d+$/, "Phone number must be numeric")
        .required("Phone number is required"),
      gender: Yup.string()
        .oneOf(["m", "f", "o"], 'Gender must be "m", "f", or "o".')
        .optional(),
      address: Yup.string().required("Address is required"),
      dob: Yup.date().required("Date of Birth is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form values:", values);
      await registerUser(values);
      toast.success("Registration Successful", successToast);
      navigate("/login");
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="block text-md font-medium text-gray-700 text-start"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Enter your first name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-3 py-2 bg-gray-50 border ${
                formik.touched.first_name && formik.errors.first_name
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <div className="text-sm text-start text-red-500 mt-1">
                {formik.errors.first_name}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="last_name"
              className="block text-md font-medium text-gray-700 text-start"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Enter your last name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-3 py-2 bg-gray-50 border ${
                formik.touched.last_name && formik.errors.last_name
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <div className="text-sm text-start text-red-500 mt-1">
                {formik.errors.last_name}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-700 text-start"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-3 py-2 bg-gray-50 border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-sm text-start text-red-500 mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-700 text-start"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-3 py-2 bg-gray-50 border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-sm text-start text-red-500 mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label className="block mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border px-3 py-2 rounded"
            />
            {formik.touched.dob && formik.errors.dob && (
              <div className="text-red-500 text-sm">{formik.errors.dob}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-md font-medium text-gray-700 text-start"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-3 py-2 bg-gray-50 border ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-sm text-start text-red-500 mt-1">
                {formik.errors.phone}
              </div>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="gender"
              className="block text-md font-medium text-gray-700 text-start"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-3 py-2 bg-gray-50 border ${
                formik.touched.gender && formik.errors.gender
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            >
              <option value="" label="Select gender" />
              <option value="m" label="Male" />
              <option value="f" label="Female" />
              <option value="o" label="Other" />
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <div className="text-sm text-start text-red-500 mt-1">
                {formik.errors.gender}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-md font-medium text-gray-700 text-start"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-3 py-2 bg-gray-50 border ${
                formik.touched.address && formik.errors.address
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-sm text-start text-red-500 mt-1">
                {formik.errors.address}I
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Go to login page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
