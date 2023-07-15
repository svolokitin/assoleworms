import sequelize from 'sequelize';
import DataTypes from 'sequelize';
import { DB, User, Password, Host} from '../config.js';

const db = new sequelize(
	DB, User, Password, {host: Host, dialect: 'mysql'}
);

const results = await db.define("results", {
    trueAns: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    falseAns: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    }, 
    {
        timestamps: false, 
        charset: 'UTF8',
        collate: 'UTF8_general_ci'
    }
)

// db.sync({alter: true}).then(()=>{
// console.log("Tables have been sync");
// }).catch(err=>console.log(err));

export default results;
