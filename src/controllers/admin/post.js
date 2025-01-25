import { pool } from '../../db.js'

export const registerPostRequest = async (req, res) => {
  try {
    //reuperar datos del reqbody
    const {
      imgbase,
      titulo,
      id_area,
      id_categoria,
      id_estado_post,
      contentjson,
      created_at,
      update_at,
    } = req.body;

    const {id} = req.user

    //insertar registro
    await pool.query('INSERT INTO cfg_post (id_usuario, imgbase, titulo, id_area, id_categoria, id_estado_post, contentjson, created_at, update_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ', [id, imgbase, titulo, id_area, id_categoria, id_estado_post, contentjson, new Date(), new Date()])
    
    return res.status(200).json({message: "Registro almacenado correctamente!"})

  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Hubo un error de servidor!"})
  }
};
