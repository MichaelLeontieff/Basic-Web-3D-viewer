import { Vertex } from "./Vertex";
import { Cube } from "./Cube";
import { Renderer, Projections } from "./Renderer";

(() => {
    const canvas = <any>document.querySelector(`#viewport`);
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
	ctx.fillStyle = 'rgba(0, 150, 255, 0.3)';

    const dx = canvas.width / 2;
    const dy = canvas.height / 2;
    
	const cube_center = new Vertex(0, 0, 0);
	const cube = new Cube(cube_center, dy);
	const objects = [cube];
    
    // Events
	var mousedown = false;
	var mx = 0;
	var my = 0;

	canvas.addEventListener('mousedown', initMove);
	document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stopMove);
    
    let autorotate_timeout = setTimeout(autorotate, 2000);

	// Rotate a vertice
	function rotate(M, center, theta, phi) {
        // Rotation matrix coefficients
    	var ct = Math.cos(theta);
    	var st = Math.sin(theta);
    	var cp = Math.cos(phi);
    	var sp = Math.sin(phi);

		// Rotation
		var x = M.x - center.x;
		var y = M.y - center.y;
		var z = M.z - center.z;

		M.x = ct * x - st * cp * y + st * sp * z + center.x;
		M.y = st * x + ct * cp * y - ct * sp * z + center.y;
		M.z = sp * y + cp * z + center.z;
	}

	// Initialize the movement
	function initMove(evt) {
		clearTimeout(autorotate_timeout);
		mousedown = true;
		mx = evt.clientX;
		my = evt.clientY;
	}

	function move(evt) {
		if (mousedown) {
			var theta = (evt.clientX - mx) * Math.PI / 360;
			var phi = (evt.clientY - my) * Math.PI / 180;

			for (var i = 0; i < 8; ++i)
				rotate(cube.vertices[i], cube_center, theta, phi);

			mx = evt.clientX;
			my = evt.clientY;

			Renderer.render(objects, ctx, dx, dy, Projections.ORTHOGRAPHIC);
		}
	}

	function stopMove() {
		mousedown = false;
		autorotate_timeout = setTimeout(autorotate, 2000);
	}

	function autorotate() {
		for (var i = 0; i < 8; ++i)
			rotate(cube.vertices[i], cube_center, -Math.PI / 720, Math.PI / 720);

            Renderer.render(objects, ctx, dx, dy, Projections.ORTHOGRAPHIC);

		autorotate_timeout = setTimeout(autorotate, 30);
	}
})();
