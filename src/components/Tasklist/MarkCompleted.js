import axios from "axios";
import {toast} from 'react-toastify';
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";

const MarkCompleted=({empId, taskId}) => {
    const dispatch=useDispatch();

    const markCompleted=async() => {
        try {
            const response=await axios.post('http://localhost:4000/api/user/markcompleted', {
                employee_id: empId,
                task_id: taskId,
                token: localStorage.getItem("token")
            });
    
            if(response.data.success){
                dispatch(setUser(response.data.data));
                
                toast.success("Task Completed", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else{
                alert(`Error: ${response.data.message}`);
            }
        }
        catch(error){
            console.error(error.message);
            alert('Failed to mark the task as completed');
        }
    }

    return (
        <button className="py-2 px-2 w-fit rounded bg-green-500" onClick={markCompleted}>Mark Completed</button>
    );
}

export default MarkCompleted;