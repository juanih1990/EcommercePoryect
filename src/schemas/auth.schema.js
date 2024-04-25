import {z} from 'zod'
export const registerSchema = z.object({
    name: z.string({
        required_error: "El nombre es requerido"
    }),
    lastName: z.string({
        required_error: "el apellido es requerido"
    }),
    email: z.string({
        required_error: "El e-mail es requerido"
    }).email({
        message: "El email es invalido"
    }),
    password: z.string({
        required_error: "El password es requerido"
    }).min(8, {
        message: "La contraseña requiere de al menos 8 caracteres"
    }),
    age: z.number({
        required_error: "La edad es requerida"
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