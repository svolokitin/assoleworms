import sequelize from 'sequelize';
import DataTypes from 'sequelize';
import {User, Host, DB, Password} from './config.js';



const db = new sequelize(
	DB, User, Password, {host: Host, dialect: 'mysql'}
);


const Members = await db.define("Members", {
	full_name: {type: DataTypes.STRING, allowNull: false},
	email: {type: DataTypes.STRING, allowNull: false},
	password: {type: DataTypes.STRING, allowNull: false}
});

// await Members.sync({ force: true });
// console.log("The table for the Members model was just (re)created!");

export default Members;
