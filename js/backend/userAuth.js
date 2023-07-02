import Members from './Members.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

class userAuth {

    async userRegistration (req, res) {
		try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Error registration!', errors});
            }
			const {full_name, email, password} = req.body; 
            const candidate = await Members.findOne({
                where: {
                    full_name: full_name
                }
            });
            if (candidate) {
                return res.status(400).json({message: "Name is alredy exist!"}); 
            }
            //hash password
            const hashPassword = bcrypt.hashSync(password, 5);
			// const member = new Members({full_name, email, password: hashPassword})
            // await member.save()
            const member = await Members.create({full_name, email, password: hashPassword})
			return res.json(member);
		} catch (err) {
            console.log(err);
			return res.status(500).json(err.message);
		}
	}

    async userLogin (req, res) {
        try {
            const {full_name, password} = req.body;
            const member = await Members.findOne({
                where: {
                    full_name: full_name
                }
            })
            if (!member) {
                return res.status(400).json({message: `User ${full_name} not found!`})
            }
            //UNhash password
            const validPassword = bcrypt.compareSync(password, member.password)
            if (!validPassword) {
                return res.status(400).json({message: `Enter incorect password!`})
            }
            return res.status(200).json({message: 'Log in success'})
        } catch (err) {
            return res.status(500).json({message: 'Error login!'})
        }
    }

}

export default new userAuth();
