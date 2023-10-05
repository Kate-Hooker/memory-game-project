import { TileData } from '../startingTiles.ts'

interface Props extends TileData {
  // include additional props here
  handleClick: (clickedTile: TileData) => void
  tile: TileData
}

function Tile(props: Props) {
  return (
    <button onClick={() => props.handleClick(props.tile)} className="tile">
      {props.isVisible && props.value}
    </button>
  )
}

export default Tile
