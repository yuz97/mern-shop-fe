import React from 'react'

export default function FormTextArea(props) {
    const { label, name, defaultValue } = props
    return (
        <>
            <label className="form-control">
                <label className="label">
                    <span className="label-text capitalize">{label}</span>
                </label>
                <textarea name={name} defaultValue={defaultValue} className='textarea textarea-bordered h-36'></textarea>
            </label>
        </>
    )
}
