const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor (arr) {
        this.arr = arr;
        this.row = '';
        this.col = '';
        this.findStartPoint();
    }

    print() {
        for (let i=0; i < this.arr.length; i++) {
            console.log(this.arr[i].join(''))
        }
    }

    findStartPoint() {
        for (let a = 0; a < this.arr.length; a++) {
            for (let b = 0; b < this.arr[a].length; b++) {
                if (this.arr[a][b] === '*') {
                    this.row = a
                    this.col = b
                    break
                }
            }
        }
    }

    pathFound() {
        if (this.arr[this.row][this.col] === '^') {
            return true
        } return false
    }
    move(direction) {
        if (direction ==='s') {
            if (this.col !== 0) {
                this.col--
            }
        } else if (direction === 'f') {
            if (this.col !== this.arr[0].length-1) {
                this.col++
            }   
        } else if (direction ==='e') {
            if (this.row !== 0) {
                this.row-- 
            }
        } else if (direction ==='d') {
            if (this.row !== this.arr.length-1) {
                this.row++
            }
        } else {console.log('Invalid input')}
    }

    updatePath() {
        this.arr[this.row][this.col] = '*'
    }

    fallInHole() {
        if (this.arr[this.row][this.col] === 'O') {
            return true
        } return false
    }

    static generateField(numRow, numCol, percentage) {
        let newField = []
        for (let row=0; row < numRow; row++) {
            newField[row] = []
            for (let col=0; col < numCol; col++) {
                newField[row].push(fieldCharacter)
            }
        }
        const numOfHole = Math.round(numRow*numCol*percentage/100)
        for (let i=0; i < numOfHole; i++) {
            newField[Math.floor(Math.random()*numRow)][Math.floor(Math.random()*numCol)] = 'O'
        }
        newField[Math.floor(Math.random()*numRow)][Math.floor(Math.random()*numCol)] = '^'
        newField[Math.floor(Math.random()*numRow)][Math.floor(Math.random()*numCol)] = '*'
        return newField
    }
}

// PLAY

let col = prompt('Please enter your desired field width: ')
let row = prompt('Please enter your desired field height: ')
const myField = new Field(Field.generateField(row,col,20));
console.log('Generating new field')
myField.print()
console.log('Press "S" to go to the left')
console.log('Press "F" to go to the right')
console.log('Press "E" to go up')
console.log('Press "D" to go down')
while (myField.pathFound() === false) {
    let direction = prompt('Which way? ')
    myField.move(direction)
    if (!myField.pathFound()) {
        if(myField.fallInHole()) {
            console.log('Oh no, you fall in a hole')
            break
        } else {myField.updatePath()}
    }
    myField.print()
}
if (myField.pathFound()) {
    console.log('Congrats! You found your hat')
}