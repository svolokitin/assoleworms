import sequelize from 'sequelize';
import DataTypes from 'sequelize';
import { DB, User, Password, Host} from '../config.js';

const db = new sequelize(
	DB, User, Password, {host: Host, dialect: 'mysql'}
);


const Tokens = await db.define('Tokens', {
    refreshToken: {type: DataTypes.STRING}
},
{
	timestamps: false
})

// db.sync({alter: true}).then(()=>{
// 	console.log("Tables have been sync");
// }).catch(err=>console.log(err));

export default Tokens;
