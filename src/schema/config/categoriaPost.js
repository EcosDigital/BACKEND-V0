import { z } from "zod";

//schema para validar la creacion de una nueva categoria
export const categoriaSchema = z.object({
  id_area: z
    .number()
    .int({ message: "Debe ser un numero positivo" })
    .positive({ message: "Debe ser un numero positivo" }),

  name: z
    .string()
    .min(5, { message: "Debe contener almenos 5 caracteres" }),
});
