import User from "./user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export const updateUser = async (req, res) => {
    var { userName, newUserName, email, role } = req.body;

    if (role == 'ADMIN' || role == 'CLIENT') {
        await User.findOneAndUpdate({ userName: userName }, { $set: { userName: newUserName, email: email, role: role } });
        return res.status(200).json({
            msg: "User udapted successfully✅",
        });
    }
    return res.status(400).json({
        msg: "Invalid role"
    });
}

export const deleteUser = async (req, res) => {
    const { userName } = req.body;
    await User.findOneAndUpdate({ userName: userName }, { $set: { estado: false } });
    res.status(200).json({
        msg: "User delete successfully✅",
    });
}

export const editMyProfile = async (req, res) => {
    const { newUserName, email } = req.body;
    const idUser = jwt.verify(token, process.env.PASSWEBTOKEN).userId;
    await User.findByIdAndUpdate(idUser, { $set: { userName: newUserName, email: email } });
    res.status(200).json({
        msg: "User udapted successfully✅",
    });
}
export const deleteMyProfile = async (req, res) => {
    var { password } = req.body;
    const idUser = jwt.verify(token, process.env.PASSWEBTOKEN).userId;
    const user = await User.findById(idUser);
    let result = bcrypt.compareSync(password, user.password);
    if (result) {
        await User.findByIdAndUpdate(idUser, { estado: false });
        res.status(200).json({
            msg: "User deleted successfully✅ - SESSION CLOSED",
        });
    } else {
        res.status(400).json({
            msg: "The password is incorrect❌",
        });
    }
    global.token = null;
}

