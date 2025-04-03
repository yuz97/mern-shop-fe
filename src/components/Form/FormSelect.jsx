import React from 'react'

export default function FormSelect(props) {
    const { label, name, lists, defaultValue } = props

    return (
        <div className='form-control'>
            <label className="label">
                <span className="capitalize label-text">
                    {label}
                </span>
            </label>
            <select name={name} className='select select-bordered' defaultValue={defaultValue}>

                {lists.map((list) => (
                    <option value={list} key={list}>
                        {list}
                    </option>
                ))}
            </select>
        </div>
    )
}
