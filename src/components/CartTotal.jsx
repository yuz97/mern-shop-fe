import React from 'react'
import { useSelector } from 'react-redux'
import { numberFormat } from '../utils'

export default function CartTotal() {
    const { cartTotal } = useSelector((state) => state.cartState)
    return (
        <div className='card.bg-base-200'>
            <div className="card-body">
                <p className="flex justify-between text-sm pb-2">
                    <span>Total Belanja</span>
                    <span className="font-bold text-accent">{numberFormat(cartTotal)}</span>
                </p>
            </div>
        </div>
    )
}
