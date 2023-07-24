import passport from "passport";
import local from "passport-local"
import userModel from "../dao/models/user.model.js"
import {createHash,isValidPassword} from "../utils.js"

const LocalStrategy = local.Strategy;
const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        console.log(first_name, last_name, email, age)
        try {
            let user = await userModel.findOne({ email: username });
            if (user) return done(null, false);
            console.log("seguimos")
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
            }
            user = await userModel.create(newUser);
            return done(null, user);
        } catch (error) {
            return done(null, false, { message: "Error creating user" });
        }
    }));

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });
            if (!user) {
                console.log("User not found");
                return done(null, false, { message: "User not found" });
            }
            if (!isValidPassword(password, user.password)) {
                console.log("Invalid credentials");
                return done(null, false, { message: "Invalid credentials" });
            }
            return done(null, user);
        } catch (error) {
            console.error("Error logging in:", error);
            return done({ message: "Error logging in" });
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (_id, done) => {
        try {
            const user = await userService.findOne({ _id });
            return done(null, user);
        } catch {
            return done({ message: "Error deserializing user" });
        }
    });
};

export default initializePassport;