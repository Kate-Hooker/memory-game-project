import Tile from './Tile.tsx'
import { TileData } from '../startingTiles.ts'
import { useState } from 'react'
import * as React from 'react'

interface Props {
  tiles: TileData[]
  evalMatch: (tile1: TileData, tile2: TileData) => void
  setboard: React.Dispatch<React.SetStateAction<TileData[]>>
}

function Board(props: Props) {
  const [selection, setSelection] = useState<TileData | null>(null)
  //this sets types of state for the tiles
  const [disableBoard, setDisableBoard] = useState(false)
  //this waits for the board to process match or not, stopping player from picking a third tile
  const flipEm = (tileId: number, isVisible: boolean) => {
    props.setboard((previousBoard) =>
      previousBoard.map((tile) => {
        if (tile.id === tileId) {
          return {
            ...tile,
            isVisible: isVisible,
          }
        }
        return tile
      })
    )
  }

  const handleClick = (clickedTile: TileData) => {
    if (disableBoard) return
    if (clickedTile.isVisible) return

    flipEm(clickedTile.id, true)
    console.log(`ou have revealed a ${clickedTile.info}`)

    if (!selection) {
      setSelection(clickedTile)
    } else {
      props.evalMatch(selection, clickedTile)
      if (selection.value === clickedTile.value) {
        console.log('match!')
        setSelection(null)
      } else {
        console.log('no match')
        setDisableBoard(true)
        setTimeout(() => {
          flipEm(selection.id, false)
          flipEm(clickedTile.id, false)
          setSelection(null)
          setDisableBoard(false)
        }, 999)
      }
    }
  }

  return (
    <div className="tiles" data-testid="Board">
      {props.tiles.map((tile) => {
        return (
          <Tile
            id={tile.id}
            key={tile.id}
            info={tile.info}
            value={tile.value}
            isVisible={tile.isVisible}
            handleClick={handleClick}
            tile={tile}
          />
        )
      })}
    </div>
  )
}

export default Board
