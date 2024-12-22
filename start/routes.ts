import Route from '@ioc:Adonis/Core/Route'

// Static pages
Route.on('/').render('home');
Route.on('/login').render('login');
Route.on('/register').render('register');
Route.get('lobby', 'RoomsController.showLobby').middleware('auth');
Route.get('room/:name?', 'RoomsController.showRoom').middleware('auth');
  

// Routing REST
Route.post('register', 'AuthenticationController.register');
Route.post('login', 'AuthenticationController.login');
Route.post('logoff', 'AuthenticationController.logoff');
Route.get('admin/users', 'UsersController.getUsers');
Route.post('room', 'RoomsController.create').middleware('auth');
Route.delete('room/:name?', 'RoomsController.deleteRoom');
Route.get('rooms', 'RoomsController.getRooms').middleware('auth');
