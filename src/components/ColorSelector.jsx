
import ColorBox from "./ColorBox"

const ColorSelector = ({ palette, colorSelectFunc, selected }) => {
    const renderPalette = palette.map(color => {
        return <ColorBox
            key={color}
            colorHex={color}
            colorSelectFunc={colorSelectFunc}
            selected={color === selected}
        />
    })
    return (
        <div className="container">
            <div className="container wrap rounded shadow toolbar">
                {renderPalette}
            </div>
        </div>
    )
}

export default ColorSelector