import * as PIXI from 'pixi.js'

export class TextLabel extends PIXI.Text
{
    constructor(settings)
    {
        super();

        this.settings = {  
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0x000000,
            align: 'center',
            label: 'Score',
            x: 10,
            y: 10,
            anchor: 0,
            label: 'Score'
        };

        this.update(settings);
    }

    update(settings)
    {
        this.settings = {
            ...this.settings,
            ...settings,
        };

        this.x = this.settings.x;
        this.y = this.settings.y;

        this.anchor.set(this.settings.anchor);

        this.text = this.settings.label;
        this.style = {
            fontSize: this.settings.fontSize + 'px',
            fill: this.settings.fill,
            align: this.settings.align
        };
    }
}