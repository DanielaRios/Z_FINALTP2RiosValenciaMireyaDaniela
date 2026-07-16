import mongoose from "mongoose";
import { Schema } from "mongoose";

const habitacionSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    plazasDisponibles: {
      type: Number,
      required: true,
      min: 0,
    },

    fechaAlta: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
  },
  {
    collection: "habitaciones",
    versionKey: false,
  },
);

export const HabitacionModel = mongoose.model("Habitacion",habitacionSchema,);