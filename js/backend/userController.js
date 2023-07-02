import mysql from './connectToDB.js';
import Members from './Members.js';

class userController {

	async getUsers (req, res) {
		try {
			const post = await Members.findAll();
			return res.json(post);
		} catch (err) {
			res.status(500).json(err.message);
		}
	}

	async getUserById (req, res) {
		try {
			const {id} = req.params; 
			const post = await Members.findOne({
				where: {
					id: id
				}
			});
			return res.json(post);
		} catch (err) {
			res.status(500).json(err.message);
		}
	}

	async updateUser (req, res) {
		try {
			const {id, full_name, email, password} = req.body;
			const sql = `UPDATE Members SET full_name = '${full_name}', email = '${email}', password = '${password}' WHERE id = ${id}`;
			mysql.query(sql, function (err, result) {
				if (err) console.log(err.message);
				console.log(result.affectedRows + ' record(s) updated!');
			})
			return res.json("Post successfully updated!");
		} catch (err) {
			return res.status(500).json(err.message);
		}
	}

	async deleteUser (req, res) {
		try {
			const {id} = req.params;
			const candidate = await Members.findOne({
				where: {
					id: id
				}
			})
			if(!candidate) {
				return res.status(400).json({message: 'Users does not exist'})
			}
			const post = await Members.destroy({
				where: {
					id: id
				}
			})
			return res.json(`Post with id: ${id} delete..`);
		} catch (err) {
			res.status(500).json(err.message);
		}
	}
}

export default new userController();
