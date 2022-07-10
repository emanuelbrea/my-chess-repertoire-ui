
export function getSvgUrl(fen, move){
    return 'http://localhost:5000/position/svg?fen=' + encodeURIComponent(fen) + '&move=' + encodeURIComponent(move);
}

export function getRepertoireUrl(fen, color){
    return 'http://localhost:5000/repertoire?fen=' + encodeURIComponent(fen) + '&color=' + encodeURIComponent(color);
}