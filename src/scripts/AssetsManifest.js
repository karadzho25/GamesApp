export const Manifest = {
    bundles:[
    {
       name:'nim',
       assets:[
           {
                alias: 'diamond',
                src: '../src/sprites/diamond.png',
           }
       ]
    },
    {
       name: 'generic',
       assets:[
            {
                alias: 'button',
                src: '../src/sprites/button.png'
            },
            {
                alias: 'info',
                src: '../src/sprites/info.png'
            }
       ]
    },
    {
        name:'tictactoe',
        assets:[
            {
                alias: 'circle',
                src: '../src/sprites/circle.png',
            },
            {
                alias: 'cross',
                src: '../src/sprites/x.png',
            },
        ]
    }
]}