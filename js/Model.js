const FIELD_WIDTH = 600;
const FIELD_HEIGHT = 475;
const BALL_SPEED = 4;

var Model = function() {
	this.blocks = [];
	
	this.ball = {
		x: 0,
		y: 0,
		radius: 0,
		vx: 0,
		vy: 0
	}
	
	this.platform = {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	}
}

Model.prototype.init = function() {
	var cnt = 0;
	
	for (var x = 0; x < 10; x++) {
		for (var y = 0; y < 5; y++) {
			this.blocks[cnt] = {
				x: 75 + x * 50,
				y: 50 + y * 20,
				width: 50,
				height: 20,
				exist: true
			};
			
			cnt++;
		}
	}
	
	this.ball.x = 75 + (9 * 50) / 2;
	this.ball.y = 50 + 4 * 20 + 150;
	this.ball.radius = 10;
	this.ball.vx = BALL_SPEED;
	this.ball.vy = -BALL_SPEED;
	
	this.platform = {
		x: this.ball.x,
		y: 400,
		width: 100,
		height: 20
	};
}

Model.prototype.getBlocks = function() {
	return this.blocks;
}

Model.prototype.getBall = function() {
	return this.ball;
}

Model.prototype.getPlatform = function() {
	return this.platform;
}

Model.prototype.update = function(dt) {
	var play = false;
	
	var b = this.ball;
	
	b.x += b.vx;
	b.y += b.vy;
	
	// area collisions
	if (b.x + b.radius > FIELD_WIDTH) {
		b.x = FIELD_WIDTH - b.radius;
		b.vx = -b.vx;
	}
	
	if (b.x - b.radius < 0) {
		b.x = b.radius;
		b.vx = -b.vx;
	}
	
	if (b.y - b.radius < 0) {
		b.y = b.radius;
		b.vy = -b.vy;
	}
	
	// fall
	if (b.y + b.radius > FIELD_HEIGHT) {
		alert("You lose");
		location.reload();
	}
	
	// blocks
	var blocks = this.blocks;
	for (var i = 0; i < blocks.length; i++) {
		var bl = blocks[i];
		
		if (!bl.exist)
			continue;
		
		if (b.y + b.radius > bl.y - bl.height / 2
			&& b.y - b.radius < bl.y + bl.height / 2
			&& b.x + b.radius > bl.x - bl.width / 2
			&& b.x - b.radius < bl.x + bl.width / 2) {
			
			if (b.x + b.radius < bl.x - bl.width / 2 + 10 || b.x - b.radius > bl.x + bl.width / 2 - 10) {
				b.vx = -b.vx;
				b.x += b.vx;
			}
			else {
				b.vy = -b.vy;
				b.y += b.vy;
			}
			
			this.blocks[i].exist = false;
			play = true;
			
			this.checkWin();
		}
	}
	
	// platform collision
	if (b.y + b.radius > this.platform.y - this.platform.height / 2
		&& b.y - b.radius < this.platform.y - this.platform.height / 4
		&& this.platform.x - this.platform.width / 2 < b.x
		&& this.platform.x + this.platform.width / 2 > b.x) {
		b.y = this.platform.y - this.platform.height / 2 - b.radius;
		b.vy = -b.vy;
	}
	
	this.ball = b;
	
	return play;
}

Model.prototype.moveMouse = function(x) {
	if (x < this.platform.width / 2)
		x = this.platform.width / 2;
	
	if (x > FIELD_WIDTH - this.platform.width / 2)
		x = FIELD_WIDTH - this.platform.width / 2;
	
	this.platform.x = x;
}

Model.prototype.checkWin = function() {
	for (var i = 0; i < this.blocks.length; i++)
		if (this.blocks[i].exist)
			return;
	
	alert("You win");
	location.reload();
}

var model = new Model();