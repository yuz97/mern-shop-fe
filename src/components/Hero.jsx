import React from 'react'
import { useLoaderData, Link } from 'react-router-dom'

export default function Hero() {
    const { products } = useLoaderData()
    return (
        <>
            <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div>
                    <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
                        Selamat Datang di MernShop
                    </h1>
                    <p className="mt-8 max-w-xl text-lg leading-8">
                        Dimana kalian bisa membeli baju,sepatu,kemeja dll dari Aerostreet.ini bukan official hanya untuk testing development
                    </p>
                    <div className="mt-10">
                        <Link to="/products" className="btn btn-primary">
                            produk kami</Link>
                    </div>
                </div>
                <div className="hidden lg:carousel carousel-center  rounded-box space-x-4 p-4">
                    {products.map((item =>
                        <div key={item._id} className="carousel-item">
                            <img
                                src={item.image}
                                className="rounded-box w-[200px] h-[200px]" />
                        </div>

                    ))}

                </div>
            </div>
        </>
    )
}
