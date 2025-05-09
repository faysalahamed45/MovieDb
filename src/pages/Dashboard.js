import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    api
      .get("/movies/allmovie")
      .then((res) => {
        setMovies(res.data);
        setFiltered(res.data);
      })
      .catch(() => toast.error("Failed to load movies"));
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();
    const filteredData = movies.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(keyword) ||
        movie.genre.toLowerCase().includes(keyword) ||
        movie.director.toLowerCase().includes(keyword) ||
        movie.releaseYear.toString().includes(keyword) ||
        movie.rating.toString().includes(keyword) ||
        movie.cast.join(" ").toLowerCase().includes(keyword)
      );
    });
    setFiltered(filteredData);
  }, [search, movies]);
  
  return (
    <div className="p-6">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full max-w-xl px-4 py-2 rounded border shadow text-black dark:text-white dark:bg-gray-900 dark:border-gray-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-white">No movies found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((movie) => (
            <div
              key={movie._id}
              className="relative bg-gray-900 text-white rounded overflow-hidden shadow-lg group transition transform hover:scale-105 duration-300"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-48 object-cover group-hover:opacity-30 transition duration-300"
              />
              <div className="p-4 absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-sm">{movie.genre} | {movie.releaseYear}</p>
                <Link
                  to={`/movies/${movie._id}`}
                  className="text-netflix-red text-sm mt-1 inline-block"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
