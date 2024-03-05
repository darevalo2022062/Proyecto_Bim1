import jwt from "jsonwebtoken";
import User from "../users/user.js";

export const validarAdmin = async (req, res, next) => {
    const token = global.token;
    if (!token) {
        return res.status(400).json({
            msg: '¡Log in first!🔐'
        });
    }
    const idUser = jwt.verify(token, process.env.PASSWEBTOKEN);
    const userResult = await User.findById(idUser.userId);
    if (userResult.role != 'ADMIN') {
        return res.status(400).json({
            msg: 'This action is only available for ADMINS 👨🏽‍💼❌'
        });
    }
    next();
}