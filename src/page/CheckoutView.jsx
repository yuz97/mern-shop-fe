import React from 'react'
import CartTotal from '../components/CartTotal'
import FormInput from '../components/Form/FormInput'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Api } from '../api'
import { clearCartItem } from '../features/cartSlice'
import { redirect, useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'

const snapScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        // script.src = "https://app.stg.midtrans.com/snap/snap.js"
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js"
        script.setAttribute("data-client-key", import.meta.env.VITE_CLIENT_MIDTRANS)
        script.onload = () => resolve()
        document.body.appendChild(script)
    })
}

export const loader = (storage) => () => {
    //tidak dapat menggunakan state langsung didalam loader sehingga harus manual
    const user = storage.getState().userState.user

    if (!user) {
        toast.error("login untuk akses halaman ini")
        return redirect('/login')
    }
    return null
}


export default function CheckoutView() {
    const user = useSelector(state => state.userState.user)
    const carts = useSelector(state => state.cartState.cartItems)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        snapScript()
    }, [])

    const handleCheckout = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        const newArrCart = carts.map(item => {
            return {
                product: item.productId,
                quantity: item.amount
            }
        })


        try {
            const response = await Api.post("/order", {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                cartItem: newArrCart
            })

            const snapToken = response.data.token
            window.snap.pay(snapToken.token, {
                onSuccess: function (result) {
                    dispatch(clearCartItem())
                    navigate("/order")
                },
                onPending: function (result) {
                    console.log(result);

                },
                onError: function (result) {
                    console.log(result);

                }
            })

            toast.success("midtrans berhasil")

        } catch (error) {
            const errMessage = error?.response?.data?.message
            toast.error(errMessage)
        }


    }

    return (
        <>
            <div className="border-b border-primary pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">checkout product</h2>
            </div>
            <div className="mt-8 grid gap-y-8 gap-x-2 lg:grid-cols-12">
                {/* form  */}
                <div className="lg:col-span-8">
                    <form onSubmit={(e) => handleCheckout(e)} method='POST' className='bg-base-200 rounded-2xl grid grid-y-5 p-5 items-center'>
                        <div className="grid grid-cols-2 gap-x-4">
                            <FormInput label="first name" name="firstName" type="text" />
                            <FormInput label="last name" name="lastName" type="text" />
                        </div>
                        <FormInput label="email" name="email" type="email" defaultValue={user.email} />
                        <FormInput label="phone" name="phone" type="text" />
                        <button type="submit" className="btn btn-primary mt-5">Bayar</button>
                    </form>
                </div>

                <div className="lg:col-span-4 lg:pl-4">
                    <CartTotal />
                </div>
            </div>
            <Toaster position='top-center' />
        </>
    )
}
