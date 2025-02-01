import { pool } from "../../db.js";

export const registerAreaPostRequest = async (req, res) => {
  try {
    //obtener datos de req body
    const { name } = req.body;
    //validar si hay otro registro con el mismo nombre
    const results = await pool.query(
      "select * from ref_area where nombre = $1",
      [name]
    );
    if (results.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "Ya existe un registro con este nombre!" });
    }
    //insertar el registro
    await pool.query("INSERT INTO ref_area (nombre) VALUES ($1)", [name]);

    return res
      .status(200)
      .json({ message: "Registro almacenado exitosamente!" });
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error inesperado!" });
  }
};

export const getAreaPostRecentRequest = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM ref_area ORDER BY id ASC"
    );
    if (results.rows <= 0) {
      return res
        .status(400)
        .json({ message: "No se han econtrado resultados..." });
    }
    return res.status(200).json({ data: results.rows });
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error inesperado!" });
  }
};

export const getAreaPostRequest = async (req, res) => {
  try {
    const { id } = req.params;
    //buscar el registro
    const results = await pool.query("SELECT * FROM ref_area WHERE id = $1", [
      id,
    ]);
    //validar si hay un registro con este id
    if (results.rows <= 0) {
      return res
        .status(404)
        .json({ message: "No se han encontrado resultados..." });
    }

    return res.status(200).json(results.rows);
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error inesperado..." });
  }
};

export const updateAreaPostRequest = async (req, res) => {
  try {
    //obtener parametro del registro
    const { id } = req.params;
    const { name } = req.body;
    //validar existencia del registro
    const results = await pool.query("select * from ref_area WHERE id = $1", [
      id,
    ]);
    if (results.rows <= 0) {
      return res.status(404).json({ message: "Este registro no existe..." });
    }
    //update registro
    await pool.query("UPDATE ref_area SET nombre = $1 WHERE id = $2", [
      name,
      id,
    ]);

    return res
      .status(200)
      .json({ message: "Registro actualizado correctamente!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Hubo un error inesperado" });
  }
};

export const deleteAreaPostRequest = async (req, res) => {
  try {
    //obtener el parametro
    const { id } = req.params;
    //validar que existe el regisro
    const results = await pool.query("SELECT * FROM ref_area WHERE id = $1", [
      id,
    ]);
    if (results.rows <= 0) {
      return res.status(404).json({ message: "Este registro no existe..." });
    }
    //eliminar el registro
    await pool.query("DELETE FROM ref_area WHERE id = $1", [id]);

    return res.status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error inesperado" });
  }
};
