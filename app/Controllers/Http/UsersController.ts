import User from 'App/Models/User'

export default class UsersController {

    async getUsers() {
        return User.all()
    }
}
