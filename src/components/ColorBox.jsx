const ColorBox = ({ colorHex, colorSelectFunc, selected }) => {
    let style = {
        backgroundColor: colorHex,
        borderStyle: "solid",
        borderWidth: "3px",
        borderColor: colorHex
    }
    if (selected) {
        style = {
            ...style,
            borderStyle: "solid",
            borderWidth: "3px",
            borderColor: "#121212"
        }
    }
    return (
        <div onClick={() => colorSelectFunc(colorHex)} className="color-box rounded" style={style}>
            
        </div>
    )
}

export default ColorBox