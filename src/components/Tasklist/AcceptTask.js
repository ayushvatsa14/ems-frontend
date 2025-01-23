import axios from "axios";
import {toast} from 'react-toastify';
import { useDispatch} from "react-redux";
import { setUser } from "../../features/userSlice";

const AcceptTask=({empId, taskId}) => {
    const dispatch=useDispatch();

    const acceptTask=async() => {
        try {
            const response=await axios.post('http://localhost:4000/api/user/acceptTask', {
                employee_id: empId,
                task_id: taskId,
                token: localStorage.getItem("token")
            });
    
            if(response.data.success) {
                dispatch(setUser(response.data.data));

                toast.success("Task Accepted", {
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
            alert('Failed to mark the task as accepted');
        }
    }

    return (
        <div className="mt-4 w-full flex justify-center">
            <button className="py-2 px-7 rounded bg-green-500" onClick={acceptTask}>Accept Task</button>
        </div>
    );
}

export default AcceptTask;