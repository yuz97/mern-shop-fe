import { useParams } from "react-router-dom"
import { Api } from '../api'
import { useEffect, useState } from "react"
import { FaPlus } from 'react-icons/fa'
import { genSelectAmount, numberFormat } from "../utils"
import { useDispatch } from 'react-redux'
import { addItem } from "../features/cartSlice"
import { toast, Toaster } from "react-hot-toast";


const DetailProduct = () => {
    let { id } = useParams()
    const [product, setProduct] = useState([])
    const [amount, setAmount] = useState(1)

    useEffect(() => {
        const productData = async () => {
            const { data } = await Api.get(`/products/${id}`);
            setProduct(data.data)

        }

        productData()
    }, [])

    // store 
    const dispatch = useDispatch()

    const handleAmount = (e) => {
        setAmount(parseInt(e.target.value))
    }

    const productCart = {
        cartId: product._id + product.name,
        productId: product._id,
        image: product.image,
        name: product.name,
        price: product.price,
        stock: product.stock,
        amount
    }

    const handleCart = () => {
        dispatch(addItem({ product: productCart }))
        toast.success("product berhasil ditambahkan");

    }


    return (
        <> <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure>
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name} className="object-cover" />
                    {product.stock < 1 && <span className="absolute top-0 right-0 bg-error font-bold text-4xl">Sold Out</span>}
                </div>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <span className="text-3xl text-accent font-bold">{numberFormat(product.price)}</span>
                <span className="badge badge-primary">{product.category}</span>
                <span className="mt-3 font-bold">stock : {product.stock}</span>
                <p>{product.description}</p>
                {product.stock > 0 &&
                    <div className="card-actions justify-end">
                        <div className="p-8 flex flex-col">
                            <label className="form-control">
                                <label className="label">
                                    <span className="captialize label-text">Amount</span>
                                </label>
                                <select name="amount" className="select select-bordered" onChange={(e) => handleAmount(e)}>{genSelectAmount(product.stock)}</select>
                            </label>
                            <button className="btn btn-primary mt-5" onClick={() => handleCart()}><FaPlus /> keranjang</button>
                        </div>
                    </div>
                }
            </div>
        </div>
            <Toaster position="top-center" />
        </>
    )
}

export default DetailProduct