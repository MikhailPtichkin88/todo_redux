/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require('fs')
const jsonServer = require('json-server')
const path = require('path')

const http = require('http')

const server = jsonServer.create()

const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

// имитация реального апи
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800)
  })
  next()
})

server.post('/login', (req, res) => {
  try {
    const { email, password } = req.body
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8')
    )
    const { user = [] } = db

    const userFromBd = user.find(
      (el) => el.email === email && el.password === password
    )

    if (userFromBd) {
      return res.json(userFromBd)
    }

    return res.status(403).json({ message: 'User not found' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

server.post('/update-address-list', (req, res) => {
  try {
    const { newAddressList } = req.body

    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8')
    )

    db.address_list = newAddressList

    fs.writeFileSync(
      path.resolve(__dirname, 'db.json'),
      JSON.stringify(db, null, 2)
    )

    // Перезагружаем данные в роутере jsonServer
    router.db.setState(db)

    return res.json({ message: 'Address list updated successfully' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

server.use((req, res, next) => {
  if (req.url === '/user' && req.method === 'POST') {
    return next()
  }
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' })
  }
  next()
})

server.use(router)

const HTTP_PORT = 8003

const httpServer = http.createServer(server)
// запуск сервера

httpServer.listen(HTTP_PORT, () => {
  console.log(`server is running on ${HTTP_PORT} port`)
})
