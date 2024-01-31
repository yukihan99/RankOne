const axios = require('axios')
const express = require('express')
const router = express.Router()
const db = require('./dbconnection')

router.get('/', async (req, res) => {
    try {
        const riotApiKey = 'RGAPI-c10810a3-384b-494e-995c-e70f126112e3';
        const currAct = 'ec876e6c-43e8-fa63-ffc1-2e8d4db25525';
        const apiUrl = `https://na.api.riotgames.com/val/ranked/v1/leaderboards/by-act/${currAct}?size=100&startIndex=0&api_key=${riotApiKey}`;

        const response = await axios.get(apiUrl);
        const ten = response.data['players'].slice(0, 20);
        const one = ten[0];

        await configure(ten);
        update(one);
        console.log(ten);
        res.json(ten);

    } 
    catch (error) {
        console.error(error);
    }
});


//calculates the hours a player has been #1
const calcTime = (newDate, oldDate, oldTime) => {
    let hours = (newDate-oldDate) / (1000 * 60 * 60)
    return (parseFloat(hours) + parseFloat(oldTime)).toFixed(1)
}

const configure = async(ten) => {

    for (let i = 0; i < ten.length; i++) {
        if (!('puuid' in ten[i])) {
            ten[i]['puuid'] = 'mystery'
            ten[i]['gameName'] = 'Secret Agent'
        }

        const data = await checkID(ten[i]['puuid'])
        if (data.exists)
            {
                const query = "SELECT time FROM leaders WHERE id = ?"
                db.query(query, [ten[i]['puuid']], (error, results) => {
                    if (error) {
                        console.log(error)
                    }
                    ten[i]['peak'] = results[0]['time']
                })
            }
        else {
            ten[i]['peak'] = '-'     
        }
            
    }
}

const update = async (player) => {
    try {
        const data = await checkID(player.puuid)
        const one = data.results[0]
        let query = ""

        if (data.exists && one.current == 1) { //if current rank #1 player is also currently rank #1 in the database, update his total time
            hours = calcTime(new Date(), one.date, one.time)
            query = "UPDATE leaders SET time = ?, date = ? WHERE id = ?"
            db.query(query, [hours, new Date(), one.id], (error, results) => {
                if (error) {
                    console.error(error)
                }
            })
        }
        else //if current rank #1 player is in not currently #1 rank in the database, find the #1 current player in database, update his time, and set the current #1 player
        {  
            query = "UPDATE leaders SET current = ? WHERE current = ?"
            db.query(query, [0, 1], (error, result) => {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log("Previous Rank 1 player updated")
                }
            })

            if (data.exists) { //if player already exists in database, set rank #1 player with a new date
                query = "UPDATE leaders SET date = ?, current = ? WHERE id = ?"
                db.query(query, [new Date(), 1, player.puuid], (error, results) => {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log("New Rank 1 player updated")
                }
                })
            }         
            else { //completely new player has hit #1, add him to the database
                query = "INSERT INTO leaders (id, name, time, date, current) VALUES (?, ?, ?, ?, ?)"
                db.query(query, [player.puuid, player.gameName, 0, new Date(), 1], (error, results) => {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        console.log("ID ADDED")
                    }
                })
            }
        }
       
    }
    catch (error) {
        console.log(error)
    }
}

//check to see if player exists in db
const checkID = async (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM leaders WHERE id = ? LIMIT 1";
        db.query(query, [id], (error, results) => {
            if (error) {
                console.error("error")
                reject(error)
            }
            else {
                exists = results.length > 0
                resolve({results, exists});
            }
        }) 
    })
}

module.exports=router
