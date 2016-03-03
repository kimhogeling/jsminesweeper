'use strict';

const BOMB_CHANCE = 0.6;
const BOMB_ICON = '💣';
const PARTY_ICON = '🎉';
const LEAVES_ICON = '🍃';

class Board {

    constructor(width, height) {
        let x, y, fields = []
        this.amountFields = width * height
        this.amountBombs = 0
        this.amountRevealed = 0
        for (y = 0; y < height; y++) {
            fields[y] = []
            for (x = 0; x < width; x++) {
                let isBomb = Math.round((Math.random() * BOMB_CHANCE)) === 1
                if (isBomb) {
                    this.amountBombs++
                }
                fields[y][x] = {
                    isBomb: isBomb,
                    nr: 0,
                    isRevealed: false
                }
            }
        }
        this.fields = fields
        this.calculateNumbers()
    }

    calculateNumbers() {
        this.fields.forEach((row, y) => {
            row.forEach((field, x, arr) => {
                let nr = 0
                if (field.isBomb) {
                    field.nr = BOMB_ICON
                    return
                }
                // above
                if (this.fields[y - 1] && this.fields[y - 1][x] && this.fields[y - 1][x].isBomb) {
                    nr++
                }
                // above right
                if (this.fields[y - 1] && this.fields[y - 1][x + 1] && this.fields[y - 1][x + 1].isBomb) {
                    nr++
                }
                // right
                if (this.fields[y][x + 1] && this.fields[y][x + 1].isBomb) {
                    nr++
                }
                // underneath right
                if (this.fields[y + 1] && this.fields[y + 1][x + 1] && this.fields[y + 1][x + 1].isBomb) {
                    nr++
                }
                // underneath
                if (this.fields[y + 1] && this.fields[y + 1][x] && this.fields[y + 1][x].isBomb) {
                    nr++
                }
                // underneath left
                if (this.fields[y + 1] && this.fields[y + 1][x - 1] && this.fields[y + 1][x - 1].isBomb) {
                    nr++
                }
                // above left
                if (this.fields[y - 1] && this.fields[y - 1][x - 1] && this.fields[y - 1][x - 1].isBomb) {
                    nr++
                }
                // left
                if (this.fields[y][x - 1] && this.fields[y][x - 1].isBomb) {
                    nr++
                }
                field.nr = nr;
            })
        })
    }

    reveal(x, y) {
        if (!this.fields[y][x].isRevealed) {
            this.fields[y][x].isRevealed = true
            this.amountRevealed++;
        }

        // only if this field is empty, reveal neighboured empty fields
        if (this.fields[y][x].nr !== 0) {
            return
        }

        // above
        if (this.fields[y - 1] && this.fields[y - 1][x] && !this.fields[y - 1][x].isRevealed && this.fields[y - 1][x].nr === 0) {
            this.reveal(x, y - 1);
        }
        // above right
        if (this.fields[y - 1] && this.fields[y - 1][x + 1] && !this.fields[y - 1][x + 1].isRevealed && this.fields[y - 1][x + 1].nr === 0) {
            this.reveal(x + 1, y - 1)
        }
        // right
        if (this.fields[y][x + 1] && !this.fields[y][x + 1].isRevealed && this.fields[y][x + 1].nr === 0) {
            this.reveal(x + 1, y);
        }
        // underneath right
        if (this.fields[y + 1] && this.fields[y + 1][x + 1] && !this.fields[y + 1][x + 1].isRevealed && this.fields[y + 1][x + 1].nr === 0) {
            this.reveal(x + 1, y + 1)
        }
        // underneath
        if (this.fields[y + 1] && this.fields[y + 1][x] && !this.fields[y + 1][x].isRevealed && this.fields[y + 1][x].nr === 0) {
            this.reveal(x, y + 1)
        }
        // underneath left
        if (this.fields[y + 1] && this.fields[y + 1][x - 1] && !this.fields[y + 1][x - 1].isRevealed && this.fields[y + 1][x - 1].nr === 0) {
            this.reveal(x - 1, y + 1)
        }
        // above left
        if (this.fields[y - 1] && this.fields[y - 1][x - 1] && !this.fields[y - 1][x - 1].isRevealed && this.fields[y - 1][x - 1].nr === 0) {
            this.reveal(x - 1, y - 1)
        }
        // left
        if (this.fields[y][x - 1] && !this.fields[y][x - 1].isRevealed && this.fields[y][x - 1].nr === 0) {
            this.reveal(x - 1, y)
        }
    }

    toStringRevealed() {
        let str = ''
        this.fields.forEach((row, y) => {
            row.forEach((field, x) => {
                str += field.nr + '\t'
            })
            str += '\n'
        })
        console.log(str)
    }

    toString() {
        let str = ''
        this.fields.forEach((row, y) => {
            row.forEach((field, x) => {
                str += (field.isRevealed ? field.nr : LEAVES_ICON) + ' (' + x + ',' + y + ')\t'
            })
            str += '\n'
        })
        console.log(str)
    }

    createTable(game) {
        let table = document.createElement('table')
        let self = this
        this.fields.forEach((row, y) => {
            let tr = document.createElement('tr')
            row.forEach((field, x) => {
                let td = document.createElement('td')
                td.id = 'cel_' + y + '_' + x
                td.innerHTML = field.isRevealed ? field.nr : LEAVES_ICON
                td.onclick = function() {
                    game.cellClick(this)
                }
                tr.appendChild(td)
            })
            table.appendChild(tr)
        })
        this.table = table
    }

    toTable(game) {
        this.createTable(game)
        document.getElementById('table_wrapper').innerHTML = ''
        document.getElementById('table_wrapper').appendChild(this.table)
    }

    createTableRevealed() {
        let table = document.createElement('table')
        let self = this
        this.fields.forEach((row, y) => {
            let tr = document.createElement('tr')
            row.forEach((field, x) => {
                let td = document.createElement('td')
                td.innerHTML = field.nr
                tr.appendChild(td)
            })
            table.appendChild(tr)
        })
        this.table = table
    }

    toTableRevealed() {
        this.createTableRevealed()
        document.getElementById('table_wrapper').innerHTML = ''
        document.getElementById('table_wrapper').appendChild(this.table)
    }

    createTableWin() {
        let table = document.createElement('table')
        let self = this
        this.fields.forEach((row, y) => {
            let tr = document.createElement('tr')
            row.forEach((field, x) => {
                let td = document.createElement('td')
                td.innerHTML = field.nr == BOMB_ICON ? PARTY_ICON : field.nr
                tr.appendChild(td)
            })
            table.appendChild(tr)
        })
        this.table = table
    }

    toTableWin() {
        this.createTableWin()
        document.getElementById('table_wrapper').innerHTML = ''
        document.getElementById('table_wrapper').appendChild(this.table)
    }

}
