import React, { useEffect, useState } from "react";
import Table from "./Table";
import {
  fetchArtists,
  addArtist,
  updateArtist,
  deleteArtist,
} from "../api/artistApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const navigate = useNavigate();

  // Fetch artists on component mount
  useEffect(() => {
    const getArtists = async () => {
      try {
        const data = await fetchArtists();
        setArtists(data);
      } catch (error) {
        console.error("Failed to fetch artists:", error);
      }
    };
    getArtists();
  }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "dob", label: "Date of Birth" },
    { key: "gender", label: "Gender" },
    { key: "address", label: "Address" },
    { key: "first_release_year", label: "First Release Year" },
    { key: "no_of_albums_release", label: "Albums Released" },
  ];

  // Formik for adding and editing artists
  const formik = useFormik({
    initialValues: {
      name: "",
      dob: "",
      gender: "",
      address: "",
      firstReleaseYear: "",
      noOfAlbumsRelease: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      dob: Yup.date().required("Date of Birth is required"),
      gender: Yup.string()
        .oneOf(["m", "f", "o"], "Invalid gender")
        .required("Gender is required"),
      address: Yup.string().required("Address is required"),
      firstReleaseYear: Yup.number()
        .typeError("First Release Year must be a number")
        .required("First Release Year is required"),
      noOfAlbumsRelease: Yup.number()
        .typeError("Albums Released must be a number")
        .required("Number of Albums Released is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (showEditModal && selectedArtist) {
          // Update existing artist
          const updatedArtist = {
            ...values,
            first_release_year: values.firstReleaseYear,
            no_of_albums_release: values.noOfAlbumsRelease,
          };
          await updateArtist(selectedArtist.id, updatedArtist);
          setArtists((prev) =>
            prev.map((artist) =>
              artist.id === selectedArtist.id
                ? { ...updatedArtist, id: artist.id }
                : artist
            )
          );
        } else {
          // Add new artist
          const newArtist = {
            ...values,
            first_release_year: values.firstReleaseYear,
            no_of_albums_release: values.noOfAlbumsRelease,
          };
          await addArtist(newArtist);
          setArtists((prev) => [...prev, newArtist]);
        }

        setShowAddModal(false);
        setShowEditModal(false);
        resetForm();
      } catch (error) {
        console.error("Failed to submit artist:", error);
      }
    },
  });

  // Handle delete artist
  const handleDeleteArtist = async () => {
    try {
      await deleteArtist(selectedArtist.id);
      setArtists((prev) =>
        prev.filter((artist) => artist.id !== selectedArtist.id)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete artist:", error);
    }
  };

  // Open edit modal
  const handleEdit = (artist) => {
    // console.log(artist);
    setSelectedArtist(artist);
    formik.setValues({
      name: artist.name,
      dob: artist.dob,
      gender: artist.gender,
      address: artist.address,
      firstReleaseYear: artist.first_release_year,
      noOfAlbumsRelease: artist.no_of_albums_release,
    });
    setShowEditModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Artists</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Artist
        </button>
      </div>

      <Table
        columns={columns}
        data={artists}
        onEdit={handleEdit}
        onDelete={(artist) => {
          setSelectedArtist(artist);
          setShowDeleteModal(true);
        }}
        onManageSongs={(artist) => {
          navigate(`/artists/${artist.id}/songs`);
        }}
        showManageSongs={true}
      />

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {showEditModal ? "Edit Artist" : "Add Artist"}
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4 flex flex-col items-start">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border px-3 py-2 rounded"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
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

              <div className="mb-4 flex flex-col items-start">
                <label className="block mb-1">First Release Year</label>
                <input
                  type="text"
                  name="firstReleaseYear"
                  value={formik.values.firstReleaseYear}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border px-3 py-2 rounded"
                />
                {formik.touched.firstReleaseYear &&
                  formik.errors.firstReleaseYear && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.firstReleaseYear}
                    </div>
                  )}
              </div>

              <div className="mb-4 flex flex-col items-start">
                <label className="block mb-1">Albums Released</label>
                <input
                  type="text"
                  name="noOfAlbumsRelease"
                  value={formik.values.noOfAlbumsRelease}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border px-3 py-2 rounded"
                />
                {formik.touched.noOfAlbumsRelease &&
                  formik.errors.noOfAlbumsRelease && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.noOfAlbumsRelease}
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
            <p>Are you sure you want to delete this artist?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteArtist}
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

export default ArtistList;
