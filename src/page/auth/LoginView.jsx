import React from 'react'
import FormAuth from '../../components/FormAuth'
import { Api } from '../../api'
import { redirect } from 'react-router-dom'
import { loginUser } from '../../features/userSlice'
import toast, { Toaster } from 'react-hot-toast'

export const action = (store) => async ({ request }) => {
    const formInputData = await request.formData()
    const payload = Object.fromEntries(formInputData)

    try {

        const { data } = await Api.post('/auth/login', payload)
        store.dispatch(loginUser(data))

        toast.success("anda berhasil login")
        return redirect('/')

    } catch (error) {

        const errorMsg = error?.response?.data?.message
        toast.error(errorMsg)

        return null

    }

}

export default function LoginView() {
    return (
        <>
            <FormAuth />
            <Toaster position="top-center" />
        </>
    )
}
