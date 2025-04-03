import React from 'react'
import { Api } from '../api'
import { Link, useLoaderData } from 'react-router-dom'
import Filter from '../components/Filter'
import CardComponent from '../components/CardComponent'
import Pagination from '../components/Pagination'
import { useSelector } from 'react-redux'

export const loader = async ({ request }) => {
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
    const { data } = await Api.get("/products", { params: params })

    const products = data.data

    //pagination
    const pagination = data.pagination
    return { products, params, pagination }
}


export default function ProductView() {
    const { products, pagination } = useLoaderData()
    const { user } = useSelector((state) => state.userState)


    return (
        <>
            <Filter />
            {user && user.role == "owner" &&
                <div className="flex justify-end">
                    <Link to={'/product/create'} className='btn btn-secondary mt-5'>
                        Tambah produk
                    </Link>
                </div>
            }

            <h3 className="text-lg text-primary font-bold text-right my-3">Total :{pagination.totalProduct}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-10">
                {
                    products.length != 0 || products.length != "" ?
                        products.map((product) => (
                            <div key={product._id}>
                                <CardComponent id={product._id} name={product.name} image={product.image} price={product.price} user={user} />
                            </div>
                        )) : <h1 className='text-3xl font-bold mt-5'>Produk tidak ditemukan</h1>
                }
            </div>
            <div className='mt-5 flex justify-center'>
                <Pagination />
            </div>
        </>
    )
}
