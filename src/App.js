import Login from "./components/Auth/Login";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUser, clearUser } from "./features/userSlice";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const loggedInUser=useSelector((state) => state.user.user);
  const dispatch=useDispatch();

  const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    } catch (error) {
        return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUser=async() => {
        try{
            const decodedToken = jwtDecode(token);
            const email=decodedToken.email;
            const response = await axios.post('http://localhost:4000/api/user/getuser', { email });

            if(response.data.success) {
                dispatch(setUser({ ...response.data.data, token }));
            }
            else{
                localStorage.removeItem("token");
                dispatch(clearUser());
            }
        }
        catch(error){
            console.error("Failed to fetch user details", error);
            localStorage.removeItem("token");
            dispatch(clearUser());
        }
    };

    if(token && isTokenValid()) {
        fetchUser();
    }
    else{
        dispatch(clearUser());
    }
}, [dispatch]);


  return (
    <div className="">
      {loggedInUser===null || !isTokenValid() ? <Login /> : loggedInUser.role==='admin' ? <AdminDashboard /> : <EmployeeDashboard />}
    </div>
  );
}

export default App;
