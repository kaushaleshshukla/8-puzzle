/* jshint esversion: 6*/
class PriorityQueue {

    constructor() {
        this.q = [];
        this.index = 0;
    }

    put(object) {
        if(!object.piecesPositions) {
            console.error("Not an Grid type object type ");
            return undefined;
        }
        
            let priority = object.getmDist();
            let inserted = false;
            for (let i = 0; i < this.q.length; i++) {
                if ( priority < this.q[i].getmDist()) {
                    this.q.splice(i, 0, object);
                    inserted = true;
                    break;
                }
            }
            if (!inserted) {
                this.q[this.q.length] = object;
                inserted = true;
            }

    }

    pop(){
        if(this.q.length > 0){
           return (this.q.splice(0,1))[0];
        } else{
        console.error('No elements to pop');   
        }
    }

}
