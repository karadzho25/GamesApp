import * as PIXI from "pixi.js";
import { App } from "./App";

export class Game 
{
    constructor(gameState, view) 
    {
        this.container = new PIXI.Container();
        this.container.interactive = true;
        App.app.ticker.add(this.update, this);

        this.view = new view();
        this.container.addChild(this.view.container);

        this.gameState = new gameState();

        this.create();
    }

    create() 
    {
        this.createView();

        this.view.container.on("onAction", (args) =>
        {
            this.onAction(args); 
        });

        this.view.container.on("onNewGame", () =>
        {
            this.newGame(); 
        });

        this.view.container.on("onRestart", () =>
        {
            this.restartGame(); 
        });
    }

    createView()
    {
        this.view.create(this.gameState);
    }

    onAction(args)
    {
        this.gameState.resolveAction(args);
        this.view.update(this.gameState);
    }


    newGame()
    {
        this.gameState.createGameState();
        this.view.create(this.gameState);
    }

    restartGame()
    {
        this.gameState.restart();
        this.view.create(this.gameState);
    }

    update() {}
    destroy() {}

    remove() 
    {
        App.app.ticker.remove(this.update, this);
        this.destroy();
    }
}