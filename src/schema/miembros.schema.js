import {z} from 'zod'

//schema que valida el formato del email
export const emailSchema = z.object({
    email_miembro: z.string().email({ message : "El correo eletronico no es valido" })
})
