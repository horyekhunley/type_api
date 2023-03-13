import { connection } from "../config/mysql.config"
import {  Request, Response } from "express"
import { Patient } from "../interface/patient"
import { QUERY } from "../query/patient.query"
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from "mysql2"

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]]

export const getPatients = async (req: Request, res: Response): Promise<Response<Patient[]>> => {
    console.info(`${new Date().toLocaleString()} - Incoming request to get all patients from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`)
    try {
        const pool = await connection()
        const data: ResultSet = await pool.query(QUERY.SELECT_PATIENTS)
        return res.status(200).json({
            message: 'Patients retrieved successfully',
            data: data[0]
        })
    } catch (error: unknown) {
        return res.status(500).json({
            message: 'Error retrieving patients',
            error: error
        })
    }
}

export const getPatient = async (req: Request, res: Response): Promise<Response<Patient>> => {
    console.info(`${new Date().toLocaleString()} - Incoming request to get patient with id ${req.params.id} from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`)
    try {
        const pool = await connection()
        const data: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.id])
        if((data[0] as Array<ResultSet>).length > 0) {
            return res.status(200).json({
                message: 'Patient retrieved successfully',
                data: data[0]
            })
        } else {
            return res.status(404).json({
                message: 'Patient not found',
            })
        }
        
    } catch (error: unknown) {
        return res.status(500).json({
            message: 'Error retrieving patient',
            error: error
        })
    }
}

export const createPatient = async (req: Request, res: Response): Promise<Response<Patient>> => {
    console.info(`${new Date().toLocaleString()} - Incoming request to create patient from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`)
    let patient: Patient = { ...req.body }
    try {
        const pool = await connection()
        const data: ResultSet = await pool.query(QUERY.CREATE_PATIENT, Object.values(patient))
        patient = { id: (data[0] as ResultSetHeader).insertId, ...req.body}
        return res.status(201).json({
            message: 'Patient created successfully',
            data: patient
        })
    } catch (error: unknown) {
        return res.status(500).json({
            message: 'Error creating patient',
            error: error
        })
    }
}

export const updatePatient = async (req: Request, res: Response): Promise<Response<Patient>> => {
    console.info(`${new Date().toLocaleString()} - Incoming request to update patient with id ${req.params.id} from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`)
    let patient: Patient = { ...req.body }
    try {
        const pool = await connection()
        const data: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.id])

        if((data[0] as Array<ResultSet>).length > 0) {
            const data: ResultSet = await pool.query(QUERY.UPDATE_PATIENT, [req.params.id, ...Object.values(patient)])
            return res.status(200).json({
                message: 'Patient updated successfully',
                data: {...patient, id: req.params.id }
            })
        } else {
            return res.status(404).json({
                message: 'Patient not found',
            })
        }
    } catch (error: unknown) {
        return res.status(500).json({
            message: 'Error updating patient',
            error: error
        })
    }
}

export const deletePatient = async (req: Request, res: Response): Promise<Response<Patient>> => {
    console.info(`${new Date().toLocaleString()} - Incoming request to delete patient with id ${req.params.id} from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`)
    try {
        const pool = await connection()
        const data: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.id])

        if((data[0] as Array<ResultSet>).length > 0) {
            const data: ResultSet = await pool.query(QUERY.DELETE_PATIENT, [req.params.id])
            return res.status(200).json({
                message: 'Patient deleted successfully',
                data: data[0]
            })
        } else {
            return res.status(404).json({
                message: 'Patient not found',
            })
        }
    } catch (error: unknown) {
        return res.status(500).json({
            message: 'Error deleting patient',
            error: error
        })
    }
}
