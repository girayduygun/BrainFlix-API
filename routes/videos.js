const express = require("express");
const {readVideos, writeVideos} = require('../index');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


router.get('/', (req, res) => {
    let videos = readVideos()
    res.send(
        videos.map(video => {
            return {
                id: video.id,
                title: video.title,
                channel: video.channel,
                image: video.image
            }
        })
    )
})
router.post('',(req, res) => {
    let videos = readVideos()
    const {title, description} = req.body
    
    videos.push({
        id: uuidv4(),
        title,
        channel: 'New Channel',
        image: 'http://localhost:3001/images/preview.jpg',
        description,
        views: 0,
        likes: 0,
        duration: "01:00",
        video: "https://project-2-api.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: []
    })

    writeVideos(videos)

    res.send({
        success: true
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    let videos = readVideos()
    let video = videos.find(video => video.id === id)
    res.send(video)
})

module.exports = router