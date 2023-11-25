import "./app.css"
import PixelCanvas from "./components/PixelCanvas"
import {useState, useEffect} from 'react'


const App = () => {
    const [grid, setGrid] = useState({
        x: 32,
        y: 32
    })

    const [canvas, setCanvas] = useState({
        width: 512, 
        height: 512
    })

    const [tiles, setTiles] = useState({})

    const [selectedColor, setSelectedColor] = useState("#000000")

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
        const dimensions = {
            width: canvas.width / grid.x,
            height: canvas.height / grid.y
        }
        return {
            coords: {
                x: x,
                y: y,
            },
            realCoords: realCoords,
            dimensions: dimensions,
            color: color
        }
        
    }

    const updateTile = (x, y, color) => {
        const tile = tiles[stringifyCoords(x, y)]
        tile.color = color
        setTiles({
            ...tiles,
            [stringifyCoords(x, y)]: tile
        })
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

    const renderTile = (x, y) => {
        const tile = tiles[stringifyCoords(x, y)]
        console.log(tile)
        const ctx = document.querySelector("canvas").getContext('2d')
        console.log(ctx)
        ctx.fillStyle = tile.color
        ctx.fillRect(tile.realCoords.x, tile.realCoords.y, tile.dimensions.width, tile.dimensions.height);
    }

    const placePixel = event => {
        const click = getClickLocation(event.clientX, event.clientY)
        updateTile(click.x, click.y, selectedColor)
        renderTile(click.x, click.y)
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