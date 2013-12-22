/*
To do:

Ops item upgrades
Art
Save
Responsive
*/

var version = "SECRET"

var oj = 100000000000000
var totaloj = 0
var o = 0
var totalo = 0

var ojcycletime = 15 //seconds
var ojcycle = ojcycletime
var ojpc = 3
var owned_ojpc_upgrades = 1
var ops = 0

var bonus_ops = 0
var bonus_ojpc = 0
var bonus_ojcycletime = 0
var bonuschance = 0.1


var omakers = []
var orangeMakerAmts = []
var available_bonuses = []

var clickreward = omakers.length + 1
var oclicks = 0
var ojclicks = 0
var fps = 15
var started = new Date().getTime()
var time = new Date().getTime()

var fps = 15
var clickchangeamt = 1
var msgcount = 0 // time in seconds till next newsflash

$("#whatversion").html("Version "+version)
$("#s_version").html(version)
$("#emptyshelf").html("You haven't purchased any orange producers yet.")
/*

============================================================================
MESSAGES
============================================================================

*/

function OMessage(message, req) {
	this.message = message
	this.req = req
}
var o_messages = [
	new OMessage("Welcome to Juiced Up! v"+version, 0),
	new OMessage("The journey of a thousand oranges begins with a single squeeze!", 15),
	new OMessage("Did you know? Orange juice is usually made with oranges.", 50),
	new OMessage("Buy more orange producers to get more oranges per click.", 100),
	new OMessage("Clicking the orange gives you a chance at bonuses!", 1000),
	new OMessage("Not from concentrate!", 9999),
	new OMessage("Which was named first? Orange the fruit, or the color?", 12000),
	new OMessage("Orange you glad you played this game?", 50000),
	new OMessage("I drink your orange juice! I drink it up!", 100000),
	new OMessage("Orange you tired of clicking? Upgrade your producers!", 150000),
	new OMessage("Orange you tired of orange puns?", 250000),
	new OMessage("Orange is live. Orange is love. Orange is planet.", 450000),
	new OMessage("Don't drink orange juice after brushing your teeth!", 650000),
	new OMessage("Fact: Oranges contain tons of Vitamin C! To unsubscribe from Orange Facts, collect 9,999,999,999,999,999 glasses of OJ.", 1000000),
	new OMessage("Fact: The bigger the navel in a navel orange, the sweeter it is! Am I lying? Who knows!", 2000000),
	new OMessage("Fact: Blood oranges eat their neighbors to grow bigger!", 5000000),
	new OMessage("Fact: The first flavor of sherbet was orange. How do you spell sherbet?", 10000000),
	new OMessage("Fact: Christopher Columbus brought oranges to the new world, so he must have been an cool guy.", 20000000),
	new OMessage("Clicking the Big Orange and Juice Faster buttons give you temporary bonuses. Don't miss out!", 30000000),
	new OMessage("Fact: The color of an orange has nothing to do with how ripe it is. How mysterious!", 40000000),
	new OMessage("Don't forget to upgrade your orange producers. You'll need them in the long haul.", 50000000),
	new OMessage("Fact: It takes fifty glasses of water to grow the oranges for one glass of OJ. OJ is perfect for fighting fires!", 90000000),
	new OMessage("Fact: The orange season lasts from October to June. Get em while they last!", 130000000),
	new OMessage("Fact: The orange juice industry employs 76,000 people in Florida. And you're doing more work than all of them!", 350000000),
	new OMessage("Fact: In global orange juice production, Brasil es numero uno! Hue hue hue brbrbr", 500000000),
	new OMessage("Fact: Oranges are naturally greenish brown and were bred to be orange. Everything you know is a lie!", 750000000),
	new OMessage("You are now unsubscribed from Orange Facts.", 9999999999999999)
]


/*

============================================================================
BONUSES
============================================================================

*/

function OBonus(name, description, chance, owneduntil, owned) {
	this.name = name
	this.description = description
	this.chance = chance
	this.owneduntil = new Date().getTime()
	owned = false
}
var o_bonuses = [
	new OBonus("Fruit Frenzy", "Doubles orange production from all sources", 0.25),
	new OBonus("Flower Power", "Doubles orange production from orange patches", 0.25),
	new OBonus("Shrub Sorcery", "Doubles orange production from orange shrubs", 0.25),

	new OBonus("Money Trees", "Inreases bonus chance from clicking by 10%", 0.15)
]

