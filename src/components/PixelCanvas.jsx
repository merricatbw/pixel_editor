const PixelCanvas = ({ width, height, clickHandler }) => {
    return (
        <div>
            <canvas id="pixel_canvas" width={width} height={height} className="shadow" onClick={clickHandler}>

            </canvas>
        </div>
    )
}

export default PixelCanvas