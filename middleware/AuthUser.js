import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
        }

        const user = await User.findOne({
            where: {
                uuid: req.session.userId
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }

        req.userId = user.id;
        next();
    } catch (error) {
        console.error("Error in verifyUser middleware:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};