function OJBonus(name, description, chance, owneduntil, owned) {
	this.name = name
	this.description = description
	this.chance = chance
	this.owneduntil = new Date().getTime()
	owned = false
}
var oj_bonuses = [
	new OJBonus("Squeezetaculous", "Reduces OJ cycle time by 1 second", 0.1),
	new OJBonus("Squeezalicious", "Reduces OJ cycle time by 1 second", 0.1),
	new OJBonus("Squeezetacular", "Reduces OJ cycle time by 1 second", 0.1),
	new OJBonus("Tight Squeeze", "Reduces OJ cycle time by 1 second", 0.1),
	new OJBonus("Critical Squeeze", "Reduces OJ cycle time by 1 second", 0.1),
	new OJBonus("Squeezus", "Reduces OJ cycle time by 2 seconds", 0.05),
	new OJBonus("Squeeze God", "Reduces OJ Cycle time by 3 seconds", 0.02),

	new OJBonus("Hump Day", "Reduces OJ cycle time by 5%", 0.15),
	new OJBonus("Pulp Fiction", "Reduces OJ cycle time by 10%", 0.1),
	new OJBonus("Pulp Nonfiction", "Reduces OJ cycle time by 15%", 0.05),

	new OJBonus("Packing Pulp", "Gives an additional 5 glasses of OJ per cycle", 0.3),
	new OJBonus("Lesser Efficiency", "Gives an additional 20 glasses of OJ per cycle", 0.2),
	new OJBonus("Great Efficiency", "Gives an additional 40 glasses of OJ per cycle", 0.1),
	new OJBonus("Pulp Alchemy", "Gives an additional 100 glasses of OJ per cycle", 0.08),

	new OJBonus("Juicebox", "Grants additional 2% OJ per cycle", 0.15),
	new OJBonus("Juice Fever", "Grants additional 2% OJ per cycle", 0.15),
	new OJBonus("Juiceaholic", "Grants additional 2% OJ per cycle", 0.1),
	new OJBonus("Juiced Up", "Grants additional 2% OJ per cycle", 0.1),
	new OJBonus("Juice Jesus", "Grants additional 4% OJ per cycle", 0.05),
	new OJBonus("Juice God", "Grants additional 8% OJ per cycle", 0.02),
]

/*

============================================================================
UTIL
============================================================================

*/

// From Cookie Clicker
function Beautify(what,floats)//turns 9999999 into 9,999,999
{
	var str='';
	if (!isFinite(what)) return 'Infinity';
	if (what.toString().indexOf('e')!=-1) return what.toString();
	what=Math.round(what*10000000)/10000000;//get rid of weird rounding errors
	if (floats>0)
	{
		var floater=what-Math.floor(what);
		floater=Math.round(floater*10000000)/10000000;//get rid of weird rounding errors
		var floatPresent=floater?1:0;
		floater=(floater.toString()+'0000000').slice(2,2+floats);//yes this is hacky (but it works)
		if (parseInt(floater)===0) floatPresent=0;
		str=Beautify(Math.floor(what))+(floatPresent?('.'+floater):'');
	}
	else
	{
		what=Math.floor(what);
		what=(what+'').split('').reverse();
		for (var i in what)
		{
			if (i%3==0 && i>0) str=','+str;
			str=what[i]+str;
		}
	}
	return str;
}

// http://stackoverflow.com/questions/8211744/convert-milliseconds-or-seconds-into-human-readable-form
function millisecondsToStr (milliseconds) {
    // TIP: to find current time in milliseconds, use:
    // var  current_time_milliseconds = new Date().getTime();

    // This function does not deal with leap years, however,
    // it should not be an issue because the output is aproximated.

    var temp = milliseconds / 1000;
    var years = Math.floor(temp / 31536000);
    var days = Math.floor((temp %= 31536000) / 86400);
    var str = ""
    if (days) {
        str += days + 'd, ';
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
        str += hours + 'h, ';
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
        str += minutes + 'm, ';
    }
    var seconds = Math.floor(temp % 60);
    if (seconds) {
        str += seconds + 's';
    }
    return str
}

/*

============================================================================
THINGS THAT MAKE ORANGES
============================================================================

*/

