import React, { useEffect, useState } from "react";
import Table from "./Table";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router";
import { addSong, deleteSong, fetchSongs, updateSong } from "../api/songsApi";

const SongsList = () => {
  const [songs, setSongs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const { artistId } = useParams();

  // Fetch songs on component mount
  useEffect(() => {
    const getSongs = async () => {
      try {
        const data = await fetchSongs(artistId);
        console.log("songs data is", data);
        setSongs(data);
      } catch (error) {
        console.error("Failed to fetch artists:", error);
      }
    };
    getSongs();
  }, []);
  const columns = [
    { key: "title", label: "Title" },
    { key: "album_name", label: "Album Name" },
    { key: "genre", label: "Genre" },
  ];

  // Formik for adding and editing songs
  const formik = useFormik({
    initialValues: {
      title: "",
      albumName: "",
      genre: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      albumName: Yup.string().required("Album Name is required"),
      genre: Yup.string()
        .oneOf(["rnb", "country", "classic", "rock", "jazz"], "Invalid genre")
        .required("Genre is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (showEditModal && selectedSong) {
          // Update existing song
          const updatedSong = {
            ...values,
            album_name: values.albumName,
          };
          await updateSong(
            selectedSong.artist_id,
            selectedSong.id,
            updatedSong
          );
          setSongs((prev) =>
            prev.map((song) =>
              song.id === selectedSong.id
                ? { ...updatedSong, id: song.id }
                : song
            )
          );
        } else {
          // Add new song
          const newSong = {
            ...values,
            artistId,
          };
          await addSong(newSong);
          setSongs((prev) => [
            ...prev,
            { ...newSong, album_name: newSong.albumName },
          ]);
        }

        setShowAddModal(false);
        setShowEditModal(false);
        resetForm();
      } catch (error) {
        console.error("Failed to submit song:", error);
      }
    },
  });

  // Handle delete song
  const handleDeleteSong = async () => {
    try {
      await deleteSong(selectedSong.id);
      setSongs((prev) => prev.filter((song) => song.id !== selectedSong.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete song:", error);
    }
  };

  // Open edit modal
  const handleEdit = (song) => {
    setSelectedSong(song);
    formik.setValues({
      title: song.title,
      albumName: song.album_name,
      genre: song.genre,
    });
    setShowEditModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Songs</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Song
        </button>
      </div>

      <Table
        columns={columns}
        data={songs}
        onEdit={handleEdit}
        onDelete={(artist) => {
          setSelectedSong(artist);
          setShowDeleteModal(true);
        }}
      />

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {showEditModal ? "Edit Song" : "Add Song"}
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4 flex flex-col items-start">
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border px-3 py-2 rounded"
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.title}
                  </div>
                )}
              </div>

              <div className="mb-4 flex flex-col items-start">
                <label className="block mb-1">Album Name</label>
                <input
                  type="text"
                  name="albumName"
                  value={formik.values.albumName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border px-3 py-2 rounded"
                />
                {formik.touched.albumName && formik.errors.albumName && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.albumName}
                  </div>
                )}
              </div>

              <div className="mb-4 flex flex-col items-start">
                <label className="block mb-1">Genre</label>
                <select
                  name="genre"
                  value={formik.values.genre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select</option>
                  <option value="rnb">R & B</option>
                  <option value="country">Country</option>
                  <option value="classic">Classic</option>
                  <option value="rock">Rock</option>
                  <option value="jazz">Jazz</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.gender}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm();
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
            <p>Are you sure you want to delete this song?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSong}
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

export default SongsList;
