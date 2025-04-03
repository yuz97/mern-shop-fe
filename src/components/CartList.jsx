import React from 'react'
import { useSelector } from 'react-redux'
import CartListItems from './CartListItems'

export default function CartList() {
    const cartItems = useSelector((state) => state.cartState.cartItems)

    return (
        <>
            {cartItems?.map((item) => (
                <CartListItems cartItem={item} key={item.cartId} />
            ))}
        </>
    )
}
