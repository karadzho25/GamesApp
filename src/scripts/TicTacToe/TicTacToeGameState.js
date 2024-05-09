import { Ellipse } from 'pixi.js';
import { App } from '../App'; 
import { GameState } from "../GameState";

export class TicTacToeGameState extends GameState
{
    constructor()
    {
        super();
    }

    createGameState()
    {
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.gameResult = 0;
        this.rows = [];
        this.winCondition = App.config.winCondition;
        
        for(let i = 0; i < App.config.gridSize; i++)
        {
            let row = [];
            for(let j = 0; j < App.config.gridSize; j++)
            {
                row.push('');
            }
            this.rows.push(row);
        }
    }

    restart()
    {
        this.createGameState();
    }

    resolveAction(action)
    {
        if(!this.gameOver)
        {
            if(this.rows[action.row][action.col] == '')
                {
                    this.rows[action.row][action.col] = this.currentPlayer;
                    this.checkWin(action);
        
                    this.currentPlayer = this.currentPlayer == 'X' ? 'O' : 'X';
                }
        }
    }

    checkWin(action)
    {
        if(this.rows.find((element) => element.find((field) => field == '') != undefined) == undefined)
        {
            this.gameOver = true;
            this.gameResult = 2;
        }

        //get row
        let row = this.rows[action.row];
        let startCol = Math.max(0, action.col - this.winCondition + 1);
        let endCol = Math.min(App.config.gridSize - 1, action.col + this.winCondition - 1);

        //get col
        var col = this.rows.map(function(value,_) { return value[action.col]; });
        let startRow = Math.max(0, action.row - this.winCondition + 1);
        let endRow = Math.min(App.config.gridSize - 1, action.row + this.winCondition - 1);

        //get diags
        let diag1 = [];
        let diag2 = [];

        for(let i = startRow; i <= endRow; i++)
        {
            for(let j = startCol; j <= endCol; j++)
            {
                if((i+j) == (action.col + action.row))
                {
                    diag1.push(this.rows[i][j]);
                }
                
                if((i-j) == (action.row - action.col))
                {
                    diag2.push(this.rows[i][j]);
                }
            }
        }

        if(this.checkWinCondition(0, diag1.length - 1, diag1)
        || this.checkWinCondition(0, diag2.length - 1, diag2)
        || this.checkWinCondition(startCol, endCol, row)
        || this.checkWinCondition(startRow, endRow, col))
        {
            this.gameOver = true;
            this.gameResult = this.currentPlayer == 'X' ? 0 : 1;
            return;
        }
    }

    checkWinCondition(start, end, arr)
    {
        let k = 0;

        if(arr.length < this.winCondition)
            return false;

        for(let i = start; i <= end; i++)
        {   
            if(arr[i] == this.currentPlayer)
            {
                k++;

                if(k >= this.winCondition)
                    return true;
            }
            else
            {
                k=0;
            }
        }

        return false;
    }
}