import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in");
      navigate("/");
    } catch {
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-netflix-background text-white bg-white dark:bg-gray-900 text-black dark:text-white ">
      <form onSubmit={handleSubmit} className="bg-zinc-100 dark:bg-black p-6 rounded border dark:border-none shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-netflix-red">Login</h2>
        <input type="text" name="username" placeholder="Username" className="w-full p-2 mb-3 bg-gray-800 text-white border rounded" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-3 bg-gray-800 text-white border rounded" onChange={handleChange} />
        <button type="submit" className="w-full bg-netflix-red py-2 rounded hover:opacity-90">Login</button>
      </form>
    </div>
  );
}
