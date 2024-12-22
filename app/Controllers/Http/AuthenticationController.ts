import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class AuthenticationController {

    async register({ response, request, view }: HttpContextContract) {
        let email = request.input('email');
        let password = request.input('password');

        if(email == null || password == null) {
            response.status(403); 
            return view.render('register', { error: 'Email and password are necessary for register.' });
        }           

        const userexist = await User.findBy('email', email)
        if(userexist) {
            response.status(403); 
            return view.render('register', { error: 'This email already exist' });
        }

        // Salt for security
        const hashedPassword = await Hash.make(password)

        const user = new User();
        user.email = email;
        user.password = hashedPassword;

        await user.save();

        return response.redirect('/login');
    }

    async login({ response, request, view, auth }: HttpContextContract) {
        let email = request.all().email;
        let password = request.all().password;

        if(email == null || password == null) {
            response.status(403); 
            return view.render('login', { error: 'Email and password are necessary for login.' });
        }       
        
        const userexist = await User.findBy('email', email);
        if(!userexist) {
            response.status(403); 
            return view.render('login', { error: 'This email is not registered' });
        }

        try {
            await auth.use('web').attempt(request.input('email'), request.input('password'))
            return response.redirect('/lobby')
            } catch {
            return response.badRequest('Invalid credentials')
        }
           
    }

    async getUserConnected({ auth }: HttpContextContract) {
        
    const user = await auth.use('web').authenticate();
    return user;
    }

    async logoff({ response, request, view, auth }: HttpContextContract) {
        await auth.use('web').logout();
        return view.render('home');
    }
}