import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import VentDetails from "./pages/VentDetails";
import CreateVent from "./pages/CreateVent";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>}
        />
        <Route path="/vents/:id" element={<VentDetails />} />
        <Route path="/create" element={
            <ProtectedRoute>
              <CreateVent />
            </ProtectedRoute>}
        />
      </Routes>
    </MainLayout>
  );
}

export default App;