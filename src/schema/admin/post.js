import { number, z } from "zod";

//schem para validar el FORM del post
export const registerPostSchema = z.object({
  imgbase: z.string().url({ message: "la URL de la imagenBase no es valida" }),
  titulo: z
    .string({ message: "Debes ingresar un titulo" })
    .min(5, { message: "Tu titulo debe tener almenos 5 caracteres" }),
  id_area: z
    .number()
    .int({ message: "Debe ser un numero entero" })
    .positive({ message: "Debe ser un numero positivo" }),
  id_categoria: z
    .number()
    .int({ message: "Debe ser un numero entero" })
    .positive({ message: "Debe ser un numero positivo" }),
  id_estado_post: z
    .number()
    .int({ message: "Debe ser un numero entero" })
    .positive({ message: "Debe ser un numero positivo" }),
  contentjson: z.object({}).passthrough(),
  created_at: z.date().optional(),
  update_at: z.date().optional(),
});

export const updatePostSchema = z.object({
  titulo: z
    .string({ message: "Debes ingresar un titulo" })
    .min(5, { message: "Tu titulo debe tener almenos 5 caracteres" }),
  id_area: z
    .number()
    .int({ message: "Debe ser un numero entero" })
    .positive({ message: "Debe ser un numero positivo" }),
  id_categoria: z
    .number()
    .int({ message: "Debe ser un numero entero" })
    .positive({ message: "Debe ser un numero positivo" }),
  id_estado_post: z
    .number()
    .int({ message: "Debe ser un numero entero" })
    .positive({ message: "Debe ser un numero positivo" }),
  created_at: z.date().optional(),
  update_at: z.date().optional(),
});
