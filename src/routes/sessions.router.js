import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    console.log(req.session.user)
    res.send({ status: "success", message: "User registered" });
})

router.get('/failregister', (req, res) => {
    res.status(400).send({ status: "error", error: "Registry fail" });
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin'}), async (req, res) => {
    try {
        if (!req.user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });
        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            age: req.user.age
        }
    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/faillogin', (req, res) => {
    res.status(400).send({ status: "error", error: "Login fail" });
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" });
        res.redirect('/login');
    })
})

export default router;