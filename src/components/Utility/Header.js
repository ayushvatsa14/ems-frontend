import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../features/userSlice";

const Header=() => {
    const dispatch=useDispatch();
    const handleLogOut=() => {
        localStorage.removeItem("token");
        dispatch(clearUser());
    }
    return (
        <div className="bg- h-10 flex justify-between items-end">
            <div className="text-white text-xl">Hello <br /> <span className="text-2xl font-semibold">{useSelector((state) => state.user.user.name)}👋</span></div>
            <button className="text-white font-medium bg-red-500 hover:bg-red-600 rounded-sm px-5 py-2" onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default Header;