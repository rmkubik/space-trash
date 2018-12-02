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
        // Add the map + bind the tileset
        this.map = this.make.tilemap({
            key: 'map'
        });
        this.tileset = this.map.addTilesetImage('Prototype Tiles', 'tiles');

        this.backgroundLayer = this.map.createDynamicLayer('Background', this.tileset, 0, 0);
        this.objectsLayer = this.map.createDynamicLayer('Objects', this.tileset, 0, 0);

        // Set colliding tiles before converting the layer to Matter bodies!
        this.map.setCollisionByExclusion([ -1, 0 ]);

        // Convert the layer. Any colliding tiles will be given a Matter body.
        // If a tile has collision shapes from Tiled, these will be loaded. If
        // not, a default rectangle body will be used.
        // The body will be accessible via tile.physics.matterBody.
        this.matter.world.convertTilemapLayer(this.objectsLayer);

        this.player = new Player({
            scene: this,
            key: 'characters',
            frame: 0,
            x: 16 * 6,
            y: this.sys.game.config.height - 48 - 48
        });
        this.player.sprite.applyForce({ x: 0.001, y: 0.01 });
        // this.player.sprite.setFixedRotation();

        this.item = new Player({
            scene: this,
            key: 'characters',
            frame: 0,
            x: 16 * 7,
            y: this.sys.game.config.height - 48 - 48
        });
        // this.item.sprite.setFixedRotation();
        
        this.matter.add.constraint(this.player.sprite, this.item.sprite, 32, 1, { angleA: 1, angleB: 1 });
        this.matter.add.mouseSpring();
    }

    update(time, delta) {
 
    }
}

export default GameScene;
