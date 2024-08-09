export default function covertRating(rating){
    let convertRate=rating/2;
    let rounded=parseFloat(convertRate);
    let actual=rounded.toFixed(1);
    return actual;
}