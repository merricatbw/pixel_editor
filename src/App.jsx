import "./app.css"
import PixelCanvas from "./components/PixelCanvas"
import {useState, useEffect} from 'react'


const App = () => {

    const [grid, setGrid] = useState({
        x: 16,
        y: 16,
        tiles: []
    })

    // Initializing temporary array with white pixels and setting grid.tiles to the temporary array.
    useEffect(() => {
        let tmpArray = []                           
        for (let i = 0; i < grid.x; i++) {     
            tmpArray.push([])
            for (let j = 0; j < grid.y; j++) {
                tmpArray[i].push("#FFFFFF")
            }
        }
        setGrid({
            ...grid,
            tiles: tmpArray
        })
    }, [])

    //Setting the width and the height of the canvas. 
    const [canvasWidth, setCanvasWidth] = useState(600)
    const [canvasHeight, setCanvasHeight] = useState(600)

    //maps the raw pixel position to the pixel grid
    const normalizeClick = (rawPosition, canvasScaleInt, gridScaleInt) => {
        return Math.floor(rawPosition / (canvasScaleInt / gridScaleInt))
    }

    //gets the click position of the click on the canvas and returns an object with the x and y coords
    const getClickLocation = (x, y) => {
        const rect = document.querySelector('canvas').getBoundingClientRect()
        const clickPosition = {
            x: normalizeClick(x - rect.left, canvasWidth, grid.x),
            y: normalizeClick(y - rect.top, canvasHeight, grid.y)
        }
        return clickPosition
    }
    
    const placePixel = event => {
        const click = getClickLocation(event.clientX, event.clientY)
        let updatedTiles = grid.tiles
        updatedTiles[click.x][click.y] = "#000000"
        setGrid({
            ...grid, 
            tiles: updatedTiles
        })
        console.log(grid.tiles)
    }
    
    return (
        <div>
            <h1 className="title">Pixel Editor</h1>
            <div className="container ">
                <div>

                </div>
                <div className="container center">
                    <PixelCanvas width={600} height={600} clickHandler={placePixel} tiles={grid.tiles}/>
                </div>
            </div>
        
        </div>
    )
}

export default App