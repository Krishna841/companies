// hooks/useAuth.js
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

export const useAuth = () => {
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const expiryTime = decodedToken.exp * 1000;
            const currentTime = new Date().getTime();

            if (currentTime >= expiryTime) {
                localStorage.removeItem('token');
                router.push('/login');
            } else {
                setToken(token);
                const timeout = expiryTime - currentTime;
                setTimeout(() => {
                    localStorage.removeItem('token');
                    router.push('/login');
                }, timeout);
            }
        } else {
            router.push('/login');
        }
    }, [router]);

    return token;
};
