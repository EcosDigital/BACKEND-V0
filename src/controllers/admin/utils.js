import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../../uploads"); // Ruta donde se guardarán las imágenes
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Crea el directorio si no existe
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname); // Obtiene la extensión original del archivo

    // Si no hay extensión, asignamos .webp por defecto
    if (!ext) {
      ext = '.webp';
    }

    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName); // Nombre único con la extensión correspondiente
  },
});

const upload = multer({ storage }).array("media", 10); // Máximo 10 archivos

export const uploadImageRequest = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error al procesar archivos:", err);
      return res.status(500).json({ message: "Error al procesar archivos" });
    }

    try {
      const media = req.files;

      if (!media || media.length === 0) {
        return res.status(400).json({ message: "No se recibieron archivos." });
      }

      // Generar la respuesta con las rutas completas de las imágenes almacenadas
      const filePaths = media.map((file) => ({
        originalName: file.originalname,
        storedPath: `/uploads/${file.filename}`, // Ruta relativa de donde se almacena la imagen
      }));

      // Devuelve la respuesta con las rutas de los archivos almacenados
      return res.status(200).json({
        message: "Archivos subidos con éxito.",
        files: filePaths, // Incluye las rutas de las imágenes
      });
    } catch (error) {
      console.error("Error al guardar archivos:", error);
      return res.status(500).json({ message: "Error interno del servidor." });
    }
  });
};
