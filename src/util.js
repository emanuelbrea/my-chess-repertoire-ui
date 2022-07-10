
export default function getSvgUrl(fen, move){
    return 'http://localhost:5000/position/svg?fen=' + fen + '&move=' + move
}