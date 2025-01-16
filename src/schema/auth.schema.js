import { z } from "zod";

//shema que valida el usuario creado nativamente
export const validateSchemaUserNative = z.object({
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula",
    })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número",
    })
    .regex(/[@$!%*?&]/, {
      message:
        "La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &)",
    }),
  id_tipo_auth: z
    .number()
    .int({ message: "Debe ser un numero entero" })
    .positive({ message: "Debe ser un numero positivo" }),
  name: z.string({ message: "Debe ingresar un nombre" }),
  last_name: z.string({ message: "Debe ingresar un apellido" }),
  nick_name: z
    .string({ message: "Debe ingresar un alias" })
    .min(5, { message: "El nickName debe tener 5 caracteres como minimo" }),
  profile_picture: z
    .string()
    .url({ message: "La URL de la imagen de perfil no es valida" }),
  id_rol: z
    .number()
    .int({ message: "Debe ser un numero positivo" })
    .positive({ message: "Debe ser un numero positivo" }),
  created_at: z.date().optional(),
  update_at: z.date().optional(),
});

//schema que valida el signin de usuarios
export const singninSchemaNative = z.object({
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  password: z
    .string()
});
