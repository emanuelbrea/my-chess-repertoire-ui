export function getSvgUrl(fen, move, color) {
    return '/position/svg?fen=' + encodeURIComponent(fen) + '&move=' + encodeURIComponent(move) + '&color=' + color;
}