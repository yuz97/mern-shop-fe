import React from 'react'
import { redirect, useLoaderData } from 'react-router-dom'
import { Api } from '../api'
import { numberFormat } from '../utils'

export const loader = (storage) => async () => {
    const { user } = storage.getState().userState
    if (!user) {
        return redirect('/login')
    }

    const { data } = await Api.get('/order/current')
    const orders = data.data
    return { orders }
}

export default function OrderView() {
    const { orders } = useLoaderData()
    if (!orders || !orders.length) {
        return (
            <h1 className="text-center text-primary font-bold text-3xl border-b border-secondary py-3">Order is empty</h1>
        )
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order By</th>
                            <th>Product</th>
                            <th>Total</th>
                            <th>Status Pembayaran</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item, index) => (
                            <tr key={item._id}>
                                <th> {index + 1}</th>
                                <td>{item.firstName} {item.lastName}</td>
                                <ul className='list-desc'>
                                    {item.cartItem.map(cart => (
                                        <li key={cart.product}>{cart.name} <br />
                                            <span className="font-bold">Jumlah {cart.quantity} produk</span> <br />
                                            {numberFormat(cart.price)}
                                        </li>
                                    ))}
                                </ul>
                                <td>{numberFormat(item.total)}</td>
                                <td>{item.status == "pending" ? <span className='badge badge-info  text-white'>pending</span> : item.status == "success" ? <span className='badge badge-success text-white'>success</span> : <span className='badge badge-error text-white'>failed</span>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}



