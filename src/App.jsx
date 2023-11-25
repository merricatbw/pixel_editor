import "./app.css"
import PixelCanvas from "./components/PixelCanvas"
import ColorSelector from "./components/ColorSelector"
import {useState, useEffect} from 'react'


const App = () => {
    const [grid, setGrid] = useState({
        x: 16,
        y: 16
    })

    const [canvas, setCanvas] = useState({
        width: 512, 
        height: 512
    })

    const [tiles, setTiles] = useState({})

    const [selectedColor, setSelectedColor] = useState("#fff6d3")

    const [palette, setPallete] = useState([
        "#fff6d3",
        "#f9a875",
        "#eb6b6f",
        "#7c3f58",
    ])

    useEffect(() => {
        let tmpObj = {}
        for (let x = 0; x < grid.x; x++) {
            for (let y = 0; y < grid.y; y++) {
                tmpObj[stringifyCoords(x, y)] = makeTileObj(x, y, "#FFFFFF")
            }
        }
        setTiles(tmpObj)
    }, [])

    useEffect(() => {
        const ctx = document.querySelector('canvas').getContext("2d")
        ctx.fillStyle = palette[0]
        ctx.fillRect(0, 0, canvas.width, canvas.height)
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
        const ctx = document.querySelector("canvas").getContext('2d')
        ctx.fillStyle = tile.color
        ctx.fillRect(tile.realCoords.x, tile.realCoords.y, tile.dimensions.width, tile.dimensions.height);
    }

    const placePixel = event => {
        const click = getClickLocation(event.clientX, event.clientY)
        updateTile(click.x, click.y, selectedColor)
        renderTile(click.x, click.y)
    }

    const setColor = (colorHex) => {
        setSelectedColor(colorHex)
    }

    return (
        <div>
            <h1 className="title">Pixel Editor</h1>
            <div className="container ">
                <div>
                    <ColorSelector colorSelectFunc={setColor} palette={palette} selected={selectedColor} />
                </div>
                <div className="container center">
                    <PixelCanvas width={canvas.width} height={canvas.height} clickHandler={placePixel}/>
                </div>
            </div>
        
        </div>
    )
}

export default App