/*jshint esversion: 6 */


class Grid {

    constructor(parent , createWithMove) {
        this.piecesPositions = [];
        if(!parent){
            this.piecesPositions = [1,2,3,4,5,6,7,8,9];
        }else{
            let values = parent.piecesPositions;
            for(let i = 0 ; i < 9; i++){
                this.piecesPositions[i] = values[i];
            }
        }
        this.blankPiecePos = (!parent) ? 8 : parent.blankPiecePos;
        this.parent = parent;
        this.createWithMove = createWithMove;
        this.mDist = 0;
        this.move(this.createWithMove);
        this.setmDist();
    }

    getPositions(){
        return this.piecesPositions;
    }

    scramble(){
        for(let i = 0; i < 150; i++){
            let possibleMoves = this.getAvailableMoves();
            let a = Math.floor(Math.random()*possibleMoves.length);
            this.move(possibleMoves[a]);
        }
    }
    
    getIndex(){
        return parseInt(this.piecesPositions.join(''));
    }

    getAvailableMoves(){
        let index = 0;
        let possibleMoves = [];
        let g = new Grid(this,undefined);
        ['a','s','d','w'].forEach( (m) => {
            if(g.move(m)) {
                possibleMoves[index] = m;
                index = index + 1;
            }
        });

        return possibleMoves;
    }

    checkWin() {
        let i = 1;
        let wonStatus = true;
        this.piecesPositions.forEach((element) => {
            if (i != element) {
                wonStatus = false;
            }
            i++;
        });
        return wonStatus;
    }

    move(key) {
        let tileMoved = false;
        let MovedTo ;
        switch (key) {
            case 'd':
            case 'D':
            case 'ArrowRight':
                if (((this.piecesPositions[this.blankPiecePos] - 1) % 3) > 0) {
                    this.piecesPositions[this.blankPiecePos]--;

                    let movedToPos = this.piecesPositions[this.blankPiecePos];
                    this.piecesPositions[this.piecesPositions.indexOf(movedToPos)] += 1;
                    tileMoved = true;
                    MovedTo = 'd';
                }
                break;

            case 'a':
            case 'A':
            case 'ArrowLeft':
                if (((this.piecesPositions[this.blankPiecePos] - 1) % 3) < 2) {
                    this.piecesPositions[this.blankPiecePos] += 1;
                    let movedToPos = this.piecesPositions[this.blankPiecePos];
                    this.piecesPositions[this.piecesPositions.indexOf(movedToPos)] -= 1;
                    tileMoved = true;
                    MovedTo = 'a';
                }
                break;

            case 'W':
            case 'w':
            case 'ArrowUp':
                if (Math.floor((this.piecesPositions[this.blankPiecePos] - 1) / 3) < 2) {
                    this.piecesPositions[this.blankPiecePos] += 3;
                    let movedToPos = this.piecesPositions[this.blankPiecePos];
                    this.piecesPositions[this.piecesPositions.indexOf(movedToPos)] -= 3;
                    tileMoved = true;
                    MovedTo = 'w';
                }
                break;

            case 's':
            case 'S':
            case 'ArrowDown':
                if (Math.floor((this.piecesPositions[this.blankPiecePos] - 1) / 3) > 0) {
                    this.piecesPositions[this.blankPiecePos] -= 3;
                    let movedToPos = this.piecesPositions[this.blankPiecePos];
                    this.piecesPositions[this.piecesPositions.indexOf(movedToPos)] += 3;
                    tileMoved = true;
                    MovedTo = 's';
                }
                break;

            default:
                break;
        }

        if(tileMoved)this.setmDist();
        return tileMoved;
    }

    getmDist(){
        return this.mDist;
    }

    setmDist(){
        let dist = 0;
        
        for(let i = 0; i < 9; i++){
            
            let shoudlBe = i%3;
            let is = (this.piecesPositions[i] - 1)%3;
            let diff = shoudlBe - is;
            
            dist = dist + (( diff < 0 ) ? -diff : diff);
            
            shoudlBe = Math.floor(i/3);
            let x  = (this.piecesPositions[i] - 1)/3;
            is = Math.floor(x);
            diff = shoudlBe - is;

            dist = dist + (( diff < 0 ) ? -diff : diff);
        }
        this.mDist = dist;
    }
}
