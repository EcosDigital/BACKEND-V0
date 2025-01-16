import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import brevo from "@getbrevo/brevo";

import { createAccesToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";

export const createNewUsuarioRequest = async (req, res) => {
  try {
    //recuperar datos de l req body
    const {
      email,
      password,
      id_tipo_auth,
      name,
      last_name,
      nick_name,
      profile_picture,
      id_rol,
    } = req.body;
    //validar si existe el usuario por email
    const results = await pool.query(
      "select * from cfg_usuarios where email = $1",
      [email]
    );
    if (results.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Ya existe un usuario con este email" });
    }
    //hasheando password
    const passwordHash = await bcrypt.hash(password, 10);
    //insertar registro de usuario a la base de datos
    await pool.query(
      "insert into cfg_usuarios (email, password, id_tipo_auth, name, last_name, nick_name, profile_picture, id_rol, created_at, updated_at) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        email,
        passwordHash,
        id_tipo_auth,
        name,
        last_name,
        nick_name,
        profile_picture,
        id_rol,
        new Date(),
        new Date(),
      ]
    );

    //envia email de bienvenida
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.API_KEY_BREVO
    );

    const SendSmtpEmail = new brevo.SendSmtpEmail();

    SendSmtpEmail.subject = "Ecosistema Digital";
    SendSmtpEmail.to = [{ email: email, name: "ecosistema_digital" }];

    SendSmtpEmail.htmlContent = `
        <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                body {
                    font-family: 'Segoe UI', Arial, sans-serif;
                    background-color: #f3f4f6;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: linear-gradient(to bottom, #ffffff, #f1f5f9);
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background: linear-gradient(135deg, #6366f1, #2563eb);
                    color: #ffffff;
                    text-align: center;
                    padding: 50px 20px;
                    position: relative;
                }
                .header h1 {
                    margin: 0;
                    font-size: 32px;
                    font-weight: bold;
                }
                .header p {
                    margin-top: 10px;
                    font-size: 18px;
                }
                .body {
                    padding: 30px 20px;
                    text-align: center;
                    color: #1f2937;
                }
                .body p {
                    font-size: 16px;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
                .highlight {
                    color: #2563eb;
                    font-weight: 600;
                }
                .cta-button {
                    display: inline-block;
                    background: #ffffff;
                    color: #2563eb;
                    padding: 14px 28px;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: bold;
                    font-size: 16px;
                    border: 2px solid #2563eb;
                    transition: background 0.3s ease, transform 0.2s ease;
                }
                .cta-button:hover {
                    background: #2563eb;
                    color: #ffffff;
                    transform: translateY(-2px);
                }
                .footer {
                    background-color: #e5e7eb;
                    text-align: center;
                    padding: 20px;
                    font-size: 14px;
                    color: #6b7280;
                }
                .footer a {
                    color: #2563eb;
                    text-decoration: none;
                    font-weight: bold;
                    margin: 0 5px;
                }
                .footer a:hover {
                    color: #1d4ed8;
                }
                </style>
            </head>
            <body>
                <div class="container">
                <div class="header">
                    <h1>¡Bienvenido a Ecosistema Digital!</h1>
                    <p>Tu viaje hacia una experiencia increíble comienza ahora.</p>
                </div>
                <div class="body">
                    <p>Estamos emocionados de tenerte con nosotros. Prepárate para descubrir una plataforma diseñada para transformar tu experiencia digital.</p>
                    <p class="highlight">Explora, Conecta y Crece con nosotros.</p>
                    <a href="https://ecosistemasdigital.com" class="cta-button">Comenzar Ahora</a>
                </div>
                <div class="footer">
                    <p>¿Necesitas ayuda? Estamos aquí para ti. <a href="https://ecosistemasdigital.com/contact">Contáctanos</a> | <a href="https://ecosistemasdigital.com/faq">Preguntas Frecuentes</a></p>
                    <p>© 2025 Ecosistema Digital. Todos los derechos reservados.</p>
                </div>
                </div>
            </body>
            </html>

    `;

    SendSmtpEmail.sender = {
      name: "Ecosistema Digital",
      email: "ecosistemad947@gmail.com",
    };

    await apiInstance.sendTransacEmail(SendSmtpEmail);

    return res.status(200).json({ message: "Registro exitoso!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error de servidor!" });
  }
};

export const signinNativeRequest = async (req, res) => {
  try {
    //obtener datos del req body
    const { email, password } = req.body;
    //validar si existe el usuario por email
    const results = await pool.query(
      "select * from cfg_usuarios where email = $1",
      [email]
    );
    if (results.rows.lenght <= 0) {
      return res.status(400).json({ message: "Error de credenciales!" });
    }
    //validar contraseña y hash
    const isMatch = await bcrypt.compare(password, results.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "error de credneciales" });
    }

    const token = await createAccesToken({
      id: results.rows[0].id,
      email: results.rows[0].email,
      nick_name: results.rows[0].nick_name,
      picture: results.rows[0].profile_picture,
    });

    res.cookie("token", token);

    res.json({
      id: results.rows[0].id,
      email: results.rows[0].email,
      nick_name: results.rows[0].nick_name,
      picture: results.rows[0].profile_picture,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyTokenNativeRequest = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);

      const userFound = await pool.query(
        "select * from cfg_usuarios where id = $1",
        [user.id]
      );
      if (!userFound) return res.sendStatus(401);

      return res.json({
        id: userFound.rows[0].id,
        email: userFound.rows[0].email,
        nick_name: userFound.rows[0].nick_name,
        picture: userFound.rows[0].profile_picture,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const logoutUserNative = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
