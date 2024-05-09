import * as PIXI from 'pixi.js'
import { App } from '../App'

export default class Button
{
    constructor(settings) 
    {
        this.container = new PIXI.Container();

        this.sprite = PIXI.Sprite.from(App.genericAssets.button);
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.container.addChild(this.sprite);

        this.settings = 
        {
            width: 200,
            height: 50,

            fontSize: 25,
            label: 'Button',
            tint: 0xffffff,
            fill: '#ffffff',
            align: 'center'
        };

        this.label = new PIXI.Text();
        this.label.anchor.set(0.5);
        this.container.addChild(this.label);

        this.update(settings);

        this.container.interactive = true;
        this.container.buttonMode = true;
    }

    update(settings) 
    {
        this.settings = {
            ...this.settings,
            ...settings,
        };

        this.label.text = this.settings.label;
        this.label.style = {
            fontSize: this.settings.fontSize + 'px',
            fill: this.settings.fill,
            align: this.settings.align
        };

        this.onResize();
    }

    onResize() 
    {
        this.sprite.width = this.settings.width;
        this.sprite.height = this.settings.height;

        this.label.x = this.sprite.width * 0.5;
        this.label.y = this.sprite.height * 0.5;

        this.container.pivot.set(this.container.width*0.5, this.container.height*0.5);
    }
}