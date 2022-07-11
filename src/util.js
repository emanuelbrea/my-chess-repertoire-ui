
export function getSvgUrl(fen, move){
    return 'http://localhost:5000/position/svg?fen=' + encodeURIComponent(fen) + '&move=' + encodeURIComponent(move);
}