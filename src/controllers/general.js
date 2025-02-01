import { pool } from '../db.js'

export const getStatusRequest = async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM ref_estado_post")
        if(results.rows <= 0){
            return res.status(404).json({message: "No se encontraron resultados..."})
        }
        return res.status(200).json(results.rows)
    } catch (error) {
        return res.status(500).jsn({message: "Hubo un error inesperado!"})
    }
}