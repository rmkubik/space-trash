import { Machine } from 'xstate';
import { interpret } from 'xstate/lib/interpreter'; // or use your own interpreter!
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
                start: 1,
                end: 4,
                first: 1,
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

        const fsm = Machine({
            initial: 'floating',
            states: {
                floating: {
                    on: {
                        collisionstart: 'landing',
                    }
                },
                landing: {
                    onEntry: ['playLandAnimation', 'freeze'],
                    on: {
                        animationend: 'clinging',
                    }
                },
                jumping: {
                    on: {
                        animationend: 'floating',
                    },
                    onExit: ['unFreeze'],
                },
                clinging: {
                    on: {
                        jump: 'jumping',
                    },
                    onExit: ['playJumpAnimation'],
                }
            }
        },
        {
            actions: {
                playJumpAnimation: () => {
                    this.sprite.play('jump');
                },
                playLandAnimation: () => {
                    this.sprite.play('land');
                },

                freeze: () => {
                    this.sprite.setStatic(true);
                },
                unFreeze: () => {
                    this.sprite.setStatic(false);
                }
            }
        });
  
        this.state = interpret(fsm)
            .onTransition(state => console.log(state.value))
            .start();
    }

    update(keys, time, delta) {

    }
}
