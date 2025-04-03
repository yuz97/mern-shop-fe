import React from 'react'
import { Form, Link } from 'react-router-dom'
import FormInput from './Form/FormInput'
import FormSelect from './Form/FormSelect'
import { useLoaderData } from 'react-router-dom'

export default function Filter() {
    const categories = ['celana', 'kemeja', 'kaos', 'sepatu']
    const { params } = useLoaderData()
    const { name, category } = params
    return (
        <Form method='get' className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-3 grid-cols-2 items-center'>
            <FormInput label="Search product" type="text" name="name" defaultValue={name} />
            <FormSelect label="Select category" type="" name="category" lists={categories} defaultValue={category} />
            <button type="submit" className='btn btn-primary'>Search</button>
            <Link to={'/products'} className='btn btn-neutral'>Reset</Link>
        </Form>
    )
}