function OrangeMaker(name, description, orangespersecond, cost) {
    this.name = name
    this.description = description
    this.ops = orangespersecond
    this.cost = cost
    this.produced = 0
}

OrangeMaker.prototype.getName = function() {
	return this.name
}

OrangeMaker.prototype.getDescription = function() {
	return this.description
}

OrangeMaker.prototype.getOPS = function() {
	return this.ops
}

OrangeMaker.prototype.getCost = function() {
	return this.cost
}

function O_tier_1() {}
O_tier_1.prototype = new OrangeMaker("Orange Patch", 
	"A little patch of flowers. Oranges mysteriously appear here every so often.", 0.3, 10)

function O_tier_2() {}
O_tier_2.prototype = new OrangeMaker("Orange Shrub",
	"A little bush that inexplicably produces oranges once in a while.", 0.6, 33)

function O_tier_3() {}
O_tier_3.prototype = new OrangeMaker("Orange Tree",
	"Citrus sinensis. A tree that produces oranges at a healthy rate.", 1.5, 333)

function O_tier_4() {}
O_tier_4.prototype = new OrangeMaker("Orangutan",
	"This little fellow leaves a trail of oranges in his wake. Are they safe to eat? Who cares!", 10, 1333)

function O_tier_5() {}
O_tier_5.prototype = new OrangeMaker("Orange Grove",
	"A troop of trees that produces a bountiful harvest.", 25, 10000)

function O_tier_6() {}
O_tier_6.prototype = new OrangeMaker("Orange Genie",
	"<i>\"Orange doorhinge\"</i>", 100, 65535)

var allItems = [O_tier_1, O_tier_2, O_tier_3, O_tier_4, O_tier_5, O_tier_6]
for (var i = 0; i < allItems.length; i++) orangeMakerAmts[i] = 0; // start with 0 of all

/*

============================================================================
THINGS THAT MAKE ORANGE JUICE
============================================================================

*/

function ojpc_upgrade(name, description, req, ojpc, cost, owned) {
	this.name = name
	this.description = description
	this.req = req
	this.cost = cost
	this.ojpc = ojpc
	this.visible = false
	if (!owned) {
		this.owned = 0
	} else {
		this.owned = owned
	}
}

var ojpc_upgrades = [
	new ojpc_upgrade("Little Bullet", "Limited capacity, serves 1", 0, 3, 10, 1),
	new ojpc_upgrade("Blender", "Perfect for small serving sizes", 0, 12, 70),
	new ojpc_upgrade("Blender XL", "Juice for the whole family", 0, 30, 475),
	new ojpc_upgrade("Blender ZZ", "Juice for the family and then some", 1, 50, 600),
	new ojpc_upgrade("Power Juicer", "For small juicing operations", 5, 100, 2000),
	new ojpc_upgrade("Power Juicer XL", "Getting serious about citrus", 10, 150, 3300),
	new ojpc_upgrade("Whirler v1", "Business grade juicing solution", 20, 250, 9000),
	new ojpc_upgrade("Whirler v2", "Upgraded with premium parts for premium pulp", 30, 350, 20000),
	new ojpc_upgrade("Whirler v3", "Top of the line option for small business", 40, 500, 48000),
	new ojpc_upgrade("OJ GIANT", "Stepping into the big leagues", 50, 1000, 100000),
	new ojpc_upgrade("OJ GIANT INDUSTRY GRADE", "The juice flows within you", 75, 30000, 800000),
	new ojpc_upgrade("Titanic Twister", "No one man should have all that power", 100, 100000, 1600000),
	new ojpc_upgrade("The Goliath", "Orange is live", 150, 250000, 9000000),
	new ojpc_upgrade("The Behemoth", "Orange is love", 200, 800000, 25000000),
	new ojpc_upgrade("The Leviathan", "Orange is planet", 300, 2500000, 123456789),
	new ojpc_upgrade("Florida", "", 500, 134000000, 1234567898765),
	]

	/*
	time upgrades
	new ojpc_upgrade("Steel Blades", "Slicing and dicing", 3),
	new ojpc_upgrade("Parallel Peeling", "Multithreading for oranges", 5),
	new ojpc_upgrade("Ceramic Blades", "Sharp edges! Keep away from children!", 10),
	new ojpc_upgrade("Perfect Peeling", "NASA scientists have created self-peeling oranges", 14),
	*/

/*

============================================================================
SET THE STAGE
============================================================================

*/

