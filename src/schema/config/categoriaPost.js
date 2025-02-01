import { z } from "zod";

//schema para validar la creacion de una nueva categoria
export const categoriaSchema = z.object({
  id_area: z
    .number({ message: "Debes anexar el id area" })
    .int({ message: "Debe ser un numero positivo" })
    .positive({ message: "Debe ser un numero positivo" }),

  name: z
    .string({ message: "Debe ser un string" })
    .min(5, { message: "Debe contener almenos 5 caracteres" }),
});
