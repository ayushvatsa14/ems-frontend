import React, { useEffect, useState } from "react";
import '../../App.css';
import { useSelector } from "react-redux";

const TasksOverview=() => {
    const [taskOverView, setTaskOverView]=useState({});
    const taskCounts=useSelector(state => state.user.user.taskCounts);

    useEffect(() => {
        setTaskOverView(taskCounts);
    }, [taskCounts]);

    return (
        <div className="mt-10 flex justify-between gap-5 screen">
            <div className="bg-red-400 text-white rounded-xl w-[45%] py-6 px-9">
                <div className="text-3xl font-bold">{taskOverView.newTask}</div>
                <div className="text-xl mt-0.5 font-medium">New Task</div>
            </div>

            <div className="bg-blue-400 text-white rounded-xl w-[45%] py-6 px-9">
                <div className="text-3xl font-bold">{taskOverView.completed}</div>
                <div className="text-xl mt-0.5 font-medium">Completed Task</div>
            </div>

            <div className="bg-green-400 text-white rounded-xl w-[45%] py-6 px-9">
                <div className="text-3xl font-bold">{taskOverView.active}</div>
                <div className="text-xl mt-0.5 font-medium">Accepted Task</div>
            </div>

            <div className="bg-yellow-400 text-white rounded-xl w-[45%] py-6 px-9">
                <div className="text-3xl font-bold">{taskOverView.failed}</div>
                <div className="text-xl mt-0.5 font-medium">Failed Task</div>
            </div>
        </div>
    )
}

export default TasksOverview;