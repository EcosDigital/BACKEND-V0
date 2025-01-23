import { pool } from "../../db.js";
import brevo from "@getbrevo/brevo";
/**CONTROLLERS PARA SOLICITUDES BACKEND */

export const sendNotificationRequest = async (req, res) => {
  try {
    //obtener datos del req body
    const { subject, htmlContent } = req.body;
    //obtener el array de usuarios
    const results = await pool.query(
      "SELECT DISTINCT ON (email) * FROM miembros ORDER BY email, id"
    );
    if (results.rows <= 0) {
      return res.status(404).json({
        message: "No cuentas con subscriptores a quienes enviar el email",
      });
    }

    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.API_KEY_BREVO
    );

    const SendSmtpEmail = new brevo.SendSmtpEmail();

    //recorerr los resultados
    for (let i = 0; i < results.rows.length; i++) {
      const user = results.rows[i];
      //console.log(user.email);
      SendSmtpEmail.subject = subject;
      SendSmtpEmail.to = [{ email: user.email, name: "Ecosistema_Digital" }];

      SendSmtpEmail.htmlContent = htmlContent

      SendSmtpEmail.sender = {
        name: "Ecosistema Digital",
        email: "ecosistemad947@gmail.com",
      };

      await apiInstance.sendTransacEmail(SendSmtpEmail);
    }

    return res
      .status(200)
      .json({ message: "Notificacion enviada exitosamente!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error de servidor!" });
  }
};
