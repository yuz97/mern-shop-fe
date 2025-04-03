import React from 'react'
import { Link } from 'react-router-dom'
import { numberFormat } from '../utils'
import { FaTrash, FaPencil } from 'react-icons/fa6'
import { Api } from '../api'
import { useRevalidator } from 'react-router-dom'

export default function CardComponent(props) {
    const { id, name, price, description = "", image, user } = props
    const { revalidate } = useRevalidator()

    return (
        <div className="card bg-base-100  shadow-xl">
            {image ? <figure>
                <img
                    src={image}
                    alt={name} />
            </figure> : ""}

            <div className="card-body">
                {user && user.role === "owner"
                    &&
                    <div className="flex jusitfy-end gap-x-3">
                        <FaTrash onClick={async () => { await Api.delete(`/products/${id}`); revalidate() }} className='text-red-500 cursor-pointer' />
                        <Link to={`/product/${id}/edit`}>
                            <FaPencil className='text-yellow-500 cursor-pointer' />
                        </Link>
                    </div>
                }

                <h2 className="card-title">{name}</h2>
                <p className="font-bold text-accent">{numberFormat(price)}</p>
                {/* <p>{description.substring(0, 30) + "..."}</p> */}
                <div className="card-actions justify-end">
                    <Link to={`/product/${id}`} className="btn btn-primary">Buy Now</Link>
                </div>
            </div>
        </div>
    )
}
