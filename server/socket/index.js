
module.exports = (io) => {
  io.on('connection',socket => {
    console.log(`socket connection to the server: ${socket.id}`)
  })
}
