import cors from "cors"
import express, { Application } from "express"
import ip from 'ip'
import patientRoutes from "./routes/patient.routes"

export class App {
    private readonly app: Application
    private readonly APPLICATION_RUNNING = 'application is running on: '
    private readonly ROUTE_NOT_FOUND = 'Route does not exist on the server'

    constructor(private readonly port: (string | number) = process.env.PORT || 3000) {
        this.app = express()
        this.middleware()
        this.routes()
    }
    listen(): void{
        this.app.listen(this.port)
        console.info(`${this.APPLICATION_RUNNING}${ip.address()}:${this.port}`)
    }
    private routes(): void {
        this.app.use('/patients', patientRoutes)
        this.app.get('/patients', (req, res) => {
            res.status(200).send({ message: 'Server up' })
        })
        this.app.all('/*', (req, res) => res.status(404).send({ message: this.ROUTE_NOT_FOUND })
        )
    }
    private middleware():void {
        this.app.use(cors({ origin: '*' }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }
}