var shop_contents = ""
for (var i=0;i<allItems.length;i++) {
	var insert = "info_O_tier_"+(i+1)
	var name = "purchase_O_tier_"+(i+1)

	shop_contents += "<div class='shop_item'>"
	shop_contents += "<div class='title'>"+allItems[i].prototype.getName()+"</div>"
	shop_contents += "<div class='description'>"+allItems[i].prototype.getDescription()+"</div>"
	shop_contents += "<span id="+insert+" class='info'>Costs "+allItems[i].prototype.getCost()+" glasses of OJ. Owned: "+orangeMakerAmts[i]+"</span>"
	shop_contents += "<div class='omaker_button buy_button' id="+name+">Buy</div><div class='gap'></div>"
	shop_contents += "</div>"
}
$("#orange_income_shop").html(shop_contents)

shop_contents = ""
for (var i=0;i<ojpc_upgrades.length;i++) {
	if (ojpc_upgrades[i].req <= owned_ojpc_upgrades && ojpc_upgrades[i].visible == false) {
		ojpc_upgrades[i].visible = true
		var insert = "info_OJ_"+(i+1)
		var name = "purchase_OJ_"+(i+1)
		shop_contents += "<div class='shop_item_upgrade'>"
		shop_contents += "<div class='title'>"+ojpc_upgrades[i].name+"</div>"
		shop_contents += "<div class='description'><em>"+ojpc_upgrades[i].description+"</em></div>"
		shop_contents += "<div id="+insert+" class='info'>Costs "+ojpc_upgrades[i].cost+" glasses of OJ. Owned: "+ojpc_upgrades[i].owned+"</div>"
		shop_contents += "<div class='ojmaker_button buy_button' id="+name+">Buy</div><div class='gap'></div>"
		shop_contents += "</div>"
	} 
}
$("#ojpc_shop").append(shop_contents)


function updateOJMakerShop() {
	var shop_contents = ""
	for (var i=0;i<ojpc_upgrades.length;i++) {
		if (ojpc_upgrades[i].req <= owned_ojpc_upgrades && ojpc_upgrades[i].visible == false) {
			ojpc_upgrades[i].visible = true
			var insert = "info_OJ_"+(i+1)
			var name = "purchase_OJ_"+(i+1)
			shop_contents += "<div class='shop_item_upgrade'>"
			shop_contents += "<div class='title'>"+ojpc_upgrades[i].name+"</div>"
			shop_contents += "<div class='description'><em>"+ojpc_upgrades[i].description+"</em></div>"
			shop_contents += "<div id="+insert+" class='info'>Costs "+ojpc_upgrades[i].cost+" glasses of OJ. Owned: "+ojpc_upgrades[i].owned+"</div>"
			shop_contents += "<div class='ojmaker_button buy_button' id="+name+">Buy</div><div class='gap'></div>"
			shop_contents += "</div>"
		} 
	}
	$("#ojpc_shop").append(shop_contents)
}
/*

============================================================================
GRAPHICS
============================================================================

*/

function drawOrangeClicked(amt, x, y) {
	var name = Math.round(Math.random()*1000000).toString()
	$("#big_orange_area").append("<span class='clicked_orange' id="+name+">+"+amt+"</span>")
	$("#"+name).css({
	  position:'absolute',
	  top: (y+55+(Math.random()*20)),
	  left: x-25,
	  zIndex: 100
	})
	animateOClick($("#"+name), x, 30)
}

function animateOClick(div, x, countdown) {
	div.css({
		left: x,
		opacity:countdown/10
	})
	if (countdown > 0) {
		setTimeout(function() {animateOClick(div, x+8, countdown-1)}, 30)
	} else {
		div.remove()
	}
}

/*

============================================================================
BONUSES
============================================================================

*/

