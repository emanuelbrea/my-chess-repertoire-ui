export function getSvgUrl(fen, move, color) {
    return 'http://localhost:5000/position/svg?fen=' + encodeURIComponent(fen) + '&move=' + encodeURIComponent(move) + '&color=' + color;
}