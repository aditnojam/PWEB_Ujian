const API_URL = "http://localhost:8000";

export async function fetchMovies() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function addMovie(movie) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  return response.json();
}

export async function editMovie(movie) {
  const response = await fetch(`${API_URL}/${movie.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  return response.json();
}

export async function deleteMovie(id) {
  const response = await fetch(API_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete movie");
  }
}
