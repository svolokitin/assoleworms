import  jwt  from 'jsonwebtoken'; 
import { JWT_ACCESS_SECRET } from '../config.js';

export function checkRolesUser (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
    
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован!"});
            }
            const {roles: userRoles} = jwt.verify(token, JWT_ACCESS_SECRET);
            let hasRoles = false;
            if (userRoles == 'ADMIN') {
                hasRoles = true;
            }
            if (!hasRoles) {
                return res.status(403).json({message: "У вас нет доступа!"})
            }
            next();
        } catch (err) {
            console.log(err);
            return res.status(403).json({message: "Error middleware!"});
        }
    }
}
