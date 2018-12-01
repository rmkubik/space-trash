import Player from '../sprites/Player';

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {

    }

    create() {
        this.player = new Player({
            scene: this,
            key: 'characters',
            frame: 0,
            x: 16 * 6,
            y: this.sys.game.config.height - 48 - 48
        });
    }

    update(time, delta) {
 
    }
}

export default GameScene;
