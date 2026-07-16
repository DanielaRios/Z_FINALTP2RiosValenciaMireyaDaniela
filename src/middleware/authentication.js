import { getToken } from "../auth/getToken.js";
import { validateToken } from "../auth/jwt.js";

export const authenticateToken = async (
    request,
    response,
    next,
) => {
    try {
        const token = getToken(request);

        if (!token) {
            return response.status(401).json({
                statusCode: 401,
                error: "Token no enviado",
            });
        }

        const payload = validateToken(token);

        request.user = payload;

        next();
    } catch (error) {
        return response.status(401).json({
            statusCode: 401,
            error: "Token inválido o vencido",
        });
    }
};