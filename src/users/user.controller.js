import User from "./user.js";
import bcrypt from 'bcrypt';

export const registerCliente = async (req, res) => {
    var { userName, email, password } = req.body;
    password = bcrypt.hashSync(password, 10);

    const role = 'CLIENT';
    const user = new User({ userName, email, password, role });

    await user.save();
    res.status(200).json({
        msg: "Registred Successfully✅",
        user
    });
}

export const registerAdmin = async (req, res) => {
    var { userName, email, password } = req.body;
    password = bcrypt.hashSync(password, 10);

    const role = 'ADMIN';
    const user = new User({ userName, email, password, role });

    await user.save();
    res.status(200).json({
        msg: "Registred Successfully✅",
        user
    });
}

export const addUser = async (req, res) => {
    var { userName, email, password, role } = req.body;
    password = bcrypt.hashSync(password, 10);

    const user = new User({ userName, email, password, role });

    await user.save();
    res.status(200).json({
        msg: "User successfully added✅",
        user
    });

} 