/**
 * @author alex
 * @requires ball.js
 * 
 * Modified for WebOs Porting and Phonegap:
 * @author trubini trubini@gmail.com
 */

/**
 * Pixi-specific implementation
 * 
 * @param {Object} id
 * @param {Object} x
 * @param {Object} y
 * @param {Object} vx
 * @param {Object} vy
 */
function PixiBall(id, pixiTest, x, y, vx, vy) {
	PixiBall.baseConstructor.call(this, x, y, vx, vy);
	this._id = id;
	this._pixiTest = pixiTest;
	this._stage= pixiTest._stage;
	/*
	var host = document.getElementById('Host');
	*/
	
    var texture = PIXI.Texture.fromImage("images/ball.png");
    // create a new Sprite using the texture
    this.ball = new PIXI.Sprite(texture);
 
    // center the sprites anchor point
    this.ball.anchor.x = 0.5;
    this.ball.anchor.y = 0.5;
 
    this.move();
 
    this._stage.addChild(this.ball);

}
extend(PixiBall, Ball);

PixiBall.prototype.move = function(){
	PixiBall.base.move.call(this);
	
    // move the sprite t the center of the screen
    this.ball.position.x = this._x;
    this.ball.position.y = this._y;
}

	

PixiBall.prototype.removeBall = function () {
	PixiBall.base.removeBall.call(this);
	var host = document.getElementById('Host');
	var elem = document.getElementById(this._id);
	host.removeChild(elem);
}

/**
 * DHTML Balls test
 * 
 * @param {Object} N
 */

 
function PixiTest(N , top, left, right, bottom) {
        PixiTest.baseConstructor.call(this, N, top, left, right, bottom);
        
   // create an new instance of a pixi stage
    this._stage = new PIXI.Stage(0x000000);
 
    // create a renderer instance.
    this._renderer = PIXI.autoDetectRenderer(right-left, bottom-top);
 
    // add the renderer view element to the DOM
    document.getElementById("Host").appendChild(this._renderer.view);
}
extend(PixiTest, BallsTest);

PixiTest.prototype._Animate = function(_this) {
 
        //requestAnimFrame( this.animate );
 
        // render the stage   
        this._renderer.render(this._stage);
}

PixiTest.prototype.start = function(N) {
        if (!PixiTest.base.start.call(this, N)) return;
        this._saveContent = document.getElementById("Host").innerHTML;
        
        //this._ballsO[0] = new PixiBall("dhtml_ball_0");
        
        for (var i=0; i<this._N; i++) {
                this._ballsO[i] = new PixiBall(i, this); // this._ballsO[0].clone("dhtml_ball_" + i);
        }
        
        //requestAnimFrame( this._Animate );
        
}
PixiTest.prototype.stop = function(){
        if (!PixiTest.base.stop.call(this)) return;
        document.getElementById("Host").innerHTML = this._saveContent;
}
PixiTest.prototype.pause = function(){
	if (!PixiTest.base.pause.call(this)) return;
}
PixiTest.prototype.resume = function(){
	if (!PixiTest.base.start.call(this)) return;
}
PixiTest.prototype.activateFPS = function (hastoshow) {
	if (!PixiTest.base.activateFPS.call(this, hastoshow)) return;
}

PixiTest.prototype._showFPS = function(fps) {
        document.getElementById("fps").innerHTML = fps + " FPS";
}
PixiTest.prototype.hitBall = function (id) {
	var index =  id.substring(11);
        if (!PixiTest.base.hitBall.call(this, index)) return;	
}
