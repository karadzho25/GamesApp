import * as PIXI from 'pixi.js'
import { App } from '../App'
import { TextLabel } from './TextLabel.js';

export class ToolTip
{
    constructor(settings)
    {
        this.sprite = PIXI.Sprite.from(App.genericAssets.info);
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.sprite.width = 20;
        this.sprite.height = 20;
        this.info = settings.info;

        this.toolTip = new TextLabel();
        this.toolTip.visible = false;

        this.sprite.on('mouseover', this.showToolTip, this);
        this.sprite.on('mouseout', this.hideToolTip, this);
    }

    showToolTip()
    {   
        this.toolTip.visible = true;
    }

    hideToolTip()
    {   
        this.toolTip.visible = false;
    }
}