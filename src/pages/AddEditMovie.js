import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function AddEditMovie() {
  const [form, setForm] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    rating: "",
    description: "",
    image: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      api.get(`/movies/search/${id}`).then((res) => {
        const movie = res.data;
        setForm({
          title: movie.title,
          genre: movie.genre,
          releaseYear: movie.releaseYear,
          director: movie.director,
          cast: movie.cast.join(", "),
          rating: movie.rating,
          description: movie.description,
          image: null, // Do not preload image
        });
      });
    }
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) =>
    setForm({ ...form, image: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("genre", form.genre);
    formData.append("releaseYear", form.releaseYear);
    formData.append("director", form.director);
    formData.append("cast", form.cast); // still comma-separated string
    formData.append("rating", form.rating);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);

    try {
      if (isEditing) {
        await api.put(`/movies/update/${id}`, formData);
        toast.success("Movie updated successfully");
      } else {
        await api.post("/movies/create", formData);
        toast.success("Movie created successfully");
      }
      navigate("/");
    } catch (err) {
      toast.error("Failed to save movie");
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 bg-white dark:bg-gray-900 p-6 shadow rounded text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">{isEditing ? "Edit" : "Add"} Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          placeholder="Title"
          className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-800"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="genre"
          placeholder="Genre"
          className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-800"
          value={form.genre}
          onChange={handleChange}
        />

        <input
          name="releaseYear"
          type="number"
          placeholder="Release Year"
          className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-800"
          value={form.releaseYear}
          onChange={handleChange}
        />

        <input
          name="director"
          placeholder="Director"
          className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-800"
          value={form.director}
          onChange={handleChange}
        />

        <input
          name="cast"
          placeholder="Cast (comma-separated)"
          className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-800"
          value={form.cast}
          onChange={handleChange}
        />

        <input
          name="rating"
          type="number"
          placeholder="Rating (0–10)"
          min="0"
          max="10"
          className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-800"
          value={form.rating}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-800"
          rows="3"
          value={form.description}
          onChange={handleChange}
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-black dark:text-white"
        />

        {form.image && (
          <img
            src={URL.createObjectURL(form.image)}
            className="mt-4 w-full h-64 object-cover rounded shadow"
            alt="preview"
          />
        )}

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">
          {isEditing ? "Update" : "Add"} Movie
        </button>
      </form>
    </div>
  );
}
