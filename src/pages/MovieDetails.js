import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/movies/search/${id}`)
      .then((res) => setMovie(res.data))
      .catch(() => toast.error("Failed to load movie"));
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/movies/delete/${id}`);
      toast.success("Movie deleted");
      navigate("/");
    } catch {
      toast.error("Failed to delete movie");
    }
  };

  if (!movie) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto my-10 rounded overflow-hidden border 
                    bg-white dark:bg-[#1e1e1e] border-gray-300 dark:border-netflix-red 
                    shadow-md dark:shadow-[0_0_20px_rgba(229,9,20,0.2)] 
                    transition duration-300 max-h-[80vh]">
      <div className="grid md:grid-cols-2 h-full">
        {/* Left: Poster */}
        <div className="h-full">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Movie Info & Actions */}
        <div className="max-h-[80vh] flex flex-col justify-between">
          <div className="p-6 space-y-4 overflow-y-auto">
            <h2 className="text-3xl font-bold text-netflix-red mb-2 capitalize">
              {movie.title}
            </h2>

            <p className="text-sm text-black dark:text-white">
              <span className="font-semibold text-gray-500 dark:text-gray-400">Genre:</span> {movie.genre}
            </p>
            <p className="text-sm text-black dark:text-white">
              <span className="font-semibold text-gray-500 dark:text-gray-400">Year:</span> {movie.releaseYear}
            </p>
            <p className="text-sm text-black dark:text-white">
              <span className="font-semibold text-gray-500 dark:text-gray-400">Director:</span> {movie.director}
            </p>
            <p className="text-sm text-yellow-400 font-semibold">⭐ {movie.rating}/10</p>

            <div className="text-sm mt-3 text-black dark:text-white">
              <p className="font-semibold mb-1">Cast:</p>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-netflix-red text-white text-xs rounded-full"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {movie.description}
            </p>
          </div>

          {/* Buttons: Always visible */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
            <Link
              to={`/edit/${movie._id}`}
              className="w-full sm:w-auto text-center px-6 py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-400 hover:scale-105 transition"
            >
              ✏️ Edit
            </Link>
            <button
              onClick={handleDelete}
              className="w-full sm:w-auto text-center px-6 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-500 hover:scale-105 transition"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