function getOBonus() {
	var bonus = o_bonuses[Math.round(Math.random()*o_bonuses.length-1)]
	if (Math.random() > bonus.chance*bonuschance) {
		// don't get the bonus
	} else if (bonus.owneduntil < new Date().getTime()) {
		var seconds = Math.round(20+Math.random()*100)
		bonus.owneduntil = (new Date().getTime())+seconds*1000
		bonus.owned = true
		var bonusname = bonus.name.replace(/\s+/g, '')

		var str = "<div class='hoverable' id=contains"+bonusname+">"
		str += "<a class='nohover'><div class='production_upgrade_item'>"+bonus.name+"</div></a>"
		str += "<span class='small ninja'>"+bonus.description+"<div class='smaller'>Expires in "
		str += "<span id="+bonusname+"></span> seconds.</div></span></div>"
		if (!$("#nobonuses").hasClass("hiding")) {
			$("#nobonuses").remove()
		}
		doBonus(bonus, true)
		$("#newsflash").html("You received a bonus: '"+bonus.name+"'! "+bonus.description+".")
		msgcount = 10
		$("#production_upgrades").append(str)
	}
}

function getOJBonus() {
	var bonus = oj_bonuses[Math.round(Math.random()*oj_bonuses.length-1)]
	if (Math.random() > bonus.chance*bonuschance) {
		// don't get the bonus
	} else if (bonus.owneduntil < new Date().getTime()) {
		var seconds = Math.round(20+Math.random()*100)
		bonus.owned = true
		bonus.owneduntil = (new Date().getTime())+seconds*1000
		var bonusname = bonus.name.replace(/\s+/g, '')

		var str = "<div class='hoverable' id=contains"+bonusname+">"
		str += "<a class='nohover'><div class='production_upgrade_item'>"+bonus.name+"</div></a>"
		str += "<span class='small ninja'>"+bonus.description+"<div class='smaller'>Expires in "
		str += "<span id="+bonusname+"></span> seconds.</div></span></div>"
		if (!$("#nobonuses").hasClass("hiding")) {
			$("#nobonuses").remove()
		}
		doBonus(bonus, true)
		$("#newsflash").html("You received a bonus: '"+bonus.name+"'! "+bonus.description+".")
		msgcount = 10
		$("#production_upgrades").append(str)
	}
}

/*
	Given the name of bonus, apply (true) or remove (false)
*/
function doBonus(bonus, apply) {
	if (bonus.name === "Fruit Frenzy") {
		for (var i=0;i<omakers.length;i++) {
			if (apply) {
				bonus_ops += omakers[i].ops
			} else {
				bonus_ops -= omakers[i].ops
			}
		}
	} else if (bonus.name === "Flower Power") {
		for (var i=0;i<omakers.length;i++) {
			if (omakers[i].name === "Orange Patch") {
				if (apply) {
					bonus_ops += omakers[i].ops
				} else {
					bonus_ops -= omakers[i].ops
				}
			}
		}
	} else if (bonus.name === "Shrub Sorcery") {
		for (var i=0;i<omakers.length;i++) {
			if (omakers[i].name === "Orange Shrub") {
				if (apply) {
					bonus_ops += omakers[i].ops
				} else {
					bonus_ops -= omakers[i].ops
				}
			}
		}
	} else if (bonus.name === "Money Trees") {
		if (apply) {
			bonuschance += 0.1
		} else {
			bonuschance -= 0.1
		}
	} else if (bonus.name === "Squeezetaculous" || bonus.name === "Squeezalicious" 
		|| bonus.name === "Squeezetacular" || bonus.name === "Tight Squeeze" || bonus.name === "Critical Squeeze") {
		if (apply) {
			bonus_ojcycletime -= 1
		} else {
			bonus_ojcycletime += 1
		}
	} else if (bonus.name === "Squeezus") {
		if (apply) {
			bonus_ojcycletime -= 2
		} else {
			bonus_ojcycletime += 2
		}
	} else if (bonus.name === "Squeeze God") {
		if (apply) {
			bonus_ojcycletime -= 3
		} else {
			bonus_ojcycletime += 3
		}
	} else if (bonus.name === "Hump Day") {
		if (apply) {
			bonus_ojcycletime -= Math.round(ojcycletime*0.05)
		} else {
			bonus_ojcycletime += Math.round(ojcycletime*0.05)
		}
	} else if (bonus.name === "Pulp Fiction") {
		if (apply) {
			bonus_ojcycletime -= Math.round(ojcycletime*0.1)
		} else {
			bonus_ojcycletime += Math.round(ojcycletime*0.1)
		}		
	} else if (bonus.name === "Pulp Nonfiction") {
		if (apply) {
			bonus_ojcycletime -= Math.round(ojcycletime*0.15)
		} else {
			bonus_ojcycletime += Math.round(ojcycletime*0.15)
		}		
	} else if (bonus.name === "Packing Pulp") {
		if (apply) {
			bonus_ojpc += 5
		} else {
			bonus_ojpc -= 5
		}		
	} else if (bonus.name === "Lesser Efficiency") {
		if (apply) {
			bonus_ojpc += 20
		} else {
			bonus_ojpc -= 20
		}		
	} else if (bonus.name === "Great Efficiency") {
		if (apply) {
			bonus_ojpc += 40
		} else {
			bonus_ojpc -= 40
		}
	} else if (bonus.name === "Pulp Alchemy") {
		if (apply) {
			bonus_ojpc += 100
		} else {
			bonus_ojpc -= 100
		}
	} else if (bonus.name === "Juicebox" || bonus.name === "Juice Fever" || bonus.name === "Juiceaholic"
		 || bonus.name === "Juiced Up") {
		if (apply) {
			bonus_ojpc += Math.round(ojpc*0.02)
		} else {
			bonus_ojpc -= Math.round(ojpc*0.02)
		}
	} else if (bonus.name === "Juice Jesus") {
		if (apply) {
			bonus_ojpc += Math.round(ojpc*0.04)
		} else {
			bonus_ojpc -= Math.round(ojpc*0.04)
		}
	} else if (bonus.name === "Juice God") {
		if (apply) {
			bonus_ojpc += Math.round(ojpc*0.08)
		} else {
			bonus_ojpc -= Math.round(ojpc*0.08)
		}
	}
}

