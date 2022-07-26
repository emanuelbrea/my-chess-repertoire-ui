export function getSvgUrl(fen, move, color) {
    return process.env.NEXT_PUBLIC_HOST + '/api/position/svg?fen=' + encodeURIComponent(fen) + '&move=' + encodeURIComponent(move) + '&color=' + color;
}