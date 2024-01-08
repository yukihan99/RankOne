import React, { useState, useEffect } from 'react'

const Board = () => {
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
            <h1>Leaderboard</h1>
            {players ? ( 
                <ul>
                    {players.map((player,index) => (
                        <li key={index}>Rank: {player.leaderboardRank} Name: {player.gameName} Rating: {player.rankedRating} Wins: {player.numberOfWins}</li>
                    ))}
                </ul>

            ) : (null)}
        </div>
            
    )
}

export default Board