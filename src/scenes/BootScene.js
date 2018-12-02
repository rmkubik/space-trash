import makeAnimations from '../helpers/animations';
import tiles from '../../assets/images/prototype_tiles.png';
import characters from '../../assets/images/astronaut_anims.png';
import map from '../../assets/tilemaps/Room.json';

class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
    }
    preload() {
        const progress = this.add.graphics();
       
        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            // makeAnimations(this);
            progress.destroy();
            this.scene.start('GameScene');
        });

        this.load.spritesheet('tiles', tiles, {
            frameWidth: 16,
            frameHeight: 16,
            // spacing: 2
        });

        this.load.spritesheet('characters', characters, {
            frameWidth: 32,
            frameHeight: 32,
            // spacing: 2
        });

        this.load.tilemapTiledJSON('map', map);
    }
}

export default BootScene;
