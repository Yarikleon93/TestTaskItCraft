const { Router } = require("express");
const router = Router();
const db = require("../models");
const User = db.users;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth.middleware')

//GET ALL USERS FOR AUTH_USER
router.get("/users",auth , async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ message: users });
    } catch {
        res.status(500).json({ message: "Что то не так" });
    }
});


//REGISTRATION
router.post("/users", 
    [ 
        check("name", "Имя должно быть от 3 до 35 символов").isLength({ min: 3, max: 255 }), 
        check("login", "Логин должен быть от 3 до 25 символов").isLength({ min: 3, max: 255 }), 
        check("password", "Пароль должен быть от 3 до 25 символов").isLength({ min: 3, max: 255 })
    ], 
    async (req, res) => {
        //validation
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!",
                success: false
            });
            return;
        }
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные',
                    success: false
                })
            }
        if(req.body.password != req.body.second_pass){
            return res.status(400).json({message: "Пароли не равны!", success: false})
        }
        // checking for user existence
        const candidate = await User.findOne({ where: { login: req.body.login } });
        if (candidate) {
            return res.status(400).json({ message: "Пользователь существует", success: false });
        }
        //create user
        const salt = crypto.randomBytes(20).toString("hex").slice(0, 5);
        const password = crypto.createHash("md5").update(req.body.password + salt).digest("hex");
        const user = {
            name: req.body.name,
            login: req.body.login,
            password: password,
            salt: salt,
        };
        //save user
        await User.create(user)
            .then((data) => {
                const token = jwt.sign({ userId: data.id }, config.get("jwtSecret"), { expiresIn: "1h" });
                res.json({ token, data, message: "Пользователь создан", success: true });
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error",
                });
            });
});


//AUTH USER
router.post("/auth", 
[ 
    check("login", "Логин должен быть от 3 до 25 символов").isLength({ min: 3, max: 255 }), 
    check("password", "Пароль должен быть от 3 до 25 символов").isLength({ min: 3, max: 255 })
], 
async (req, res) => {
    //validation
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false, 
                errors: errors.array(),
                message: 'Некоректные данные'
            })
        }
    // checking for user entry
    const {login, password} = req.body;
    const candidate = await User.findOne({ where: { login: login } });
    if (!candidate) {
        return res.status(400).json({success: false, message: "Пользователь не найден" });
    }
    let crypto_password = crypto.createHash("md5").update(password + candidate.salt).digest("hex");
    if (crypto_password === candidate.password){
        const token = jwt.sign({ userId: candidate.id }, config.get("jwtSecret"), { expiresIn: "1h" });
        return res.json({ token, candidate, success: true, message: "Вы успешно авторизовались" });
    }
    else{
        return res.status(201).json({success: false, message: "Неверный пароль" });
    }
    
});

module.exports = router;
