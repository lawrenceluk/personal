var canvas = document.getElementById('canvas');

var stage = new createjs.Stage(canvas);
var hero = new createjs.Shape();
var counter = new createjs.Text("Vertical Speed: 0 m/s\n\nHeight: 0m\n\nAcceleration: 0 m/s^2\n\nGas: 100%", "16px monospace", "#ff7700");

//physics
var ax = 0;
var gravity = -9.8/30; //adjust for fps
var ay = 0;
var vx = 6;
var vy = 0;
var yfric = 0.3;
var badfreq = 30;
var badcount = 0;
var maxspeed = 30;
var bottom = canvas.height - 30;

// game stuff
var x = 0;
var maxgas = 50;
var gas = maxgas;
var gasused = 0;
var baddies = []
var score = 0;
var streak = 0;
var maxstreak = 0;

function start() {
	hero.graphics.beginFill('rgba(51, 111, 176, 1)').drawRect(0, 0, 30, 30, 10);
	hero.x = 100;
	hero.y = bottom;
	hero.width = 30;
	hero.height = 30;

	stage.addChild(hero);

	counter.x = canvas.width*0.7;
	stage.addChild(counter);
}
start();

function addBaddie(width, height) {
	var bad = new createjs.Shape();
	bad.graphics.beginFill('#B03340').drawRect(0, 0, width, height, 10);
	bad.x = canvas.width;
	bad.y = bottom-Math.abs(30-height);
	bad.width = width;
	bad.height = height;
	stage.addChild(bad);
	baddies.push({
		type: "n",
		passed: false,
		entity: bad
	});
}

function addSpec() {
	var bad = new createjs.Shape();
	bad.graphics.beginFill('#50165E').drawCircle(0, 0, 30);
	bad.x = canvas.width;
	bad.y = 10+(Math.random()*80);
	bad.r = 15;
	stage.addChild(bad);
	baddies.push({
		type: "s",
		passed: false,
		entity: bad
	});
}

var mouseDown = false;
setInterval("mouseIsDown()", 100);

canvas.addEventListener("mousedown", function(event) {
	if (createjs.Ticker.getPaused())
		createjs.Ticker.setPaused(false);
	else mouseDown = true;
});

canvas.addEventListener("mouseup", function(event) {
  mouseDown = false;
});

function mouseIsDown() {
	if (mouseDown && gas > 0) {
		ay = 1.5;
		gas--;
		gasused++;
		hero.graphics.clear().beginFill('rgba(51, 111, 176, '+(gas/maxgas+0.1)+')').drawRect(0, 0, 30, 30, 10).endFill();
	}
	else return;
}
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick", gameLoop);

function gameLoop() {
	if (createjs.Ticker.getPaused()) return;
	//vx += ax;
	if (ay-yfric < 0) 
		ay = 0;
	else ay -= yfric;
	vy += ay+gravity;
	if (vy < -maxspeed)
		vy = -maxspeed
	else if (vy > maxspeed)
		vy = maxspeed
	//hero.x += vx;
	if (hero.y - vy > bottom) {
		if (vy < -3) {
			streak = 0;
			maxgas ++;
			gas = maxgas;
			hero.graphics.clear().beginFill('rgba(51, 111, 176, 1)').drawRect(0, 0, 30, 30, 10).endFill();
		}
		hero.y = bottom;
		vy = -(vy/2);
	} else if (hero.y - vy < 0) {
		hero.y = 0;
		ay = 0;
		vy = 0;
	}
	else 
		hero.y -= vy;
	counter.text = "Vertical Speed: "+Math.floor(vy)+" m/s\n\n"+"Height: "+Math.floor(bottom-hero.y)+" m\n\nAcceleration: ";
	counter.text += ((ay+gravity)*30).toFixed(1)+" m/s^2\n\nGas: "+(gas/maxgas*100).toFixed(2)+"% ("+gas+")";
	counter.text += "\n\nStreak: "+streak+" ("+maxstreak+")\n\nScore: "+score
	if (badcount == 0) {
		addBaddie(20+Math.round(Math.random()*50), 30+Math.round(Math.random()*canvas.height/2));
		badcount = Math.ceil(Math.random()*badfreq+badfreq);
		if (Math.random() < 0.5)
			addSpec()
	}
	badcount--;
	for (var i=baddies.length-1;i>=0;i--) {
		if (baddies[i].type === "n")
			baddies[i].entity.x -= vx;
		else if (baddies[i].type === "s") {
			baddies[i].entity.x -= vx*3;
			if (intersects(baddies[i].entity, hero)) {
				handleEndgame();
				return;
			}
		}
		if (i == 0) {
			if (baddies[i].entity.x < hero.x && !baddies[i].entity.passed && baddies[i].type === "n") {
				if (++streak > maxstreak)
					maxstreak = streak;
				score += streak;
				baddies[i].entity.passed = true;
			}
		}
		if (baddies[i].entity.x < -10) {
			stage.removeChild(baddies[i].entity);
			baddies.splice(i, 1);
		}
	}
	x += vx;
	stage.update();
	if (baddies.length > 0) {
		if (didCollide(baddies[0].entity, hero)) {
			handleEndgame();
			return;
		}
	}
}


//collision for rectangles
function didCollide(rect1, rect2) {
	return !( rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y );
}

function intersects(circle, rect)
{
	var circleDistance = {};
  circleDistance.x = Math.abs(circle.x - rect.x);
  circleDistance.y = Math.abs(circle.y - rect.y);

  if (circleDistance.x > (rect.width/2 + circle.r)) { return false; }
  if (circleDistance.y > (rect.height/2 + circle.r)) { return false; }

  if (circleDistance.x <= (rect.width/2)) { return true; } 
  if (circleDistance.y <= (rect.height/2)) { return true; }

  var cornerDistance_sq = (circleDistance.x - rect.width/2)^2 +
                       (circleDistance.y - rect.height/2)^2;

  return (cornerDistance_sq <= (circle.r^2));
}

function handleEndgame() {
	var text = new createjs.Text("", "20px Helvetica", "#333333");
	text.text = "Game over!\nScore: "+score+"\nHighest Streak: "+maxstreak+"\nGas Used: "+gasused
	text.text += "\nDistance Traveled: "+(x/10).toFixed(2)+" m";
	text.text += "\nClick anywhere to play again.";
	var b = text.getBounds();
	text.x = canvas.width/2 - b.width/2; 
	text.y = canvas.height/4 - b.height/2;
	stage.addChild(text);
	stage.update();
	createjs.Ticker.setPaused(true);

	ay = 0;
	vy = 0;

// game stuff
	x = 0;
	gasused = 0;
	maxgas = 50;
	gas = maxgas;
	score = 0;
  streak = 0;
  maxstreak = 0;
	stage.removeAllChildren();
	baddies = [];
	start();
}