function haveBonus(name) {
	for (var i=0; i < oj_bonuses.length; i++) {
		if (oj_bonuses[i].name === name && oj_bonuses[i].owned)
			return true
	}
	for (var i=0; i < o_bonuses.length; i++) {
		if (o_bonuses[i].name === name && o_bonuses[i].owned)
			return true
	}
	return false
}

function doBonuses(apply) {
	for (var i=0; i < oj_bonuses.length; i++) {
		if (oj_bonuses[i].owned) {
			doBonus(oj_bonuses[i], apply)
		}
	}
	for (var i=0; i < o_bonuses.length; i++) {
		if (o_bonuses[i].owned) {
			doBonus(o_bonuses[i], apply)
		}
	}
}
/*

============================================================================
BUTTONS
============================================================================

*/

var lastclicked_o = new Date().getTime()
// CLICKED THE BIG ORANGE
$("#geto_button").mousedown(function(e) {
	if ((new Date().getTime()) > lastclicked_o+100) {
		getOBonus()
		oclicks++
		var o_given = clickreward
		o += o_given
		totalo += o_given
		disp_o += o_given
		lastclicked_o = new Date().getTime()

		// graphics
	  var offset = $(this).offset()
   	drawOrangeClicked(o_given, e.clientX - offset.left, e.clientY - offset.top)
   	$("#o_count").html(Beautify(disp_o))
  }
})

var lastclicked_oj = new Date().getTime()
// CLICKED JUICE FASTER
$("#makeoj_button").click(function () {
	if ((new Date().getTime()) > lastclicked_oj+100) {
		getOJBonus()
		ojclicks++
		if (o > 0) {
			ojcycle -= clickchangeamt
			disp_ojcycle -= clickchangeamt
		}
		calculateJuiceSqueezed()
		lastclicked_oj = new Date().getTime()
	}
})

function purchaseOMaker(tier) {
	var cost = allItems[tier-1].prototype.getCost()
	//if they have enough oj
	if (oj >= cost) {
		// empty the shelf
		if (!$("#emptyshelf").hasClass("hiding")) {
			$("#emptyshelf").remove()
		}
		// pay up
		oj -= cost
		// remove existing bonuses
		doBonuses(false)
		// give the item
		omakers.push(new allItems[tier-1]())
		// update amount owned
		orangeMakerAmts[tier-1]++
		// update cost
		allItems[tier-1].prototype.cost = Math.round(Math.pow(cost+orangeMakerAmts[tier-1], 1.01))
		// draw the new item
		var str = "<img src='/assets/o"+tier+".gif' id="+"oc_"+tier+"_"+omakers.length+" class='omaker_item' height=40px>"
		$("#omaker_shelf_purchases").append(str)	

		var newops = 0
		// Update oranges per second
		for (var i = 0; i < omakers.length; i++) {
			newops += omakers[i].getOPS()
		}
		ops = newops
		// Update click reward
		clickreward = omakers.length + 1
		// update all values
		updateAffordable()
		// give back bonuses
		doBonuses(true)

		if (ops < 1000) {
			$("#ops_count").html(Math.round(ops * 10) / 10)
		} else {
			$("#ops_count").html(Beautify(ops))
		}
		$("#oj_count").html(Beautify(oj))
	}
}

