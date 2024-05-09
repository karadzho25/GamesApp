import { Nim } from './Nim/Nim'
import { NimView } from './Nim/NimView'
import { NimGameState } from './Nim/NimGameState'

import { TicTacToe } from './TicTacToe/TicTacToe'
import { TicTacToeView } from './TicTacToe/TicTacToeView'
import { TicTacToeGameState } from './TicTacToe/TicTacToeGameState'

export const Config = 
{
    nim: 
    {
        assets_bundle: 'nim',
        relative_path: '/Nim', 
        game: Nim,
        view: NimView,
        gameState: NimGameState,
        board:
        {
            minRows: 5,
            maxRows: 10, 
            minCols: 6,
            maxCols: 10,
            maxSelected: 4,
        },
        score:
        {
            diamond: 1,
            rewardRow: 4
        },
        info: '1. Collect diamonds to earn points from a single row \n 2. If you collect the last diamond on a row get extra points \n 3. The game is over when there are no diamonds left \n 4. The player with the most points wins'
    },
    tictactoe:
    {
        assets_bundle: 'tictactoe',
        relative_path: '/TicTacToe', 
        game: TicTacToe,
        view: TicTacToeView,
        gameState: TicTacToeGameState,
        gridSize: 4,
        winCondition: 3
    }
};