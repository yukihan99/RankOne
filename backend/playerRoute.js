const axios = require('axios')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const riotApiKey = 'RGAPI-17886180-fbcf-4001-a526-15b3d7c90ac6'
    const currAct = '4401f9fd-4170-2e4c-4bc3-f3b4d7d150d1'
    const apiUrl = `https://na.api.riotgames.com/val/ranked/v1/leaderboards/by-act/${currAct}?size=100&startIndex=0&api_key=${riotApiKey}`

    axios.get(apiUrl)
    .then(response => {
        //grabs all the acts -> just manually go through and find current acts
        const ten = response.data['players'].slice(0,20)
        console.log(ten)
        res.json(ten)
        
    })
    .catch(error => {
        console.error('Error:', error.message)
    });
})

module.exports=router