$(".omaker_button").click(function() {
	purchaseOMaker(parseInt(event.target.id.slice(-1)))
})

// BOUGHT AN OJPC UPGRADE
$("#ojpc_shop").on('click', function() {
	// super ghetto way to get the last digits representing tier
	var tier = parseInt(event.target.id.split("_").slice(-1)[0])
	var cost = ojpc_upgrades[tier-1].cost
	//if they have enough oj
	if (oj >= cost) {
		//pay up
		oj -= cost
		//increase ojpc
		ojpc += ojpc_upgrades[tier-1].ojpc
		// remove bonuses
		doBonuses(false)
		// update amount owned
		owned_ojpc_upgrades++
		ojpc_upgrades[tier-1].owned++
		// update cost
		if (ojpc_upgrades[tier-1].owned < 10) {
			ojpc_upgrades[tier-1].cost = Math.round(Math.pow(cost+(Math.random()*ojpc_upgrades[tier-1].owned), 1.1))
		} else {
			ojpc_upgrades[tier-1].cost = Math.round(Math.pow(cost, 1.01))
		}
		// update shop based on unlocks
		updateOJMakerShop()
		// update what's affordable
		updateAffordable()
		// apply bonuses again
		doBonuses(true)
		// update costs
		$("#info_OJ_"+(tier)).html("Costs "+ojpc_upgrades[tier-1].cost+" glasses of OJ. Owned: "+ojpc_upgrades[tier-1].owned)
	}
})

/* Viewing Stats or returning to display */
$("#stats").click(function() {
	if ($("#stats").html() == "Stats") {
		$("#stats").html("Shelf")
		/* Draw the stats page */
		$("#omaker_shelf_purchases").addClass("hidden")
		$("#stats_zone").removeClass("hidden")

	} else {
		$("#stats").html("Stats")
		/* Change back to shelf */
		$("#omaker_shelf_purchases").removeClass("hidden")
		$("#stats_zone").addClass("hidden")
	}
})

function updateAffordable() {
	for (var i=0;i<allItems.length;i++) {
		$("#info_O_tier_"+(i+1)).html("Costs "+allItems[i].prototype.getCost()+" glasses of OJ. Owned: "+orangeMakerAmts[i])
		if (oj < allItems[i].prototype.getCost()) {
			$("#purchase_O_tier_"+(i+1)).addClass("unaffordable")
		} else {
			$("#purchase_O_tier_"+(i+1)).removeClass("unaffordable")
		}
	}
	for (var i=0;i<ojpc_upgrades.length;i++) {
		if (oj < ojpc_upgrades[i].cost) {
			$("#purchase_OJ_"+(i+1)).addClass("unaffordable")
		} else {
			$("#purchase_OJ_"+(i+1)).removeClass("unaffordable")
		}
	}
}
/*

============================================================================
GAME LOOP
============================================================================

*/

var unfocused = false

var disp_o = o
var disp_ojcycle = ojcycle

window.addEventListener("focus", function(event) {
	$('#oj_cycle_bar').width(Math.round((1-ojcycle/ojcycletime)*110).toString()+"%")
	$("#o_count").html(Math.floor(o))
	unfocused = false
})

window.addEventListener("blur", function(event) {
	unfocused = true
})

function disp() {
	if (disp_o < o) {
		disp_o += (ops+bonus_ops)/fps
	}
	if (o > 0) {
		if (disp_ojcycle >= ojcycle) {
			disp_ojcycle -= 1/fps
			$('#oj_cycle_bar').width(Math.round((1-disp_ojcycle/(ojcycletime+bonus_ojcycletime))*110).toString()+"%")
		}
	}
	$("#o_count, #s_o").html(Beautify(disp_o))
}

