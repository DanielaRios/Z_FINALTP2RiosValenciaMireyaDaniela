export const validateNombre = (nombre) => {
  if (!nombre ||typeof nombre !== "string" || nombre.trim() === "") {
    return {
      valid: false,
      message: "El nombre no puede estar vacío",
    };
  }

  return {
    valid: true,
    message: "Nombre válido",
  };
};

export const validatePlazasDisponibles = (plazasDisponibles) => {
  if (!Number.isInteger(plazasDisponibles)) {
    return {
      valid: false,
      message: "plazasDisponibles debe ser un número entero",
    };
  }

  if (plazasDisponibles < 0) {
    return {
      valid: false,
      message: "plazasDisponibles debe ser mayor o igual a cero",
    };
  }

  return {
    valid: true,
    message: "Plazas disponibles válidas",
  };
};