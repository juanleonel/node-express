import connectionPool from '../db/database.js'
import { toArrayModel, toModel } from '../mapper/employe.mapper.js'

const getAllEmploye = async () => {
  try {
    const sql = 'SELECT * FROM employes'
    const [row] = await connectionPool.query(sql)

    return toArrayModel(row)
  } catch (error) {
    throw Error('Error getting employe information - ' + JSON.stringify(error))
  }
}

const getEmployeById = async (id) => {
  try {
    const sql = 'SELECT * FROM employes WHERE employe_id = ?'
    const [row] = await connectionPool.query(sql, [id])

    return toModel(row[0])
  } catch (error) {
    throw Error('Error getting employe information - ' + JSON.stringify(error))
  }
}

const updateEmploye = async (data) => {
  try {
    const sql = 'UPDATE employes SET name = ?, last_name = ?, job = ?, like_node = ?, updated_at = ? WHERE employe_id = ?'
    const values = [data.name, data.last_name, data.job, data.like_node, data.updated_at, data.employe_id]
    const [rows] = await connectionPool.execute(sql, values)

    return rows
  } catch (error) {
    throw Error('Error updating employe information - ' + JSON.stringify(error))
  }
}

const createEmploye = async (data) => {
  try {
    const sql = 'INSERT INTO employes (name, last_name, job, like_node, created_at) values (?,?,?,?,?)'
    const values = [data.name, data.last_name, data.job, data.like_node, data.created_at]
    const [rows] = await connectionPool.execute(sql, values)

    return rows
  } catch (error) {
    throw Error('Error while to persist employe  - ' + JSON.stringify(error))
  }
}

const deleteEmploye = async (id) => {
  try {
    const sql = 'DELETE FROM employes WHERE employe_id = ?'
    const values = [id]
    const [rows] = await connectionPool.execute(sql, values)

    return rows
  } catch (error) {
    throw Error('Error while to delete employe - ' + JSON.stringify(error))
  }
}

export {
  createEmploye,
  deleteEmploye,
  getEmployeById,
  getAllEmploye,
  updateEmploye
}
