function BallsAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
        this._dhtmlTest = new DHTMLTest(preferences.numberOfBalls);
        this.bStarted = true;
}

BallsAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	switch (preferences.typeOfTest) 
	{
		case (0):
			$('BallsHeader').update ("DHTML Benchmark");	
			break;
		case (1):
			$('BallsHeader').update ("Canvas Benchmark");	
			break;
		case (2):
			$('BallsHeader').update ("Flex Benchmark");	
			break;
	}
	
	if (preferences.fps == "Off"){
		Mojo.Log.info("Preference FPS:", preferences.fps);
		this._dhtmlTest.activateFPS(false);
		
	}
	else{
		this._dhtmlTest.activateFPS(true);
		document.getElementById("fps").innerHTML = "--- FPS"
	}	
	/* setup widgets here */

        this.controller.listen($('Host'), Mojo.Event.tap, this.handleHostTap.bind(this));
	
	/* add event handlers to listen to events from widgets */
}

BallsAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */

	
        this._dhtmlTest.start();
	
}


BallsAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
        this._dhtmlTest.stop();
}

BallsAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
}

BallsAssistant.prototype.handleHostTap = function (event) {
    //Mojo.Log.Info("Received event: %j", event);
     Mojo.Log.info("Event on: "+ event.target.id + " tap down at x: " + event.down.x + " y: " + event.down.y);
     
     if (event.target.id != 'Host')
     {
		//$(event.target.id).addClassName('hideBall');
		//$(event.target.id).removeClassName('showBall');
		this._dhtmlTest.hitBall(event.target.id);
     }
/*
    if (this.bStarted)
    {
        this._dhtmlTest.pause();
        this.bStarted = false;
    }
    else
    {
        this._dhtmlTest.resume();
        this.bStarted = true;
    }
*/
    
}
