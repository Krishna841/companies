'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.access);
            router.push('/home');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
            <h2 className='text-2xl font-bold mb-6'>Login</h2>
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-80'>
                <div className='mb-4'>
                    <label className='block text-gray-700 mb-2'>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className='w-full px-3 py-2 border rounded'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 mb-2'>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='w-full px-3 py-2 border rounded'
                    />
                </div>
                <button 
                    type="submit" 
                    className='w-full bg-[#575cee] text-white py-2 rounded'
                >
                    Login
                </button>
            </form>
        </div>
    );
}
