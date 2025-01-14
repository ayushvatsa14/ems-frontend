import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MarkCompleted from "./MarkCompleted";
import MarkFailed from "./MarkFailed";
import AcceptTask from "./AcceptTask";

const TaskList=() => {
    const tasks=useSelector(state => state.user.user.tasks);
    const employeeId=useSelector(state => state.user.user);
    console.log(employeeId);

    const getRandomBackgroundColor=() => {
        const colors=['bg-red-400', 'bg-green-400', 'bg-yellow-400', 'bg-blue-400'];
        const randomIndex=Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    return (
        <div id="taskList" className="h-[50%] mt-16 py-1 flex justify-start items-center gap-5 overflow-x-auto">
            {tasks.map((task) => {
                return <div key={task._id} className={`flex-shrink-0 h-full w-[400px] p-5 ${getRandomBackgroundColor()} rounded-xl text-white`}>
                    <div className="flex justify-between items-center">
                        <h3 className="bg-red-600 text-sm px-3 py-1 rounded">{task.category}</h3>
                        <h4 className="text-sm">{new Date(task.taskDate).toLocaleDateString()}</h4>
                    </div>
    
                    <h2 className="mt-5 text-2xl font-semibold">{task.taskTitle}</h2>
                    <p>{task.taskDescription}</p>
                    {
                        task.active && <div className="mt-4 flex justify-evenly">
                            <MarkCompleted empId={employeeId._id} taskId={task._id} />
                            <MarkFailed empId={employeeId._id} taskId={task._id} />
                        </div>
                    }
                    {
                        !task.active && !task.completed && !task.failed && < AcceptTask empId={employeeId._id} taskId={task._id} />
                    }
                    {
                        task.completed && <div className="mt-4 mx-auto py-2 px-2 w-fit rounded bg-green-500">Completed</div>
                    }
                    {
                        task.failed && <div className="mt-4 mx-auto py-2 px-7 w-fit rounded bg-red-600">Failed</div>
                    }     
                </div>
})}
        </div>
    )
}

export default TaskList;