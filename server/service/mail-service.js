import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } from '../config.js';

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail (to, link) {
        await this.transporter.sendMail({
            from: SMTP_USER,
            to,
            subject: 'Acctivation account',
            text: '',
            html: 
                `
                    <div>
                        <h1>Click on link to activated your account</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }

}

export default new MailService();
