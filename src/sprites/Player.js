export default class Player { // extends Phaser.GameObjects.Sprite {
    constructor(config) {
        // super();
        // config.scene.physics.world.enable(this);
        this.sprite = config.scene.matter.add.sprite(config.x, config.y, config.key, config.frame);
        // this.sprite.setCircle();
        // this.sprite.setPolygon(16, 3);
        this.sprite.setBounce(1);
        this.sprite.setFrictionAir(0);
        this.sprite.setFrictionStatic(0);

        config.scene.anims.create({
            key: 'land',
            frames: config.scene.anims.generateFrameNumbers('characters', {
                start: 0,
                end: 4,
                first: 0,
            })
        });

        config.scene.anims.create({
            key: 'jump',
            frames: config.scene.anims.generateFrameNumbers('characters', {
                start: 5,
                end: 8,
                first: 5,
            })
        });
    }

    update(keys, time, delta) {

    }
}
