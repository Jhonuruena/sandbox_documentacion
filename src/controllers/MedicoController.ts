import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

class MedicoController{

    private prisma: PrismaClient

    constructor(){
       this.prisma = new PrismaClient()
    }

    async crearMedico(req:Request, res:Response){
        try{
            const{
                tarjetaProfesional,
                nombre,
                apellido,
                consultorio,
                correo,

            } = req.body
            const medico = await this.prisma.medico.create(
                {
                    data:{
                        tarjetaProfesional,
                        nombre,
                        apellido,
                        consultorio,
                        correo,  
                    }
                }
                )
            res.json(medico)
        }catch (e: any){
            res.status(400)
            res.json({ error: e.message })
        }
    }

    async obtenerMedicos(req:Request, res:Response){
        const medicos = await this.prisma.medico.findMany()
        res.json(medicos)
    }
}

export default MedicoController