import sequelize from 'sequelize';
import DataTypes from 'sequelize';
import Roles from './Roles.js';
import Tokens from './Tokens.js'
import results from './Results.js';
import { DB, User, Password, Host} from '../config.js';

const db = new sequelize(
	DB, User, Password, {host: Host, dialect: 'mysql'}
);

const Members = await db.define("Members", {
	full_name: {type: DataTypes.STRING, allowNull: false},
	email: {type: DataTypes.STRING, allowNull: false},
	password: {type: DataTypes.STRING, allowNull: false},
	activationLink: {type: DataTypes.STRING},
	isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
	roles: {type: DataTypes.STRING, allowNull: false, references: {model: Roles, key: 'value'}}
},
{
	timestamps: false //Убирает поля createAt и updatedAt
}
);


// Members.hasOne(results);
// results.belongsTo(Members);



// db.sync({alter: true}).then(()=>{
// console.log("Tables have been sync");
// }).catch(err=>console.log(err));

// const adminRole = new Roles({value: 'ADMIN'});
// await adminRole.save();


export default Members;
