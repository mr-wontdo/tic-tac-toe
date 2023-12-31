const gameboard = () => {
    const rows = 3;
    const columns = 3;
    const board = []; 

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }
    
    const getBoard = () => board;
    
    const printBoard = () => {
        return board.map(row => row.map(column => column.getMarker()));
    };

    const addMarker = (row, column, player) => {
        if (board[row][column].getMarker() !== '') return;
        board[row][column].changeMarker(player);
    };

    function cell() {
        let marker = '';
        const changeMarker = (player) => {
            marker = player;
        };
        const getMarker = () => marker;
        return {changeMarker, getMarker}
    };
    
    return {getBoard, addMarker, printBoard};
};



const gameController = () => {
    const player = (name, marker) => {
        return {name, marker};
    };
    
    const players = [
        player('Player X', 'X'),
        player('Player O', 'O')
    ];

    const board = gameboard();
    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = getActivePlayer() === players[0] ? players[1] : players[0];
    };

    const printNewRound = () => {
        console.log(board.printBoard());
        console.log(`It is ${activePlayer.name}'s turn!`);
    };

    const playRound = (row, column) => {
        if (board.getBoard()[row][column].getMarker() !== '') return;
        console.log(`${getActivePlayer().name} has made their move on row ${row}, column ${column}...`);
        board.addMarker(row, column, getActivePlayer().marker);
        if (checkWinner() !== true && checkTie() !== true) switchPlayerTurn();
        printNewRound();
    };

    const checkWinner = () => {
        const markedBoard = board.getBoard().map(row => row.map(column => column.getMarker()));
        if (markedBoard[0].every(row => row === markedBoard[0][0]) && markedBoard[0][0] !== '' ||
            markedBoard[1].every(row => row === markedBoard[1][0]) && markedBoard[1][0] !== '' ||
            markedBoard[2].every(row => row === markedBoard[2][0]) && markedBoard[2][0] !== '' ||
            [markedBoard[0][0], markedBoard[1][0], markedBoard[2][0]].every(column => column === markedBoard[0][0]) && markedBoard[0][0] !== '' ||
            [markedBoard[0][1], markedBoard[1][1], markedBoard[2][1]].every(column => column === markedBoard[0][1]) && markedBoard[0][1] !== '' ||
            [markedBoard[0][2], markedBoard[1][2], markedBoard[2][2]].every(column => column === markedBoard[0][2]) && markedBoard[0][2] !== '' ||
            [markedBoard[0][0], markedBoard[1][1], markedBoard[2][2]].every(diagonal => diagonal === markedBoard[0][0]) && markedBoard[0][0] !== '' ||
            [markedBoard[2][0], markedBoard[1][1], markedBoard[0][2]].every(diagonal => diagonal === markedBoard[0][2]) && markedBoard[2][0] !== '' ) {
            return true;
        }
    };

    const checkTie = () => {
        const markedBoard = board.getBoard().map(row => row.map(column => column.getMarker()));
        if (!markedBoard[0].concat(markedBoard[1], markedBoard[2]).includes('')) return true;
    }
    
    printNewRound();
    
    return {playRound, getBoard: board.getBoard, getActivePlayer, checkWinner, checkTie};
};



const screenController = () => {
    const game = gameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const restartButton = document.querySelector('.restart');

    const updateScreen = () => {
        boardDiv.textContent = '';
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

        board.forEach((row, index) => {
            const selectedRowIndex = index;
            row.forEach((column, index) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
                cellButton.dataset.row = selectedRowIndex;
                cellButton.dataset.column = index;
                cellButton.textContent = column.getMarker();
                boardDiv.appendChild(cellButton);
            });
        });

        if (game.checkWinner() === true) {
            playerTurnDiv.textContent = `${game.getActivePlayer().name} has won the game!`;
        } else if (game.checkTie() === true) {
            playerTurnDiv.textContent = `The game is tied!`;
        }
    };

    const clickHandlerBoard = (e) => {
        const selectedRowIndex = e.target.dataset.row;
        const selectedColumnIndex = e.target.dataset.column;
        if (game.checkWinner() === true || game.checkTie()) return;
        if (!(selectedRowIndex && selectedColumnIndex)) return;
        game.playRound(selectedRowIndex, selectedColumnIndex);
        updateScreen();
    };

    boardDiv.addEventListener('click', clickHandlerBoard);
    restartButton.addEventListener('click', screenController);
    updateScreen();
};

screenController();