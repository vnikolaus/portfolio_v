import { StudentsRepository } from "../../src/application/repositories/StudentsRepository";
import { Student } from "../../src/domain/entities/student";

export class InMemoryStudentsRepository implements StudentsRepository {
    public items: Student[] = []

    async findById(id: string): Promise<Student | null> {
        const student = this.items.find(item => item.id === id)
        return student ?? null
    }
    
}