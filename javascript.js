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
    
    const getBoard = () => {
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
    
    return {getBoard, addMarker};
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

    // Initial play game message
    printNewRound();
    
    return {playRound};
};

const game = gameController();