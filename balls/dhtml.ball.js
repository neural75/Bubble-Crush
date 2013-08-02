/**
 * @author alex
 * @requires ball.js
 * 
 * Modified for WebOs Porting:
 * @author trubini trubini@gmail.com
 */

/**
 * DHTML-specific implementation
 * 
 * @param {Object} id
 * @param {Object} x
 * @param {Object} y
 * @param {Object} vx
 * @param {Object} vy
 */
function DHTMLBall(id, x, y, vx, vy) {
	DHTMLBall.baseConstructor.call(this, x, y, vx, vy);
	this._id = id;
	var host = document.getElementById('Host');
	
	var img = document.createElement('img');
	img.id= id;
	img.src="images/ball.png";
	img.alt="ball";
	host.appendChild(img);
	
	this._elem= img;
	this._elem.style.position = "absolute"; 
	this._elem.style.display = "block";
	this.move();
}
extend(DHTMLBall, Ball);

DHTMLBall.prototype.move = function(){
	DHTMLBall.base.move.call(this);
	this._elem.style.left = this._x + "px";
	this._elem.style.top = this._y + "px";
}

DHTMLBall.prototype.removeBall = function () {
	DHTMLBall.base.removeBall.call(this);
	var host = document.getElementById('Host');
	var elem = document.getElementById(this._id);
	host.removeChild(elem);
}

/**
 * DHTML Balls test
 * 
 * @param {Object} N
 */
function DHTMLTest(N) {
        DHTMLTest.baseConstructor.call(this, N);
}
extend(DHTMLTest, BallsTest);

DHTMLTest.prototype.start = function(N) {
        if (!DHTMLTest.base.start.call(this, N)) return;
        this._saveContent = document.getElementById("Host").innerHTML;
        
        //this._ballsO[0] = new DHTMLBall("dhtml_ball_0");
        
        for (var i=0; i<this._N; i++) {
                this._ballsO[i] = new DHTMLBall("dhtml_ball_" + i); // this._ballsO[0].clone("dhtml_ball_" + i);
        }
        
}
DHTMLTest.prototype.stop = function(){
        if (!DHTMLTest.base.stop.call(this)) return;
        document.getElementById("Host").innerHTML = this._saveContent;
}
DHTMLTest.prototype.pause = function(){
	if (!DHTMLTest.base.pause.call(this)) return;
}
DHTMLTest.prototype.resume = function(){
	if (!DHTMLTest.base.start.call(this)) return;
}
DHTMLTest.prototype.activateFPS = function (hastoshow) {
	if (!DHTMLTest.base.activateFPS.call(this, hastoshow)) return;
}

DHTMLTest.prototype._showFPS = function(fps) {
        document.getElementById("fps").innerHTML = fps + " FPS";
}
DHTMLTest.prototype.hitBall = function (id) {
	var index =  id.substring(11);
        if (!DHTMLTest.base.hitBall.call(this, index)) return;	
}
