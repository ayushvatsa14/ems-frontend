import React from "react";
import { useState } from "react";
import Header from "../Utility/Header";
import TasksOverview from "../Utility/TasksOverview";
import TaskList from "../Tasklist/TaskList";

const EmployeeDashboard=() => {
    return (
        <div className="p-10 bg-[#1C1C1C] h-screen">
            <Header />
            <TasksOverview />
            <TaskList />
        </div>
    )
}

export default EmployeeDashboard;