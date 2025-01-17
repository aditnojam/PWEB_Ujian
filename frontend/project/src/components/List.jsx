import React from "react";

function List({ movies, onDelete, onEdit }) {
  return (
    <div className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Daftar Tontonan
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
            <th className="px-6 py-3 text-left">Judul</th>
            <th className="px-6 py-3 text-left">Episode/Season</th>
            <th className="px-6 py-3 text-left">Genre</th>
            <th className="px-6 py-3 text-left">Terakhir Ditonton</th>
            <th className="px-6 py-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr
              key={movie.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-indigo-100 transition-colors`}
            >
              <td className="px-6 py-4">{movie.title}</td>
              <td className="px-6 py-4">{movie.episode_or_season}</td>
              <td className="px-6 py-4">{movie.genre}</td>
              <td className="px-6 py-4">{movie.last_watched}</td>
              <td className="px-6 py-4 flex justify-center space-x-4">
                <button
                  onClick={() => onEdit(movie)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(movie.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
