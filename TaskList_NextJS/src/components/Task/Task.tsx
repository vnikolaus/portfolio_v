import React from 'react'
import { FaEdit, FaWindowClose } from 'react-icons/fa'
import './Task.css'
import { TaskProps } from './TaskInterfaces'

export default function Task(props: TaskProps) {

    const { tasks, handleEdit, handleRemove } = props
    
    return (
        <div className='content'>
            <ul className='tasks'>
                {tasks.map((task, index) => (
                    <li key={task}>
                        { task }
                        <span className='buttons'>
                            <FaEdit className='edit' onClick={(e) => handleEdit(e, index)} />
                            <FaWindowClose className='remove' onClick={(e) => handleRemove(e, index)} />
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}