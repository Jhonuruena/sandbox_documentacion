/*
  Warnings:

  - You are about to drop the column `nomnre` on the `Medico` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `Medico` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medico" (
    "tarjetaProfesional" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "consultorio" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "idEspecialidad" INTEGER,
    CONSTRAINT "Medico_idEspecialidad_fkey" FOREIGN KEY ("idEspecialidad") REFERENCES "Especialidad" ("idEspecialidad") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Medico" ("apellido", "consultorio", "correo", "idEspecialidad", "tarjetaProfesional") SELECT "apellido", "consultorio", "correo", "idEspecialidad", "tarjetaProfesional" FROM "Medico";
DROP TABLE "Medico";
ALTER TABLE "new_Medico" RENAME TO "Medico";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
