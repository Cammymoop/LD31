BaseNamespace.Preloader = function (game) {
    "use strict";

	this.ready = false;
};

BaseNamespace.Preloader.prototype = {
	preload: function () {
        "use strict";
        this.game.load.image('player', 'img/player.png');
        this.game.load.image('conveyor', 'img/conveyor.png');
		this.game.load.image('box1', 'img/box1.png');
	},

	create: function () {
        "use strict";
        this.game.state.start('Game');
	}
};
