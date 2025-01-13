import axios from "axios";
import React, { useState, useEffect } from "react";

const AllTask=() => {
    const [allTasks, setAllTask]=useState([]);

    const fetchTask=async() => {
        try{
            const response=await axios.post('http://localhost:4000/api/user/fetchalltasks', {
                token: localStorage.getItem("token")
            });

            if(response.data.success){
                setAllTask(response.data.data);
                console.log(allTasks);
            }
            else{
                alert(`Failed to fetch all tasks - ${response.data.message}`);
            }
        }
        catch(error){
            alert("Failed to fetch tasks");
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTask();
    }, []);

    return (
        <div className="bg-[#1c1c1c] p-5 rounded mt-5 flex-col overflow-y-auto">
            <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
                <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
                <h3 className='text-lg font-medium w-1/5'>New Task</h3>
                <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
                <h5 className='text-lg font-medium w-1/5'>Completed</h5>
                <h5 className='text-lg font-medium w-1/5'>Failed</h5>
            </div>

            <div id="taskList" className='h-48 overflow-y-auto'>
                {allTasks.map((task) => (
                    <div key={task._id} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
                        <h2 className='text-lg font-medium w-1/5 text-white'>{task.taskTitle}</h2>
                        <h3 className='text-lg font-medium w-1/5 text-blue-400'>{task.newTask.toString()}</h3>
                        <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{task.active.toString()}</h5>
                        <h5 className='text-lg font-medium w-1/5 text-white'>{task.completed.toString()}</h5>
                        <h5 className='text-lg font-medium w-1/5 text-red-600'>{task.failed.toString()}</h5>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllTask;