'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BOMB_CHANCE = 0.6;
var BOMB_ICON = '💣';
var PARTY_ICON = '🎉';
var LEAVES_ICON = '🍃';

var Board = function () {
    function Board(width, height) {
        _classCallCheck(this, Board);

        var x = undefined,
            y = undefined,
            fields = [];
        this.amountFields = width * height;
        this.amountBombs = 0;
        this.amountRevealed = 0;
        for (y = 0; y < height; y++) {
            fields[y] = [];
            for (x = 0; x < width; x++) {
                var isBomb = Math.round(Math.random() * BOMB_CHANCE) === 1;
                if (isBomb) {
                    this.amountBombs++;
                }
                fields[y][x] = {
                    isBomb: isBomb,
                    nr: 0,
                    isRevealed: false
                };
            }
        }
        this.fields = fields;
        this.calculateNumbers();
    }

    _createClass(Board, [{
        key: 'calculateNumbers',
        value: function calculateNumbers() {
            var _this = this;

            this.fields.forEach(function (row, y) {
                row.forEach(function (field, x, arr) {
                    var nr = 0;
                    if (field.isBomb) {
                        field.nr = BOMB_ICON;
                        return;
                    }
                    // above
                    if (_this.fields[y - 1] && _this.fields[y - 1][x] && _this.fields[y - 1][x].isBomb) {
                        nr++;
                    }
                    // above right
                    if (_this.fields[y - 1] && _this.fields[y - 1][x + 1] && _this.fields[y - 1][x + 1].isBomb) {
                        nr++;
                    }
                    // right
                    if (_this.fields[y][x + 1] && _this.fields[y][x + 1].isBomb) {
                        nr++;
                    }
                    // underneath right
                    if (_this.fields[y + 1] && _this.fields[y + 1][x + 1] && _this.fields[y + 1][x + 1].isBomb) {
                        nr++;
                    }
                    // underneath
                    if (_this.fields[y + 1] && _this.fields[y + 1][x] && _this.fields[y + 1][x].isBomb) {
                        nr++;
                    }
                    // underneath left
                    if (_this.fields[y + 1] && _this.fields[y + 1][x - 1] && _this.fields[y + 1][x - 1].isBomb) {
                        nr++;
                    }
                    // above left
                    if (_this.fields[y - 1] && _this.fields[y - 1][x - 1] && _this.fields[y - 1][x - 1].isBomb) {
                        nr++;
                    }
                    // left
                    if (_this.fields[y][x - 1] && _this.fields[y][x - 1].isBomb) {
                        nr++;
                    }
                    field.nr = nr;
                });
            });
        }
    }, {
        key: 'reveal',
        value: function reveal(x, y) {
            if (!this.fields[y][x].isRevealed) {
                this.fields[y][x].isRevealed = true;
                this.amountRevealed++;
            }

            // only if this field is empty, reveal neighboured empty fields
            if (this.fields[y][x].nr !== 0) {
                return;
            }

            // above
            if (this.fields[y - 1] && this.fields[y - 1][x] && !this.fields[y - 1][x].isRevealed && this.fields[y - 1][x].nr === 0) {
                this.reveal(x, y - 1);
            }
            // above right
            if (this.fields[y - 1] && this.fields[y - 1][x + 1] && !this.fields[y - 1][x + 1].isRevealed && this.fields[y - 1][x + 1].nr === 0) {
                this.reveal(x + 1, y - 1);
            }
            // right
            if (this.fields[y][x + 1] && !this.fields[y][x + 1].isRevealed && this.fields[y][x + 1].nr === 0) {
                this.reveal(x + 1, y);
            }
            // underneath right
            if (this.fields[y + 1] && this.fields[y + 1][x + 1] && !this.fields[y + 1][x + 1].isRevealed && this.fields[y + 1][x + 1].nr === 0) {
                this.reveal(x + 1, y + 1);
            }
            // underneath
            if (this.fields[y + 1] && this.fields[y + 1][x] && !this.fields[y + 1][x].isRevealed && this.fields[y + 1][x].nr === 0) {
                this.reveal(x, y + 1);
            }
            // underneath left
            if (this.fields[y + 1] && this.fields[y + 1][x - 1] && !this.fields[y + 1][x - 1].isRevealed && this.fields[y + 1][x - 1].nr === 0) {
                this.reveal(x - 1, y + 1);
            }
            // above left
            if (this.fields[y - 1] && this.fields[y - 1][x - 1] && !this.fields[y - 1][x - 1].isRevealed && this.fields[y - 1][x - 1].nr === 0) {
                this.reveal(x - 1, y - 1);
            }
            // left
            if (this.fields[y][x - 1] && !this.fields[y][x - 1].isRevealed && this.fields[y][x - 1].nr === 0) {
                this.reveal(x - 1, y);
            }
        }
    }, {
        key: 'toStringRevealed',
        value: function toStringRevealed() {
            var str = '';
            this.fields.forEach(function (row, y) {
                row.forEach(function (field, x) {
                    str += field.nr + '\t';
                });
                str += '\n';
            });
            console.log(str);
        }
    }, {
        key: 'toString',
        value: function toString() {
            var str = '';
            this.fields.forEach(function (row, y) {
                row.forEach(function (field, x) {
                    str += (field.isRevealed ? field.nr : LEAVES_ICON) + ' (' + x + ',' + y + ')\t';
                });
                str += '\n';
            });
            console.log(str);
        }
    }, {
        key: 'createTable',
        value: function createTable(game) {
            var table = document.createElement('table');
            var self = this;
            this.fields.forEach(function (row, y) {
                var tr = document.createElement('tr');
                row.forEach(function (field, x) {
                    var td = document.createElement('td');
                    td.id = 'cel_' + y + '_' + x;
                    td.innerHTML = field.isRevealed ? field.nr : LEAVES_ICON;
                    td.onclick = function () {
                        game.cellClick(this);
                    };
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
            this.table = table;
        }
    }, {
        key: 'toTable',
        value: function toTable(game) {
            this.createTable(game);
            document.getElementById('table_wrapper').innerHTML = '';
            document.getElementById('table_wrapper').appendChild(this.table);
        }
    }, {
        key: 'createTableRevealed',
        value: function createTableRevealed() {
            var table = document.createElement('table');
            var self = this;
            this.fields.forEach(function (row, y) {
                var tr = document.createElement('tr');
                row.forEach(function (field, x) {
                    var td = document.createElement('td');
                    td.innerHTML = field.nr;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
            this.table = table;
        }
    }, {
        key: 'toTableRevealed',
        value: function toTableRevealed() {
            this.createTableRevealed();
            document.getElementById('table_wrapper').innerHTML = '';
            document.getElementById('table_wrapper').appendChild(this.table);
        }
    }, {
        key: 'createTableWin',
        value: function createTableWin() {
            var table = document.createElement('table');
            var self = this;
            this.fields.forEach(function (row, y) {
                var tr = document.createElement('tr');
                row.forEach(function (field, x) {
                    var td = document.createElement('td');
                    td.innerHTML = field.nr == BOMB_ICON ? PARTY_ICON : field.nr;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
            this.table = table;
        }
    }, {
        key: 'toTableWin',
        value: function toTableWin() {
            this.createTableWin();
            document.getElementById('table_wrapper').innerHTML = '';
            document.getElementById('table_wrapper').appendChild(this.table);
        }
    }]);

    return Board;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BOARD_SIZE = 8;

var Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        this.board = new Board(BOARD_SIZE, BOARD_SIZE);
        this.draw();
    }

    _createClass(Game, [{
        key: 'draw',
        value: function draw() {
            this.board.toTable(this);
        }
    }, {
        key: 'reveal',
        value: function reveal(x, y) {
            if (this.board.fields[y][x].isRevealed) {
                return;
            }
            if (this.board.fields[y][x].isBomb) {
                this.board.toTableRevealed();
                return;
            }
            this.board.reveal(x, y);

            // win if the amount of remaining cells equal the bombs
            if (this.board.amountFields - this.board.amountRevealed === this.board.amountBombs) {
                this.board.toTableWin();
                return;
            }
            this.draw();
        }
    }, {
        key: 'cellClick',
        value: function cellClick(cell) {
            var yx = cell.id.split('_');
            yx.shift();
            this.reveal(yx[1] | 0, yx[0] | 0);
        }
    }]);

    return Game;
}();
"use strict";

new Game();
