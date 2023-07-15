import sequelize from 'sequelize';
import DataTypes from 'sequelize';
import { DB, User, Password, Host} from '../config.js';

const db = new sequelize(
	DB, User, Password, {host: Host, dialect: 'mysql'}
);

const Roles = await db.define("Roles", {
	value: {type: DataTypes.STRING, allowNull: false, unique: true, defaultValue: 'USER'}
},
{
   timestamps: false //Убирает поля createAt и updatedAt
}   
);

// db.sync({force:true}).then(()=>{
// 	console.log("Tables have been created");
// }).catch(err=>console.log(err));

// db.sync({ alter: true })

export default Roles;
