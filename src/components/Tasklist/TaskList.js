import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MarkCompleted from "./MarkCompleted";
import MarkFailed from "./MarkFailed";
import AcceptTask from "./AcceptTask";

const TaskList=() => {
    const [employeetasks, setemployeeTasks]=useState([]);
    const tasks=useSelector(state => state.user.user.tasks);
    const employeeId=useSelector(state => state.user.user._id);
    console.log(1);
    console.log(employeetasks);

    const getRandomBackgroundColor=() => {
        const colors=['bg-red-400', 'bg-green-400', 'bg-yellow-400', 'bg-blue-400'];
        const randomIndex=Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const updateEmployeeTasks=(newTasks) => {
        setemployeeTasks(newTasks);
    };

    useEffect(() => {
        setemployeeTasks(tasks);
        console.log(2);
        console.log(employeetasks);
    }, [employeetasks, tasks]);

    return (
        <div id="taskList" className="h-[50%] mt-16 py-1 flex justify-start items-center gap-5 overflow-x-auto">
            {employeetasks.map((task) => (
                <div key={task._id} className={`flex-shrink-0 h-full w-[400px] p-5 ${getRandomBackgroundColor()} rounded-xl text-white`}>
                    <div className="flex justify-between items-center">
                        <h3 className="bg-red-600 text-sm px-3 py-1 rounded">{task.category}</h3>
                        <h4 className="text-sm">{new Date(task.taskDate).toLocaleDateString()}</h4>
                    </div>
    
                    <h2 className="mt-5 text-2xl font-semibold">{task.taskTitle}</h2>
                    <p>{task.taskDescription}</p>

                    {task.active ? (
                        <div>
                            <MarkCompleted empId={employeeId} taskId={task._id} setemployeeTasks={updateEmployeeTasks} />
                            <MarkFailed empId={employeeId} taskId={task._id} setemployeeTasks={updateEmployeeTasks} />
                        </div>) : (
                        task.completed ? (<div>Completed</div>) :  
                            task.failed ? (<div>failed</div>) :
                            (<AcceptTask empId={employeeId} taskId={task._id} setemployeeTasks={updateEmployeeTasks} />)
                        )
                    }
                </div>
            ))}
        </div>
    )
}

export default TaskList;