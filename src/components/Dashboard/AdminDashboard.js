import React from "react";
import Header from "../Utility/Header";
import CreateTask from "../Utility/CreateTask";
import AllTask from "../Utility/AllTask";

const AdminDashboard=() => {
    return (
        <div className="p-10 bg-[#1C1C1C] h-screen w-screen">
            <Header />
            <CreateTask />
            <AllTask />
        </div>
    )
}

export default AdminDashboard;