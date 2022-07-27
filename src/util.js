export function getSvgUrl(fen, move, color) {
    return process.env.NEXT_PUBLIC_HOST + '/position/svg?fen=' + encodeURIComponent(fen) + '&move=' + encodeURIComponent(move) + '&color=' + color;
}