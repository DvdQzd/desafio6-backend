import { fileURLToPath } from "url"
import { dirname } from "path"
import bcrypt from "bcrypt"

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))
export const isValidPassword = (password, hash) => bcrypt.compareSync(password, hash)
//export const isValidPassword = (user, password) => {
//    if (!user || typeof password !== 'string' || typeof user.password !== 'string') {
//        return false;
//    }
//    return bcrypt.compareSync(password, user.password);
//};

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname