import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import { v4 as uuidv4 } from 'uuid'

const {DataTypes} = Sequelize;

const Users = db.define('users',{
    uuid: {
        type: DataTypes.STRING,
        defaultValue: () => uuidv4(),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

export default Users;