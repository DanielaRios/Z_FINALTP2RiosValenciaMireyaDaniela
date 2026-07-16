import fs from "fs/promises";
import path from "path";

export const PokemonController = {
  generarCsv: async (request, response) => {
    try {
      const pokemones = [];

      // consulto los Pokémon del 1 al 15 de forma secuencial
      for (let id = 1; id <= 15; id++) {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

        const apiResponse = await fetch(apiUrl);

        if (!apiResponse.ok) {
          return response.status(apiResponse.status).json({
            statusCode: apiResponse.status,
            error: `Error al obtener el Pokémon con ID ${id}`,
          });
        }

        const pokemon = await apiResponse.json();

        pokemones.push({
          id: pokemon.id,
          name: pokemon.name,
          height: pokemon.height,
          weight: pokemon.weight,
          base_experience: pokemon.base_experience,
        });
      }

      const encabezado = "id,name,height,weight,base_experience";

      const filas = pokemones.map((pokemon) =>
        [
          pokemon.id,
          pokemon.name,
          pokemon.height,
          pokemon.weight,
          pokemon.base_experience,
        ].join(","),
      );

      const csv = [encabezado, ...filas].join("\n");

      const rutaArchivo = path.join(
        process.cwd(),
        "src",
        "data",
        "pokemon_15.csv",
      );

      await fs.writeFile(rutaArchivo, csv, "utf-8");

      response.setHeader(
        "Content-Type",
        "text/csv; charset=utf-8",
      );

      response.setHeader(
        "Content-Disposition",
        'attachment; filename="pokemon_15.csv"',
      );

      return response.status(200).send(csv);
    } catch (error) {
      console.error(
        "Error al generar el archivo CSV:",
        error.message,
      );

      return response.status(500).json({
        statusCode: 500,
        error: "Error interno al generar el archivo CSV",
      });
    }
  },
};