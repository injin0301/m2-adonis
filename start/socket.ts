import Ws from 'App/Services/Ws'

Ws.boot()

let players = new Map();

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  // Join room name
  socket.join(socket.handshake.auth.name);
  
  socket.on('message', async (data) => {
    socket.to(socket.handshake.auth.name).emit("new message", { sender: data.sender, content: data.content });
  })

  socket.on('game', async (data) => {
    // key is user email / Value is room name, and value choose by player paper rock scissor
    players.set(data.sender, [socket.handshake.auth.name, data.content]);

    let player1 = ''
    let player1plays = ''
    let player2 = ''
    let player2plays = ''
  
    // Get players values
    for (const [key, value] of players) {
      if(value[0] === socket.handshake.auth.name && key === data.sender) {
        player1 = key
        player1plays = value[1]
      }
  
      if(value[0] === socket.handshake.auth.name && key != data.sender) {
        player2 = key
        player2plays = value[1]
      }
    }

    let winnerName = whoWin(player1, player1plays, player2, player2plays)
    Ws.io.to(socket.handshake.auth.name).emit("game", { winner: winnerName, player1 : player1, player1plays:  player1plays, player2 : player2, player2plays : player2plays });
  })
})

function whoWin(player1, player1plays, player2, player2plays) {
  

  if(player1 != '' && player2 != '') {
    players.delete(player1);
    players.delete(player2)

    if(player1plays === 'stone') {
      if(player2plays === 'paper') {
        return player2;
      } else if(player2plays === 'scissors') {
        return player1
      } else {
        return 'draw'
      }
    }

    if(player1plays === 'paper') {
      if(player2plays === 'scissors') {
        return player2;
      } else if(player2plays === 'stone') {
        return player1
      } else {
        return 'draw'
      }
    }

    if(player1plays === 'scissors') {
      if(player2plays === 'stone') {
        return player2;
      } else if(player2plays === 'paper') {
        return player1
      } else {
        return 'draw'
      }
    }
  }
}
