import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Navlist from './Navlist'
import { BsCart3 } from 'react-icons/bs'
import { FaBarsStaggered } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { Api } from '../api'
import { logoutUser } from '../features/userSlice'
import { clearCartItem } from '../features/cartSlice'

export default function Nav() {
    const user = useSelector((state) => state.userState.user)
    const countIncart = useSelector((state) => state.cartState.numItemsInCart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await Api.post("/auth/logout")
            dispatch(logoutUser())
            dispatch(clearCartItem())
            navigate('/')
        } catch (error) {
            dispatch(logoutUser())
            dispatch(clearCartItem())
            navigate('/')
        }

    }

    return (
        <nav className='bg-base-200'>
            <div className="navbar mx-auto mx-w-3xl px-8">
                <div className="navbar-start">
                    <NavLink to={"/"} className="hidden lg:flex btn btn-primary text-3xl items-center">
                        LOGO
                    </NavLink>
                    {/* PC device  */}
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal">
                            <Navlist />
                        </ul>
                    </div>

                    {/* mobile device  */}
                    <div className="dropdown">
                        <label tabIndex={0} className='btn btn-ghost lg:hidden'>
                            <FaBarsStaggered className='h-6 w-6' />
                        </label>
                        <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 p-2 z-[1] shadow bg-base-200 rounded-box w-52'>
                            <Navlist />
                        </ul>
                    </div>
                </div>
                <div className="navbar-end">
                    <NavLink to={"/cart"} className="btn btn-ghost btn-circle btn-md">
                        <div className='indicator'>
                            <BsCart3 />
                            <span className="badge badge-primary badge-sm indicator-item">{countIncart}</span>
                        </div>
                    </NavLink>

                    {user && <button onClick={() => handleLogout()}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}
