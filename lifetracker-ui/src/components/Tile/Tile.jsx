import "./Tile.css"

export default function Tile(props) {
  return (
    <div className="Tile" {...props}>
      <>{props.children}</>
    </div>
  )
}
