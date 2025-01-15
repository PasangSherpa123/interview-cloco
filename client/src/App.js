import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Dashboard from "./Pages/Dashboard";
import "./index.css";
import AuthProtectedRoute from "./Helpers/AuthProtectedRoute";
import Logout from "./Pages/Logout";
import Register from "./Pages/Register";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/*"
            element={
              <AuthProtectedRoute>
                <Dashboard />
              </AuthProtectedRoute>
            }
          />
          I
        </Routes>
      </Router>
      {/* <Dashboard/> */}
    </div>
  );
}

export default App;