function calculateJuiceSqueezed() {
		// Counting for OJ production cycle
		if (ojcycle <= 0) {
			$('#oj_cycle_bar').css("width", "0%")
			var cycletime = ojcycletime+bonus_ojcycletime
			if (cycletime < 3) {
				cycletime = 3
			}
			ojcycle = cycletime
			disp_ojcycle = cycletime
			var dojpc = ojpc + bonus_ojpc
			if (o >= dojpc) {
				disp_o -= dojpc
				o -= dojpc
				oj += dojpc
				totaloj += dojpc
			} else if (o > 0 && disp_o < dojpc) {
				oj += o
				totaloj += o
				o = 0
				disp_o = 0
			} else {
				disp_o = 0
				o = 0
			}

			// Recalculate what's affordable
			updateAffordable()
			disp_o = o
		}
}

function logic() {
	for (var i = 0; i < oj_bonuses.length; i++) {
		var now = new Date().getTime()
		var bonus = oj_bonuses[i]
		var bonusname = bonus.name.replace(/\s+/g, '')
		if (bonus.owned) {
			if (bonus.owneduntil <= now) {
				doBonus(bonus, false)
				bonus.owned = false
				$("#contains"+bonusname).remove()
				$("#newsflash").html(bonus.name+" has expired.")
				msgcount = 10
			} else {
				var seconds = Math.floor((bonus.owneduntil - now)/1000)
				$("#"+bonusname).html(seconds)
			}
		}
	}
	for (var i = 0; i < o_bonuses.length; i++) {
		var now = new Date().getTime()
		var bonus = o_bonuses[i]
		var bonusname = bonus.name.replace(/\s+/g, '')
		if (bonus.owned) {
			if (bonus.owneduntil <= now) {
				doBonus(bonus, false)
				bonus.owned = false
				$("#contains"+bonusname).remove()
				$("#newsflash").html(bonus.name+" has expired.")
				msgcount = 10
			} else {
				var seconds = Math.floor((bonus.owneduntil - now)/1000)
				$("#"+bonusname).html(seconds)
			}
		}
	}

	if (unfocused || (new Date().getTime() - time) > 1000) {
		time = new Date().getTime()

		calculateJuiceSqueezed()
		if (o >= 1) {
			ojcycle -= 1
		}
		// Update oranges based on production
		o += ops+bonus_ops
		totalo += ops+bonus_ops
	}
	// Update page title
	document.title = Beautify(oj)+" Glasses of OJ"
	// Display new values on counters
	if (ops+bonus_ops < 1000) {
		$("#ops_count").html(Math.round((ops+bonus_ops) * 10) / 10)
	} else {
		$("#ops_count").html(Beautify(ops+bonus_ops))
	}
	$("#oj_count, #s_oj").html(Beautify(oj))
	$("#ojpc_count").html(Beautify(ojpc+bonus_ojpc)+" Glasses every "+Beautify(ojcycletime+bonus_ojcycletime))

	if (msgcount-- <= 0) {
	 	// message if applicable
	 	var message
	 	for (var i = 0; i < o_messages.length; i++) {
	 		if (totalo >= o_messages[i].req) {
	 			message = o_messages[i].message
	 		}
	 	}
	 	$("#newsflash").html(message)
	 	msgcount = 30
	}

	// Update stat counter
	$("#s_totalo").html(Beautify(totalo))
	$("#s_totaloj").html(Beautify(totaloj))
	$("#s_ojclicks").html(Beautify(ojclicks))
	$("#s_oclicks").html(Beautify(oclicks))
	$("#s_ojcycle").html(Beautify(ojcycletime+bonus_ojcycletime))
	$("#s_ojcycletime").html(Beautify(ojcycletime))
	$("#s_bonusojcycletime").html(Beautify(Math.abs(bonus_ojcycletime)))
	$("#s_ojpctotal").html(Beautify(ojpc+bonus_ojpc))
	$("#s_ojpc").html(Beautify(ojpc))
	$("#s_bonusojpc").html(Beautify(bonus_ojpc))
	$("#s_clickreward").html(clickreward)
	$("#s_opstotal").html(Math.round((ops+bonus_ops) * 10) / 10)
	$("#s_ops").html(Math.round(ops * 10) / 10)
	$("#s_bonusops").html(Math.round(bonus_ops * 10) / 10)
	$("#s_bonus").html(bonuschance*100)
	$("#s_fps").html(fps)
	$("#s_time").html(millisecondsToStr(new Date().getTime() - started))
}

function startGame() {
	updateAffordable()
	setInterval(logic, 500)
	setInterval(disp, 1000/fps)
}

startGame()