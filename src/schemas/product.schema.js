import {z} from 'zod'
export const productSchema = z.object({
    title: z.string({
        required_error: "El titulo es requerido"
    }),
  description: z.string({
    required_error: "La descripcion del producto es requerida"
  }),
  price: z.number({
    required_error: "El precio es requerido"
  }),
  stock: z.number({
    required_error: "El stock es requerido"
  }),
  category: z.string({
    required_error: "La categoria es requerida"
  }),
  code: z.string({
    required_error: "El codigo es requerido"
  }),
  thumbnail:z.string({
    required_error: "La imagen es requerida"
  })
})