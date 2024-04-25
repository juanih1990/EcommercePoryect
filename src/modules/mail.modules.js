import nodemailer from 'nodemailer'
import config from '../config/config.js'

export default class Mail {
    constructor(){
        this.trasport = nodemailer.createTransport({
            service: config.GMAILSERVICE,
            port: config.GMAILPORT,
            auth: {
                user: config.GMAILUSER,
                pass: config.GMAILPASS
            }
        })
    }

    send = async(user, subject , html) => {
        const opt = {
            from: config.GMAILUSER,
            to: user.email,
            subject,
            html
        }
        const result = await this.trasport.sendMail(opt)
        return result
    }
}