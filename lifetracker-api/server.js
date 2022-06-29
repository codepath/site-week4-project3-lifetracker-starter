const app = require("./app")
const {PORT} = require('./config')

const port = PORT || 3000

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`)
})