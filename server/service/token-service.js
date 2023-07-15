import Tokens from '../modules/Tokens.js';
import  jwt  from 'jsonwebtoken'; 
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../config.js';

class TokenService {

    async generateTokens (payload) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: '1h'});
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken (userId, refreshToken) {
        const tokenData = await Tokens.findOne({
            where: {
                id: userId
            }
        });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Tokens.create({id: userId, refreshToken});
        return token;
    }

    

    async deleteToken (refreshToken) {
        if (!refreshToken) {
            throw new Error('token not exist!')
        }
        const tokenData = await Tokens.destroy({
            where: {
                refreshToken: refreshToken
            }
        });

        return tokenData;
    }

    validAccessToken (token) {
        try {
            const userData = jwt.verify(token, JWT_ACCESS_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }
    
    validRefreshToken (token) {
        try {
            const userData = jwt.verify(token, JWT_REFRESH_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    async findRefreshToken (token) {
        try {
            const findToken = await Tokens.findOne({
                where: {
                    refreshToken: token
                }
            })
            return findToken;
        } catch (err) {
            throw new Error('Refresh token not exist!');
        }
    }
}

export default new TokenService();
