import "./app.css"
import PixelCanvas from "./components/PixelCanvas"
import {useState, useEffect} from 'react'


const App = () => {

    const [grid, setGrid] = useState({
        x: 16,
        y: 16,
        tiles: []
    })

    useEffect(() => {
        setGrid({
            ...grid,
            tiles: Array(grid.x).fill(Array(grid.y).fill("#FFFFFF"))
        })
        console.log("grid filled")
    }, [])

    const [canvasWidth, setCanvasWidth] = useState(600)
    const [canvasHeight, setCanvasHeight] = useState(600)

    const normalizeClick = (rawPosition, canvasScaleInt, gridScaleInt) => {
        return Math.floor(rawPosition / (canvasScaleInt / gridScaleInt))
    }

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
        console.log(grid.tiles)
        console.log(click)
    }
    
    return (
        <div>
            <h1 className="title">Pixel Editor</h1>
            <div className="container ">
                <div>

                </div>
                <div className="container center">
                    <PixelCanvas width={600} height={600} clickHandler={placePixel}/>
                </div>
            </div>
        
        </div>
    )
}

export default App