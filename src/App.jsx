import "./app.css"
import PixelCanvas from "./components/PixelCanvas"
import {useState, useEffect} from 'react'


const App = () => {
    const [grid, setGrid] = useState({
        x: 16,
        y: 16
    })

    const [canvas, setCanvas] = useState({
        width: 600, 
        height: 600
    })

    const [tiles, setTiles] = useState({})

    useEffect(() => {
        let tmpObj = {}
        for (let x = 0; x < grid.x; x++) {
            for (let y = 0; y < grid.y; y++) {
                tmpObj[stringifyCoords(x, y)] = makeTileObj(x, y, "#FFFFFF")
            }
        }
        setTiles(tmpObj)
    }, [])

    const stringifyCoords = (x, y) => {
        return `${x}.${y}`
    }

    //find the real canvas position for the start of a pixel
    const findRealCoord = (x, canvasScaleInt, gridScaleInt) => {
        return x * (canvasScaleInt / gridScaleInt)
    }

    const makeTileObj = (x, y, color) => {
        const key = stringifyCoords(x, y)
        const realCoords = {
            x: findRealCoord(x, canvas.width, grid.x),
            y: findRealCoord(y, canvas.height, grid.y)
        }
        return {
            coords: {
                x: x,
                y: y,
            },
            realCoords: realCoords,
            color: color
        }
        
    }

    //maps the raw pixel position to the pixel grid
    const normalizeClick = (rawPosition, canvasScaleInt, gridScaleInt) => {
        return Math.floor(rawPosition / (canvasScaleInt / gridScaleInt))
    }

    //gets the click position of the click on the canvas and returns an object with the x and y coords
    const getClickLocation = (x, y) => {
        const rect = document.querySelector('canvas').getBoundingClientRect()
        const clickPosition = {
            x: normalizeClick(x - rect.left, canvas.width, grid.x),
            y: normalizeClick(y - rect.top, canvas.height, grid.y)
        }
        return clickPosition
    }
    
    const placePixel = event => {
        const click = getClickLocation(event.clientX, event.clientY)
        console.log(tiles[stringifyCoords(click.x, click.y)])
    }

    return (
        <div>
            <h1 className="title">Pixel Editor</h1>
            <div className="container ">
                <div>

                </div>
                <div className="container center">
                    <PixelCanvas width={canvas.width} height={canvas.height} clickHandler={placePixel}/>
                </div>
            </div>
        
        </div>
    )
}

export default App