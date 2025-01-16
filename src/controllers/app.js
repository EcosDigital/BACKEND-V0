import { pool } from "../db.js";
import brevo from "@getbrevo/brevo";
/**CONTROLLERS PARA SOLICITUDES BACKEND */

export const registerMienbroRequest = async (req, res) => {
  try {
    //req body
    const { email_miembro } = req.body;
    //validar si existe el registro del miembro por email
    const results = await pool.query(
      "select id from miembros where email = $1",
      [email_miembro]
    );

    if (results.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Ya hay un usuario registrado con este email" });
    }
    

    //insertar miembro en la base de datos
    await pool.query('insert into miembros (email, fecha_registro) values($1, NOW())', [email_miembro])

    //enviar email
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.API_KEY_BREVO
    );

    const SendSmtpEmail = new brevo.SendSmtpEmail();

    SendSmtpEmail.subject = "Ecosistema Digital";
    SendSmtpEmail.to = [{ email: email_miembro, name: "ecosistema_digital" }];
    
    SendSmtpEmail.htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(to bottom, #ffffff, #f9fafb);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          }
          .header {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: #ffffff;
            text-align: center;
            padding: 40px 20px;
            position: relative;
          }
          .header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #60a5fa);
          }
          .header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: -0.5px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .welcome-icon {
            font-size: 48px;
            margin-bottom: 16px;
          }
          .body {
            padding: 40px 32px;
            color: #1f2937;
          }
          .body p {
            line-height: 1.8;
            margin-bottom: 24px;
            font-size: 16px;
          }
          .greeting {
            font-size: 20px;
            color: #111827;
            font-weight: 600;
            margin-bottom: 24px;
          }
          .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
            margin: 32px 0;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: #ffffff !important;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
          }
          .cta-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
          }
          .signature {
            margin-top: 40px;
            padding-top: 24px;
            border-top: 2px solid #f3f4f6;
          }
          .signature img {
            width: 150px;
            margin-top: 12px;
          }
          .footer {
            background-color: #f8fafc;
            text-align: center;
            padding: 24px;
            font-size: 14px;
            color: #6b7280;
          }
          .footer a {
            color: #2563eb;
            text-decoration: none;
            transition: color 0.2s ease;
          }
          .footer a:hover {
            color: #1d4ed8;
          }
          .social-links {
            margin: 20px 0;
          }
          .social-links a {
            display: inline-block;
            margin: 0 8px;
            color: #6b7280;
            text-decoration: none;
          }
          .highlight {
            color: #2563eb;
            font-weight: 600;
          }
          @media (max-width: 600px) {
            body {
              padding: 12px;
            }
            .header {
              padding: 32px 16px;
            }
            .body {
              padding: 32px 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="welcome-icon">👋</div>
            <h1>¡Bienvenido a Ecosistema Digital!</h1>
          </div>
          <div class="body">
            <p class="greeting">¡Hola! Nos alegra muchísimo tenerte con nosotros</p>
            <p>
              Queremos darte la más calurosa bienvenida a la familia de <span class="highlight">Ecosistema Digital</span>. 
              Tu decisión de unirte a nosotros nos llena de emoción y estamos verdaderamente agradecidos por la confianza que has depositado en nuestro equipo.
            </p>
            <p>
              Has dado el primer paso hacia una experiencia digital extraordinaria. Nuestro compromiso es acompañarte en cada momento de tu viaje, 
              proporcionándote las herramientas más innovadoras y el apoyo que necesitas para alcanzar tus objetivos.
            </p>

            <div style="text-align: center; margin: 32px 0;">
              <a href="https://ecosistemasdigital.com" class="cta-button">
                Comenzar mi viaje digital →
              </a>
            </div>

            <div class="divider"></div>

            <p>
              ¿Necesitas ayuda para comenzar? Nuestro equipo está disponible 24/7 para responder tus preguntas y guiarte en cada paso.
              No dudes en contactarnos cuando lo necesites.
            </p>

            <div class="signature">
              <p>Con aprecio,<br>
              <strong>El equipo de Ecosistema Digital</strong></p>
            </div>
          </div>
          
          <div class="footer">
            
            <p>
              © 2025 Ecosistema Digital. Todos los derechos reservados.<br>
              <a href="https://ecosistemasdigital.com/privacy-policy">Política de privacidad</a> • 
              <a href="https://ecosistemasdigital.com/terms-conditions">Términos y condiciones</a>
            </p>
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

export const getTotalMiembrosRequest = async (req, res) => {
  try {
    const results = await pool.query('SELECT COUNT(*) AS total_miembros FROM miembros')
    return res.status(200).json({ message: results.rows })
  } catch (error) {
    return res.status(500).json({ message: "Error de servidor!" });
  }
}

export const  prueba = async (req, res) => {
  res.json('recived')
}