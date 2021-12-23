import { db } from "@loaders/database";
import { User } from "@/interfaces/user";

export default class userModel {
    static async getUserByEmail(email: string, inculdePassword: boolean = false) {
        const user: User = await db('users').select().where('email', email).first()

        if (!inculdePassword) {
            user.password = undefined;
        }

        return user
    }
}
