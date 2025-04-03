import React from 'react'
import FormAuth from '../../components/FormAuth'
import toast, { Toaster } from 'react-hot-toast'
import registerUser from '../../features/userSlice'
import { Api } from '../../api'
import { redirect } from 'react-router-dom'



export const action = (store) => async ({ request }) => {
    const formInputData = await request.formData()
    const payload = Object.fromEntries(formInputData)

    try {
        const { data } = await Api.post('/auth/register', payload)
        store.dispatch(registerUser(data))

        toast.success("anda berhasil register")
        return redirect('/')
    } catch (error) {
        const errorMsg = error?.response?.data?.message
        toast.error(errorMsg)

        return null
    }
}

export default function RegisterView() {
    return (
        <>
            <FormAuth isRegister={true} />
            <Toaster position="top-center" />
        </>
    )
}
