import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger.conf' 
import express,{Application, Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'

/**
 * Clase principal de la API, define las rutas de la API
 * @author jhon urueña
 * @description clase inicial de ejemplo para manejar rutas y doumentacion
 */

class App{
    
	//Atributos declarados de typo any
	public app: Application
	private server: any
	private prismaClient: PrismaClient

	//Crear el constructor
	constructor(){
		this.app = express()
		this.app.use(express.json())
		this.app.use(
			'/api-docs',
			swaggerUi.serve,
			swaggerUi.setup(swaggerSpec)
		)
		this.prismaClient = new PrismaClient()
		this.routes()
    
	}

	/**
	 *Definir y agregar las rutas de la API con Express
	 */
	private routes():void{
		this.app.get( '/',(req:Request,res:Response)=>{
			res.send('Bienvenidos a typescript')
		})

		this.app.get('/pacientes', async (req:Request,res:Response)=>{
		const pacientes = await this.prismaClient.paciente.findMany()
		res.json(pacientes)

	     })

		this.app.post( '/crear_paciente', 
		async (req:Request,res:Response)=>{
			try{
			const {cedula, 
				   nombre,
				   apellido,
				   fecha,
				   telefono
				   } = req.body

			const fechaNacimiento = new Date(fecha) 
			const paciente = await this.prismaClient.paciente.create(
				{
					data:{	
						cedula,
						nombre,
						apellido,
						fechaNacimiento,
						telefono}
				}
			)
			res.json(paciente)
		}catch(e:any){
			res.status(400)
			res.json({error:e.message})
		}
		})
	}

    

	//  Metodo para iniciar el server
	public start():void{
		this.server = this.app.listen(3000, ()=>{
			console.log('El servidor esta escuchando en el puerto 3000')
		})
	}

	//Metodo para cerrar el server
	public close():void{
		this.server.close()
	}

}

//Exportar la clase App para usarla en otros sitos
export default App