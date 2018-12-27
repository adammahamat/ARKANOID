var View = function() {
}

View.prototype.bindController = function(controller) {
	this.controller = controller;
}

View.prototype.loop = function() {
	var then = 0;
	
	function render(now) {
		now *= 0.001;
		const dt = now - then;
		then = now;
		
		this.controller.update(dt);
		this.redraw();
		
		requestAnimationFrame(render.bind(this));
	}
	
	requestAnimationFrame(render.bind(this));
}

View.prototype.redraw = function() {
	var field = document.getElementById('field');
	
	while (field.firstChild)
		field.removeChild(field.firstChild);

	var blocks = this.controller.getBlocks();
	
	for (var i = 0; i < blocks.length; i++) {
		var cur = blocks[i];
		
		if (!cur.exist)
			continue;
		
		var block = document.createElement('div');
		
		block.className = 'block';
		block.style.width = cur.width + 'px';
		block.style.height = cur.height + 'px';
		block.style.left = (cur.x - cur.width / 2) + 'px';
		block.style.top = (cur.y - cur.height / 2) + 'px';
		
		field.appendChild(block);
	}
	
	var mb = this.controller.getBall();
	
	var ball = document.createElement('div');
	
	ball.className = 'ball';
	ball.style.width = (mb.radius * 2) + 'px';
	ball.style.height = (mb.radius * 2) + 'px';
	ball.style.left =  (mb.x - mb.radius) + 'px';
	ball.style.top =  (mb.y - mb.radius) + 'px';
	
	field.appendChild(ball);
	
	var mp = this.controller.getPlatform();
	
	var platform = document.createElement('div');
	
	platform.className = 'platform';
	platform.style.width = (mp.width) + 'px';
	platform.style.height = (mp.height) + 'px';
	platform.style.left =  (mp.x - mp.width / 2) + 'px';
	platform.style.top =  (mp.y - mp.height / 2) + 'px';
	
	field.appendChild(platform);	
}

View.prototype.init = function() {
	this.loop();
}

var view = new View();