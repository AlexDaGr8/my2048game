class Tiles {
    constructor(margin, canvas, ctx) {
        this.tiles = [];
        this.canvas = canvas;
        this.ctx = ctx;
        let tw = (canvas.width - (margin * 5)) / 4;
        
        let yPos = -1;
        for (var i = 0; i < 16; i++) {
            let xPos = i % 4;
            if (xPos === 0) {
                yPos++;
            }
            this.tiles.push({
                id: `${xPos}${yPos}`,
                rowId: yPos,
                columnId: xPos,
                x: margin + ((margin + tw) * xPos),
                y: margin + ((margin + tw) * yPos),
                w: tw,
                h: tw,
                v: ''
            })
        }
        this.colors = [
            { v: 2, color: '#dc7633' },
            { v: 4, color: '#eb984e' },
            { v: 8, color: '#f5b041' },
            { v: 16, color: '#f4d03f' },
            { v: 32, color: '#58d68d' },
            { v: 64, color: '#52be80' },
            { v: 128, color: '#45b39d' },
            { v: 256, color: '#48c9b0' },
            { v: 512, color: '#5dade2' },
            { v: 1024, color: '#5499c7' },
            { v: 2048, color: '#a569bd' },
            { v: 4096, color: '#af7ac5' },
        ]
    }   
    get randomTile() {
        let tile = this.tiles[this.rand(0, this.tiles.length - 1)];
        while (tile.v !== '') {
            tile = this.tiles[this.rand(0, this.tiles.length - 1)]
        }
        return tile;
    }
    get tilesWithValues() {
        return this.tiles.filter(t => t.v !== '');
    }
    get tilesWithOutValues() {
        return this.tiles.filter(t => t.v === '');
    }
    getFillColor(v) {
        return this.colors.find(c => c.v === v);
    }
    getRow(rowId) {
        return this.tiles.filter(t => t.rowId === rowId);
    }
    getColumn(columnId) {
        return this.tiles.filter(t => t.columnId === columnId);
    }
    findTile(x,y) {
        return this.tiles.find(t => t.id === `${x}${y}`);
    }
    rand(min,max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    draw() {
        for (let tile of this.tiles) {
            this.drawTile(tile);
        }
    }
    drawTile({x,y,w,h,v}) {
        this.ctx.fillStyle = this.getFillColor(v) !== undefined ? this.getFillColor(v).color : 'grey';
        this.ctx.fillRect(x,y,w,h);
        this.ctx.fill();
        
        this.ctx.font = "60pt Verdana";
        this.ctx.strokeStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.strokeText(v,x + w/2,y + h/2);
    }
    upArrow() {
        for (let col = 0; col < 4; col++) {
            let column = this.getColumn(col);
            for (let r = 1; r < 4; r++) {
                let row = column[r];
                let prev = column[r - 1];
                let prevPrev = column[r - 2];
                let prevPrevPrev = column[r - 3];
                if (row.v === prev.v && prev.v !== '') {
                    prev.v = row.v * 2;
                    row.v = '';
                } else if (prev.v === '') {
                    if (prevPrev && prevPrev.v === '') {
                        if (prevPrevPrev && prevPrevPrev.v === '') {
                            prevPrevPrev.v = row.v;
                            row.v = '';
                        } else if (prevPrevPrev && prevPrevPrev.v !== '' && row.v === prevPrevPrev.v) {
                            prevPrevPrev.v = row.v * 2;
                            row.v = ''
                        } else {
                            prevPrev.v = row.v;
                            row.v = ''
                        }
                    } else if (prevPrev && prevPrev.v !== '' && row.v === prevPrev.v)  {
                        prevPrev.v = row.v * 2;
                        row.v = '';
                    } else {
                        prev.v = row.v;
                        row.v = '';
                    }
                }
            }
        }
        
        this.randomTile.v = Math.random() > 0.9 ? 4 : 2;
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.draw();
    }
    leftArrow() {
        for (let r = 0; r < 4; r++) {
            let row = this.getRow(r);
            for (let col = 1; col < 4; col++) {
                let column = row[col];
                let prev = row[col - 1];
                let prevPrev = row[col - 2];
                let prevPrevPrev = row[col - 3];
                if (column.v === prev.v && prev.v !== '') {
                    prev.v = column.v * 2;
                    column.v = '';
                } else if (prev.v === '') {
                    if (prevPrev && prevPrev.v === '') {
                        if (prevPrevPrev && prevPrevPrev.v === '') {
                            prevPrevPrev.v = column.v;
                            column.v = '';
                        } else if (prevPrevPrev && prevPrevPrev.v !== '' && row.v === prevPrevPrev.v) {
                            prevPrev.v = column.v * 2;
                            column.v = ''
                        } else {
                            prevPrev.v = column.v;
                            column.v = ''
                        }
                    } else if (prevPrev && prevPrev.v !== '' && column.v === prevPrev.v)  {
                        prevPrev.v = column.v * 2;
                        column.v = '';
                    } else {
                        prev.v = column.v;
                        column.v = '';
                    }
                }
            }
        }
        
        this.randomTile.v = Math.random() > 0.9 ? 4 : 2;
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.draw();
    }
}

export default Tiles;