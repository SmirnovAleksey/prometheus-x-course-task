import './layout.css';
import { Header } from '../header/Header'
import { Footer } from '../footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { useEffect } from 'react';


const ProtectedRoutes = () => {


    const navigate = useNavigate();

    const user = localStorage.getItem('user')

    useEffect(() => {
        const currenUser = JSON.parse(user)
        currenUser?.isAuthorized ? <Outlet /> : navigate('/sign-in')
    }, [user])

}

export const Layout = () => {


    return (
        <>
            <Header />
            <main className='main'>
                <div className='background'></div>
                <div className='main-container'>

                    <ProtectedRoutes />
                    <Outlet />

                </div>

            </main>
            <Footer />
        </>
    )
}
