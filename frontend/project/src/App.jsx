import React, { useState, useEffect } from "react";
import { fetchMovies, addMovie, deleteMovie, editMovie } from "./api";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/List";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for Modal visibility

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await fetchMovies();
    setMovies(data);
  };

  const handleAddMovie = async (movie) => {
    await addMovie(movie);
    loadMovies();
    setIsModalOpen(false); // Close modal after adding a movie
  };

  const handleEditMovie = async (movie) => {
    await editMovie(movie);
    loadMovies();
    setEditData(null);
    setIsModalOpen(false); // Close modal after editing
  };

  const handleDeleteMovie = async (id) => {
    await deleteMovie(id);
    loadMovies();
  };

  const handleEditClick = (movie) => {
    setEditData(movie);
    setIsModalOpen(true); // Open modal on edit
  };

  const clearEdit = () => {
    setEditData(null);
    setIsModalOpen(false); // Close modal on cancel or save
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-black mb-10">
          My Watch List
        </h1>

        {/* Button to open the modal */}
        <div className="text-center mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white py-3 px-6 rounded-full hover:bg-indigo-700 focus:outline-none"
          >
            Tambah Tontonan Baru
          </button>
        </div>

        {/* MovieForm Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
              <MovieForm
                onAdd={handleAddMovie}
                onEdit={handleEditMovie}
                editData={editData}
                clearEdit={clearEdit}
              />
              <button
                onClick={clearEdit} // Cancel and close the modal
                className="absolute top-2 left-2 bg-red-400 text-white rounded-full p-2"
              >
                X
              </button>
            </div>
          </div>
        )}

        {/* Movie List */}
        <div className="mt-10 bg-white shadow-lg rounded-lg p-6">
          <MovieList
            movies={movies}
            onDelete={handleDeleteMovie}
            onEdit={handleEditClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
