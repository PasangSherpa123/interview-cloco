import React, { useEffect, useState } from "react";
import Table from "./Table";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addUser, deleteUser, fetchUsers, updateUser } from "../api/userApi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        console.log("data is ", data);
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch artists:", error);
      }
    };
    getUsers();
  }, []);

  const columns = [
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "gender", label: "Gender" },
    { key: "address", label: "Address" },
    { key: "dob", label: "Date of Birth" },
  ];
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      gender: "",
      address: "",
      dob: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address") // Validates the format of the email
        .required("Email is required"),
      phone: Yup.string()
        .min(10, "Phone number must be at least 10 characters")
        .max(20, "Phone number must be at most 20 characters")
        .required("Phone number is required"),
      dob: Yup.date().required("Date of Birth is required"),
      gender: Yup.string()
        .oneOf(["m", "f", "o"], "Invalid gender")
        .required("Gender is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (showEditModal && selectedUser) {
          const updatedUser = {
            ...values,
            first_release_year: values.firstReleaseYear,
            no_of_albums_release: values.noOfAlbumsRelease,
          };
          await updateUser(selectedUser.id, updatedUser);
          setUsers((prev) =>
            prev.map((user) =>
              user.id === selectedUser.id
                ? { ...updatedUser, id: user.id }
                : user
            )
          );
        } else {
          const newUser = {
            ...values,
          };
          await addUser(newUser);
          setUsers((prev) => [...prev, newUser]);
        }

        setShowAddModal(false);
        setShowEditModal(false);
        resetForm();
      } catch (error) {
        console.error("Failed to submit artist:", error);
      }
    },
  });

  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUser.id);
      setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };
  const handleEdit = (user) => {
    setSelectedUser(user);
    formik.setValues({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender,
      address: user.address,
    });
    setShowEditModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      <Table
        columns={columns}
        data={users}
        onEdit={handleEdit}
        onDelete={(user) => {
          setSelectedUser(user);
          setShowDeleteModal(true);
        }}
      />

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {showEditModal ? "Edit User" : "Add User"}
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4 flex flex-col items-start">
                <label className="block mb-1">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border px-3 py-2 rounded"
                />
                {formik.touched.first_name && formik.errors.first_name && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.first_name}
                  </div>
                )}
              </div>
              <div className="mb-4 flex flex-col items-start">
                <label className="block mb-1">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border px-3 py-2 rounded"
                />
                {formik.touched.last_name && formik.errors.last_name && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.last_name}
                  </div>
                )}
              </div>

              <div className="mb-4 flex flex-col items-start">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border px-3 py-2 rounded"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div className="mb-4 flex flex-col items-start">
                <label className="block mb-1">Phone</label>
                <input
                  type="number"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border px-3 py-2 rounded"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.phone}
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
                  <div className="text-red-500 text-sm">
                    {formik.errors.dob}
                  </div>
                )}
              </div>

              <div className="mb-4 flex flex-col items-start">
                <label className="block mb-1">Gender</label>
                <select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select</option>
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                  <option value="o">Other</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.gender}
                  </div>
                )}
              </div>

              <div className="mb-4 flex flex-col items-start">
                <label className="block mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border px-3 py-2 rounded"
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.address}
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {showEditModal ? "Update" : "Add"}
                </button>
              </div>
            </form>
            {/* Form Fields Here */}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
