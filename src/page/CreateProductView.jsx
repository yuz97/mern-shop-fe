import React from 'react'
import FormSelect from '../components/Form/FormSelect'
import FormInput from '../components/Form/FormInput'
import FormTextArea from '../components/Form/FormTextArea'
import { useNavigate, redirect } from 'react-router-dom'
import { Api } from '../api'

export const loader = (store) => async () => {
    const { user } = store.getState().userState()
    if (!user) {
        toast.error("anda harus login terlebih dahulu")
        return redirect('/login')
    }

    if (user.role != role) {
        toast.error("oops anda tidak bisa mengakses halaman ini")
        return redirect('/')
    }

    return null
}

export default function CreateProductView() {
    const categories = ["sepatu", "celana", "kemeja", "kaos"]
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const dataForm = new FormData(form)

        const data = Object.fromEntries(dataForm)

        try {
            // upload file 
            const responseFileUpload = await Api.post('/products/file-upload', {
                image: data.image
            }, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            })

            //create product

            await Api.post('/products', {
                name: data.name,
                price: data.price,
                description: data.description,
                stock: data.stock,
                category: data.category,
                image: responseFileUpload.data.url,
            })
            navigate('/products')
        } catch (error) {
            const errMessage = error?.response?.data?.message;
        }
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data'>
            <label className="form-control">
                <label className="label">
                    <span className="label-text capitalize">image</span>
                </label>
                <input type="file" name="image" className='file-input file-input-bordered file-input-primary w-full' />
            </label>
            <FormSelect name="category" label="pilih kategori" lists={categories} />
            <FormInput name="name" label="nama produk" type="text" />
            <FormInput name="price" label="harga produk" type="number" />
            <FormInput name="stock" label="stok produk" type="number" />
            <FormTextArea name="description" label="deskripsi produk" />
            <input type="submit" value="Tambah" className='btn btn-primary btn-block mt-5 btn-md' />
        </form>
    )
}
