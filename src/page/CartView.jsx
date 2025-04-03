import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'

export default function CartView() {
    const user = useSelector((state) => state.userState.user)
    const itemInCart = useSelector((state) => state.cartState.numItemsInCart)

    if (itemInCart == 0) {
        return (
            <>
                <h1 className="text-3xl text-center font-bold">Belum ada produk dikeranjang</h1>
            </>
        )
    }

    return (

        <>
            <div className='pb-5 mt-5'>
                <div className="text-2xl font-bold capitalize">list keranjang</div>
                <div className="mt-8 grid gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-8 ">
                        <CartList />
                    </div>
                    <div className="lg:col-span-4 lg:pl-4">
                        <CartTotal />
                        {user ? <Link to={"/checkout"} className='btn btn-primary btn-block p-4 mt-8'>Checkout</Link> : <Link to={"/login"} className='btn btn-primary btn-block mt-8'>Login</Link>}
                    </div>
                </div>
            </div>
        </>
    )
}
