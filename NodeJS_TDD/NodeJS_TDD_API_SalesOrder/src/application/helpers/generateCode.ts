const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'

const generateCode = (n1: number, n2: number) => {
    let c1 = '',
        c2 = ''

    for (let i = 0; i < n1; i++) {
        c1 += CHARS[Math.floor(Math.random() * CHARS.length)]
    }

    for (let i = 0; i < n2; i++) {
        c2 += NUMBERS[Math.floor(Math.random() * NUMBERS.length)]
    }

    const fullCode = c1 + c2
    return fullCode
}

export { generateCode }
