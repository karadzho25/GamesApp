import * as PIXI from 'pixi.js'
import { App } from '../App.js'
import Button from '../components/Button.js'
import { TextLabel } from '../components/TextLabel.js';
import { ToolTip } from '../components/ToolTip.js';
import { NimAction } from './NimAction.js';
import { View } from '../View.js';
 
export class NimView extends View
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

        this.score1 = new TextLabel();
        this.score2 = new TextLabel();
        this.winner = new TextLabel();
        this.finalScore = new TextLabel();
        this.player = new TextLabel();

        this.container.addChild(this.score1);
        this.container.addChild(this.score2);
        this.container.addChild(this.player);
        this.container.addChild(this.winner);
        this.container.addChild(this.finalScore);
        
        this.button = new Button();
        this.container.addChild(this.button.container);

        this.button1 = new Button();
        this.container.addChild(this.button1.container);

        this.info = new ToolTip({
            info: App.config.info
        });
        
        this.info.sprite.x = this.bg.width - 2 * this.info.sprite.width;
        this.info.sprite.y = 10;
        this.container.addChild(this.info.sprite);

        this.info.toolTip.update({
            label: App.config.info,
            x: this.bg.width,
            y: 100,
            anchor: 1,
            fontSize: 15
        });

        this.rules = new TextLabel();
        this.container.addChild(this.rules);

        this.container.addChild(this.info.toolTip);

        this.container.interactive = true;
    }

    create(gameState)
    {
        this.createUI(gameState);
        this.createBoard(gameState);
    }

    update(gameState)
    {
        this.score1.update({
            label: `Score 1: ${gameState.player1.score}`,
        });

        this.score2.update({
            label: `Score 2: ${gameState.player2.score}`,
        });
        
        this.player.update({
            label: gameState.currentPlayer == gameState.player1 ? 'Turn: Player 1' : 'Turn: Player 2'
        }); 

        this.createBoard(gameState);
        this.selectDiamond(gameState);

        if(gameState.gameOver)
        {
            this.gameOver(gameState);
        }
    }

    gameOver(gameState)
    {
        this.score1.visible = false;
        this.score2.visible = false;
        this.rules.visible = false;
        this.winner.visible = true;
        this.finalScore.visible = true;

        this.player.text = "Game Over!";

        let winnerStr = '';

        if(gameState.player1.score > gameState.player2.score)
        {
            winnerStr = 'Winner: Player 1';
        }
        else if(gameState.player1.score < gameState.player2.score)
        {
            winnerStr = 'Winner: Player 2';
        }
        else
        {
            winnerStr = 'Draw';
        }

        this.winner.update({
            label: winnerStr,
            x: this.bg.width/2,
            y: this.bg.height/5 + 50,
            anchor: 0.5
        });

        this.finalScore.update({
            label: `Final Score ${gameState.player1.score} - ${gameState.player2.score}`,
            x: this.bg.width/2,
            y: this.bg.height/5 + 100,
            anchor: 0.5
        });

        this.button.update({
            label: 'Play Again',
        });

        this.button.container.off('pointerdown');
        this.button.container.on('pointerdown', this.onNewGame, this);
    }

    selectDiamond(gameState)
    {
        this.clearSelected();

        let filtered = this.diamonds.filter((element) => element.row == gameState.selectedDiamond[0] && element.col <= gameState.selectedDiamond[1]);

        filtered.forEach((element) => 
            {
                element.isSelected = true;
                element.sprite.alpha = 0.5;
            });

    }

    clearSelected()
    {
        this.diamonds.forEach((element) => 
            {
                element.isSelected = false;
                element.sprite.alpha = 1;
            });
    }

    createUI(gameState)
    {
        this.score1.visible = true;
        this.score2.visible = true;
        this.rules.visible = true;
        this.winner.visible = false;
        this.finalScore.visible = false;

        this.score1.update({
            label: `Score 1: ${gameState.player1.score}`,
            x: 10,
            y: 10,
        });

        this.score2.update({
            label: `Score 2: ${gameState.player2.score}`,
            x: this.score1.x + this.score1.width + 20,
            y: 10,
        });

        this.player.update({
            label: gameState.currentPlayer == gameState.player1 ? 'Turn: Player 1' : 'Turn: Player 2',
            x: this.bg.width/2,
            y: this.bg.height/5,
            anchor: 0.5
        });

        this.rules.update({
            label: `Each diamond is worth ${App.config.score.diamond} pts \n Each row is worth +${App.config.score.rewardRow} pts\n You can select up to ${App.config.board.maxSelected} diamonds per turn`,
            x: this.bg.width/2,
            y: 50,
            anchor: 0.5,
            fontSize: 20
        });
   
        this.button.update({
            width: 200,
            height: 50,
            label: 'Take'
        });

        this.button.container.off('pointerdown');
        this.button.container.on('pointerdown', this.onTake, this);
        this.button.container.x = this.bg.width/2;
        this.button.container.y = this.bg.height - this.bg.height/5;

        this.button1.update({
            width: 200,
            height: 50,
            label: 'Restart'
        });

        this.button1.container.on('pointerdown', this.onRestartGame, this);
        this.button1.container.x = this.bg.width/2;
        this.button1.container.y = this.bg.height - this.bg.height/5 + 50;
    }

    createBoard(gamestate)
    {
        this.board.removeChildren();
        this.diamonds = [];

        let max = Math.max(...gamestate.currentRows);

        for(let i = 0; i < gamestate.currentRows.length; i++)
        {
            for(let j = 0; j < gamestate.currentRows[i]; j++)
            {
                const diamond = new Diamond(i, j);

                diamond.sprite = PIXI.Sprite.from(App.assets.diamond);
                let xOffset = (max - gamestate.currentRows[i])*diamond.sprite.width/2;
                diamond.sprite.x = xOffset + (j)*diamond.sprite.width;
                diamond.sprite.y = i*diamond.sprite.height;
                diamond.sprite.interactive = true;
                diamond.sprite.on('pointerdown', this.onClick, [this, diamond.row, diamond.col]);

                this.board.addChild(diamond.sprite);
                this.diamonds.push(diamond);
            }
        }

        this.board.x = this.bg.width/2 - this.board.width/2;
        this.board.y = this.bg.height/2 - this.board.height/2;
    }

    onClick()
    {
        this[2] = Math.min(App.config.board.maxSelected - 1, this[2]);
        let action = new NimAction('select', this[1], this[2]);

        this[0].container.emit('onAction', action);
    }

    onTake()
    {
        let filtered = this.diamonds.filter((element) => element.isSelected);

        if(filtered.length > 0)
        {   
            let action = new NimAction('take', filtered[0].row, filtered.length);
            this.container.emit('onAction', action);
        }
    }
}

class Diamond
{
    constructor(row, col)
    {
        this.row = row;
        this.col = col;
        this.isSelected = false;
    }
}