import quiz from '../modules/Quiz.js';
import results from '../modules/Results.js';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from '../config.js';


class quizController {

    async createQuizes (req, res) {
        try {
            const {difficult, question, a, b, c, d, correct} = req.body;
            const quizes = new quiz({difficult, question, a, b, c, d, correct});
            await quizes.save();

            return res.json({message: "Quiz create!"});
        } catch (err) {
            return err.message;
        }
    }

    async updateQuize (req, res) {
        try {
            const {difficult, question, a, b, c, d, correct} = req.body;
            const {id} = req.params;
            const candidate = await quiz.findOne({
                where: {
                    id: id
                }
            })

            if (!candidate) {
                return res.status(404).json({message: "Quiz not found!"})
            }

            await quiz.update(
                {
                difficult: difficult,
                question: question,
                a: a,
                b: b,
                c: c,
                d: d,
                correct: correct
                }, {
                    where: {
                        id: id
                    }
                }
            );

            return res.status(200).json({message: "Quiz is update"});
        } catch (err) {
            return res.status(500).json({message: "Server error!"});
        }
    }
    
    async getQuizes (req, res) {
        try {
            const quizes = await quiz.findAll();

            return res.status(200).json(quizes);
        } catch (err) {
            return err.message;
        }
    }

    async getQuiz (req, res) {
        try {
            const {id} = req.params;
            const quize = await quiz.findOne({
                where: {
                    id: id
                }
            })

            return res.status(200).json(quize);
        } catch (err) {
            return err.message;
        }
    }

    async deleteQuiz (req, res) {
        try {
            const {id} = req.params;
            const candidate = await quiz.findOne({
                where: {
                    id: id
                }
            })
            
            if (!candidate) {
                return res.status(404).json({message: "Quiz not found!"})
            }

            await quiz.destroy({
                where: {
                    id: id
                }
            })

            return res.status(200).json({message: "Quiz is delete!"})
        } catch (err) {
            return err.message;
        }
    }

    async saveResults (req, res) {
        try {
            const {trueAns, falseAns} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const decodeToken = jwt.verify(token, JWT_ACCESS_SECRET);
            const candidate = await results.findOne({
                where: {
                    id: decodeToken.id
                }
            })
            if (!candidate) {
                return res.status(404).json({message: "Results not found!"});
            }
            await results.update({
                trueAns: trueAns,
                falseAns: falseAns
                },
                {
                    where: {
                        id: decodeToken.id
                    }
                }
            )

            return res.status(200).json({message: "Results save!"});
        } catch (err) {
            return err.message;
        }
    }

    async deleteResults (req, res) {
        try {
            const {id} = req.params;
            const candidate = await results.findOne({
                where: {
                    id: id
                }
            })
            if (!candidate) {
                return res.status(404).json({message: "Results not exist!"})
            }
            await results.destroy({
                where: {
                    id: id
                }
            })
            return res.json({message: "Results delete success!"})
        } catch (err) {
            return err.message;
        }
    }

}

export default new quizController();
