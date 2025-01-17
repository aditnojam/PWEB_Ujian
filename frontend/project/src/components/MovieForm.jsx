import React, { useState, useEffect } from "react";

function MovieForm({ onAdd, onEdit, editData, clearEdit }) {
  const [formData, setFormData] = useState({
    title: "",
    episode_or_season: "",
    genre: "",
    last_watched: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      // Set the default value for last_watched to today's date if no editData
      setFormData((prevData) => ({
        ...prevData,
        last_watched: new Date().toISOString().split("T")[0], // Format the date as YYYY-MM-DD
      }));
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      onEdit(formData);
    } else {
      onAdd(formData);
    }
    setFormData({ title: "", episode_or_season: "", genre: "", last_watched: "" });
    clearEdit(); // Reset the edit mode after submitting
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        {editData ? "Edit" : "Tambah"}
      </h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">Judul</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Masukkan judul"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        <div>
          <label htmlFor="episode_or_season" className="block text-gray-700 text-sm font-medium mb-2">Episode/Season</label>
          <input
            type="text"
            name="episode_or_season"
            value={formData.episode_or_season}
            onChange={handleChange}
            placeholder="Masukkan episode atau season"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        <div>
          <label htmlFor="genre" className="block text-gray-700 text-sm font-medium mb-2">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Masukkan genre"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        <div>
          <label htmlFor="last_watched" className="block text-gray-700 text-sm font-medium mb-2">Terakhir Ditonton</label>
          <input
            type="date"
            name="last_watched"
            value={formData.last_watched}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="w-1/3 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
        >
          {editData ? "Simpan Perubahan" : "Tambah Tontonan"}
        </button>
        {editData && (
          <button
            type="button"
            onClick={clearEdit}
            className="ml-4 w-1/3 py-3 bg-gray-500 text-white text-lg font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

export default MovieForm;
