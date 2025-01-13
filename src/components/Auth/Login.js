import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/user/login', {
                email,
                password
            });

            if(response.data.success) {
                localStorage.setItem('token', response.data.data.token);
                dispatch(setUser(response.data.data));
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error(error.message);
            alert('Failed to log in. Please try again.');
        }

        setEmail('');
        setPassword('');
    };

    return (
        <div className='bg-black text-white flex h-screen w-screen items-center justify-center'>
            <div className='border-2 rounded-xl border-emerald-600 p-20'>
                <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col items-center justify-center'>
                    <input
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400'
                        placeholder="Enter email"
                    />

                    <input
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400'
                        placeholder="Enter password"
                    />
                    <button
                        className='mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full'
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;