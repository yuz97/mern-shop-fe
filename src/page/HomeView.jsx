// import React, { useEffect, useState } from "react";
import { Api } from "../api";
import CardComponent from "../components/CardComponent";
import { useLoaderData } from "react-router-dom";
import Hero from "../components/Hero";


export const loader = async ({ request }) => {
    const { data } = await Api.get("/products?limit=3")
    const products = data.data
    return { products }

}

const Home = () => {
    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     getProducts()

    // }, []);

    // const getProducts = async () => {
    //     try {
    //         const { data } = await Api.get("/products");
    //         setProducts(data.data);
    //     } catch (error) {
    //         console.error("Error fetching products:", error);
    //     }
    // };

    const { products } = useLoaderData()

    return (
        <>
            <Hero />
            <div className="border-b border-primary pb-5 mt-5">
                <h1 className="text-2xl font-bold capitalize">
                    product list
                </h1>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
                {
                    products.map((product) => (
                        <div key={product._id}>
                            <CardComponent id={product._id} name={product.name} image={product.image} price={product.price} />
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default Home;
