import User from "../users/user.js"

export const userNameExistence = async (userName) => {
    const existence = await User.findOne({ userName: userName, estado: true });
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

export const emailExistenceUpdate = async (email) => {
    const existence = await User.findOne({ email: email });
    const idUpdate = global.userUpdateID.toString();
    const idExistence = existence._id.toString();
    if (idExistence != idUpdate) {
        throw new Error("This email is already in use, please choose another one :)");
    }
}

export const existenceIdentifier = async (identifier) => {
    var user = await User.findOne({
        $or: [
            { userName: identifier },
            { email: identifier }
        ]
    });

    if (!user) {
        throw new Error("This user does not exists in DB :(");
    }

}

export const userNameVerifExistence = async (userName) => {
    global.userUpdateID = null;
    const existence = await User.findOne({ userName: userName, estado: true });
    if (!existence) {
        throw new Error("This user does not exist, sorry :c");
    }
    global.userUpdateID = existence._id;
}

export const isClient = async (userName) => {
    const existence = await User.findOne({ userName: userName, role: 'CLIENT' });
    if (!existence) {
        throw new Error("This CLIENT does not exist, sorry :c");
    }
}