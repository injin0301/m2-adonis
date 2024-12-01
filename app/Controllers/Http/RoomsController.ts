import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'

export default class RoomsController {
    async create({ response, request, view, auth, session }: HttpContextContract) {
        let name = request.input('name');

        if(name == null) {
            response.status(404); 
            return view.render('lobby', { error: 'A room need a name.' });
        }  

        let roomexist = await Room.findBy('name', name);
        if(roomexist) {            
            const rooms = await this.getRooms();
            return view.render('lobby', { error: 'A room already exists with this name.', rooms });
        }

        let room = new Room();
        room.name = name;
        await room.save();
        
        view.share({ message: "New room created" })
        return response.redirect('lobby');
    }

    async getRooms() {
        return Room.all();
    }

    async showLobby({ view, auth }: HttpContextContract) {
        const rooms = await this.getRooms()
        const user = await auth.use('web').authenticate();
        return view.render('lobby', { rooms : rooms, user: user })
    }

    async showRoom({ request, view, auth }: HttpContextContract) {
        const roomName = request.qs().name;
        const user = await auth.use('web').authenticate();
        return view.render('room', { roomname: roomName, user: user });
    }

    async deleteRoom({ view, auth, params, response}: HttpContextContract) { 
        console.log("delete room : " + params.name)       
        const room = await Room.findBy('name', params.name);
        await room?.delete()
        const rooms = await this.getRooms()
        const user = await auth.use('web').authenticate();
        console.log('params', params)   
        console.log('params', auth) 
        return view.render('lobby', { rooms : rooms, user: user })
    }
}