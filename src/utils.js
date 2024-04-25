import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../src/config/config.js'
const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)

export default _dirname

export const createHash = async(password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export const isValidatePassword = (user,password) => {
        return bcrypt.compareSync(password,user.password)
}

export const generarToken = (user) =>{
    return new Promise((resolve,reject) => {
        jwt.sign(
            {user} , 
            config.SECRETTOKEN ,
            {
                expiresIn: '24h'
            } ,
            (err,token) => {
                if(err) reject(err)
                resolve(token)
            }
        )  
    })  
}