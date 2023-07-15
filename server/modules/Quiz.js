import sequelize from 'sequelize';
import DataTypes from 'sequelize';
import { DB, User, Password, Host} from '../config.js';

const db = new sequelize(
	DB, User, Password, {host: Host, dialect: 'mysql'}
);

const questions = await db.define("questions", {
        difficult: {type: DataTypes.STRING, allowNull: false},
        question: {type: DataTypes.STRING, allowNull: false},
        a: {type: DataTypes.STRING},
        b: {type: DataTypes.STRING},
        c: {type: DataTypes.STRING},
        d: {type: DataTypes.STRING},
        correct: {type: DataTypes.STRING, allowNull: false}
    },
    {
        timestamps: false, 
        charset: 'UTF8',
        collate: 'UTF8_general_ci'
    }
)

// db.sync({force:true}).then(()=>{
// console.log("Tables have been created");
// }).catch(err=>console.log(err));

export default questions;
