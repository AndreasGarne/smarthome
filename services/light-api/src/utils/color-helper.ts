export const rgbToXY = (rgb: string) => {
    if (!rgb.startsWith("#")) {
        return rgb;
    }

    let red = parseInt(rgb.substring(1, 3), 16);
    let green = parseInt(rgb.substring(3, 5), 16);
    let blue = parseInt(rgb.substring(5, 7), 16);

    let redC = (red / 255);
    let greenC = (green / 255);
    let blueC = (blue / 255);

    let redN = (redC > 0.04045) ? Math.pow((redC + 0.055) / (1.0 + 0.055), 2.4) : (redC / 12.92);
    let greenN = (greenC > 0.04045) ? Math.pow((greenC + 0.055) / (1.0 + 0.055), 2.4) : (greenC / 12.92);
    let blueN = (blueC > 0.04045) ? Math.pow((blueC + 0.055) / (1.0 + 0.055), 2.4) : (blueC / 12.92);

    let X = redN * 0.664511 + greenN * 0.154324 + blueN * 0.162028;
    let Y = redN * 0.283881 + greenN * 0.668433 + blueN * 0.047685;
    let Z = redN * 0.000088 + greenN * 0.072310 + blueN * 0.986039;

    let x = X / (X + Y + Z);
    let y = Y / (X + Y + Z);

    X = Math.round(x * 65536);
    Y = Math.round(y * 65536);

    return `${X},${Y}`;
}