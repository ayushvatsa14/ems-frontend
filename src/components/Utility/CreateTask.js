import axios from "axios";
import { React, useState } from "react";

const CreateTask=() => {
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [assignTo, setAssignTo] = useState('')
    const [category, setCategory] = useState('')

    const submitHandler=async(e) => {
        e.preventDefault();

        try{
            const response=await axios.post('http://localhost:4000/api/user/addnewtask', {
                active: false,
                newTask: true,
                completed: false,
                failed: false,
                taskTitle,
                taskDescription,
                taskDate,
                category,
                assignTo,
                token: localStorage.getItem("token")
            });

            alert(response.data.message || "Task created successfully");
            setTaskTitle("");
            setCategory("");
            setAssignTo("");
            setTaskDate("");
            setTaskDescription("");
        }
        catch(error){
            alert("Failed to create task");
            console.log(error);
        }
    }

    return (
        <div className="p-5 bg-[#1c1c1c] mt-5 rounded">
            <form className='flex flex-wrap w-full items-start justify-between' onSubmit={(e) => submitHandler(e)}>
                <div className="w-1/2">
                    <div>
                        <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
                        <input
                            className='text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                            value={taskTitle}
                            onChange={(e) => {
                                setTaskTitle(e.target.value)
                            }}
                            type="text" placeholder='Make a UI design'
                        />
                    </div>

                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                        <input
                            className='text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                            value={taskDate}
                            onChange={(e) => {
                                setTaskDate(e.target.value)
                            }}
                            type="date" placeholder='dd-mm-yyyy' />
                    </div>

                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Asign to</h3>
                        <input
                            className='text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                            value={assignTo}
                            onChange={(e) => {
                                setAssignTo(e.target.value)
                            }}
                            type="text" placeholder='employee name' />
                    </div>

                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                        <input
                            className='text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
                            type="text" placeholder='design, dev, etc' />
                    </div>
                </div>

                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                    <textarea value={taskDescription}
                        className='w-full text-white h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400'
                        onChange={(e) => {
                            setTaskDescription(e.target.value)
                        }} 
                        name="" id=""></textarea>
                    <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full'>Create Task</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask;