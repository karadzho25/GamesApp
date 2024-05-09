import * as PIXI from 'pixi.js'

export class View
{
    constructor()
    {
        this.container = new PIXI.Container();
    }

    create(gameState) {}
    update(gameState) {}

    onNewGame()
    {
        this.container.emit('onNewGame');
    }

    onRestartGame()
    {
        this.container.emit('onRestart'); 
    }
}