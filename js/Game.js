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

        this.conveyor = this.game.add.sprite(this.game.world.centerX + 60, 565, 'conveyor');
        this.conveyor.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.conveyor, Phaser.Physics.ARCADE);
        this.conveyor.body.allowGravity = false;
        this.conveyor.body.immovable = true;
		
		this.box1 = this.game.add.sprite(this.game.world.centerX + 80, 500, 'box1');
        this.box1.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.box1, Phaser.Physics.ARCADE);
        this.box1.body.immovable = true;
        this.box1.body.allowGravity = false;
        this.box1.body.velocity.x = -90;

        this.frownie = this.game.add.sprite(this.game.world.centerX - 100, this.game.world.centerY, 'frownie');

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = {'jump': this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)};
        //this.floor = this.game.add.

        this.jumpTime = 0;

        this.conveyorMove = [];
	},

	update: function () {
        "use strict";
        var player = this.player;

        player.body.velocity.x = 0;

        
        this.conveyorMove = [];
        this.physics.arcade.collide(player, this.conveyor, this.touchConveyor, null, this);
		this.physics.arcade.collide(player, this.box1);

        if (this.box1.body.right < this.conveyor.body.x) {
            this.box1.body.allowGravity = true;
        }

        for (var i = 0; i < this.conveyorMove.length; i++) {
            this.conveyorMove[i].body.velocity.x = -90;
        }

		if (this.cursors.left.isDown)
        {
            player.body.velocity.x -= 150;
        }
        else if (this.cursors.right.isDown)
        {
            player.body.velocity.x += 150;
        }
		
        if (this.keys.jump.isDown && player.body.touching.down && this.time.now > this.jumpTime) {
            this.jumpTime = this.time.now + 750;
            player.body.velocity.y = - 450;
        }

	},

    touchConveyor: function (conveyor, obj) {
        "use strict";
        this.conveyorMove.push(conveyor);
    }
};
