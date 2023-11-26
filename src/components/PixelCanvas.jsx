const PixelCanvas = ({ width, height, clickHandler, refId }) => {
    return (
        <canvas
            id="pixel_canvas"
            width={width}
            height={height}
            className="shadow"
            onClick={clickHandler}
            ref={refId}>
        </canvas>
    )
}

export default PixelCanvas