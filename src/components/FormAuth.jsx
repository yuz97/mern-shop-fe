import React from 'react'
import { Form, Link } from 'react-router-dom'
import FormInput from './Form/FormInput'

export default function FormAuth(props) {
    const { isRegister } = props
    return (
        <div className='h-screen grid place-items-center'>
            {
                isRegister == true ?
                    <Form method='POST' className='card w-96 p-8 bg-base-200 shadow-lg flex-col gap-y-4'>
                        <h4 className="text-center text-3xl font-bold">Login</h4>
                        <FormInput type="name" name="name" label="name" />
                        <FormInput type="email" name="email" label="email" />
                        <FormInput type="password" name="password" label="password" />
                        <div className="mt-4">
                            <button type='submit' className="btn btn-primary btn-block">Login</button>
                        </div>
                        <p className="text-center">
                            Sudah punya akun? <Link to="/login" className='ml-1 link-hover link-accent'>Login</Link>
                        </p>
                    </Form> :
                    <Form method='POST' className='card w-96 p-8 bg-base-200 shadow-lg flex-col gap-y-4'>
                        <h4 className="text-center text-3xl font-bold">Login</h4>
                        <FormInput type="email" name="email" label="Email" />
                        <FormInput type="password" name="password" label="Password" />
                        <div className="mt-4">
                            <button type='submit' className="btn btn-primary btn-block">Login</button>
                        </div>
                        <p className="text-center">
                            Belum punya akun? <Link to="/register" className='ml-1 link-hover link-accent'>Register</Link>
                        </p>
                    </Form>
            }

        </div>
    )
}
