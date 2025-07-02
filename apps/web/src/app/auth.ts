import { axiosInstance } from '@/lib/Axios'
import { cookies } from 'next/headers'

export const auth = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('jwt')?.value // or your cookie name

    if (!token) return null

    const data = await fetch(`${process.env.NEXT_BACKEND_URL}/auth/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Cookie: `jwt=${token}`
        }
    });

    if (!data.ok) {
        throw new Error('Network response was not ok');
    }

    return data.json();
}


export const logout = async () => {
    const response = await axiosInstance.post('/auth/logout')
    return response.data
}