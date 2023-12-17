import User from "../models/UserModel.js";
import argon2 from "argon2";

export const createUser = async(req, res) => {
    const { name, email, password, confPassword } = req.body;

    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    }

    const hashPassword = await argon2.hash(password);

    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword
        });

        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ msg: 'Email address is already in use' });
        }

        res.status(400).json({ msg: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        // Get the user from the database
        const user = await User.findByPk(req.userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Update user data based on request body
        user.name = req.body.name || user.name;

        // Check if a new email is provided and require the current password for email update
        if (req.body.email && req.body.email !== user.email) {
            const currentPassword = req.body.currentPassword;

            if (!currentPassword) {
                return res.status(400).json({ msg: "Current password is required for email update" });
            }

            const isPasswordValid = await argon2.verify(user.password, currentPassword);

            if (!isPasswordValid) {
                return res.status(401).json({ msg: "Current password is incorrect" });
            }

            // Update the email
            user.email = req.body.email;
        }

        // Check if a new password is provided and require the current password for password update
        if (req.body.newPassword) {
            const currentPassword = req.body.currentPassword;

            if (!currentPassword) {
                return res.status(400).json({ msg: "Current password is required for password update" });
            }

            const isPasswordValid = await argon2.verify(user.password, currentPassword);

            if (!isPasswordValid) {
                return res.status(401).json({ msg: "Current password is incorrect" });
            }

            // Update the password
            const hashNewPassword = await argon2.hash(req.body.newPassword);
            user.password = hashNewPassword; // Update the password field with the hashed password
        }

        // Save the updated user to the database
        await user.save();

        // Respond with the updated user data
        res.status(200).json({
            msg: "User data updated successfully",
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ msg: 'Email address is already in use' });
        }
        console.error("Error in updateUser controller:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};
