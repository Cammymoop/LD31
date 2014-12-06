    /*
     * Automatically Included properties:
     * this.game;		//	a reference to the currently running game
     * this.add;		//	used to add sprites, text, groups, etc
     * this.camera;	//	a reference to the game camera
     * this.cache;		//	the game cache
     * this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
     * this.load;		//	for preloading assets
     * this.math;		//	lots of useful common math operations
     * this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
     * this.stage;		//	the game stage
     * this.time;		//	the clock
     * this.tweens;	//	the tween manager
     * this.world;		//	the game world
     * this.particles;	//	the particle manager
     * this.physics;	//	the physics manager
     * this.rnd;		//	the repeatable random number generator
     */
BaseNamespace.Game = function (game) {
    "use strict";
};

BaseNamespace.Game.prototype = {
	create: function () {
        "use strict";
        this.stage.backgroundColor = '#BBBBBB';
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 650;

        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);

        this.player.body.collideWorldBounds = true;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = {'jump': this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)};
        //this.floor = this.game.add.

        this.jumpTime = 0;

	},

	update: function () {
        "use strict";
        var player = this.player;

        player.body.velocity.x = 0;

        if (this.cursors.left.isDown)
        {
            player.body.velocity.x = -150;
        }
        else if (this.cursors.right.isDown)
        {
            player.body.velocity.x = 150;
        }

        if (this.keys.jump.isDown && player.body.onFloor() && this.time.now > this.jumpTime) {
            this.jumpTime = this.time.now + 750;
            player.body.velocity.y = - 450;
        }
	}
};
