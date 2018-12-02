export default class Player { // extends Phaser.GameObjects.Sprite {
    constructor(config) {
        // super();
        // config.scene.physics.world.enable(this);
        this.sprite = config.scene.matter.add.sprite(config.x, config.y, config.key, config.frame);
        this.sprite.setCircle();
        // this.sprite.setPolygon(16, 3);
        this.sprite.setBounce(1);
        this.sprite.setFrictionAir(0);
        this.sprite.setFrictionStatic(0);
    }

    update(keys, time, delta) {

    }
}
