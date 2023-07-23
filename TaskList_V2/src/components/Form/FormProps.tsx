import { FormEvent, RefObject } from "react"
import { EventProps } from "../Main/MainInterfaces"

export interface FormProps {
    handleSubmit(e: FormEvent<HTMLFormElement>): void
    handleChange(e: EventProps): void
    newTask: string
    inputReference: RefObject<HTMLInputElement>
}