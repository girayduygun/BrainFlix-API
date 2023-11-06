require('dotenv').config();

const express = require('express')
const app = express ()

app.use(express.json())
app.use(express.static("public"));

const cors = require("cors");
app.use(cors());

const fs = require('fs')

const readVideos = () => {
    return JSON.parse(fs.readFileSync('./data/videos.json'))
}

const writeVideos = (videos) => {
    fs.writeFileSync('./data/videos.json',JSON.stringify(videos))
}

module.exports = { readVideos, writeVideos }

app.get('/', (req, res) => {
    res.send('')
})

const videosRoutes = require('./routes/videos')
app.use('/videos',videosRoutes)

app.listen(process.env.SERVER_PORT, () => console.log(`server is online on port ${process.env.SERVER_PORT}`))

