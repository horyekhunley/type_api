import { Router } from 'express'
import { createPatient, deletePatient, getPatient, getPatients, updatePatient } from '../controllers/patient.controllers'

const patientRoutes = Router()

patientRoutes.route('/').get(getPatients).post(createPatient)

patientRoutes.route('/:id').get(getPatient).put(updatePatient).delete(deletePatient)

export default patientRoutes