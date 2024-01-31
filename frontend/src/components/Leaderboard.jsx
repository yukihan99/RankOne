import React, { useState, useEffect } from 'react'
import './Leaderboard.css'

const Leaderboard = () => {
    const [players, setPlayers] = useState(null)

    useEffect(() => {
        getPlayers()
    }, [])

    const getPlayers = async () => {
        try {
            const response = await fetch('http://localhost:8000/players')
            const results = await response.json()
            setPlayers(results)
        }
        catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <div>
            <table class="leaderboard">  
                <thead class="boardheader">
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Wins</th>
                        <th>TOP (hrs)</th>
                    </tr>
                </thead>
                <tbody class="boardbody">       
                    {players ? ( 
                        players.map((player,index) => (
                            <tr key={index}>       
                                <td>{player.leaderboardRank}</td>
                                <td>{player.gameName}</td> 
                                <td>{player.rankedRating}</td>
                                <td>{player.numberOfWins}</td>
                                <td>{player.peak}</td>
                            </tr>
                        ))
                    ) : (null)}
                </tbody>
            </table>
        </div>
            
    )
}

export default Leaderboard