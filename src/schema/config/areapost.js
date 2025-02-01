import { z } from "zod";

//sechema que valida la creacion de una nueva area
export const validateSchemaNewArea = z.object({
    name: z.string({message : "Debe ser un string"}).min(5,{message :"Debe contener almenos 5 caracteres"})
})