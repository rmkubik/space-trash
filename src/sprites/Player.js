export default class Player { // extends Phaser.GameObjects.Sprite {
    constructor(config) {
        // super();
        // config.scene.physics.world.enable(this);
        config.scene.matter.add.sprite(config.x, config.y, config.key, config.frame);
    }

    update(keys, time, delta) {

    }
}
