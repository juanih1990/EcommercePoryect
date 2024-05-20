import {z} from 'zod'
export const registerSchema = z.object({
    name: z.string({
        required_error: "El nombre es requerido"
    }),
   
    email: z.string({
        required_error: "El e-mail es requerido"
    }).email({
        message: "El email es invalido"
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "El e-mail es requerido"
    }).email({
        message: "El email es invalido"
    }),
    password: z.string({
        required_error: "El password es requerido"
    }).min(8, {
        message: "La contraseña requiere de al menos 8 caracteres"
    })
})