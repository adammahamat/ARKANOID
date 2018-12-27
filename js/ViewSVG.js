var ns = 'http://www.w3.org/2000/svg';

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
	var svg = document.getElementById('svg');
	
	while (svg.firstChild)
		svg.removeChild(svg.firstChild);
	
	var blocks = this.controller.getBlocks();
	
	for (var i = 0; i < blocks.length; i++) {
		var cur = blocks[i];
		
		if (!cur.exist)
			continue;
		
		var block = document.createElementNS(ns, 'rect');
		
		block.setAttributeNS(null, 'fill', 'yellow');
		block.setAttributeNS(null, 'x', '' + (cur.x - cur.width / 2));
		block.setAttributeNS(null, 'y', '' + (cur.y - cur.height / 2));
		block.setAttributeNS(null, 'width', '' + cur.width);
		block.setAttributeNS(null, 'height', '' + cur.height);
		block.setAttributeNS(null, 'stroke-width', '1');
		block.setAttributeNS(null, 'stroke', 'black');
		
		svg.appendChild(block);
	}
	
	var mb = this.controller.getBall();
	
	var circle = document.createElementNS(ns, 'circle');
	
	circle.setAttributeNS(null, 'fill', 'red');
	circle.setAttributeNS(null, 'cx', '' + mb.x);
	circle.setAttributeNS(null, 'cy', '' + mb.y);
	circle.setAttributeNS(null, 'r', '' + mb.radius);
	circle.setAttributeNS(null, 'stroke-width', '1');
	circle.setAttributeNS(null, 'stroke', 'black');
	
	svg.appendChild(circle);
	
	var mp = this.controller.getPlatform();
	
	var platform = document.createElementNS(ns, 'rect');
	
	platform.setAttributeNS(null, 'fill', 'green');
	platform.setAttributeNS(null, 'x', '' + (mp.x - mp.width / 2));
	platform.setAttributeNS(null, 'y', '' + (mp.y - mp.height / 2));
	platform.setAttributeNS(null, 'width', '' + mp.width);
	platform.setAttributeNS(null, 'height', '' + mp.height);
	platform.setAttributeNS(null, 'stroke-width', '1');
	platform.setAttributeNS(null, 'stroke', 'black');
	
	svg.appendChild(platform);
}

View.prototype.init = function() {
	var field = document.getElementById('field');
	
	var svg = document.createElementNS(ns, 'svg');
	
	svg.id = 'svg';
	svg.setAttribute('width', '600px');
	svg.setAttribute('height', '475px');
	
	field.appendChild(svg);
	
	this.loop();
}

var view = new View();