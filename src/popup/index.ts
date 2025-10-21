import BackgroundConnection, { PopupConnection } from "@connection/background-connection"

const connection: PopupConnection = new BackgroundConnection('popup')

connection.on('connected', () => {
    document.getElementById('root')!.innerText = '</>'
})

connection.on('disconnected', () => {
    document.getElementById('root')!.innerText = ''
})

connection.connect()
