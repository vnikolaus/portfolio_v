import { IMailService, IMessage } from "../IMailService";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";

export class MailTrapService implements IMailService {
    private transporter: Mail
    
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PWD }
        })
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: { name: message.to.name, address: message.to.email },
            from: { name: message.from.name, address: message.from.email },
            subject: message.subject,
            html: message.content
        })
    }
    
}