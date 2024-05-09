import * as PIXI from 'pixi.js'
import { App } from './App'

export class GamesManager
{
    constructor()
    {
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.game = null;
    }

    start()
    {
        if(this.game)
        {
            this.game.remove();
        }

        this.game = new App.config.game(App.config.gameState, App.config.view);
        this.container.addChild(this.game.container);
    }
}
