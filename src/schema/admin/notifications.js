import { z } from "zod";

//schema que valida el html a envirse a los usuarios
export const htmlEmailSchema = z.object({
  subject: z
    .string()
    .min(1, "El asunto es obligatorio")
    .max(100, "El asunto debe tener maximo 100 caracteres"),
  htmlContent: z
    .string()
    .min(1, "El contenido HTML es obligatorio")
    .refine(
      (html) => {
        //validacion basica para segurarse de que contiene etiquetas HTML
        const regex = /<[^>]*>/;
        return regex.test(html);
      },
      { message: "El contenido no parece ser HTML valido" }
    ),
});
