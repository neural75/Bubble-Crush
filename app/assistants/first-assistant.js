var Preferences = Class.create ({

  initialize: function() {
    this.numberOfBalls = 16;
    this.maxNumberOfBalls = 32;
    this.typeOfTest = 0;
    this.fullScreen = "Off";
    this.fps = "On";
  },
  
  testList : [
        {value:0, label:"DHTML"},
        {value:1, label:"HTML 5 Canvas", disabled:true},
        {value:2, label:"Flex", disabled: true}	
  ]
  
  
});

var preferences = new Preferences();


function FirstAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

FirstAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	/* setup widgets here */
	
	//setup the application dialog
	this.appMenuModel = {
		visible: true,
		items: [
		    Mojo.Menu.editItem,
			{ label: $L('Scores'), command: 'cmd-scores' },
			//{ label: $L('Preferences'), command: 'cmd-prefs' },
			{ label: $L('About'), command: 'cmd-prefs' },
			Mojo.Menu.helpItem
		]
	};
	
	//omitDefaultItems will make it so that the inactive things like edit are gone.
	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems:true}, this.appMenuModel);
        

	
	// Number of Balls
	this.controller.setupWidget('mySlider', {
		minValue: 1,
		maxValue: preferences.maxNumberOfBalls,
		updateInterval: .1,
		round: true,
		modelProperty: "numberOfBalls"
	}, preferences);
        this.controller.listen('mySlider', Mojo.Event.propertyChange,this.sliderHandler.bind(this));
        this.setupBallList();
        this.showBalls(preferences.numberOfBalls);        
	
	// Type of test
	this.controller.setupWidget('testSelector', 
			{
			 label: "Select an Item", 
			 modelProperty: "typeOfTest",
			 choices: preferences.testList
			}, 
			preferences);	
	// Fullscreen
	this.controller.setupWidget('FSCheckBox', {
		trueValue: "On",
		falseValue: "Off",
		trueLabel: "On",
		falseLabel: "Off",
		modelProperty: "fullScreen"
	}, preferences);
	
	// Fullscreen
	this.controller.setupWidget('FPSCheckBox', {
		trueValue: "On",
		falseValue: "Off",
		trueLabel: "On",
		falseLabel: "Off",
		modelProperty: "fps"
	}, preferences);	
                	
                
        	
	
	
	/* add event handlers to listen to events from widgets */
	this.controller.setupWidget ("Start",{},{buttonLabel: "Start Test", buttonClass:"start-button", disabled: false});
        this.controller.listen ($('Start'), Mojo.Event.tap, this.handleStartTest.bind(this) );
        

	
}

FirstAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */

    
	
}


FirstAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
        this.controller.stopListening ($('Start'), Mojo.Event.tap, this.handleStartTest.bind(this) );
}

FirstAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
}
FirstAssistant.prototype.sliderHandler = function(event){
    Mojo.log("Slider Changed");
    this.showBalls(event.value);
}

FirstAssistant.prototype.setupBallList = function () {
    var ballList= document.getElementById('ballList');
    
    for (var i=1; i<=preferences.maxNumberOfBalls; i++) {
            var ballDiv = document.createElement('div');
            ballDiv.id = "sliderball" + i;
            ballDiv.className = "BallSlider";
            ballList.appendChild(ballDiv);
    }
                
}

FirstAssistant.prototype.showBalls = function(numberOfBalls) {
    $$('.BallSlider').each(function(ball, index) {
    	if(index > numberOfBalls - 1)
    	{
    		$(ball.id).removeClassName('showBall');
    		$(ball.id).addClassName('hideBall');
    	}
    	else
    	{
    		$(ball.id).removeClassName('hideBall');
    		$(ball.id).addClassName('showBall');
    	}
    });
    $('ballNumber').update(numberOfBalls);    
}

FirstAssistant.prototype.handleStartTest = function(event) {
    Mojo.log ("Pushing Balls Scene");
    this.controller.stageController.pushScene('Balls');
}