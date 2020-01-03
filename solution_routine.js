/*jshint esversion: 6 */
/**
 * Solution routine
 * This routine is implimented by solve() function in index.html script
 */
let grid1 = new Grid();
let goalGrid;
console.log(grid1);

let set = [];

const prior = (new PriorityQueue());
prior.put(grid1);

grid1.scramble();

set[grid1.getIndex()] = 1;

let solutionFound = false;

while(!solutionFound){
    
    grid1 = (prior.pop());
    console.log(`Popping grid ${grid1}`);

    if(!grid1){
     break;
    }    

    let possibleMoves = grid1.getAvailableMoves();

    for(let i =0 ; i < possibleMoves.length ; i++ ){
        
        let g = new Grid(grid1,possibleMoves[i]);

        if(!set[g.getIndex()]){
            set[g.getIndex()] = 1;
            prior.put(g);
            if(g.checkWin()){
                solutionFound = true;
                goalGrid = g;
                console.log(g);
                console.log(prior);
                console.log("Found it congrats!");
            }
        }

    }
}
console.log('Solution found');

let correctMoves = [];
let index = 0;
grid1 = goalGrid;
console.log(grid1);

while(true){
    let move = grid1.createWithMove;
    if(move){
        correctMoves[index] = move;
        grid1 = grid1.parent;
        console.log(correctMoves);
        index++;
    }else{
        break;
    }
}

correctMoves.reverse();

for(let i = 0 ; i < correctMoves.length; i++){

    maingrid.move(correctMoves[i]);
    console.log(maingrid.getmDist());
}
