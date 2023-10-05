import Board from './Board.tsx'
import startingTiles from '../startingTiles.ts'
import { useState } from 'react'
import { TileData } from '../startingTiles.ts'

const tryAgain = 'No match, try again'
const winMessage = 'Congratulations, you matched all the tiles!'
const winningMatchCount = startingTiles.length / 2

function App() {
  const [board, setboard] = useState(startingTiles)
  const [isMatch, setIsMatch] = useState(false)
  const [matchCount, setMatchCount] = useState(0)

  const hasWon = matchCount === winningMatchCount

  const hideTiles = () => {
    startingTiles.map((tile) => ({
      ...tile,
      isVisible: false,
    }))
  }

  const reset = () => {
    setboard(hideTiles())
    setMatchCount(0)
    setIsMatch(false)
  }

  const evalMatch = (tile1: TileData, tile2: TileData) => {
    if (tile1.value === tile2.value) {
      setMatchCount(matchCount + 1)
      setIsMatch(true)
    } else {
      setIsMatch(false)
    }
  }

  return (
    <div className="game">
      <h1>Welcome to the Memory Game</h1>
      <h2>Match all the tiles to win</h2>

      <Board setboard={setboard} tiles={board} evalMatch={evalMatch} />

      <h5>{hasWon && winMessage}</h5>
      <h5>{!isMatch && tryAgain}</h5>

      <div className="replaybutton">
        {hasWon && <button onClick={reset}>Play Again</button>}
      </div>
    </div>
  )
}

export default App
