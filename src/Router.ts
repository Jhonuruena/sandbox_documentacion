import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger.conf' 
import express,{Application, Request, Response} from 'express'

/**
 * Clase principal de la API, define las rutas de la API
 * @author jhon urueña
 * @description clase inicial de ejemplo para manejar rutas y doumentacion
 */

class App{
    
	//Atributos declarados de typo any
	public app: Application
	private server: any

	//Crear el constructor
	constructor(){
		this.app = express()
		this.app.use(express.json())
		this.app.use(
			'/api-docs',
			swaggerUi.serve,
			swaggerUi.setup(swaggerSpec)
		)
		this.routes()
    
	}

	//Crear metodo de rutas
	private routes():void{
		this.app.get( '/',(req:Request,res:Response)=>{
			res.send('Hola con TypeScript')
		})

		this.app.post( '/paciente',(req:Request,res:Response)=>{
			res.send('Hola con TypeScript')
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