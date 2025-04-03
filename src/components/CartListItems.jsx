import React from 'react'
import { genSelectAmount, numberFormat } from '../utils'
import { FaTrash } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { editItem, removeItem } from '../features/cartSlice'

export default function CartListItems(props) {
    const { cartItem } = props
    const { cartId, name, price, image, amount, stock } = cartItem

    const dispatch = useDispatch()
    const handleAmount = (e) => {
        e.preventDefault()
        dispatch(editItem({ cartId, amount: parseInt(e.target.value) }))
    }

    const handleRemoveItem = () => {
        dispatch(removeItem({ cartId }))
    }

    return (
        <article className='mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-200 pb-6 last:border-b-0' key={cartId}>
            <img src={image} alt={name} className='h-24 w-24 rounded-lg sm:w-32 sm:h-32 object-cover' />
            <div className="sm:ml-16 sm:w-48">
                <h2>{name}</h2>
                <span className="font-bold">jumlah {amount} produk</span>
            </div>
            <p className="font-bold sm:ml-auto">{numberFormat(price)}</p>
            <div className="sm:ml-12">
                <div className="form-control max-w-xs">
                    <select name='amount' className='select  select-bordered sm:w-full' value={amount} onChange={(e) => handleAmount(e)
                    }>{genSelectAmount(stock)}</select>
                </div>
                <button onClick={() => handleRemoveItem()} className="mt-2 btn-secondary btn btn-block flex justify-center">
                    <FaTrash />
                </button>
            </div>
        </article>
    )
}
