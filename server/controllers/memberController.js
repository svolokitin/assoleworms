import serviceController from '../service/serviceController.js';
import { validationResult } from 'express-validator';
import { JWT_ACCESS_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

class memberController {

	async memberRegistration (req, res) {
		try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Error registration!', errors});
            }
			const {full_name, email, password} = req.body;
			const newMember = await serviceController.memberRegistration(full_name, email, password);
			res.cookie('refreshToken', newMember.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

			return res.json(newMember);
		} catch (err) {
            console.log(err);
			return res.status(500).json(err.message);
		}
	}

    async memberLogin (req, res) {
        try {
            const {full_name, password} = req.body;
			const member = await serviceController.memberLogin(full_name, password);
			res.cookie('refreshToken', member.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(member);
        } catch (err) {
            return res.status(500).json({message: 'Не удалось войти в аккаунт!' + err.message})
        }
    }

	async memberLogout (req, res, next) {
		try {
			const {refreshToken} = req.cookies;
			if (!refreshToken) {
				res.status(403).json({message: 'Token is not exist!'})
			}
			await serviceController.memberLogout(refreshToken);
			res.clearCookie('refreshToken');

			return res.json({message: 'Logout success!'});
		} catch (err) {
			next(err);
		}
	}

	async memberRefresh (req, res, next) {
		try {
			const {refreshToken} = req.cookies;
			const member = await serviceController.refresh(refreshToken);
			res.cookie('refreshToken', member.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

			return res.json({message: "Токен успешно перезаписан!"})
		} catch (err) {
			next(err);
		}
	}

	async activate (req, res) {
		try {

		} catch (err) {

		}
	}

	async getMembers (req, res) {
		try {
			const members = await serviceController.getUsers();
			return res.json(members);
		} catch (err) {
			return res.status(500).json(err.message);
		}
	}

	async getMemberById (req, res) {
		try {
			const { id } = req.params; 
			const member = await serviceController.getUserById(id)
			return res.json(member);
		} catch (err) {
			return res.status(500).json(err.message);
		}
	}

	async getMember(req, res) {
		try {
            const token = req.headers.authorization.split(' ')[1];
			if (!token) {
				return res.status(401).json({message: "User not auth!"})
			}
            const decodeToken = jwt.verify(token, JWT_ACCESS_SECRET);
    
            return res.json(decodeToken.full_name);
		} catch (err) {
			return err.message;
		}
	}

	async updateMember (req, res) {
		try {
			const {id, full_name, email, password, roles} = req.body;
			await serviceController.updateUser(id, full_name, email, password, roles);
			return res.json({message: "Member updated!"});
		} catch (err) {
			return res.status(500).json(err.message);
		}
	}

	async deleteMember (req, res) {
		try {
			const {id} = req.params;
			await serviceController.deleteUser(id);
			return res.json(`Post with id: ${id} delete..`);
		} catch (err) {
			res.status(500).json(err.message);
		}
	}
}

export default new memberController();
