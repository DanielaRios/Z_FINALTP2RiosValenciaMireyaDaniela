import { HabitacionModel } from "../models/habitacion.Mongoose.js";

export class HabitacionRepositoryMongoose {
  constructor(habitacionModel = HabitacionModel) {
    this.HabitacionModel = habitacionModel;
  }

  getAll = async (filtro = {}) => {
    try {
      return await this.HabitacionModel.find(filtro);
    } catch (error) {
      console.error(
        "Error obteniendo las habitaciones:",
        error.message,
      );

      throw new Error("No se pudieron obtener las habitaciones");
    }
  };

  getOne = async (id) => {
    try {
      return await this.HabitacionModel.findById(id);
    } catch (error) {
      console.error(
        `Error obteniendo la habitación con id ${id}:`,
        error.message,
      );

      throw new Error("Error al obtener la habitación");
    }
  };

  createOne = async ({nombre,plazasDisponibles,fechaAlta,}) => {
    try {
      const habitacionNueva = await this.HabitacionModel.create({
        nombre,
        plazasDisponibles,
        fechaAlta,
      });

      return habitacionNueva;
    } catch (error) {
      console.error(
        "Error creando la habitación:",
        error.message,
      );

      throw new Error("No se pudo crear la habitación");
    }
  };

  updateOne = async (
    id,
    {
      nombre,
      plazasDisponibles,
      fechaAlta,
    },
  ) => {
    try {
      const habitacionActualizada =
        await this.HabitacionModel.findByIdAndUpdate(
          id,
          {
            nombre,
            plazasDisponibles,
            fechaAlta,
          },
          {
            new: true,
            runValidators: true,
          },
        );

      return habitacionActualizada;
    } catch (error) {
      console.error(
        `Error actualizando la habitación con id ${id}:`,
        error.message,
      );

      throw new Error("No se pudo actualizar la habitación");
    }
  };

  deleteOne = async (id) => {
    try {
      return await this.HabitacionModel.findByIdAndDelete(id);
    } catch (error) {
      console.error(
        `Error eliminando la habitación con id ${id}:`,
        error.message,
      );

      throw new Error("No se pudo eliminar la habitación");
    }
  };
}