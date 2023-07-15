import  jwt  from 'jsonwebtoken'; 
import { JWT_ACCESS_SECRET } from '../config.js';

export function checkAuthUser (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({message: "Для начала авторизуйтесь!"});
        }
        const decodedData = jwt.verify(token, JWT_ACCESS_SECRET);
        req.user = decodedData;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({message: "Для начала авторизуйтесь!"});
    }
}

