import { Router } from 'express';
import userModel from "../dao/models/user.model.js"
import { createHash } from '../utils.js';
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
    const user = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password)
    }
    await userModel.create(user);
    res.send({ status: "success", message: "User registered" });
})

router.get('/failregister', (req, res) => {
    res.status(400).send({ status: "error", error: "Registry fail" });
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    res.send({ status: "success", payload: req.session.user, message: "Logueo realizado! :)" });
})

router.get('/faillogin', (req, res) => {
    res.status(400).send({ status: "error", error: "Login fail" });
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" });
        res.redirect('/login');
    })
})

export default router;