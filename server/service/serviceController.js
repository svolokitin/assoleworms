import Members from '../modules/Members.js';
import Roles from '../modules/Roles.js';
import results from '../modules/Results.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { MemberDto } from '../dtos/member-dto.js';
// import mailService from '../service/mail-service.js';
import tokenService from '../service/token-service.js';
// import { API_URL } from '../config.js';

class serviceController {

    async memberRegistration (full_name, email, password) {
        const candidate = await Members.findOne({
            where: {
                full_name: full_name
            }
        });
        if (candidate) {
            throw new Error(`Пользователь с именем ${full_name} уже существует!`);
        }
        //hash password
        const hashPassword = bcrypt.hashSync(password, 4);
		const activationLink = uuidv4();
		const memberRole = await Roles.findOne({
			where: {
				value: 'ADMIN'
			}
		})
        const member = await new Members({full_name, email, password: hashPassword, roles: memberRole.value, activationLink: activationLink})
		await member.save()
		// await mailService.sendActivationMail(email, `${API_URL}/api/activate/${activationLink}`);
		const memberDto = new MemberDto(member); //id, email, roles, full_name
		const tokens = await tokenService.generateTokens({...memberDto});  //оператор спред разворачивает модель в новый объект
        await results.create({id: memberDto.id})
		await tokenService.saveToken(memberDto.id, tokens.refreshToken);

        return {...tokens, member: memberDto};
	}

    async memberLogin (full_name, password) {

        const candidate = await Members.findOne({
            where: {
                full_name: full_name
            }
        })
        if (!candidate) {
            throw new Error(`Пользователя с именем ${full_name} не найдено!`);
        }
        //UNhash password
        const validPassword = bcrypt.compareSync(password, candidate.password)
        if (!validPassword) {
            throw new Error(`Вы ввели некоректный пароль!`);
        }
        const memberDto = new MemberDto(candidate);
        const tokens = await tokenService.generateTokens({...memberDto});  //оператор спред разворачивает модель в новый объект
		await tokenService.saveToken(memberDto.id, tokens.refreshToken);

        return {...tokens, member: memberDto};
    }

    async memberLogout (refreshToken) {
        const token = await tokenService.deleteToken(refreshToken);

        return token;
    }

    async refresh (refreshToken) {
        if (!refreshToken) {
            throw new Error('Refresh token doesnt exist!');
        }
        const userData = tokenService.validRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findRefreshToken(refreshToken);
        if (!userData || !tokenFromDB) {
            throw new Error('Валидация токена провалена!');
        }
        const member = await Members.findOne({
            where: {
                id: userData.id
            }
        })
        const memberDto = new MemberDto(member);
        const tokens = await tokenService.generateTokens({...memberDto});  //оператор спред разворачивает модель в новый объект
		await tokenService.saveToken(memberDto.id, tokens.refreshToken);

        return {...tokens, user: memberDto};
    }

	async getUsers () {
		const members = await Members.findAll();
		return members;
	}

	async getUserById (id) {
        if (!id) {throw new Error('id указан не верно!')}
		const member = await Members.findOne({
			where: {
				id: id
			}
		});
		return member;
	}

	async updateUser (id, full_name, email, password, roles) {
        const hashPassword = bcrypt.hashSync(password, 5);
        await Members.update(
            {
              full_name: full_name,
              email: email,
              password: hashPassword,
              roles: roles
            },
            {
              where: {
                id: id
              }
            }
        )
	}

	async deleteUser (id) {
        if (!id) {throw new Error('id указан не верно!')}
		const candidate = await Members.findOne({
			where: {
				id: id
			}
		})
		if(!candidate) {throw new Error('Member is not found!')}
		await Members.destroy({
			where: {
				id: id
			}
		})
	}

}

export default new serviceController();
