import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MovieDetails from "./pages/MovieDetails";
import AddEditMovie from "./pages/AddEditMovie";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-700">
        <Navbar />
        <ToastContainer />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/add" element={<PrivateRoute><AddEditMovie /></PrivateRoute>} />
            <Route path="/edit/:id" element={<PrivateRoute><AddEditMovie /></PrivateRoute>} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

