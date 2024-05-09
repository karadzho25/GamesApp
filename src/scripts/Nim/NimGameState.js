import { App } from '../App.js';
import { Player } from './Player.js';
import * as Utils from '../Utils.js'
import {GameState} from '../GameState.js'

export class NimGameState extends GameState
{
    constructor()
    {
        super();
    }

    createGameState()
    {
        this.player1 = new Player();
        this.player2 = new Player();
        this.startingPlayer = Math.random() > 0.5 ? this.player1 : this.player2;
        this.currentPlayer = this.startingPlayer;
        this.selectedDiamond = [];
        this.gameOver = false;
        
        this.rows = [];

        let nRows = Utils.getRandomInt(App.config.board.minRows, App.config.board.maxRows);

        for(let i = 0; i < nRows; i++)
        {
            this.rows.push(Utils.getRandomInt(App.config.board.minCols, App.config.board.maxCols));
        }
        
        this.currentRows = [...this.rows];
    }

    resolveAction(action)
    {
        if(action.type == 'select')
        {
            this.onSelectDiamond(action.row, action.col);
        }
        else if(action.type == 'take')
        {   
            console.log(action)
            this.onCollectDiamonds(action.row, action.col);
        }
    }

    onSelectDiamond(row, col)
    {
        this.selectedDiamond = [row, col];
        console.log(this.selectedDiamond)
    }

    onCollectDiamonds(row, amount)
    {
        this.currentRows[row] -= amount;

        if(this.currentRows[row] <= 0)
        {
            this.currentRows.splice(row, 1);
            amount += App.config.score.rewardRow;
        }

        amount *= App.config.score.diamond;

        if(this.currentPlayer == this.player1)
        {
            this.player1.score += amount;
            this.currentPlayer = this.player2;
        }
        else
        {
            this.player2.score += amount;
            this.currentPlayer = this.player1;
        }

        this.selectedDiamond = [];
        this.gameOver = this.currentRows.length <= 0;
    }

    restart()
    {
        this.player1 = new Player();
        this.player2 = new Player();
        this.currentPlayer = this.startingPlayer;
        this.selectedDiamond = [];
        this.gameOver = false;

        this.currentRows = [...this.rows];
    }
}