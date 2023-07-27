import React from "react";
import { FaPlus } from 'react-icons/fa'

import './Form.css'
import { FormProps } from "./FormProps";

export default function Form(props: FormProps) {
    const { handleChange, handleSubmit, inputReference, newTask } = props

    return (
        <form onSubmit={handleSubmit} action="#" className='form'>
        <input 
            onChange={handleChange} 
            type="text" 
            value={newTask}
            ref={inputReference}
        />

        <button type="submit">
            <FaPlus />
        </button>
    </form>
    )
}