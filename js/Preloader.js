BaseNamespace.Preloader = function (game) {
    "use strict";

	this.ready = false;
};

BaseNamespace.Preloader.prototype = {
    preload: function () {
        "use strict";
        this.game.load.spritesheet('player', 'img/player.png', 40, 80);
        this.game.load.image('box1', 'img/box1.png');
        this.game.load.image('smallBox', 'img/boxSmall.png');
        this.game.load.image('scaffold', 'img/scaffold.png');
        this.game.load.image('smallScaffold', 'img/smallScaffold.png');

        this.game.load.spritesheet('conveyor', 'img/conveyor.png', 760, 50);

        this.game.load.image('frownie', 'img/frownie.png');
        this.game.load.image('starball', 'img/starball.png');

        this.game.load.image('coin', 'img/coin.png');
        this.game.load.image('heart', 'img/heart.png');

        this.game.load.image('soundOn', 'img/soundOn.png');
        this.game.load.image('muted', 'img/muted.png');
        this.game.load.image('noMusic', 'img/noMusic.png');

        this.game.load.image('title', 'img/title.png');
        this.game.load.image('background', 'img/mountains_bg.png');

        this.game.load.audio('coinSFX', ['sfx/coin.mp3', 'sfx/coin.ogg']);
        this.game.load.audio('hurtSFX', ['sfx/hurt.mp3', 'sfx/hurt.ogg']);

        this.game.load.audio('bgMusic', ['sfx/ludumEdited.mp3', 'sfx/ludumEdited.ogg']);

        this.loadingBar = this.add.sprite(400, 300, 'loadingBar');
        this.loadingBar.anchor.setTo(0.5, 0.5);

        this.load.setPreloadSprite(this.loadingBar);
    },

    create: function () {
        "use strict";
        this.game.musicMute = false;
        this.loadingBar.visible = false;

        this.add.sprite(0, 0, 'title');
        this.soundIcon = this.add.sprite(12, 548, 'soundOn');

        this.startButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.muteButton = this.input.keyboard.addKey(Phaser.Keyboard.M);

        this.mutePushed = false;
        this.muteToggle = 0;
    },

    update: function () {
        "use strict";
        if (!this.mutePushed && this.muteButton.isDown) {
            this.mutePushed = true;
            if (this.sound.mute) {
                this.sound.mute = false;
                this.soundIcon.loadTexture('soundOn');
            } else if (this.game.musicMute) {
                this.sound.mute = true;
                this.game.musicMute = false;
                this.soundIcon.loadTexture('muted');
            } else {
                this.game.musicMute = true;
                this.soundIcon.loadTexture('noMusic');
            }
        }

        if (!this.muteButton.isDown) {
            this.mutePushed = false;
        }

        if (this.startButton.isDown) {
            this.game.state.start('Game');
        }
    }
};
