import './Main.css';
import React, { Component, FormEvent, RefObject } from "react";
import { EventProps, StateProps } from './MainInterfaces';
import Form from '../Form/Form';
import Task from '../Task/Task';

export default class Main extends Component { 
    public state: StateProps = {
        newTask: '',
        tasks: [],
        index: -1
    }
    public inputReference: RefObject<HTMLInputElement> = React.createRef()


    handleChange = (e: EventProps): void => {
        this.setState({
            newTask: e.target.value
        })
    }

    handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        
        const { tasks, index } = this.state
        let { newTask } = this.state
        newTask = newTask.trim();
        
        if(tasks.indexOf(newTask) !== -1) return

        const tempTasks = [...tasks]

        if (index === -1) {
            this.setState({
                tasks: [...tempTasks, newTask ],
                newTask: ''
            })
        } else {
            const tempTasks = [ ...tasks ]

            tempTasks[index] = newTask

            this.setState({
                tasks: [...tempTasks ],
                index: -1,
                newTask: '',
            })
        }
    }

    handleEdit(e: React.MouseEvent<SVGElement, MouseEvent>, index: number): void { 
        const { tasks } = this.state
        
        this.setState({
            index,
            newTask: tasks[index]
        })
    }

    handleRemove(e: React.MouseEvent<SVGElement, MouseEvent>, index: number): void {
        const { tasks } = this.state
        const tempTasks = [...tasks]
        tempTasks.splice(index, 1)

        this.setState({
            tasks: [...tempTasks]
        })
    }

    componentDidMount(): void { 
        this.inputReference.current?.focus()
        
        const tasks = localStorage.getItem('my_tasks') as string
        const savedTasks = JSON.parse(tasks)

        if (!savedTasks) return

        this.setState({
            tasks: savedTasks
        })
    }
    
    componentDidUpdate(prevState: StateProps): void {
        this.inputReference.current?.focus()

        const { tasks } = this.state

        if(tasks === prevState.tasks) return

        localStorage.setItem('my_tasks', JSON.stringify(tasks))
    }

    render(): JSX.Element {
        const { newTask, tasks } = this.state

        return (
            <div className="main">
                <h1>Task List</h1>

                <Form 
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    newTask={newTask}
                    inputReference={this.inputReference}
                />

                <Task 
                    tasks={tasks}
                    handleEdit={this.handleEdit.bind(this)}
                    handleRemove={this.handleRemove.bind(this)}
                />
            </div>
        )
    }
}