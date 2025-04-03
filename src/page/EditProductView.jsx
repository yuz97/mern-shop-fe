import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Api } from '../api'
import Loading from '../components/Loading'
import FormSelect from '../components/Form/FormSelect'
import FormInput from '../components/Form/FormInput'
import FormTextArea from '../components/Form/FormTextArea'
import toast, { Toaster } from 'react-hot-toast'

export default function EditProductView() {
    const [product, setProduct] = useState(null)
    const { id } = useParams()
    const categories = ["sepatu", "celana", "kemeja", "kaos"]
    const navigate = useNavigate()

    const getProductId = async () => {
        const { data } = await Api.get(`/products/${id}`)
        setProduct(data.data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target;
        const dataForm = new FormData(form)
        const data = Object.fromEntries(dataForm)

        try {
            await Api.put(`/products/${id}`, {
                name: data.name,
                price: data.price,
                description: data.description,
                stock: data.stock,
                category: data.category,
            })

            toast.success("produk berhasil diupdate")
            navigate('/products')
        } catch (error) {
            const errMessage = error?.response?.data?.message
            toast.error(errMessage)
        }

    }

    useEffect(() => {
        getProductId()
    }, [])



    return (
        <>
            {
                product ?
                    <form onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data'>
                        <FormSelect name="category" defaultValue={product.category} label="pilih kategori" lists={categories} />
                        <FormInput name="name" defaultValue={product.name} label="nama produk" type="text" />
                        <FormInput name="price" defaultValue={product.price} label="harga produk" type="number" />
                        <FormInput name="stock" defaultValue={product.stock} label="stok produk" type="number" />
                        <FormTextArea name="description" defaultValue={product.description} label="deskripsi produk" />
                        <input type="submit" value="Update" className='btn btn-primary btn-block mt-5 btn-md' />
                        <Toaster position='top-center' />
                    </form> : <Loading />
            }
        </>
    )
}
