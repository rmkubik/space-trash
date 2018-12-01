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
        // this.player.setCircle();
        // this.player.setBounce(0.96);

        // Add the map + bind the tileset
        this.map = this.make.tilemap({
            key: 'map'
        });
        this.tileset = this.map.addTilesetImage('Prototype Tiles', 'tiles');

        this.backgroundLayer = this.map.createDynamicLayer('Background', this.tileset, 0, 0);
        this.objectsLayer = this.map.createDynamicLayer('Objects', this.tileset, 0, 0);
    }

    update(time, delta) {
 
    }
}

export default GameScene;
