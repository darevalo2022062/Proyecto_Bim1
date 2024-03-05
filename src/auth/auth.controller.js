import bcrypt from 'bcrypt';
import User from '../users/user.js';
import { generateToken } from '../helpers/generate-jwt.js';

//Validación de datos
export const login = async (req, res) => {
    var { identifier, password } = req.body;
    var user = await User.findOne({
        $or: [
            { userName: identifier },
            { email: identifier }
        ]
    });
    password = await bcrypt.compare(password, user.password);
    if (password) {
        // -> CUENTA VALIDADA
        let token = await generateToken(user._id);
        global.token = null;
        global.token = token;
        res.status(200).json({
            msg: 'session logged in successfully🔓✅',
        });
    } else {
        global.loginID = null;
        res.status(200).json({
            msg: 'Incorrect password🔒❌'
        });
    }
}