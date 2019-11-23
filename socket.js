const { Socket } = require('phoenix-socket')

let socket = new Socket("ws://localhost:4000/socket", {params: {}})

socket.connect()
let chatInput         = document.querySelector("#chat-input")
let messagesContainer = document.querySelector("#messages")

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("room:lobby", {})

chatInput.addEventListener("keypress", event => {
  if(event.keyCode === 13){
    channel.push("new_msg", {body: chatInput.value})
    chatInput.value = ""
  }
})

channel.on("new_msg", payload => {
  let messageItem = document.createElement("li")
  messageItem.innerText = `${payload.body}`
  messagesContainer.appendChild(messageItem)
})

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

