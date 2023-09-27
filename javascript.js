const gameboard = (() => {
    // Create gameboard
    const rows = 3;
    const columns = 3;
    const board = []; 
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push('');
        }
    }
    console.log(board);
})();




const gameController = (() => {
    const player = (name, marker) => {
        return {name, marker};
    };
    const playerOne = player('Player One', 'X');
    const playerTwo = player('Player Two', 'O');
    console.log(playerOne, playerTwo);
})();





// Create gameboard
// Add markers to gameboard
// Create players
// Switch turn