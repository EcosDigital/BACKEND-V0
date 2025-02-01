import { pool } from "../../db.js";

export const registerCategoryRequest = async (req, res) => {
  try {
    //obtener datos del req body
    const { id_area, name } = req.body;
    //comprobar existencia
    const results = await pool.query(
      "SELECT * FROM ref_categoria WHERE id_area = $1 AND nombre = $2",
      [id_area, name]
    );
    if (results.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "Ya existeun registro con este nombre y area !" });
    }
    //insertar registro
    await pool.query(
      "INSERT INTO ref_categoria (id_area, nombre ) VALUES ($1, $2)",
      [id_area, name]
    );

    return res
      .status(200)
      .json({ message: "Registro almacenado de forma exitosa!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Hubo un error inesperado..." });
  }
};

export const getCategoryAllRequest = async (req, res) => {
  try {
    const results = await pool.query("SELECT c.id, a.nombre as area, c.nombre FROM ref_categoria c JOIN ref_area a on a.id = c.id_area ORDER BY c.id");
    if (results.rows <= 0) {
      return res
        .status(404)
        .json({ message: "No se han encontrado resultados..." });
    }
    return res.status(200).json(results.rows );
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error inesperado!" });
  }
};

export const getCategoryRequest = async (req, res) => {
  try {
    //obtener dato del parametro
    const { id } = req.params;
    //validar existencia
    const results = await pool.query(
      "SELECT * FROM ref_categoria WHERE id = $1",
      [id]
    );
    if (results.rows <= 0) {
      return res
        .status(404)
        .json({ message: "No se hn encontrado resultados..." });
    }
    return res.status(200).json(results.rows);
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error inesperado" });
  }
};

export const updateCategoryRequest = async (req, res) => {
  try {
    //obtener datos del parametro
    const { id } = req.params;
    const { id_area, name } = req.body;
    //validar existencia
    const results = await pool.query(
      "SELECT * FROM ref_categoria WHERE id = $1",
      [id]
    );
    if (results.rows <= 0) {
      return res.status(200).json({ message: "No existe el registro" });
    }
    //actualizar registro
    await pool.query(
      "UPDATE ref_categoria SET nombre = $1, id_area = $2 WHERE id = $3",
      [name, id_area, id]
    );

    return res
      .status(200)
      .json({ message: "Registro actualizado correctamente!" });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Hubo un error inesperado" });
  }
};

export const deleteCategoryRequest = async (req, res) => {
  try {
    //datos del param
    const { id } = req.params;
    //validar existencia
    const results = await pool.query("SELECT * FROM ref_categoria WHERE id = $1", [id])
    if(results.rows <= 0){
      return res.status(404).json({message: "No existe el registro!"})
    }
    //eliminar registro
    await pool.query("DELTE FROM ref_categoria WHERE id = $1", [id])

    return res.status(200).json({message : "Registro eliminado con exito"})

  } catch (error) {
    return res.status(500).json({message: "Hubo un error inesperado!"})
  }
};


export const getCategoriesByAreaId = async (req, res) => {
  try {
    //obtener id del arametro
    const {id} = req.params
    //validar existencias
    const results = await pool.query('SELECT * FROM ref_categoria WHERE id_area = $1', [id])
    if(results.rows <= 0){
      return res.status(404).json({message: "No se encontraron resultados"})
    }
    return res.status(200).json(results.rows)
  } catch (error) {
    return res.status(500).json({message: "Hubo un error inesperado!"})
  }
}