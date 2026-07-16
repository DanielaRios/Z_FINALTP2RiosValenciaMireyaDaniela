import { HabitacionRepositoryMongoose } from "../repository/habitacion.Mongo.Repository.js";
import { validateNombre, validatePlazasDisponibles, } from "../validators/habitacion.validators.js";

const HabitacionRepository = new HabitacionRepositoryMongoose();

export const HabitacionController = {

    // Obtengo todas las habitaciones, con opción de filtrar por disponibilidad
    getAllHabitaciones: async (request, response) => {
        try {
            const { disponible } = request.query;

            let filtro = {};

            if (disponible === "true") {
                filtro = {
                    plazasDisponibles: {
                        $gt: 0,
                    },
                };
            }

            const habitaciones = await HabitacionRepository.getAll(filtro);

            return response.status(200).json({
                message: "Habitaciones obtenidas correctamente",
                payload: habitaciones,
            });
        } catch (error) {
            console.error(
                "Error al obtener las habitaciones:",
                error.message,
            );

            return response.status(500).json({
                statusCode: 500,
                error: "Error interno del servidor",
            });
        }
    },

    // Obtengo una habitación por su ID
    getById: async (request, response) => {
        try {
            const { id } = request.params;

            const habitacion = await HabitacionRepository.getOne(id);

            if (!habitacion) {
                return response.status(404).json({
                    statusCode: 404,
                    error: "Habitación no encontrada",
                });
            }

            return response.status(200).json({
                message: "Habitación obtenida correctamente",
                payload: habitacion,
            });
        } catch (error) {
            console.error(
                "Error al obtener la habitación:",
                error.message,
            );

            return response.status(400).json({
                statusCode: 400,
                error: "ID de habitación inválido",
            });
        }
    },

    // Creo una nueva habitación
    createByJson: async (request, response) => {
        try {
            const {
                nombre,
                plazasDisponibles,
                fechaAlta,
            } = request.body;

            const validacionNombre = validateNombre(nombre);

            if (!validacionNombre.valid) {
                return response.status(400).json({
                    statusCode: 400,
                    error: validacionNombre.message,
                });
            }

            const validacionPlazas =
                validatePlazasDisponibles(plazasDisponibles);

            if (!validacionPlazas.valid) {
                return response.status(400).json({
                    statusCode: 400,
                    error: validacionPlazas.message,
                });
            }

            const habitacionNueva =
                await HabitacionRepository.createOne({
                    nombre: nombre.trim(),
                    plazasDisponibles,
                    fechaAlta,
                });

            return response.status(201).json({
                message: "Habitación creada correctamente",
                payload: habitacionNueva,
            });
        } catch (error) {
            console.error(
                "Error al crear la habitación:",
                error.message,
            );

            return response.status(500).json({
                statusCode: 500,
                error: "Error interno del servidor",
            });
        }
    },

    // Actualizo una habitación existente
    updateByJson: async (request, response) => {
        try {
            const { id } = request.params;

            const habitacionActual =
                await HabitacionRepository.getOne(id);

            if (!habitacionActual) {
                return response.status(404).json({
                    statusCode: 404,
                    error: "Habitación no encontrada",
                });
            }

            const {
                nombre,
                plazasDisponibles,
                fechaAlta,
            } = request.body;

            const validacionNombre = validateNombre(nombre);

            if (!validacionNombre.valid) {
                return response.status(400).json({
                    statusCode: 400,
                    error: validacionNombre.message,
                });
            }

            const validacionPlazas =
                validatePlazasDisponibles(plazasDisponibles);

            if (!validacionPlazas.valid) {
                return response.status(400).json({
                    statusCode: 400,
                    error: validacionPlazas.message,
                });
            }

            const plazasActuales =
                habitacionActual.plazasDisponibles;

            const plazasValidas =
                plazasDisponibles === plazasActuales ||
                plazasDisponibles === plazasActuales + 1;

            if (!plazasValidas) {
                return response.status(400).json({
                    statusCode: 400,
                    error:
                        "plazasDisponibles solamente puede permanecer igual o incrementarse en 1",
                });
            }

            const habitacionActualizada =
                await HabitacionRepository.updateOne(id, {
                    nombre: nombre.trim(),
                    plazasDisponibles,
                    fechaAlta:
                        fechaAlta ?? habitacionActual.fechaAlta,
                });

            return response.status(200).json({
                message: "Habitación actualizada correctamente",
                payload: habitacionActualizada,
            });
        } catch (error) {
            console.error(
                "Error al actualizar la habitación:",
                error.message,
            );

            return response.status(400).json({
                statusCode: 400,
                error: "No se pudo actualizar la habitación",
            });
        }
    },

    // Elimino una habitación por su ID
    deleteById: async (request, response) => {
        try {
            const { id } = request.params;

            const habitacionEliminada =
                await HabitacionRepository.deleteOne(id);

            if (!habitacionEliminada) {
                return response.status(404).json({
                    statusCode: 404,
                    error: "Habitación no encontrada",
                });
            }

            return response.status(200).json({
                message: "Habitación eliminada correctamente",
                payload: habitacionEliminada,
            });
        } catch (error) {
            console.error(
                "Error al eliminar la habitación:",
                error.message,
            );

            return response.status(400).json({
                statusCode: 400,
                error: "No se pudo eliminar la habitación",
            });
        }
    },
};