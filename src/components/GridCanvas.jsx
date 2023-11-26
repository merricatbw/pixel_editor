const GridCanvas = ({ width, height, refId}) => {
    return (
        <canvas width={width} height={height} ref={refId}></canvas>
    )
}

export default GridCanvas