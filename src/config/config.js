import dotenv from "dotenv"

dotenv.config()

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    PERSISTENCE: process.env.PERSISTENCE,
    SECRETTOKEN: process.env.SECRETTOKEN,
    GMAILUSER: process.env.GMAILUSER,
    GMAILPASS: process.env.GMAILPASS,
    GMAILPORT: process.env.GMAILPORT,
    GMAILSERVICE: process.env.GMAILSERVICE,
    CLIENTIDGMAILPASSPORT: process.env.CLIENTIDGMAILPASSPORT,
    CLIENTSECRETGMAILPASSPORT: process.env.CLIENTSECRETGMAILPASSPORT,
    CALLBACKURLGMAILPASSPORT: process.env.CALLBACKURLGMAILPASSPORT
}