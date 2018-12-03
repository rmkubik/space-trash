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
            x: 16 * 4,
            y: this.sys.game.config.height - 48 - 48
        });
        this.player.sprite.applyForce({ x: 0.001, y: 0.01 });
        // this.player.sprite.setFixedRotation();

        this.item = this.matter.add.sprite(100, 100, 'trash', 0);

        // this.item = new Player({
        //     scene: this,
        //     key: 'characters',
        //     frame: 0,
        //     x: 16 * 7,
        //     y: this.sys.game.config.height - 48 - 48
        // });
        // // this.item.sprite.setFixedRotation();
        
        // this.matter.add.constraint(this.player.sprite, this.item.sprite, 32, 1, { angleA: 1, angleB: 1 });
        this.matter.add.mouseSpring();

        this.constraints = [];
        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            if (bodyA.gameObject === this.player.sprite || bodyB.gameObject === this.player.sprite) {
                // bind other object to player so that player can reference it
                if (this.player.state.current !== 'clinging') {
                    this.player.collisionTarget = bodyA.gameObject !== this.player.sprite ? bodyA : bodyB;
                    this.player.normal = event.pairs[0].collision.normal; // get first normal vector from collision
                }
                // console.log([...event.pairs]);

                this.player.state.send('collisionstart');
                this.player.sprite.on('animationcomplete', ({ key }) => {
                    this.player.state.send('animationend');
                });
            }
        });

        this.input.keyboard.on('keydown_SPACE', () => {
            // this.constraints.forEach((constraint) => {
            //     this.matter.world.removeConstraint(constraint);
            // });
            this.player.state.send('jump');
        });

        // this.matter.world.on('collisionend', (event, bodyA, bodyB) => {
        //     // bodyA.gameObject.setTint(0xff0000);
        //     // bodyB.gameObject.setTint(0x00ff00);
        //     // console.log(bodyA);
        //     // bodyB.gameObject.play('jump');
        //     this.player.sprite.play('jump');
        //     this.player.sprite.setStatic(false);
        // });
    }

    update(time, delta) {
 
    }
}

export default GameScene;
