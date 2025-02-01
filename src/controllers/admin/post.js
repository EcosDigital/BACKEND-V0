import { pool } from "../../db.js";

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
    } = req.body;

    const { id } = req.user;

    //insertar registro
    await pool.query(
      "INSERT INTO cfg_post (id_usuario, imgbase, titulo, id_area, id_categoria, id_estado_post, contentjson, created_at, update_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ",
      [
        id,
        imgbase,
        titulo,
        id_area,
        id_categoria,
        id_estado_post,
        contentjson,
        new Date(),
        new Date(),
      ]
    );

    return res
      .status(200)
      .json({ message: "Registro almacenado correctamente!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Hubo un error de servidor!" });
  }
};

export const getPostRecentsRequest = async (req, res) => {
  try {
    const results =
      await pool.query(`SELECT p.id, p.imgbase, p.titulo, a.nombre as area,
                          c.nombre as categoria, e.nombre as estado, p.created_at
                          FROM cfg_post p 
                          JOIN ref_area a ON p.id_area = a.id
                          JOIN ref_categoria c ON p.id_categoria = c.id
                          JOIN ref_estado_post e ON p.id_estado_post = e.id
                          ORDER BY p.created_at DESC LIMIT 15`);
    if (results.rows <= 0) {
      return res
        .status(404)
        .json({ message: "No se han encontrado resultados" });
    }

    return res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Hubo un error inesperado..." });
  }
};

export const getPostRequest = async (req, res) => {
  try {
    //obtener el parametro
    const { id } = req.params;
    //validar existencia
    const results = await pool.query("SELECT * FROM cfg_post WHERE id = $1", [
      id,
    ]);
    if (results.rows <= 0) {
      return res
        .status(404)
        .json({ message: "No se han encontrado resultados..." });
    }
    //devolver el registro encontrado
    return res.status(200).json(results.rows);
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error inesperado" });
  }
};

export const updatePostRequest = async (req, res) => {
  try {
    //obtener id del parametro
    const { id } = req.params;
    //obtener datos del req body
    const { titulo, id_area, id_categoria, id_estado_post } = req.body;
    //validar existencias
    const results = await pool.query("SELECT * FROM cfg_post WHERE id =$1", [
      id,
    ]);
    if (results.rows <= 0) {
      return res
        .status(404)
        .json({ message: "No se ha encontrado resultados" });
    }
    //actualizar el registro
    await pool.query(
      `UPDATE cfg_post SET titulo = $1, id_area = $2, id_categoria = $3,
       id_estado_post =$4 WHERE id = $5`,
      [titulo, id_area, id_categoria, id_estado_post, id]
    );
    return res
      .status(200)
      .json({ message: "Registro actualizado correctamente!" });
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error inesperado..." });
  }
};

export const deletePostRequest = async (req, res) => {
  try {
    //obtener el parametro
    const { id } = req.params;
    //validar existencia
    const results = await pool.query("SELECT * FROM cfg_post WHERE id = $1", [
      id,
    ]);
    if (results.rows <= 0) {
      return res
        .status(404)
        .json({ message: "No se han encontrado resultados..." });
    }
    //eliminar el registro
    await pool.query("DELETE FROM cfg_post WHERE id = $1", [id]);

    return res
      .status(200)
      .json({ message: "Registro eliminado exitosamente!" });
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error inesperado" });
  }
};

export const updateJsonRequest = async (req, res) => {
  try {
    //obtener el id del param
    const { id } = req.params;
    //obtener json del req body
    const { json } = req.body;
    //validar existencia
    const results = await pool.query("SELECT * FROM cfg_post WHERE id = $1", [
      id,
    ]);
    if (results.rows <= 0) {
      return res
        .status(404)
        .json({ message: "No se han encontrado resultados" });
    }
    //actualizar json del POST
    const convertJson = JSON.parse(json);
    //console.log(typeof(convertJson));

    await pool.query("UPDATE cfg_post SET contentjson = $1 WHERE id = $2", [
      convertJson,
      id,
    ]);

    return res.status(200).json({ message: "Json insertado exitosamente!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Hubo un error inesperado!" });
  }
};

export const getPostDestacadosRequest = async (req, res) => {
  try {
    const results =
      await pool.query(`SELECT p.id, p.imgbase, p.titulo, a.nombre as area,
                          c.nombre as categoria, e.nombre as estado, p.created_at,
                          p.contentjson
                          FROM cfg_post p 
                          JOIN ref_area a ON p.id_area = a.id
                          JOIN ref_categoria c ON p.id_categoria = c.id
                          JOIN ref_estado_post e ON p.id_estado_post = e.id
                          WHERE p.id_estado_post = 1
                          ORDER BY p.created_at DESC LIMIT 15`);
    if (results.rows <= 0) {
      return res
        .status(404)
        .json({ message: "No se han encontrado resultados" });
    }

    return res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Hubo un error inesperado..." });
  }
};

export const getPostBySlugRequest = async (req, res) => {
  try {
    //obtener datos del req paramss
    const { slug } = req.params;
    // verificar existencia
    const results =
      await pool.query(`SELECT p.id, p.imgbase, p.titulo, a.nombre as area,
                          c.nombre as categoria, u.nick_name, u.profile_picture, p.created_at,
                          p.contentjson
                          FROM cfg_post p 
                          JOIN ref_area a ON p.id_area = a.id
                          JOIN ref_categoria c ON p.id_categoria = c.id
                          JOIN cfg_usuarios u on p.id_usuario = u.id
                          WHERE p.contentjson->>'slug' = '${slug}'`);
      if(results.rows <= 0){
        return res.status(404).json({message: 'No se han encontrado resultados...'})
      }

      return res.status(200).json(results.rows)

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({message: "Hubo un error inesperado"})
  }
};
