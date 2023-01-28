import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import Login from "./components/auth/Login";
import Discover from "./components/movies/Discover";
import Alert from "./components/layout/Alert";
import Profile from "./components/profile/Profile";
import Profiles from "./components/profiles/Profiles";
import CreateProfile from "./components/auth/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import GuestDashboard from "./components/layout/GuestDashboard";
import Settings from "./components/settings/Settings";
import MovieDetails from "./components/movies/MovieDetails";

function App() {
  return (
    <div className="App">
      <AlertProvider>
        <AuthProvider>
          <Router>
            <Navbar />
            <div className="container mx-auto">
              <Alert />
              <Routes>
                <Route path="/" element={<GuestDashboard />} />
                <Route path="/account/dashboard" element={<Landing />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/create-profile" element={<CreateProfile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/settings" element={<Settings/>} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </AlertProvider>
    </div>
  );
}

export default App;
