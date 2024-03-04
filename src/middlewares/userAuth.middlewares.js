import User from "../users/user.js"

export const userNameExistence = async (userName) => {
    const existence = await User.findOne({ userName: userName });
    if (existence) {
        throw new Error("This username is already in use, please choose another one :)");
    }
}

export const emailExistence = async (email) => {
    const existence = await User.findOne({ email: email });
    if (existence) {
        throw new Error("This email is already in use, please choose another one :)");
    }
}