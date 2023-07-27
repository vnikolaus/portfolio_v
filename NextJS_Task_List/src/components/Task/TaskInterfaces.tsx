export interface TaskProps {
    handleEdit(e: React.MouseEvent<SVGElement>, index: number): void
    handleRemove(e: React.MouseEvent<SVGElement>, index: number): void
    tasks: string[]
}