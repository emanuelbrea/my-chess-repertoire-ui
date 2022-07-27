export function getSvgUrl(fen, move, color) {
    return  '/api/position/svg?fen=' + encodeURIComponent(fen) + '&move=' + encodeURIComponent(move) + '&color=' + color;
}