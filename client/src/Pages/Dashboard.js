import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Sidebar from "../Components/Sidebar.js";
import UserList from "../Components/UserList";
import ArtistList from "../Components/ArtistList";

const Dashboard = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/users" element={<UserList />} />
            <Route path="/artists" element={<ArtistList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
