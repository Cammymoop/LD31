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
        this.physics.arcade.gravity.y = 950;

        this.player = this.game.add.sprite(this.game.world.centerX, 500, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.setSize(30, 62, 0, 9);

        this.conveyor = this.game.add.sprite(this.game.world.centerX + 60, 565, 'conveyor');
        this.conveyor.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.conveyor, Phaser.Physics.ARCADE);
        this.conveyor.body.allowGravity = false;
        this.conveyor.body.immovable = true;
		
        this.boxes = this.add.group();
        this.addBox(500, 500);

        this.addBox(640, 500);
        this.addBox(638, 420);

        this.addBox(840, 500);
        this.addBox(838, 420);
        this.addBox(837, 340);

        this.addBox(880, 500);
        this.addBox(950, 200);

        this.addBox(1070, 500);
        this.addBox(1068, 420);
        this.addBox(1067, 260);
        this.addBox(1067, 180);

        this.addBox(1270, 500);
        this.addBox(1268, 420);
        this.addBox(1267, 340);

        this.frownie = this.game.add.sprite(this.game.world.centerX - 100, this.game.world.centerY, 'frownie');

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = {'jump': this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)};

        this.jumpTime = 0;

        this.conveyorMove = [];
	},

    addBox: function (x, y) {
        "use strict";
		var box = this.game.add.sprite(x, y, 'box1');
        box.anchor.setTo(0.5, 0.5);
        this.physics.enable(box, Phaser.Physics.ARCADE);
        box.body.immovable = true;
        box.body.allowGravity = false;
        box.body.velocity.x = -90;
        box.boxUpdate = function (fallX) {
            if (this.body.right < fallX) {
                this.body.allowGravity = true;
            }
        };

        this.boxes.add(box);
    },

	update: function () {
        "use strict";
        var player = this.player;

        player.body.velocity.x = 0;

        
        this.conveyorMove = [];
        this.physics.arcade.collide(player, this.conveyor, this.touchConveyor, null, this);
		this.physics.arcade.collide(player, this.boxes);

        this.boxes.callAll('boxUpdate', null, this.conveyor.body.x);

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
            this.jumpTime = this.time.now + 250;
            player.body.velocity.y = - 450;
        }
	},

    touchConveyor: function (conveyor, obj) {
        "use strict";
        this.conveyorMove.push(conveyor);
    }
};
