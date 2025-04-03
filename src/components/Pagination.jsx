import React from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

export default function Pagination() {
    const { pagination } = useLoaderData()
    const { page, totalPage } = pagination
    const { search, pathname } = useLocation()
    const navigation = useNavigate()

    const handlePage = (number) => {

        const searchParams = new URLSearchParams(search)
        searchParams.set("page", number)

        navigation(`${pathname}?${searchParams.toString()}`)
    }

    const pages = Array.from({ length: totalPage }, (_, index) => {
        return index + 1;
    })

    return (
        <div className="join">
            {pages.map((pageNumber =>
                <button onClick={() => handlePage(pageNumber)} key={pageNumber} className={`btn btn-md border-none join-item ${pageNumber == page ? "bg-primary" : ""}`}>{pageNumber}</button>
            ))}
        </div>
    )
}
