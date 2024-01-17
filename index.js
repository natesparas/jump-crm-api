const app = require('./app')

process.env.TZ = 'Asia/Manila';

const PORT = 8085
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
