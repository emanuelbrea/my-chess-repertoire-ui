export function getSvgUrl(fen, move, color) {
    if(color === undefined || color === true){
        color = 'white'
    }
    else{
        color = 'black'
    }
    return 'http://localhost:5000/position/svg?fen=' + encodeURIComponent(fen) + '&move=' + encodeURIComponent(move) + '&color=' + color;
}