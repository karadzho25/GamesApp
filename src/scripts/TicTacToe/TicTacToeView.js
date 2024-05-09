import * as PIXI from 'pixi.js';
import { App } from '../App'
import { View } from "../View.js";
import { TextLabel } from '../components/TextLabel.js';
import Button from '../components/Button.js'
import { TicTacToeAction } from './TicTacToeAction.js';

export class TicTacToeView extends View
{
    constructor()
    {
        super();

        this.bg = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.bg.width = App.app.screen.width;
        this.bg.height = App.app.screen.height;
    
        this.bg.background = 0xffffff;
        this.container.addChild(this.bg);

        this.board = new PIXI.Container();
        this.container.addChild(this.board);

        this.winner = new TextLabel();
        this.player = new TextLabel();

        this.container.addChild(this.player);
        this.container.addChild(this.winner);

        this.button = new Button();
        this.container.addChild(this.button.container);

        this.container.interactive = true;
    }

    update(gameState)
    {
        this.player.update({
            label: gameState.currentPlayer == 'X' ? 'Turn: Player X' : 'Turn: Player O',
        });

        this.updateBoard(gameState);

        if(gameState.gameOver)
        {
            this.gameOver(gameState);
        }
    }

    create(gameState)
    {
        this.createUI(gameState);
        this.createBoard();
    }

    createBoard()
    {
        this.board.removeChildren();

        let gridSize = App.config.gridSize;

        for(let i = 0; i < gridSize*gridSize; i++)
        {
            const field = new PIXI.Container();
            const sprite = PIXI.Sprite.from(App.genericAssets.button);
            sprite.width = 100;
            sprite.height = 100;
            field.width = 100;
            field.height = 100;

            field.x = (i % gridSize) * 100;
            field.y = Math.floor(i / gridSize) * 100;

            field.interactive = true;
            sprite.interactive = true;
            field.addChild(sprite);
            field.on('pointerdown', this.onClick, [this, Math.floor(i / gridSize), i % gridSize]);

            this.board.addChild(field);
        }

        this.board.x = this.bg.width/2 - this.board.width/2;
        this.board.y = this.bg.height/2 - this.board.height/2;
    }

    createUI(gameState)
    {
        this.winner.visible = false;

        this.player.update({
            label: gameState.currentPlayer == 'X' ? 'Turn: Player X' : 'Turn: Player O',
            x: this.bg.width/2,
            y: 50,
            anchor: 0.5
        });

        this.button.update({
            width: 200,
            height: 50,
            label: 'Restart'
        });

        this.button.container.off('pointerdown');
        this.button.container.on('pointerdown', this.onRestartGame, this);
        this.button.container.x = this.bg.width/2;
        this.button.container.y = this.bg.height - this.bg.height/7;
    }

    updateBoard(gameState)
    {
        for(let i = 0; i < App.config.gridSize; i++)
        {   
            for(let j = 0; j < App.config.gridSize; j++)
            {
                if(gameState.rows[i][j] == '')
                {
                    continue;
                }

                let field = this.board.getChildAt(App.config.gridSize*i + j);

                if(gameState.rows[i][j] == 'X')
                {
                    let cross = PIXI.Sprite.from(App.assets.cross);
                    cross.width = field.width;
                    cross.height = field.height;
        
                    field.addChild(cross);
                }
                else if(gameState.rows[i][j] == 'O')
                {
                    let circle = PIXI.Sprite.from(App.assets.circle);
                    circle.width = field.width;
                    circle.height = field.width;
        
                    field.addChild(circle);
                }
            }
        }
    }

    onClick()
    {
        let action = new TicTacToeAction(this[1], this[2]);

        this[0].container.emit('onAction', action);
    }

    gameOver(gameState)
    {
        this.winner.visible = true;

        this.player.text = "Game Over!";

        let winnerStr = '';

        if(gameState.gameResult == 0)
        {
            winnerStr = 'Winner: Player 1';
        }
        else if(gameState.gameResult == 1)
        {
            winnerStr = 'Winner: Player 2';
        }
        else if(gameState.gameReslt == 2)
        {
            winnerStr = 'Draw';
        }

        this.winner.update({
            label: winnerStr,
            x: this.bg.width/2,
            y: 100,
            anchor: 0.5
        });

        this.button.update({
            label: 'Play Again',
        });

        this.button.container.off('pointerdown');
        this.button.container.on('pointerdown', this.onNewGame, this);
    }
}