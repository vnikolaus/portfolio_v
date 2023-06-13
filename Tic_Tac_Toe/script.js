const tic_tac_toe = {
    board: ['','','','','','','','',''],
    symbols: {
        options: ["X", "O"],
        turn: 0,
        change() {
            this.turn = (this.turn === 0 ? 1 : 0)
        }
    },
    container_game: null,
    gameover: false,
    winner_sequences: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    init(container){
        this.container_game = container;
    },

    get_h1() {
        let n = document.getElementById('winner');

        return n;
    },

    start() {
        this.draw();
    },

    restart() {
        this.gameover = false;
        this.board.fill('');
        this.hidden_winner();
        this.draw();
    },

    tie() {
        let tie = this.get_h1();
        tie.hidden = false;
        tie.textContent = "EMPATE."
        console.log("EMPATE.");
        this.game_over();
    },
    
    play(position) {

        if (this.gameover === true || this.board[position] !== '') return false;
        let currentSymbol = this.symbols.options[this.symbols.turn];
        this.board[position] = currentSymbol;

        this.draw();

        if (!this.board.includes('')) this.tie(); 

        if (this.check_winner_sequence(currentSymbol) >= 0) this.game_over();

        this.symbols.change();
    },

    check_winner_sequence(symbol) {
        for (i in this.winner_sequences) {
            if (this.board[ this.winner_sequences[i][0] ] == symbol && 
                this.board[ this.winner_sequences[i][1] ] == symbol && 
                this.board[ this.winner_sequences[i][2] ] == symbol) {
                console.log(`Sequencia vencedora : ${this.winner_sequences[i]} / index: ${i}`);
                this.show_winner();
                return i;
            }
        }
        return -1
    },

    draw() {
        let content = '';

        for (i in this.board) {
            content += `<div onclick="tic_tac_toe.play('${i}')">${this.board[i]}</div>`;
        }

        this.container_game.innerHTML = content;
    },

    game_over() {
        this.gameover = true;
        console.log("GAME OVER");
    },

    show_winner() {
        let h1 = this.get_h1();
        h1.hidden = false;
        h1.innerHTML = `GAME OVER ! <br> '${this.symbols.options[this.symbols.turn]}' foi o vencedor`;
    },

    hidden_winner() {
        let h1 = this.get_h1();
        h1.hidden = true;
    },

}

