import 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import TitleScene from './scenes/TitleScene';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 64*16,
    height: 64*16,
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0,
            },
            debug: true,
            debugBodyColor: 0xff0000
        }
    },
    scene: [
        BootScene,
        TitleScene,
        GameScene
    ]
};

const game = new Phaser.Game(config);