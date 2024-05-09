import * as PIXI from 'pixi.js'
import { Manifest } from './AssetsManifest.js'
import { GamesManager } from "./GamesManager.js";

class Application 
{
    async run(config) 
    {
        this.config = config;

        this.app = new PIXI.Application();
        globalThis.__PIXI_APP__ = this.app;
        await this.app.init({ width: window.innerWidth, height: window.innerHeight});
        document.body.appendChild(this.app.canvas);

        await PIXI.Assets.init({manifest : Manifest});
        this.assets = await PIXI.Assets.loadBundle(config.assets_bundle);
        this.genericAssets = await PIXI.Assets.loadBundle('generic');

        this.gameManager = new GamesManager();
        this.app.stage.interactive = true;
        this.app.stage.addChild(this.gameManager.container)
        this.gameManager.start();
    }
}

export const App = new Application();