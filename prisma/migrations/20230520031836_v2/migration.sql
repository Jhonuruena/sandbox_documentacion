/*
  Warnings:

  - You are about to drop the `cita` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `especialidad` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "cita";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "especialidad";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Cita" (
    "idCita" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "pacienteCedula" INTEGER,
    "medicoTarjetaProfesional" INTEGER,
    CONSTRAINT "Cita_pacienteCedula_fkey" FOREIGN KEY ("pacienteCedula") REFERENCES "Paciente" ("cedula") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cita_medicoTarjetaProfesional_fkey" FOREIGN KEY ("medicoTarjetaProfesional") REFERENCES "Medico" ("tarjetaProfesional") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Especialidad" (
    "idEspecialidad" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medico" (
    "tarjetaProfesional" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomnre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "consultorio" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "idEspecialidad" INTEGER,
    CONSTRAINT "Medico_idEspecialidad_fkey" FOREIGN KEY ("idEspecialidad") REFERENCES "Especialidad" ("idEspecialidad") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Medico" ("apellido", "consultorio", "correo", "idEspecialidad", "nomnre", "tarjetaProfesional") SELECT "apellido", "consultorio", "correo", "idEspecialidad", "nomnre", "tarjetaProfesional" FROM "Medico";
DROP TABLE "Medico";
ALTER TABLE "new_Medico" RENAME TO "Medico";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
