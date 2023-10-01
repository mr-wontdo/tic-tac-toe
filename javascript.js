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
        player('Player One', 'X'),
        player('Player Two', 'O')
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
        checkWinner();
        switchPlayerTurn();
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
            alert(`The winner is ${activePlayer.name}!`);
        }
    };
    
    // Initial play game message
    printNewRound();
    
    return {playRound, getBoard: board.getBoard, getActivePlayer};
};



const screenController = () => {
    const game = gameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

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
    };

    const clickHandlerBoard = (e) => {
        const selectedRowIndex = e.target.dataset.row;
        const selectedColumnIndex = e.target.dataset.column;
        if (!(selectedRowIndex && selectedColumnIndex)) return;
        game.playRound(selectedRowIndex, selectedColumnIndex);
        updateScreen();
    };

    boardDiv.addEventListener('click', clickHandlerBoard);
    updateScreen();
};

screenController();