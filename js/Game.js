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
        this.physics.arcade.gravity.y = 900;

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
        this.addStack(500, ['box1']);

        this.addStack(640, ['box1', 'box1']);

        this.addStack(840, ['box1', 'box1', 'box1']);
        this.addStack(880, ['box1']);

        this.addStack(950, ['scaffold', 'smallScaffold', 'scaffold', 'smallScaffold', 'scaffold', 'smallScaffold', 'box1']);

        this.addStack(1070, ['box1', 'box1', 'scaffold', 'box1', 'box1']);
        this.addStack(1110, ['box1']);

        this.addStack(1270, ['box1', 'box1', 'box1']);
		
        var addBoxOffset = 1600;
        var stack = null;
        var different = {
            0: ['box1', 'scaffold', 'box1', 'box1'],
            2: ['box1', 'scaffold', 'box1'],
            3: ['box1', 'scaffold', 'box1', 'scaffold', 'smallBox'],
            8: ['box1', 'scaffold', 'smallBox', 'smallScaffold', 'scaffold', 'smallScaffold', 'smallScaffold', 'box1'],
            9: ['box1', 'scaffold', 'scaffold', 'scaffold', 'box1'],
        };
        for (var i = 0; i < 14; i++) {
            if (i in different) {
                stack = different[i];
            } else {
                stack = ['box1', 'scaffold', 'box1', 'scaffold', 'box1'];
            }
            this.addStack(addBoxOffset, stack);
            addBoxOffset += 40;
        }

        this.frownie = this.game.add.sprite(this.game.world.centerX - 200, this.game.world.centerY, 'frownie');

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = {'jump': this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)};

        this.jumpTime = 0;

        this.conveyorMove = [];
	},

    addStack: function (x, obstacles) {
        "use strict";
        var y = 540;
        var heights = {'box1': 80, 'scaffold': 80, 'smallBox': 20, 'smallScaffold': 20};
        var obs = null;
        var onTop = false;
        for (var i = 0; i < obstacles.length; i++) {
            if (i === obstacles.length - 1 || obstacles[i+1] !== 'box1') {
                onTop = true;
            } else {
                onTop = false;
            }
            obs = obstacles[i];
            y -= heights[obs] / 2;
            this.addBox (x, y, onTop, obs);
            y -= heights[obs] / 2;
        }
    },

    addBox: function (x, y, onTop, image) {
        "use strict";
        image = typeof image !== 'undefined' ? image : 'box1';

        var collides = {'box1': true, 'smallBox': true, 'scaffold': false, 'smallScaffold': false};

        var box = this.game.add.sprite(x, y, image);
        box.anchor.setTo(0.5, 0.5);
        this.physics.enable(box, Phaser.Physics.ARCADE);
        box.body.immovable = true;
        box.body.allowGravity = false;
        box.body.velocity.x = -90;
        if (!onTop) {
            box.body.checkCollision.up = false;
        }
        box.boxUpdate = function (fallX) {
            if (this.body.right < fallX) {
                this.body.allowGravity = true;
                this.body.drag.x = 190;
            }

            if (this.y > 650) {
                this.body.enable = false;
            }
        };
        box.collides = collides[image];

        this.boxes.add(box);
    },

	update: function () {
        "use strict";
        var player = this.player;

        player.body.velocity.x = 0;

        
        this.conveyorMove = [];
        this.physics.arcade.collide(player, this.conveyor, this.touchConveyor, null, this);
		this.physics.arcade.collide(player, this.boxes, null, this.boxCollideCheck, this);

        this.boxes.callAll('boxUpdate', null, this.conveyor.body.x);

		if (this.cursors.left.isDown)
        {
            player.body.velocity.x -= 150;
        }
        else if (this.cursors.right.isDown)
        {
            player.body.velocity.x += 150;
        }

        if (player.x > 790 && player.body.velocity.x > 0) {
            player.body.velocity.x = 0;
            if (player.body.touching.down) {
                player.x += 90 * this.time.physicsElapsed;
            }
        }

        for (var i = 0; i < this.conveyorMove.length; i++) {
            this.conveyorMove[i].x += -90 * this.time.physicsElapsed;
        }
		
        if (this.keys.jump.isDown && player.body.touching.down && this.time.now > this.jumpTime) {
            this.jumpTime = this.time.now + 250;
            player.body.velocity.y = - 450;
        }
	},

    boxCollideCheck: function (player, box) {
        "use strict";
        if (!box.collides) {
            return false;
        }
        return true;
    },

    touchConveyor: function (obj, conveyor) {
        "use strict";
        this.conveyorMove.push(obj);
    }
};
