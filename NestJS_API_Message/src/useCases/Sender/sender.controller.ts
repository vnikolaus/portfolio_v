import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { SenderService } from './sender.service'
import { SendMessageProps } from './typings/types'
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'

@Controller('sender')
export class SenderController {
    constructor(private readonly senderService: SenderService) {}

    @Get('/status')
    async getStatus() {
        return {
            qr_code: this.senderService.qr,
            connected: this.senderService.connection,
        }
    }

    @Post('/send')
    @HttpCode(HttpStatus.OK)
    async sendMessage(@Body() body: SendMessageProps) {
        try {
            const numbers = body.numbers
            for (let i = 0; i < numbers.length; i++) {
                if (!isValidPhoneNumber(numbers[i], 'BR')) throw new Error(`Telefone invalido`)

                let formatedNumber = parsePhoneNumber(numbers[i], 'BR').format('E.164') as string
                formatedNumber = formatedNumber.replace(/[+]/g, '')
                formatedNumber = formatedNumber.includes('@c.us') ? formatedNumber : `${formatedNumber}@c.us`

                numbers[i] = formatedNumber
            }

            await this.senderService.sendMessage(body)

            return body
        } catch (err) {
            if (err instanceof Error) return err.message
        }
    }
}
