"use strict";

var myApp = angular.module('myApp', []);



myApp.factory('CanvasService', function (){

	var imageObj = new Image();
	imageObj.src = 'kentta.gif';





	return {
		ClearAndDrawImage:function(canvasID){
			var canvas = document.getElementById(canvasID);

            		if (canvas.getContext) {	
                		var context = canvas.getContext("2d");
				context.save();

				context.clearRect(0, 0, canvas.width, canvas.height);
				context.drawImage(imageObj, 0, 0);

				context.restore();
			}
		},

		drawCircle:function(canvasID,x,y,color) {
			var canvas = document.getElementById(canvasID);

            		if (canvas.getContext) {
                		var context = canvas.getContext("2d");
				context.save();
				console.log("DRAW");
				context.beginPath();
				context.arc(x, y, 4, 0, 2 * Math.PI, false);
				context.fillStyle = color;
				context.fill();
				context.closePath();
				context.restore();
			}
		},

		drawArrow:function(canvasID, fromx, fromy, tox, toy, color){
			var canvas = document.getElementById(canvasID);

            		if (canvas.getContext) {
	
                		var context = canvas.getContext("2d");
				context.save();
				console.log("hi2");
				var headlen = 10;   // length of head in pixels
				var angle = Math.atan2(toy-fromy,tox-fromx);

				context.beginPath();
				context.strokeStyle = color; 
				context.moveTo(fromx, fromy);
				context.lineTo(tox, toy);
				context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
				context.moveTo(tox, toy);
				context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
				context.stroke();
				context.restore(); 
			}
		},


		DrawShiftDiagram:function(shifts){
			var canvas = document.getElementById("LineResultCanvas");
				console.log("tassa");
            		if (canvas.getContext) {
				console.log("shiftDraw");
                		var context = canvas.getContext("2d");
 				context.save();

				var maxVal = 120;
				var stepSize = 10;
            			var rowHead = 50;
				var colHead = 50;
				var margin = 10;

				var numSamples = shifts.nbrShifts;
			        var yScalar = (canvas.height - colHead - margin) / (maxVal);
          			var xScalar = ((canvas.width - rowHead) / (numSamples + 1));

				context.clearRect(0, 0, canvas.width, canvas.height);


            			context.strokeStyle = "rgba(128,128,255, 0.5)"; // light blue line
            			context.beginPath();

            			context.font = "12pt Helvetica"
            			var count =  0;
				var y = 0;
            			for (var scale = maxVal; scale >= 0; scale -= stepSize) {
                			y = colHead + (yScalar * count * stepSize);
					context.fillText(scale, 10,y + 10);
					context.moveTo(rowHead, y)
					context.lineTo(canvas.width, y)
					count++;
				}

				context.stroke();

				context.translate(0, canvas.height-margin);
				context.scale(xScalar, -1 * yScalar);


				for (var i = 0; i < numSamples; i++) {

					context.fillStyle = "green";
					context.fillRect(i+1, 0, 0.5, shifts.shiftTable[i].own);
					context.fillStyle = "red";
					context.fillRect(i+1, shifts.shiftTable[i].own, 0.5, shifts.shiftTable[i].opp);

				}
				context.restore();
			}
		},
		DrawPassingDiagram:function(arc,canvasID){
			var canvas = document.getElementById(canvasID);
			if (arc){
            		if (canvas.getContext) {

				console.log("shiftDraw");
                		var context = canvas.getContext("2d");
				context.save();
				var maxVal = 5;
				var stepSize = 1;

            			var rowHead = 50;
				var colHead = 50;
				var margin = 10;

				var imageWidth = 242;

				var numSamples = 18;

				for (var value in arc) {
					if( arc[value] > maxVal){
						maxVal = arc[value];
					}
				}
				//Adjust stepSize

				if(maxVal>30){
					stepSize = 2;
				}
				if(maxVal>60){
					stepSize = 5;
				}


			        var yScalar = (canvas.height - colHead - margin) / (maxVal);
          			var xScalar = ((canvas.width - rowHead - imageWidth) / (numSamples + 1));




            			context.strokeStyle = "rgba(128,128,255, 0.5)"; // light blue line
            			context.beginPath();

            			context.font = "8pt Helvetica"
				console.log("shiftDraw",context.fillStyle);
				context.fillText("DD", (rowHead+imageWidth), canvas.height);
				context.fillText("DM", (rowHead+imageWidth+(xScalar*2)), canvas.height);
				context.fillText("DO", (rowHead+imageWidth+(xScalar*4)), canvas.height);
				context.fillText("MD", (rowHead+imageWidth+(xScalar*6)), canvas.height);
				context.fillText("MM", (rowHead+imageWidth+(xScalar*8)), canvas.height);
				context.fillText("MO", (rowHead+imageWidth+(xScalar*10)), canvas.height);
				context.fillText("OD", (rowHead+imageWidth+(xScalar*12)), canvas.height);
				context.fillText("OM", (rowHead+imageWidth+(xScalar*14)), canvas.height);
				context.fillText("OO", (rowHead+imageWidth+(xScalar*16)), canvas.height);

				context.font = "12pt Helvetica"
            			var count =  0;
				var y = 0;

            			for (var scale = maxVal; scale >= 0; scale -= stepSize) {
                			y = colHead + (yScalar * count * stepSize);
					context.fillText(scale, 10+imageWidth,y + 10);
					context.moveTo(rowHead+imageWidth, y)
					context.lineTo(canvas.width, y)
					count++;
				}

				context.stroke();

				context.translate(rowHead+imageWidth, canvas.height-margin);
				context.scale(xScalar, -1 * yScalar);

				var i =0;
				for (var value in arc) {
					if(i%2 ==0){
						context.fillStyle = "green";
						context.fillRect(i, 0, 0.5, arc[value]);
					}else{
						context.fillStyle = "red";
						context.fillRect(i, 0, 0.5, arc[value]);
					}

					i++;

				}
				context.restore();
			}
			}
		},

		Draw1vs1Diagram:function(arc,canvasID){
			var canvas = document.getElementById(canvasID);
			if (arc){
            		if (canvas.getContext) {
				console.log("shiftDraw");
                		var context = canvas.getContext("2d");
				context.save();
				var maxVal = 5;
				var stepSize = 1;

            			var rowHead = 50;
				var colHead = 50;
				var margin = 10;

				var imageWidth = 242;

				var numSamples = 12;

				for (var value in arc) {
					if( arc[value] > maxVal){
						maxVal = arc[value];
					}
				}
				//Adjust stepSize

				if(maxVal>30){
					stepSize = 2;
				}
				if(maxVal>60){
					stepSize = 5;
				}


			        var yScalar = (canvas.height - colHead - margin) / (maxVal);
          			var xScalar = ((canvas.width - rowHead - imageWidth) / (numSamples + 1));




            			context.strokeStyle = "rgba(128,128,255, 0.5)"; // light blue line
            			context.beginPath();

            			context.font = "8pt Helvetica"

				context.fillText("D zone", (rowHead+imageWidth), canvas.height);

				context.fillText("M zone", (rowHead+imageWidth+(xScalar*4)), canvas.height);

				context.fillText("O zone", (rowHead+imageWidth+(xScalar*8)), canvas.height);


				context.font = "12pt Helvetica"
            			var count =  0;
				var y = 0;

            			for (var scale = maxVal; scale >= 0; scale -= stepSize) {
                			y = colHead + (yScalar * count * stepSize);
					context.fillText(scale, 10+imageWidth,y + 10);
					context.moveTo(rowHead+imageWidth, y)
					context.lineTo(canvas.width, y)
					count++;
				}

				context.stroke();

				context.translate(rowHead+imageWidth, canvas.height-margin);
				context.scale(xScalar, -1 * yScalar);

				var i =0;
				for (var value in arc) {
					if(i%4 ==0){
						context.fillStyle = "green";
						context.fillRect(i, 0, 0.5, arc[value]);
					}else
					if(i%4==1){
						context.fillStyle = "red";
						context.fillRect(i, 0, 0.5, arc[value]);
					}else
					if(i%4==2){
						context.fillStyle = "yellow";
						context.fillRect(i, 0, 0.5, arc[value]);
					}else
					if(i%4==3){
						context.fillStyle = "blue";
						context.fillRect(i, 0, 0.5, arc[value]);
					}

					i++;

				}
				context.restore();
			}
			}
		},

		DrawShotsDiagram:function(arc,canvasID){
			var canvas = document.getElementById(canvasID);

			if (arc){
            		if (canvas.getContext) {
				console.log("shiftDraw");
                		var context = canvas.getContext("2d");
				context.save();
				var maxVal = 5;
				var stepSize = 1;

            			var rowHead = 50;
				var colHead = 50;
				var margin = 10;

				var imageWidth = 242;

				var numSamples = 16;

				for (var value in arc) {
					if( arc[value] > maxVal){
						maxVal = arc[value];
					}
				}
				//Adjust stepSize

				if(maxVal>30){
					stepSize = 2;
				}
				if(maxVal>60){
					stepSize = 5;
				}


			        var yScalar = (canvas.height - colHead - margin) / (maxVal);
          			var xScalar = ((canvas.width - rowHead - imageWidth) / (numSamples + 1));

				context.beginPath();
				context.arc(121,84,40,0,2*Math.PI);
				context.stroke();

				context.beginPath();
				context.arc(121,114,70,0,2*Math.PI);
				context.stroke();

				context.beginPath();
				context.arc(121,144,100,0,2*Math.PI);
				context.stroke();


            			context.strokeStyle = "rgba(128,128,255, 0.5)"; // light blue line
            			context.beginPath();

            			context.font = "8pt Helvetica"

				context.fillText("Sector 1", (rowHead+imageWidth), canvas.height);
				context.fillText("Sector 2", (rowHead+imageWidth+(xScalar*4)), canvas.height);
				context.fillText("Sector 3", (rowHead+imageWidth+(xScalar*8)), canvas.height);
				context.fillText("Sector 4", (rowHead+imageWidth+(xScalar*12)), canvas.height);

				context.font = "12pt Helvetica"
            			var count =  0;
				var y = 0;

            			for (var scale = maxVal; scale >= 0; scale -= stepSize) {
                			y = colHead + (yScalar * count * stepSize);
					context.fillText(scale, 10+imageWidth,y + 10);
					context.moveTo(rowHead+imageWidth, y)
					context.lineTo(canvas.width, y)
					count++;
				}

				context.stroke();

				context.translate(rowHead+imageWidth, canvas.height-margin);
				context.scale(xScalar, -1 * yScalar);

				var i =0;
				for (var value in arc) {
					if(i%4 ==0){
						context.fillStyle = "green";
						context.fillRect(i, 0, 0.5, arc[value]);
					}else
					if(i%4==1){
						context.fillStyle = "red";
						context.fillRect(i, 0, 0.5, arc[value]);
					}else
					if(i%4==2){
						context.fillStyle = "yellow";
						context.fillRect(i, 0, 0.5, arc[value]);
					}else
					if(i%4==3){
						context.fillStyle = "blue";
						context.fillRect(i, 0, 0.5, arc[value]);
					}

					i++;

				}
				context.restore();
			}
			}

		}


	};
});

myApp.factory('CalculationService', function(CanvasService, DataService){


	var canvasHeight = 482;

	function summaResult(){
		this.id = 0;
		this.offplus = 0;
		this.offminus = 0;
		this.defplus = 0;
		this.defminus = 0;
		this.passplus = 0;
		this.passminus = 0;
		this.shot = 0;
		this.goal = 0;
		this.miss = 0;
		this.blocked = 0;
	}

	function shotsResult(){
		this.sector1shot = 0;
		this.sector1goal = 0;
		this.sector1miss = 0;
		this.sector1blocked = 0;

		this.sector2shot = 0;
		this.sector2goal = 0;
		this.sector2miss = 0;
		this.sector2blocked = 0;

		this.sector3shot = 0;
		this.sector3goal = 0;
		this.sector3miss = 0;
		this.sector3blocked = 0;

		this.sector4shot = 0;
		this.sector4goal = 0;
		this.sector4miss = 0;
		this.sector4blocked = 0;
	}


	function vsResult(){
		this.def1vs1OffPlus = 0;
		this.def1vs1OffMinus = 0;
		this.def1vs1DefPlus = 0;
		this.def1vs1DefMinus = 0;

		this.mid1vs1OffPlus = 0;
		this.mid1vs1OffMinus = 0;
		this.mid1vs1DefPlus = 0;
		this.mid1vs1DefMinus = 0;

		this.off1vs1OffPlus = 0;
		this.off1vs1OffMinus = 0;
		this.off1vs1DefPlus = 0;
		this.off1vs1DefMinus = 0;
	}

	function passingResult(){
		this.defToDefSuccess = 0;
		this.defToDefFail = 0;
		this.defToMidSuccess = 0;
		this.defToMidFail = 0;
		this.defToOffSuccess = 0;
		this.defToOffFail = 0;

		this.midToDefSuccess = 0;
		this.midToDefFail = 0;
		this.midToMidSuccess = 0;
		this.midToMidFail = 0;
		this.midToOffSuccess = 0;
		this.midToOffFail = 0;

		this.offToDefSuccess = 0;
		this.offToDefFail = 0;
		this.offToMidSuccess = 0;
		this.offToMidFail = 0;
		this.offToOffSuccess = 0;
		this.offToOffFail = 0;
	}

	function shiftTable(){
		this.line = 0;
		this.period = 0;
		this.startTime = 0;
		this.endTime = 0;
		this.own = 0;
		this.opp = 0;
	}

	function addShotsToArc(arc, type,x,y){
		var sector = 0;
		var sectorX = 121;
		var sectorY1 = 84;
		var sectorY2 = 114;
		var sectorY3 = 144;
		var sectorR1 = 40;
		var sectorR2 = 70;
		var sectorR3 = 100;
		
		if(Math.pow(sectorR3,2) >= (Math.pow((x-sectorX),2)+Math.pow((y-sectorY3),2))){
			if(Math.pow(sectorR2,2) >= (Math.pow((x-sectorX),2)+Math.pow((y-sectorY2),2))){
				if(Math.pow(sectorR1,2) >= (Math.pow((x-sectorX),2)+Math.pow((y-sectorY1),2))){

					if(type == "shot"){
						arc.sector1shot++;
					}								
					if(type == "goal"){
						arc.sector1goal++;
					}									
					if(type == "miss"){
						arc.sector1miss++;
					}									
					if(type == "blocked"){
						arc.sector1blocked++;
					}
				}else{
					if(type == "shot"){
						arc.sector2shot++;
					}								
					if(type == "goal"){
						arc.sector2goal++;
					}									
					if(type == "miss"){
						arc.sector2miss++;
					}									
					if(type == "blocked"){
						arc.sector2blocked++;
					}
				}
			}else{
				if(type == "shot"){
					arc.sector3shot++;
				}								
				if(type == "goal"){
					arc.sector3goal++;
				}									
				if(type == "miss"){
					arc.sector3miss++;
				}									
				if(type == "blocked"){
					arc.sector3blocked++;
				}									
			
			}
		}else{
			if(type == "shot"){
				arc.sector4shot++;
			}									
			if(type == "goal"){
				arc.sector4goal++;
			}									
			if(type == "miss"){
				arc.sector4miss++;
			}									
			if(type == "blocked"){
				arc.sector4blocked++;
			}									
		}		



	}

	function add1vs1ToArc(arc, zone, type){

		if(type == '1vs1_off_plus'){
			if(zone == 'def'){
					arc.def1vs1OffPlus++;
			} else
			if(zone == 'mid'){

					arc.mid1vs1OffPlus++;
			} else
			if(zone == 'off'){
					arc.off1vs1OffPlus++;
			}
		} else
		if(type == '1vs1_off_minus'){
			if(zone == 'def'){
					arc.def1vs1OffMinus++;
			} else
			if(zone == 'mid'){
					arc.mid1vs1OffMinus++;
			} else
			if(zone == 'off'){
					arc.off1vs1OffMinus++;
			}
		} else
		if(type == '1vs1_def_plus'){
			if(zone == 'def'){
					arc.def1vs1DefPlus++;
			} else
			if(zone == 'mid'){

					arc.mid1vs1DefPlus++;
			} else
			if(zone == 'off'){
					arc.off1vs1DefPlus++;
			}
		} else
		if(type == '1vs1_def_minus'){
			if(zone == 'def'){
					arc.def1vs1DefMinus++;
			} else
			if(zone == 'mid'){
					arc.mid1vs1DefMinus++;
			} else
			if(zone == 'off'){
					arc.off1vs1DefMinus++;
			}
		}
	}


	function addPassingToArc(arc, start, end, success){
		if(start == 'def'){
			if(end == 'def'){
				if(success == 'success'){
					arc.defToDefSuccess++;
				}else{
					arc.defToDefFail++;
				}
			} else
			if(end == 'mid'){
				if(success == 'success'){
					arc.defToMidSuccess++;
				}else{
					arc.defToMidFail++;
				}
			} else
			if(end == 'off'){
				if(success == 'success'){
					arc.defToOffSuccess++;
				}else{
					arc.defToOffFail++;
				}
			}

		} else
		if(start == 'mid'){
			if(end == 'def'){
				if(success == 'success'){
					arc.midToDefSuccess++;
				}else{
					arc.midToDefFail++;
				}
			} else
			if(end == 'mid'){
				if(success == 'success'){
					arc.midToMidSuccess++;
				}else{
					arc.midToMidFail++;
				}
			} else
			if(end == 'off'){
				if(success == 'success'){
					arc.midToOffSuccess++;
				}else{
					arc.midToOffFail++;
				}
			}

		}else
		if(start == 'off'){
			if(end == 'def'){
				if(success == 'success'){
					arc.offToDefSuccess++;
				}else{
					arc.offToDefFail++;
				}
			} else
			if(end == 'mid'){
				if(success == 'success'){
					arc.offToMidSuccess++;
				}else{
					arc.offToMidFail++;
				}
			} else
			if(end == 'off'){
				if(success == 'success'){
					arc.offToOffSuccess++;
				}else{
					arc.offToOffFail++;
				}
			}
		}

	}

	function calculateShift(periods, line){

			var shifts = {
				nbrShifts :0,
				shiftTable:[]
				};

			var arc = new shiftTable;
			var tableLine = line;
			var startTime = 0;
			var endTime = 0;
			var timeDiff = 0;
			var startFound = false;

			var changeLinePossessionEventObject = DataService.getChangeLinePossessionEventObject();


			var l = changeLinePossessionEventObject.length;
			if (l>0){
				arc.period = changeLinePossessionEventObject[0].period;
			}


			for (var i = 0; i < l; i++) {
				for (var x in periods) {
					if(changeLinePossessionEventObject[i].period == periods[x].periodName && periods[x].isChecked){

						if(changeLinePossessionEventObject[i].period == arc.period){
							if(changeLinePossessionEventObject[i].line == tableLine){
								if(startFound != true){
									startTime = changeLinePossessionEventObject[i].startTime;
									endTime = changeLinePossessionEventObject[i].endTime;
									arc.startTime = startTime;
									arc.period = changeLinePossessionEventObject[i].period;
									startFound = true;

									if(changeLinePossessionEventObject[i].possession == "own"){
										timeDiff = changeLinePossessionEventObject[i].endTime - changeLinePossessionEventObject[i].startTime;
										arc.own += timeDiff;
									}
									if(changeLinePossessionEventObject[i].possession == "opp"){
										timeDiff = changeLinePossessionEventObject[i].endTime - changeLinePossessionEventObject[i].startTime;
										arc.opp += timeDiff;			
									}
							} else {
								endTime = changeLinePossessionEventObject[i].endTime;
									if(changeLinePossessionEventObject[i].possession == "own"){
										timeDiff = changeLinePossessionEventObject[i].endTime - changeLinePossessionEventObject[i].startTime;
										arc.own += timeDiff;
									}
									if(changeLinePossessionEventObject[i].possession == "opp"){
										timeDiff = changeLinePossessionEventObject[i].endTime - changeLinePossessionEventObject[i].startTime;
										arc.opp += timeDiff;			
									}
							}	
							} else 
							if(changeLinePossessionEventObject[i].line != tableLine && startFound == true){
								arc.endTime = endTime;
								arc.line = tableLine;
								console.log("ADD Event", arc);
								shifts.nbrShifts++;
								shifts.shiftTable.push(arc);
								arc = new shiftTable;
								startFound = false;
							}
						} else {
							if(startFound == true){
								arc.endTime = endTime;
								arc.line = tableLine;
								console.log("ADD Event", arc);
								shifts.nbrShifts++;
								shifts.shiftTable.push(arc);
								arc = new shiftTable;
								startFound = false;
						}
						if(changeLinePossessionEventObject[i].line == tableLine){
							startTime = changeLinePossessionEventObject[i].startTime;
							endTime = changeLinePossessionEventObject[i].endTime;
							arc.startTime = startTime;
							startFound = true;

							if(changeLinePossessionEventObject[i].possession == "own"){
								timeDiff = changeLinePossessionEventObject[i].endTime - changeLinePossessionEventObject[i].startTime;
								arc.own += timeDiff;
							}
							if(changeLinePossessionEventObject[i].possession == "opp"){
								timeDiff = changeLinePossessionEventObject[i].endTime - changeLinePossessionEventObject[i].startTime;
								arc.opp += timeDiff;			
							}
						}	
						arc.period = changeLinePossessionEventObject[i].period;
						}
					}
				}	
			}
			if(startFound == true){
				arc.endTime = endTime;
				arc.line = tableLine;
				console.log("ADD Event", arc);
				shifts.nbrShifts++;
				shifts.shiftTable.push(arc);
			}
		return shifts;
	}

	function calculatePeriods(startTime, endTime){
	var periods = [
				{ periodName : "period1" , startTime : "0", endTime : "0", isChecked : false },
				{ periodName : "period2" , startTime : "0", endTime : "0", isChecked : false },
				{ periodName : "period3" , startTime : "0", endTime : "0", isChecked : false },
				{ periodName : "period4" , startTime : "0", endTime : "0", isChecked : false }
			]

			console.log("TimerBasedPassingResult", startTime,endTime);
			var time = parseInt(startTime[0])*60 + parseInt(startTime[1]);
			var time2 = parseInt(endTime[0])*60 + parseInt(endTime[1]);
			
			var periodMaxLength = 900;

			if(time2 > (3*periodMaxLength)){
				if(time > (3*periodMaxLength)){
					periods[3].isChecked = true;
					periods[3].startTime = time-(3*periodMaxLength);
					periods[3].endTime = time2-(3*periodMaxLength);
				}
				else if((time > (2*periodMaxLength)) && (time <= (3*periodMaxLength))){
					periods[2].isChecked = true;
					periods[3].isChecked = true;

					periods[2].startTime = time-(2*periodMaxLength);
					periods[2].endTime = periodMaxLength;
					periods[3].startTime = 0;
					periods[3].endTime = time2-(3*periodMaxLength);
				}
				else if((time > (periodMaxLength)) && (time <= (2*periodMaxLength))){
					periods[1].isChecked = true;
					periods[2].isChecked = true;
					periods[3].isChecked = true;

					periods[1].startTime = time-periodMaxLength;
					periods[1].endTime = periodMaxLength;
					periods[2].startTime = 0;
					periods[2].endTime = periodMaxLength;
					periods[3].startTime = 0;
					periods[3].endTime = time2-(3*periodMaxLength);
				}				
				else if(time <= periodMaxLength){
					periods[0].isChecked = true;
					periods[1].isChecked = true;
					periods[2].isChecked = true;
					periods[3].isChecked = true;


					periods[0].startTime = time;
					periods[0].endTime = periodMaxLength;
					periods[1].startTime = 0;
					periods[1].endTime = periodMaxLength;
					periods[2].startTime = 0;
					periods[2].endTime = periodMaxLength;
					periods[3].startTime = 0;
					periods[3].endTime = time2-(3*periodMaxLength);
				}
			}
			else if((time2 > (2*periodMaxLength)) && (time2 <= (3*periodMaxLength))){
				if((time > (2*periodMaxLength)) && (time <= (3*periodMaxLength))){
					periods[2].isChecked = true;


					periods[2].startTime = time-(2*periodMaxLength);
					periods[2].endTime = time2-(2*periodMaxLength);
				}
				else if((time > (periodMaxLength)) && (time <= (2*periodMaxLength))){
					periods[1].isChecked = true;
					periods[2].isChecked = true;


					periods[1].startTime = time-periodMaxLength;
					periods[1].endTime = periodMaxLength;
					periods[2].startTime = 0;
					periods[2].endTime = time2-(2*periodMaxLength);
				}				
				else if(time <= periodMaxLength){
					periods[0].isChecked = true;
					periods[1].isChecked = true;
					periods[2].isChecked = true;

					periods[0].startTime = time;
					periods[0].endTime = periodMaxLength;
					periods[1].startTime = 0;
					periods[1].endTime = periodMaxLength;
					periods[2].startTime = 0;
					periods[2].endTime = time2-(2*periodMaxLength);
				}
			}
			else if((time2 > (periodMaxLength)) && (time2 <= (2*periodMaxLength))){
				
				if((time > (periodMaxLength)) && (time <= (2*periodMaxLength))){
					periods[1].isChecked = true;



					periods[1].startTime = time-periodMaxLength;

					periods[1].endTime = time2-periodMaxLength;
				}				
				else if(time <= periodMaxLength){
					periods[0].isChecked = true;
					periods[1].isChecked = true;
					periods[0].startTime = time;
					periods[0].endTime = periodMaxLength;
					periods[1].startTime = 0;
					periods[1].endTime = time2-periodMaxLength;
				}
			}
			else if(time2 <= periodMaxLength){
					periods[0].isChecked = true;
					periods[0].startTime = time;

					periods[0].endTime = time2;
			}
	return periods;
	}


	return {
		getSumma:function()
		{
			var arc = new summaResult;
			arc.id = DataService.getResultPlayerId();
			var otherEventObject = DataService.getOtherEventObject();
			var passEventObject = DataService.getPassEventObject();

			var l = otherEventObject.length;
			for (var i = 0; i < l; i++) {
				if(otherEventObject[i].player_id == DataService.getResultPlayerId()){
					if(otherEventObject[i].event_type == "1vs1_off_plus"){
						arc.offplus++;
					}
					if(otherEventObject[i].event_type == "1vs1_off_minus"){
						arc.offminus++;			
					}
					if(otherEventObject[i].event_type == "1vs1_def_plus"){
						arc.defplus++;			
					}
					if(otherEventObject[i].event_type == "1vs1_def_minus"){
						arc.defminus++;			
					}
					if(otherEventObject[i].event_type == "shot"){
						arc.shot++
					}
					if(otherEventObject[i].event_type == "goal"){
						arc.goal;
					}
					if(otherEventObject[i].event_type == "miss"){
						arc.miss;
					}
					if(otherEventObject[i].event_type == "blocked"){
						arc.blocked++;
					}
				}
			}
			
			l = passEventObject.length;
				for (var i = 0; i < l; i++) {
				if(passEventObject[i].player_id == DataService.getResultPlayerId()){
					if(passEventObject[i].passType == "pass_plus"){
						arc.passplus++;
					}
					if(passEventObject[i].passType == "pass_minus"){
						arc.passminus++;			
					}
				}
			}
			//CanvasService.DrawPassingDiagram();
			return arc;
		},

		getLinePossession:function(periods, line)
		{

			var shifts = {};
			shifts = calculateShift(periods, line);

			CanvasService.DrawShiftDiagram(shifts);

		},

		PassingResultCalculation:function(periods, strengths)
		{
			var arc = new passingResult;
			var passEventObject = DataService.getPassEventObject();
			var start = 0;
			var end = 0;
			var success = 0;
			var color = 0;

			CanvasService.ClearAndDrawImage('PlayerResultCanvas');

			var l = passEventObject.length;
				for (var i = 0; i < l; i++) {
				if(passEventObject[i].player_id == DataService.getResultPlayerId()){
					if(passEventObject[i].passType == "pass_plus"){
						if(passEventObject[i].y < (canvasHeight/3)){
							start = 'off';
						} else 
						if(passEventObject[i].y > (canvasHeight - (canvasHeight/3))){
							start = 'def';
						} else {
							start = 'mid';
						}

						if(passEventObject[i].y2 < (canvasHeight/3)){
							end = 'off';
						} else 
						if(passEventObject[i].y2 > (canvasHeight - (canvasHeight/3))){
							end = 'def';
						} else {
							end = 'mid';
						}
					success = 'success';
					color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
					}

					if(passEventObject[i].passType == "pass_minus"){
						if(passEventObject[i].y < (canvasHeight/3)){
							start = 'off';
						} else 
						if(passEventObject[i].y > (canvasHeight - (canvasHeight/3))){
							start = 'def';
						} else {
							start = 'mid';
						}

						if(passEventObject[i].y2 < (canvasHeight/3)){
							end = 'off';
						} else 
						if(passEventObject[i].y2 > (canvasHeight - (canvasHeight/3))){
							end = 'def';
						} else {
							end = 'mid';
						}
					success = 'fail';
					color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
					
					}

					for (var x in periods) {
						if(passEventObject[i].period == periods[x].periodName && periods[x].isChecked){
							for (var y in strengths) {
								if(passEventObject[i].whatField == strengths[y].strengthName && strengths[y].isChecked){
									addPassingToArc(arc, start, end, success);
									CanvasService.drawArrow('PlayerResultCanvas',passEventObject[i].x,passEventObject[i].y,passEventObject[i].x2,passEventObject[i].y2,color)
								}
							}
						}
					}
					
				}

			}
			CanvasService.DrawPassingDiagram(arc,'PlayerResultCanvas');		
		},


		vsResultCalculation:function(periods, strengths)
		{
			var arc = new vsResult;
			var otherEventObject = DataService.getOtherEventObject();
			var zone = 0;
			var color = 0;

			CanvasService.ClearAndDrawImage('PlayerResultCanvas');

			var l = otherEventObject.length;
				for (var i = 0; i < l; i++) {
					if(otherEventObject[i].player_id == DataService.getResultPlayerId()){

						if(	otherEventObject[i].event_type == "1vs1_off_plus" ||
							otherEventObject[i].event_type == "1vs1_off_minus" ||
							otherEventObject[i].event_type == "1vs1_def_plus" ||
							otherEventObject[i].event_type == "1vs1_def_minus" ){
								if(otherEventObject[i].y < (canvasHeight/3)){
									zone = 'off';
								} else 
								if(otherEventObject[i].y > (canvasHeight - (canvasHeight/3))){
									zone = 'def';
								} else {
									zone = 'mid';
								}

								for (var x in periods) {
									if(otherEventObject[i].period == periods[x].periodName && periods[x].isChecked){
										for (var y in strengths) {
											if(otherEventObject[i].whatField == strengths[y].strengthName && strengths[y].isChecked){
												add1vs1ToArc(arc, zone, otherEventObject[i].event_type);
												if(otherEventObject[i].event_type == "1vs1_off_plus"){
													color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
												}
												if(otherEventObject[i].event_type == "1vs1_off_minus"){
													color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
												}
												if(otherEventObject[i].event_type == "1vs1_def_plus"){
													color = 'rgb(' + 255 + ',' + 255 + ',' + 0 + ')';
												}
												if(otherEventObject[i].event_type == "1vs1_def_minus"){
													color = 'rgb(' + 0 + ',' + 0 + ',' + 255 + ')';
												}
												CanvasService.drawCircle('PlayerResultCanvas',otherEventObject[i].x,otherEventObject[i].y,color)
											}
										}
									}
								}
						}
					
					}					
				}//for end
			console.log("ADD Event", arc);
			CanvasService.Draw1vs1Diagram(arc,'PlayerResultCanvas');		
		},

		ShotsResultCalculation:function(periods, strengths)
		{
			var arc = new shotsResult;
			var otherEventObject = DataService.getOtherEventObject();

			var color = 0;

			CanvasService.ClearAndDrawImage('PlayerResultCanvas');

			var l = otherEventObject.length;
				for (var i = 0; i < l; i++) {
					if(otherEventObject[i].player_id == DataService.getResultPlayerId()){

						if(	otherEventObject[i].event_type == "shot" ||
							otherEventObject[i].event_type == "goal" ||
							otherEventObject[i].event_type == "miss" ||
							otherEventObject[i].event_type == "blocked" ){

								for (var x in periods) {
									if(otherEventObject[i].period == periods[x].periodName && periods[x].isChecked){
										for (var y in strengths) {
											if(otherEventObject[i].whatField == strengths[y].strengthName && strengths[y].isChecked){
												addShotsToArc(arc, otherEventObject[i].event_type, otherEventObject[i].x, otherEventObject[i].y);
												if(otherEventObject[i].event_type == "shot"){
													color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
												}
												if(otherEventObject[i].event_type == "goal"){
													color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
												}
												if(otherEventObject[i].event_type == "miss"){
													color = 'rgb(' + 255 + ',' + 255 + ',' + 0 + ')';
												}
												if(otherEventObject[i].event_type == "blocked"){
													color = 'rgb(' + 0 + ',' + 0 + ',' + 255 + ')';
												}
												CanvasService.drawCircle('PlayerResultCanvas',otherEventObject[i].x,otherEventObject[i].y,color)
											}
										}
									}
								}
						}
					
					}					
				}//for end
			console.log("ADD Event", arc);
			CanvasService.DrawShotsDiagram(arc,'PlayerResultCanvas');
		},

		LinePassingResultCalculation:function(periods, line)
		{
			var shifts = {};

			var arc = new passingResult;
			var passEventObject = DataService.getPassEventObject();
			var start = 0;
			var end = 0;
			var success = 0;
			var color = 0;
			var passEventFound = false;


			shifts = calculateShift(periods, line);

			CanvasService.ClearAndDrawImage('LineResultCanvas');

			var l = passEventObject.length;

				for (var i = 0; i < l; i++) {
					for(var j = 0; j<shifts.nbrShifts; j++){
						if((passEventObject[i].timer >= shifts.shiftTable[j].startTime)
 						&& (passEventObject[i].timer <= shifts.shiftTable[j].endTime)
						&& (passEventObject[i].period == shifts.shiftTable[j].period)){
							passEventFound = true;
						}
					}
					if(passEventFound){
						if(passEventObject[i].passType == "pass_plus"){
							if(passEventObject[i].y < (canvasHeight/3)){
								start = 'off';
							} else 
							if(passEventObject[i].y > (canvasHeight - (canvasHeight/3))){
								start = 'def';
							} else {
								start = 'mid';
							}

							if(passEventObject[i].y2 < (canvasHeight/3)){
								end = 'off';
							} else 
							if(passEventObject[i].y2 > (canvasHeight - (canvasHeight/3))){
								end = 'def';
							} else {
								end = 'mid';
							}
						success = 'success';
						color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
						}
	
						if(passEventObject[i].passType == "pass_minus"){
							if(passEventObject[i].y < (canvasHeight/3)){
								start = 'off';
							} else 
							if(passEventObject[i].y > (canvasHeight - (canvasHeight/3))){
								start = 'def';
							} else {
								start = 'mid';
							}	

							if(passEventObject[i].y2 < (canvasHeight/3)){
								end = 'off';
							} else 
							if(passEventObject[i].y2 > (canvasHeight - (canvasHeight/3))){
								end = 'def';
							} else {
								end = 'mid';
							}
						success = 'fail';
						color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
					
						}

						addPassingToArc(arc, start, end, success);
						CanvasService.drawArrow('LineResultCanvas',passEventObject[i].x,passEventObject[i].y,passEventObject[i].x2,passEventObject[i].y2,color)
					}
				passEventFound = false;
				}
			CanvasService.DrawPassingDiagram(arc,'LineResultCanvas');		
		},

		LinevsResultCalculation:function(periods, line)
		{


			var shifts = {};

			var arc = new vsResult;
			var otherEventObject = DataService.getOtherEventObject();
			var zone = 0;
			var color = 0;
			var EventFound = false;


			shifts = calculateShift(periods, line);

			CanvasService.ClearAndDrawImage('LineResultCanvas');

			var l = otherEventObject.length;
				for (var i = 0; i < l; i++) {
					for(var j = 0; j<shifts.nbrShifts; j++){
						if((otherEventObject[i].timer >= shifts.shiftTable[j].startTime)
 						&& (otherEventObject[i].timer <= shifts.shiftTable[j].endTime)
						&& (otherEventObject[i].period == shifts.shiftTable[j].period)){
							EventFound = true;
						}
					}
					if(EventFound){

						if(	otherEventObject[i].event_type == "1vs1_off_plus" ||
							otherEventObject[i].event_type == "1vs1_off_minus" ||
							otherEventObject[i].event_type == "1vs1_def_plus" ||
							otherEventObject[i].event_type == "1vs1_def_minus" ){
								if(otherEventObject[i].y < (canvasHeight/3)){
									zone = 'off';
								} else 
								if(otherEventObject[i].y > (canvasHeight - (canvasHeight/3))){
									zone = 'def';
								} else {
									zone = 'mid';
								}

			
								add1vs1ToArc(arc, zone, otherEventObject[i].event_type);
								if(otherEventObject[i].event_type == "1vs1_off_plus"){
									color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
								}
								if(otherEventObject[i].event_type == "1vs1_off_minus"){
									color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
								}
								if(otherEventObject[i].event_type == "1vs1_def_plus"){
									color = 'rgb(' + 255 + ',' + 255 + ',' + 0 + ')';
								}
								if(otherEventObject[i].event_type == "1vs1_def_minus"){
									color = 'rgb(' + 0 + ',' + 0 + ',' + 255 + ')';
								}
								CanvasService.drawCircle('LineResultCanvas',otherEventObject[i].x,otherEventObject[i].y,color)
						}
					}		
				EventFound = false;	
				}//for end
			console.log("ADD Event", arc);
			CanvasService.Draw1vs1Diagram(arc,'LineResultCanvas');		
		},

		LineShotsResultCalculation:function(periods, line)
		{

			var shifts = {};


			shifts = calculateShift(periods, line);

			var EventFound = false;
			var arc = new shotsResult;
			var otherEventObject = DataService.getOtherEventObject();

			var color = 0;

			CanvasService.ClearAndDrawImage('LineResultCanvas');

			var l = otherEventObject.length;
				for (var i = 0; i < l; i++) {
					for(var j = 0; j<shifts.nbrShifts; j++){
						if((otherEventObject[i].timer >= shifts.shiftTable[j].startTime)
 						&& (otherEventObject[i].timer <= shifts.shiftTable[j].endTime)
						&& (otherEventObject[i].period == shifts.shiftTable[j].period)){
							EventFound = true;
						}
					}
					if(EventFound){
						if(	otherEventObject[i].event_type == "shot" ||
							otherEventObject[i].event_type == "goal" ||
							otherEventObject[i].event_type == "miss" ||
							otherEventObject[i].event_type == "blocked" ){

								addShotsToArc(arc, otherEventObject[i].event_type, otherEventObject[i].x, otherEventObject[i].y);
								if(otherEventObject[i].event_type == "shot"){
									color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
								}
								if(otherEventObject[i].event_type == "goal"){
									color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
								}
								if(otherEventObject[i].event_type == "miss"){
									color = 'rgb(' + 255 + ',' + 255 + ',' + 0 + ')';
								}
								if(otherEventObject[i].event_type == "blocked"){
									color = 'rgb(' + 0 + ',' + 0 + ',' + 255 + ')';
								}
								CanvasService.drawCircle('LineResultCanvas',otherEventObject[i].x,otherEventObject[i].y,color)
						}
					}
				EventFound = false;						
				}//for end
			console.log("ADD Event", arc);
			CanvasService.DrawShotsDiagram(arc,'LineResultCanvas');
		},

		calculateAllShift:function(periods, line){

			var shifts = {
				nbrShifts :0,
				shiftTable:[]
				};

			var arc = new shiftTable;
			var tableLine = 0;
			var startTime = 0;
			var endTime = 0;
			var timeDiff = 0;
			var startFound = false;

			var changeLinePossessionEventObject = DataService.getChangeLinePossessionEventObject();


			var l = changeLinePossessionEventObject.length;
			if (l>0){
				arc.period = changeLinePossessionEventObject[0].period;
				tableLine = changeLinePossessionEventObject[0].line;
			}


			for (var i = 0; i < l; i++) {
				if(changeLinePossessionEventObject[i].period == arc.period){
					if(changeLinePossessionEventObject[i].line == tableLine){
						if(startFound != true){
							startTime = changeLinePossessionEventObject[i].startTime;
							endTime = changeLinePossessionEventObject[i].endTime;
							arc.startTime = startTime;
							arc.period = changeLinePossessionEventObject[i].period;
							startFound = true;

						} else {
							endTime = changeLinePossessionEventObject[i].endTime;
						}	
					} else 
					if(changeLinePossessionEventObject[i].line != tableLine && startFound == true){
						arc.endTime = endTime;
						arc.line = tableLine;
						shifts.nbrShifts++;
						shifts.shiftTable.push(arc);
						arc = new shiftTable;
						startFound = false;


						tableLine = changeLinePossessionEventObject[i].line;
						startTime = changeLinePossessionEventObject[i].startTime;
						endTime = changeLinePossessionEventObject[i].endTime;
						arc.startTime = startTime;
						arc.period = changeLinePossessionEventObject[i].period;
						startFound = true;

					}
				} else {
					if(startFound == true){
						arc.endTime = endTime;
						arc.line = tableLine;
						console.log("ADD Event", arc);
						shifts.nbrShifts++;
						shifts.shiftTable.push(arc);
						arc = new shiftTable;
						startFound = false;
					}

					tableLine = changeLinePossessionEventObject[i].line;
					startTime = changeLinePossessionEventObject[i].startTime;
					endTime = changeLinePossessionEventObject[i].endTime;
					arc.startTime = startTime;
					arc.period = changeLinePossessionEventObject[i].period;
					startFound = true;	
				}
					
					
			}//for end

			if(startFound == true){
				arc.endTime = endTime;
				arc.line = tableLine;
				console.log("ADD Event", arc);
				shifts.nbrShifts++;
				shifts.shiftTable.push(arc);
			}
		return shifts;
		},

		TimerPassingResultCalculation:function(period,startTime,endTime)
		{

			var arc = new passingResult;
			var passEventObject = DataService.getPassEventObject();
			var start = 0;
			var end = 0;
			var success = 0;
			var color = 0;
			var passEventFound = false;

			CanvasService.ClearAndDrawImage('LineResultCanvas');

			var l = passEventObject.length;

				for (var i = 0; i < l; i++) {
					if((passEventObject[i].timer >= startTime)
 						&& (passEventObject[i].timer <= endTime)
						&& (passEventObject[i].period == period)){
						if(passEventObject[i].passType == "pass_plus"){
							if(passEventObject[i].y < (canvasHeight/3)){
								start = 'off';
							} else 
							if(passEventObject[i].y > (canvasHeight - (canvasHeight/3))){
								start = 'def';
							} else {
								start = 'mid';
							}

							if(passEventObject[i].y2 < (canvasHeight/3)){
								end = 'off';
							} else 
							if(passEventObject[i].y2 > (canvasHeight - (canvasHeight/3))){
								end = 'def';
							} else {
								end = 'mid';
							}
						success = 'success';
						color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
						}
	
						if(passEventObject[i].passType == "pass_minus"){
							if(passEventObject[i].y < (canvasHeight/3)){
								start = 'off';
							} else 
							if(passEventObject[i].y > (canvasHeight - (canvasHeight/3))){
								start = 'def';
							} else {
								start = 'mid';
							}	

							if(passEventObject[i].y2 < (canvasHeight/3)){
								end = 'off';
							} else 
							if(passEventObject[i].y2 > (canvasHeight - (canvasHeight/3))){
								end = 'def';
							} else {
								end = 'mid';
							}
						success = 'fail';
						color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
					
						}

						addPassingToArc(arc, start, end, success);
						CanvasService.drawArrow('LineResultCanvas',passEventObject[i].x,passEventObject[i].y,passEventObject[i].x2,passEventObject[i].y2,color)
					}
				}
			console.log("ADD Event", arc);
			CanvasService.DrawPassingDiagram(arc,'LineResultCanvas');
		},

		TimervsResultCalculation:function(period,startTime,endTime)
		{


			var arc = new vsResult;
			var otherEventObject = DataService.getOtherEventObject();
			var zone = 0;
			var color = 0;

			CanvasService.ClearAndDrawImage('LineResultCanvas');

			var l = otherEventObject.length;
				for (var i = 0; i < l; i++) {
					if((otherEventObject[i].timer >= startTime)
 						&& (otherEventObject[i].timer <= endTime)
						&& (otherEventObject[i].period == period)){

						if(	otherEventObject[i].event_type == "1vs1_off_plus" ||
							otherEventObject[i].event_type == "1vs1_off_minus" ||
							otherEventObject[i].event_type == "1vs1_def_plus" ||
							otherEventObject[i].event_type == "1vs1_def_minus" ){
								if(otherEventObject[i].y < (canvasHeight/3)){
									zone = 'off';
								} else 
								if(otherEventObject[i].y > (canvasHeight - (canvasHeight/3))){
									zone = 'def';
								} else {
									zone = 'mid';
								}

			
								add1vs1ToArc(arc, zone, otherEventObject[i].event_type);
								if(otherEventObject[i].event_type == "1vs1_off_plus"){
									color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
								}
								if(otherEventObject[i].event_type == "1vs1_off_minus"){
									color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
								}
								if(otherEventObject[i].event_type == "1vs1_def_plus"){
									color = 'rgb(' + 255 + ',' + 255 + ',' + 0 + ')';
								}
								if(otherEventObject[i].event_type == "1vs1_def_minus"){
									color = 'rgb(' + 0 + ',' + 0 + ',' + 255 + ')';
								}
								CanvasService.drawCircle('LineResultCanvas',otherEventObject[i].x,otherEventObject[i].y,color)
						}
					}			
				}//for end
			console.log("ADD Event", arc);
			CanvasService.Draw1vs1Diagram(arc,'LineResultCanvas');		
		},

		TimerShotsResultCalculation:function(period,startTime,endTime)
		{

			var arc = new shotsResult;
			var otherEventObject = DataService.getOtherEventObject();

			var color = 0;

			CanvasService.ClearAndDrawImage('LineResultCanvas');

			var l = otherEventObject.length;
				for (var i = 0; i < l; i++) {
					if((otherEventObject[i].timer >= startTime)
 						&& (otherEventObject[i].timer <= endTime)
						&& (otherEventObject[i].period == period)){
						if(	otherEventObject[i].event_type == "shot" ||
							otherEventObject[i].event_type == "goal" ||
							otherEventObject[i].event_type == "miss" ||
							otherEventObject[i].event_type == "blocked" ){

								addShotsToArc(arc, otherEventObject[i].event_type, otherEventObject[i].x, otherEventObject[i].y);
								if(otherEventObject[i].event_type == "shot"){
									color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
								}
								if(otherEventObject[i].event_type == "goal"){
									color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
								}
								if(otherEventObject[i].event_type == "miss"){
									color = 'rgb(' + 255 + ',' + 255 + ',' + 0 + ')';
								}
								if(otherEventObject[i].event_type == "blocked"){
									color = 'rgb(' + 0 + ',' + 0 + ',' + 255 + ')';
								}
								CanvasService.drawCircle('LineResultCanvas',otherEventObject[i].x,otherEventObject[i].y,color)
						}
					}						
				}//for end
			console.log("ADD Event", arc);
			CanvasService.DrawShotsDiagram(arc,'LineResultCanvas');
		},

		TimerBasedPassingResultCalculation:function(startTime,endTime)
		{


		var periods = {};

		periods = calculatePeriods(startTime,endTime);

		console.log("TimerBasedPassingResult", periods);
			var arc = new passingResult;
			var passEventObject = DataService.getPassEventObject();
			var start = 0;
			var end = 0;
			var success = 0;
			var color = 0;

			CanvasService.ClearAndDrawImage('LineResultCanvas');

			var l = passEventObject.length;

				for (var i = 0; i < l; i++) {
					for (var x in periods) {
						if(passEventObject[i].period == periods[x].periodName && periods[x].isChecked){
							if((passEventObject[i].timer >= periods[x].startTime) && (passEventObject[i].timer <= periods[x].endTime)){
								if(passEventObject[i].passType == "pass_plus"){
									if(passEventObject[i].y < (canvasHeight/3)){
										start = 'off';
									} else 
									if(passEventObject[i].y > (canvasHeight - (canvasHeight/3))){
										start = 'def';
									} else {
										start = 'mid';
									}
									if(passEventObject[i].y2 < (canvasHeight/3)){
										end = 'off';
									} else 
									if(passEventObject[i].y2 > (canvasHeight - (canvasHeight/3))){
										end = 'def';
									} else {
										end = 'mid';
									}
									success = 'success';
									color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
								}
	
								if(passEventObject[i].passType == "pass_minus"){
									if(passEventObject[i].y < (canvasHeight/3)){
											start = 'off';
									} else 
									if(passEventObject[i].y > (canvasHeight - (canvasHeight/3))){
										start = 'def';
									} else {
										start = 'mid';
									}			
									if(passEventObject[i].y2 < (canvasHeight/3)){
										end = 'off';
									} else 	
									if(passEventObject[i].y2 > (canvasHeight - (canvasHeight/3))){
										end = 'def';
									} else {
										end = 'mid';	
									}
									success = 'fail';
									color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';		
								}

								addPassingToArc(arc, start, end, success);
								CanvasService.drawArrow('LineResultCanvas',passEventObject[i].x,passEventObject[i].y,passEventObject[i].x2,passEventObject[i].y2,color)
							}
						}
					}
				}
			console.log("ADD Event", arc);
			CanvasService.DrawPassingDiagram(arc,'LineResultCanvas');
		},

		TimerBasedvsResultCalculation:function(startTime,endTime)
		{


		var periods = {};

		periods = calculatePeriods(startTime,endTime);
			var arc = new vsResult;
			var otherEventObject = DataService.getOtherEventObject();
			var zone = 0;
			var color = 0;

			CanvasService.ClearAndDrawImage('LineResultCanvas');

			var l = otherEventObject.length;
				for (var i = 0; i < l; i++) {
					for (var x in periods) {
						if(otherEventObject[i].period == periods[x].periodName && periods[x].isChecked){
							if((otherEventObject[i].timer >= periods[x].startTime) && (otherEventObject[i].timer <= periods[x].endTime)){
								if(	otherEventObject[i].event_type == "1vs1_off_plus" ||
									otherEventObject[i].event_type == "1vs1_off_minus" ||
									otherEventObject[i].event_type == "1vs1_def_plus" ||
									otherEventObject[i].event_type == "1vs1_def_minus" ){

									if(otherEventObject[i].y < (canvasHeight/3)){
										zone = 'off';
									} else 
									if(otherEventObject[i].y > (canvasHeight - (canvasHeight/3))){
										zone = 'def';
									} else {
										zone = 'mid';
									}

			
									add1vs1ToArc(arc, zone, otherEventObject[i].event_type);
									if(otherEventObject[i].event_type == "1vs1_off_plus"){
										color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
									}
									if(otherEventObject[i].event_type == "1vs1_off_minus"){
										color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
									}
									if(otherEventObject[i].event_type == "1vs1_def_plus"){
										color = 'rgb(' + 255 + ',' + 255 + ',' + 0 + ')';
									}
									if(otherEventObject[i].event_type == "1vs1_def_minus"){
										color = 'rgb(' + 0 + ',' + 0 + ',' + 255 + ')';
									}
									CanvasService.drawCircle('LineResultCanvas',otherEventObject[i].x,otherEventObject[i].y,color)
								}
							}
						}
					}			
				}//for end
			console.log("ADD Event", arc);
			CanvasService.Draw1vs1Diagram(arc,'LineResultCanvas');		
		},

		TimerBasedShotsResultCalculation:function(startTime,endTime)
		{

		var periods = {};

		periods = calculatePeriods(startTime,endTime);

			var arc = new shotsResult;
			var otherEventObject = DataService.getOtherEventObject();

			var color = 0;

			CanvasService.ClearAndDrawImage('LineResultCanvas');

			var l = otherEventObject.length;
				for (var i = 0; i < l; i++) {
					for (var x in periods) {
						if(otherEventObject[i].period == periods[x].periodName && periods[x].isChecked){
							if((otherEventObject[i].timer >= periods[x].startTime) && (otherEventObject[i].timer <= periods[x].endTime)){
								if(	otherEventObject[i].event_type == "shot" ||
									otherEventObject[i].event_type == "goal" ||
									otherEventObject[i].event_type == "miss" ||
									otherEventObject[i].event_type == "blocked" ){

									addShotsToArc(arc, otherEventObject[i].event_type, otherEventObject[i].x, otherEventObject[i].y);
									if(otherEventObject[i].event_type == "shot"){
										color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
									}
									if(otherEventObject[i].event_type == "goal"){
										color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
									}
									if(otherEventObject[i].event_type == "miss"){
										color = 'rgb(' + 255 + ',' + 255 + ',' + 0 + ')';
									}
									if(otherEventObject[i].event_type == "blocked"){
										color = 'rgb(' + 0 + ',' + 0 + ',' + 255 + ')';
									}
									CanvasService.drawCircle('LineResultCanvas',otherEventObject[i].x,otherEventObject[i].y,color)
								}
							}
						}
					}						
				}//for end
			console.log("ADD Event", arc);
			CanvasService.DrawShotsDiagram(arc,'LineResultCanvas');
		},


		};

});




myApp.factory('DataService', function (CanvasService) {
	var playerObject = [
			{number: "1", name: "Teppo Tavallinen"},
			{number: "2", name: "Marko Seppo"},
			{number: "3", name: "Nolla Putki"}
			];
  
	var otherEventObject = [];
	var passEventObject = [];
	var changeLinePossessionEventObject = [];

	var line1Object = {lw:"",c:"",rw:"",ld:"",rd:""};
	var line2Object = {lw:"",c:"",rw:"",ld:"",rd:""};
	var line3Object = {lw:"",c:"",rw:"",ld:"",rd:""};
	var line4Object = {lw:"",c:"",rw:"",ld:"",rd:""};

	var resultPlayerId = 0;
	var resultLine = 0;
	
	var timerStoppedStatus = 'true';

	var possessionGroup = 'own';
	var lineGroup = 'line1';
	var startTime = 0;
	var lastPlayerId = 0;
	var PeriodGroup = 'period1'
	var shotType = 'shot';
	var passType = 'pass_plus';
	var vsType = '1vs1_off_plus';
	var whatFieldGroup = '5vs5';
	var timerCounter = 0;
	var lineUpdate = false;




	function otherEvent(){
		this.period = 0;
		this.player_id = 0;
		this.whatField = 0;
		this.event_type = 0;
		this.timer = 0;
		this.x = 0;
		this.y = 0;

	}

	function passEvent(){
		this.period = 0;
		this.player_id = 0;
		this.whatField = 0;
		this.passType = 0;
		this.timer = 0;
		this.x = 0;
		this.y = 0;
		this.x2 = 0;
		this.y2 = 0;
	}


	function LinePossessionEvent(){
		this.period = 0;
		this.line = 0;
		this.possession = 0;
		this.startTime = 0;
		this.endTime = 0;
	}



	function shiftTable(){
		this.line = 0;
		this.own = 0;
		this.opp = 0;
		this.duration = 0;
	}

	return {

		getTableLinePossession:function()
		{
			var helahoito = {
				shiftTable:[]
				};


			var timeDiff = 0;
			var arc = new shiftTable;
			var tableLine = 'line1';

			var l = changeLinePossessionEventObject.length;
			for (var i = 0; i < l; i++) {
				if(changeLinePossessionEventObject[i].line == tableLine){
					if(changeLinePossessionEventObject[i].possession == "own"){
						timeDiff = changeLinePossessionEventObject[i].endTime - changeLinePossessionEventObject[i].startTime;
						arc.own += timeDiff;
					}
					if(changeLinePossessionEventObject[i].possession == "opp"){
						timeDiff = changeLinePossessionEventObject[i].endTime - changeLinePossessionEventObject[i].startTime;
						arc.opp += timeDiff;			
					}
				}
				if(changeLinePossessionEventObject[i].line != tableLine){
					arc.duration = arc.own + arc.opp;

					arc.line = tableLine;
					console.log("ADD Event", arc);



					helahoito.shiftTable.push(arc);
					arc = new shiftTable;

					tableLine = changeLinePossessionEventObject[i].line;

					if(changeLinePossessionEventObject[i].possession == "own"){
						timeDiff = changeLinePossessionEventObject[i].endTime - changeLinePossessionEventObject[i].startTime;
						arc.own += timeDiff;
					}
					if(changeLinePossessionEventObject[i].possession == "opp"){
						timeDiff = changeLinePossessionEventObject[i].endTime - changeLinePossessionEventObject[i].startTime;
						arc.opp += timeDiff;			
					}
				}
			}


				arc.duration = arc.opp + arc.own;
				arc.line = tableLine;

				helahoito.shiftTable.push(arc);
			
			console.log("ADD Event", arc);
			//CanvasService.DrawShiftDiagram(helahoito)
			return helahoito;
		},






		changeLinePossessionEvent: function(period, line, possession, startTime, endTime){
			var arc = new LinePossessionEvent;
			if(startTime != endTime){
				arc.period = period;
				arc.line = line;
				arc.possession = possession;
				arc.startTime = startTime;
				arc.endTime = endTime;

				changeLinePossessionEventObject.push(arc);
			}
			console.log("ADD change Possession Event");
		},



		addEvent: function (period,player_id,whatField,event_type,timer,x,y) {
			var arc = new otherEvent;
			arc.period = period;
			arc.player_id = player_id;
			arc.whatField = whatField;
			arc.event_type = event_type;
			arc.timer = timer;
			arc.x = x;
			arc.y = y;

			otherEventObject.push(arc);
			console.log("ADD Event");
		},

		addPassEvent:function(period,player_id,whatField,passType,timer,x,y,x2,y2){
			var arc = new passEvent;
			arc.period = period;
			arc.player_id = player_id;
			arc.whatField = whatField;
			arc.passType = passType;
			arc.timer = timer;
			arc.x = x;
			arc.y = y;
			arc.x2 = x2;
			arc.y2 = y2;
			passEventObject.push(arc);


			console.log("ADD Pass Event");
		},

		addPlayerObject:function(player){
			var newPlayer = true;
			var l = playerObject.length;
				for (var i = 0; i < l; i++) {
					if(playerObject[i].number == player.number){
						newPlayer = false;
					}
				}
			if(newPlayer){
				playerObject.push(player);
			}
		},

		setLineUpdate: function(){
			lineUpdate=!lineUpdate;
		},

		getLineUpdate: function(value){
			return lineUpdate;
		},

		setResultLine: function(value){
			resultLine = value;
		},

		getResultLine: function(){
			return  resultLine;
		},



		setTimerStoppedStatus: function(value){
			timerStoppedStatus = value;
		},

		getTimerStoppedStatus: function(){
			return  timerStoppedStatus;
		},



		setResultPlayerId: function(value){
			resultPlayerId = value;
		},

		getResultPlayerId: function(){
			return  resultPlayerId;
		},




		getPossessionGroup: function(){
			return possessionGroup;
		},

		setPossessionGroup: function(value){
			possessionGroup = value;
		},


		getLineGroup: function(){
			return lineGroup;
		},
		setLineGroup: function(value){
			lineGroup = value;
		},

		setStartTime: function(value){
			startTime = value;
		},


		getStartTime: function(){
			return startTime;
		},

		setTimerCounter: function(value){
			timerCounter = value;
		},

		getTimerCounter: function(){
			return timerCounter;
		},


		setPeriodGroup: function(value){
			PeriodGroup = value;
		},

		getPeriodGroup: function(){
			return PeriodGroup;
		},

		getwhatfield_Group: function(){
			return whatFieldGroup;
		},

		setwhatfield_Group: function(value){
			whatFieldGroup = value;
		},

		getPassType: function(){
			return passType;
		},

		setPassType: function(value){
			passType = value;
		},

		getShotType: function(){
			return shotType;
		},

		setShotType: function(value){
			shotType = value;
		},

		get1vs1Type: function(){
			return vsType;
		},

		set1vs1Type: function(value){
			vsType = value;
		},

		getLastPlayerId: function(){
			return lastPlayerId;
		},

		setLastPlayerId: function(value){
			lastPlayerId = value;
		},
		setLineObject(line,user){
			if(line == 'line1'){
				line1Object = user;
			}
			if(line == 'line2'){
				line2Object = user;
			}
			if(line == 'line3'){
				line3Object = user;
			}
			if(line == 'line4'){
				line4Object = user;
			}
		},
		getLineObject: function(value){
			if(value == 'line1'){
				return line1Object;
			}
			if(value == 'line2'){
				return line2Object;
			}
			if(value == 'line3'){
				return line3Object;
			}
			if(value == 'line4'){
				return line4Object;
			}
		},
		getPlayerObject: function () {
			return playerObject;
		},

		getOtherEventObject: function () {
			return otherEventObject;
		},

		getPassEventObject: function () {
			return passEventObject;
		},

		getChangeLinePossessionEventObject: function () {
			return changeLinePossessionEventObject;
		}
	};
});
  
myApp.controller('TabsCtrl', function($scope,DataService) {

	$scope.tab = 1;

	$scope.isSet = function(checkTab) {
		return $scope.tab === checkTab;
	};

	$scope.setTab = function(activeTab) {
		$scope.tab = activeTab;
	};

	$scope.saveToLocal = function(){

		var game_playerObject = DataService.getPlayerObject();
		var game_line1Object = DataService.getLineObject('line1');
		console.log("", game_line1Object);
		var game_line2Object = DataService.getLineObject('line2');
		var game_line3Object = DataService.getLineObject('line3');
		var game_line4Object = DataService.getLineObject('line4');
		var game_otherEventObject = DataService.getOtherEventObject();
		var game_passEventObject = DataService.getPassEventObject();
		var game_changeLinePossessionEventObject = DataService.getChangeLinePossessionEventObject();

		localStorage["game_playerObject"] = JSON.stringify(game_playerObject);
		localStorage["game_line1Object"] = JSON.stringify(game_line1Object);
		localStorage["game_line2Object"] = JSON.stringify(game_line2Object);
		localStorage["game_line3Object"] = JSON.stringify(game_line3Object);
		localStorage["game_line4Object"] = JSON.stringify(game_line4Object);
	        localStorage["game_otherEventObject"] = JSON.stringify(game_otherEventObject);
	        localStorage["game_passEventObject"] = JSON.stringify(game_passEventObject);
	        localStorage["game_changeLinePossessionEventObject"] = JSON.stringify(game_changeLinePossessionEventObject);

	
	
	};

	$scope.loadFromLocal = function(){
	if (localStorage["game_playerObject"]){ 
		var stored_datas = JSON.parse(localStorage["game_playerObject"]);

		var l = stored_datas.length;
			for (var i = 0; i < l; i++) {
		 		var player = {};

				var number = stored_datas[i].number; 
				var name = stored_datas[i].name;
				player = {number, name}; 
				DataService.addPlayerObject(player);					
			}

	}
	if (localStorage["game_line1Object"]){ 
		var stored_datas = JSON.parse(localStorage["game_line1Object"]);
		console.log("", stored_datas);
		DataService.setLineObject('line1',stored_datas);		
	}
	if (localStorage["game_line2Object"]){ 
		var stored_datas = JSON.parse(localStorage["game_line2Object"]);
		DataService.setLineObject('line2',stored_datas);		
	}
	if (localStorage["game_line3Object"]){ 
		var stored_datas = JSON.parse(localStorage["game_line3Object"]);
		DataService.setLineObject('line3',stored_datas);		
	}
	if (localStorage["game_line4Object"]){ 
		var stored_datas = JSON.parse(localStorage["game_line4Object"]);
		DataService.setLineObject('line4',stored_datas);		
	}
	DataService.setLineUpdate();
	if (localStorage["game_otherEventObject"]){ 
		var stored_datas = JSON.parse(localStorage["game_otherEventObject"]);

		var l = stored_datas.length;
			for (var i = 0; i < l; i++) {
				var period = stored_datas[i].period; 
				var player_id = stored_datas[i].player_id;
				var whatField = stored_datas[i].whatField; 
				var event_type = stored_datas[i].event_type; 
				var timer = stored_datas[i].timer; 
				var x = stored_datas[i].x; 
				var y = stored_datas[i].y; 
	
				DataService.addEvent(period,player_id,whatField,event_type,timer,x,y);  					
			}

	}

	if (localStorage["game_passEventObject"]){ 
		var stored_datas = JSON.parse(localStorage["game_passEventObject"]);

		var l = stored_datas.length;
			for (var i = 0; i < l; i++) {
				var period = stored_datas[i].period; 
				var player_id = stored_datas[i].player_id;
				var whatField = stored_datas[i].whatField; 
				var passType = stored_datas[i].passType; 
				var timer = stored_datas[i].timer; 
				var x = stored_datas[i].x; 
				var y = stored_datas[i].y; 
				var x2 = stored_datas[i].x2; 
				var y2 = stored_datas[i].y2; 	
				DataService.addPassEvent(period,player_id,whatField,passType,timer,x,y,x2,y2);
					
			}

	}

	if (localStorage["game_changeLinePossessionEventObject"]){ 
		var stored_datas = JSON.parse(localStorage["game_changeLinePossessionEventObject"]);

		var l = stored_datas.length;
			for (var i = 0; i < l; i++) {
				var period = stored_datas[i].period; 
				var line = stored_datas[i].line;
				var possession = stored_datas[i].possession; 
				var startTime = stored_datas[i].startTime; 
				var endTime = stored_datas[i].endTime; 
	
				DataService.changeLinePossessionEvent(period, line, possession, startTime, endTime);
					
			}

	}
	console.log("load");
	};

	$scope.removeFromLocal = function(){
		localStorage.removeItem("game_playerObject");
		localStorage.removeItem("game_line1Object"); 
		localStorage.removeItem("game_line2Object"); 
		localStorage.removeItem("game_line3Object"); 
		localStorage.removeItem("game_line4Object"); 
		localStorage.removeItem("game_otherEventObject");
		localStorage.removeItem("game_passEventObject");
		localStorage.removeItem("game_changeLinePossessionEventObject");
		console.log("remove");	
	};

});

myApp.controller('PlayerCtrl', function($scope,DataService) {

	$scope.players = DataService.getPlayerObject();


	$scope.addPlayer = function(player) {
		DataService.addPlayerObject(player);
		$scope.player = {};
	}

	$scope.removePlayer = function(index){
		$scope.players.splice(index,1);
	}
});


myApp.controller('WhatGroupCtrl', function($scope,DataService) {

	$scope.tab = 1;
	$scope.whatfield_Group = '5vs5';
	$scope.whatGroup = 'pass_plus';


	$scope.Canvas_isSet = function(checkTab) {
		return $scope.tab === checkTab;
	};

	$scope.Canvas_setTab = function(activeTab) {
		console.log("ADD");
		if(activeTab == 1){
  		console.log("ADD123", $scope.whatGroup);
			DataService.setPassType($scope.whatGroup);
		}
		if(activeTab == 2){
  		console.log("ADD123", $scope.whatGroup);
			DataService.set1vs1Type($scope.whatGroup);
		}
		if(activeTab == 3){
  		console.log("ADD123", $scope.whatGroup);
			DataService.setShotType($scope.whatGroup);
		}
		$scope.tab = activeTab;
	};

	$scope.set_whatfield_Group = function(value){
		console.log("ADD123", value);

		DataService.setwhatfield_Group(value);
	};
});

myApp.controller('dumpCtrl', function($scope,DataService) {


	$scope.possession = DataService.getChangeLinePossessionEventObject();
	$scope.events = DataService.getOtherEventObject();	
	$scope.pass = DataService.getPassEventObject();


});


myApp.controller('playerResultCtrl', function($scope,DataService,CalculationService) {

	$scope.strengths = [
				{ strengthName : "5vs5" , isChecked : true },
				{ strengthName : "PP" , isChecked : false },
				{ strengthName : "SH" , isChecked : false },
				{ strengthName : "WG" , isChecked : false },
				{ strengthName : "EN" , isChecked : false }
			]

	$scope.periods = [
				{ periodName : "period1" , isChecked : true },
				{ periodName : "period2" , isChecked : false },
				{ periodName : "period3" , isChecked : false },
				{ periodName : "period4" , isChecked : false }
			]

	$scope.presult_whatfield_Group = 'pass';


	$scope.updatePlayerResultCanvas = function(){
		if($scope.presult_whatfield_Group == 'pass'){
			CalculationService.PassingResultCalculation($scope.periods, $scope.strengths);
		}
		if($scope.presult_whatfield_Group == '1vs1'){
			CalculationService.vsResultCalculation($scope.periods, $scope.strengths);
		}
		if($scope.presult_whatfield_Group == 'shots'){
			CalculationService.ShotsResultCalculation($scope.periods, $scope.strengths);
		}
	};


	$scope.$watch( function () { return DataService.getResultPlayerId(); }, function () {
		if($scope.presult_whatfield_Group == 'pass'){
			CalculationService.PassingResultCalculation($scope.periods, $scope.strengths);
		}
		if($scope.presult_whatfield_Group == '1vs1'){
			CalculationService.vsResultCalculation($scope.periods, $scope.strengths);
		}
		if($scope.presult_whatfield_Group == 'shots'){
			CalculationService.ShotsResultCalculation($scope.periods, $scope.strengths);
		}
	}, true);



});





myApp.controller('lineResultCtrl', function($scope,DataService,CalculationService) {


	$scope.periods = [
				{ periodName : "period1" , isChecked : true },
				{ periodName : "period2" , isChecked : false },
				{ periodName : "period3" , isChecked : false },
				{ periodName : "period4" , isChecked : false }
			]

	$scope.shifts = []

	$scope.lresult_whatfield_Group = 'pass';
	$scope.result_line_group = 'line1';
	$scope.viewSelect = 'line';


	$scope.form = {};

	$scope.time = {start: '00:00', end: '00:50'};

	$scope.submitForm = function(){
		$scope.viewSelect = 'time';
		var startTimeArray = $scope.time.start.split(/:/);
		var endTimeArray = $scope.time.end.split(/:/);
		var time = parseInt(startTimeArray[0])*60 + parseInt(startTimeArray[1]);
		var time2 = parseInt(endTimeArray[0])*60 + parseInt(endTimeArray[1]);
		if(time < time2){
			console.log("end bigger");
			if($scope.lresult_whatfield_Group == 'pass'){
				CalculationService.TimerBasedPassingResultCalculation(startTimeArray,endTimeArray);
			}
			if($scope.lresult_whatfield_Group == '1vs1'){
				CalculationService.TimerBasedvsResultCalculation(startTimeArray,endTimeArray);
			}
			if($scope.lresult_whatfield_Group == 'shots'){
				CalculationService.TimerBasedShotsResultCalculation(startTimeArray,endTimeArray);
			}
						
		}
	}

	$scope.updateLineResultCanvas = function(){
		if($scope.viewSelect == 'line'){
			if($scope.lresult_whatfield_Group == 'pass'){
				CalculationService.LinePassingResultCalculation($scope.periods,$scope.result_line_group);
			}
			if($scope.lresult_whatfield_Group == '1vs1'){
				CalculationService.LinevsResultCalculation($scope.periods,$scope.result_line_group);
			}
			if($scope.lresult_whatfield_Group == 'shots'){
				CalculationService.LineShotsResultCalculation($scope.periods,$scope.result_line_group);
			}
		}
		if($scope.viewSelect == 'selector'){
			if($scope.shiftValue){
				if($scope.lresult_whatfield_Group == 'pass'){
					CalculationService.TimerPassingResultCalculation($scope.shifts.shiftTable[$scope.shiftValue].period,
											$scope.shifts.shiftTable[$scope.shiftValue].startTime,
											$scope.shifts.shiftTable[$scope.shiftValue].endTime);
				}
				if($scope.lresult_whatfield_Group == '1vs1'){
					CalculationService.TimervsResultCalculation($scope.shifts.shiftTable[$scope.shiftValue].period,
											$scope.shifts.shiftTable[$scope.shiftValue].startTime,
											$scope.shifts.shiftTable[$scope.shiftValue].endTime);
				}
				if($scope.lresult_whatfield_Group == 'shots'){
					CalculationService.TimerShotsResultCalculation($scope.shifts.shiftTable[$scope.shiftValue].period,
											$scope.shifts.shiftTable[$scope.shiftValue].startTime,
											$scope.shifts.shiftTable[$scope.shiftValue].endTime);
				}
			}
		}
		if($scope.viewSelect == 'time'){
			if($scope.time.start && $scope.time.end){
				var startTimeArray = $scope.time.start.split(/:/);
				var endTimeArray = $scope.time.end.split(/:/);
				var time = parseInt(startTimeArray[0])*60 + parseInt(startTimeArray[1]);
				var time2 = parseInt(endTimeArray[0])*60 + parseInt(endTimeArray[1]);
				if(time < time2){
					console.log("end bigger");
					if($scope.lresult_whatfield_Group == 'pass'){
						CalculationService.TimerBasedPassingResultCalculation(startTimeArray,endTimeArray);
					}
					if($scope.lresult_whatfield_Group == '1vs1'){
						CalculationService.TimerBasedvsResultCalculation(startTimeArray,endTimeArray);
					}
					if($scope.lresult_whatfield_Group == 'shots'){
						CalculationService.TimerBasedShotsResultCalculation(startTimeArray,endTimeArray);
					}
				}				
			}
		}
		if($scope.lresult_whatfield_Group == 'shifts'){
			$scope.viewSelect = 'line';
			CalculationService.getLinePossession($scope.periods,$scope.result_line_group);
		}
	};

	$scope.ChangeResultLine = function(value){
		DataService.setResultLine(value);
		$scope.viewSelect = 'line';

		if($scope.lresult_whatfield_Group == 'pass'){
			CalculationService.LinePassingResultCalculation($scope.periods,$scope.result_line_group);
		}
		if($scope.lresult_whatfield_Group == '1vs1'){
			CalculationService.LinevsResultCalculation($scope.periods,$scope.result_line_group);
		}
		if($scope.lresult_whatfield_Group == 'shots'){
			CalculationService.LineShotsResultCalculation($scope.periods,$scope.result_line_group);
		}
		if($scope.lresult_whatfield_Group == 'shifts'){
			CalculationService.getLinePossession($scope.periods,$scope.result_line_group);
		}
	};

	$scope.updateShifts = function(){
		$scope.shifts = CalculationService.calculateAllShift();
	}

	$scope.selectorChange = function(){
		console.log("PeriodGroup", $scope.shifts, $scope.shiftValue);
		$scope.viewSelect = 'selector';
		if($scope.shiftValue){
			if($scope.lresult_whatfield_Group == 'pass'){
				CalculationService.TimerPassingResultCalculation($scope.shifts.shiftTable[$scope.shiftValue].period,
										$scope.shifts.shiftTable[$scope.shiftValue].startTime,
										$scope.shifts.shiftTable[$scope.shiftValue].endTime);
			}
			if($scope.lresult_whatfield_Group == '1vs1'){
				CalculationService.TimervsResultCalculation($scope.shifts.shiftTable[$scope.shiftValue].period,
										$scope.shifts.shiftTable[$scope.shiftValue].startTime,
										$scope.shifts.shiftTable[$scope.shiftValue].endTime);
			}
			if($scope.lresult_whatfield_Group == 'shots'){
				CalculationService.TimerShotsResultCalculation($scope.shifts.shiftTable[$scope.shiftValue].period,
										$scope.shifts.shiftTable[$scope.shiftValue].startTime,
										$scope.shifts.shiftTable[$scope.shiftValue].endTime);
			}
		}
	};

});





myApp.controller('TimerCtrl', function($scope,$timeout,DataService) {
	$scope.counter = DataService.getTimerCounter();
	$scope.stopped = true;
	$scope.buttonText='Start';

	var mytimeout;// = $timeout($scope.onTimeout,1000);


	$scope.onTimeout = function(){
		$scope.counter++;
		DataService.setTimerCounter($scope.counter)
		mytimeout = $timeout($scope.onTimeout,1000);
	}
   
	$scope.takeAction = function(){
		if(!$scope.stopped){
			$timeout.cancel(mytimeout);
			$scope.buttonText='Resume';

			var period = DataService.getPeriodGroup();
			var line = DataService.getLineGroup();
			var possession = DataService.getPossessionGroup();
			var startTime = DataService.getStartTime();
			var endTime = DataService.getTimerCounter();

			DataService.changeLinePossessionEvent(period, line, possession, startTime, endTime);
			DataService.setStartTime(endTime);
		}
		else
		{
			mytimeout = $timeout($scope.onTimeout,1000);
			$scope.buttonText='Stop';

		}

		$scope.stopped=!$scope.stopped;
		DataService.setTimerStoppedStatus($scope.stopped);
	}

  	$scope.$watch( function () { return DataService.getPeriodGroup(); }, function () {
		$scope.counter = DataService.getTimerCounter();
 	 }, true);
   
});



myApp.controller('PeriodCtrl', function($scope,DataService) {

	$scope.period_group = 'period1';

	$scope.setPeriodGroup = function(value){
		console.log("PeriodGroup", value);

		var timerStoppedStatus = DataService.getTimerStoppedStatus();
		console.log("PeriodGroup", timerStoppedStatus);
		if(timerStoppedStatus){
			var period = DataService.getPeriodGroup();
			var line = DataService.getLineGroup();
			var possession = DataService.getPossessionGroup();
			var startTime = DataService.getStartTime();
			var endTime = DataService.getTimerCounter();

			DataService.changeLinePossessionEvent(period, line, possession, startTime, endTime);

			DataService.setStartTime(0);
			DataService.setTimerCounter(0);
			DataService.setPeriodGroup(value);
		}else{
			$scope.period_group = DataService.getPeriodGroup();
		}
		console.log("PeriodGroup", $scope.period_group);
	};
});



myApp.controller('LineCtrl', function($scope,DataService) {

	$scope.line_group = 'line1';




	$scope.ChangeLine = function(value){
		console.log("LineGroup", value);

		var period = DataService.getPeriodGroup();
		var line = DataService.getLineGroup();
		var possession = DataService.getPossessionGroup();
		var startTime = DataService.getStartTime();
		var endTime = DataService.getTimerCounter();

		DataService.changeLinePossessionEvent(period, line, possession, startTime, endTime);
		DataService.setLineGroup(value);
		DataService.setStartTime(endTime);
	};
});



myApp.controller('PossessionCtrl', function($scope,DataService) {

	$scope.possession_group = 'own';




	$scope.ChangePossession = function(value){
		console.log("LineGroup", value);

		var period = DataService.getPeriodGroup();
		var line = DataService.getLineGroup();
		var possession = DataService.getPossessionGroup();
		var startTime = DataService.getStartTime();
		var endTime = DataService.getTimerCounter();

		DataService.changeLinePossessionEvent(period, line, possession, startTime, endTime);
		DataService.setPossessionGroup(value);
		DataService.setStartTime(endTime);
	};
});







myApp.filter('formatTimer', function() {
  return function(input)
    {
        function z(n) {return (n<10? '0' : '') + n;}
        var seconds = input % 60;
        var minutes = Math.floor(input / 60);
        return (z(minutes)+':'+z(seconds));
    };
});









myApp.controller('CanvasCtrl1',function($scope,DataService,CanvasService) {
 

	var canvas = document.getElementById('myCanvas1');
	var context = canvas.getContext('2d');
	var imageObj = new Image();
	var color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
	var mousePos = {};

	imageObj.src = 'kentta.gif';

	function ui(){
		context.drawImage(imageObj, 0, 0);
	}

	imageObj.onload = function() {
		ui();
	};

	function getMousePos(canvas, evt) {
       		var rect = canvas.getBoundingClientRect();
       		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
        		};
	}


	canvas.addEventListener('mousedown', function(evt) {
		mousePos = getMousePos(canvas, evt);
	}, false);

	canvas.addEventListener('mouseup', function(evt) {
		var mousePos2 = getMousePos(canvas, evt);


		var period = DataService.getPeriodGroup();
		var timer = DataService.getTimerCounter();
	
		var passType = DataService.getPassType(); // Haetaa veto
		var lastPlayerId = DataService.getLastPlayerId(); //Pelaaja nro			
		var whatField = DataService.getwhatfield_Group(); //5vs5,PP, SH



		if(passType == "pass_plus"){
			color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
		}
		if(passType == "pass_minus"){
			color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
		}
		//diff x,x2 and y,y2 bigger than 10 

		DataService.addPassEvent(period,lastPlayerId,whatField,passType,timer,mousePos.x,mousePos.y,mousePos2.x,mousePos2.y);//Lisää uusi event
		CanvasService.drawArrow('myCanvas1',mousePos.x, mousePos.y, mousePos2.x, mousePos2.y,color);
								
	}, false);
});



myApp.controller('CanvasCtrl2',function($scope,DataService,CanvasService) {
 

	var canvas = document.getElementById('myCanvas2');
	var context = canvas.getContext('2d');
	var imageObj = new Image();
	var color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';

	imageObj.src = 'kentta.gif';

	function ui(){
		context.drawImage(imageObj, 0, 0);
	}

	imageObj.onload = function() {
		ui();
	};

	function getMousePos(canvas, evt) {
        	var rect = canvas.getBoundingClientRect();
        	return {
          		x: evt.clientX - rect.left,
          		y: evt.clientY - rect.top
        		};
	}


	canvas.addEventListener('mousedown', function(evt) {
		var mousePos = getMousePos(canvas, evt);
  		console.log("hi");
		//DataService.addCircle(mousePos.x,mousePos.y,color);//Lisää uusi ympyrä

		var period = DataService.getPeriodGroup();
		var timer = DataService.getTimerCounter();
	
		var vsType = DataService.get1vs1Type(); // Haetaa veto
		var lastPlayerId = DataService.getLastPlayerId(); //Pelaaja nro			
		var whatField = DataService.getwhatfield_Group(); //5vs5,PP, SH

		if(vsType == "1vs1_off_plus"){
			color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
		}
		if(vsType == "1vs1_off_minus"){
			color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
		}
		if(vsType == "1vs1_def_plus"){
			color = 'rgb(' + 255 + ',' + 255 + ',' + 0 + ')';
		}
		if(vsType == "1vs1_def_minus"){
			color = 'rgb(' + 0 + ',' + 0 + ',' + 255 + ')';
		}
		DataService.addEvent(period,lastPlayerId,whatField,vsType,timer,mousePos.x,mousePos.y);//Lisää uusi event
		CanvasService.drawCircle('myCanvas2',mousePos.x,mousePos.y,color);
	}, false);
});



myApp.controller('CanvasCtrl3',function($scope,DataService,CanvasService) {
 
	var canvas = document.getElementById('myCanvas3');
	var context = canvas.getContext('2d');
	var imageObj = new Image();
	var color = 'rgb(' + 0 + ',' + 0 + ',' + 255 + ')';

	imageObj.src = 'kentta.gif';

	function ui(){
		context.drawImage(imageObj, 0, 0);
	}

	imageObj.onload = function() {
		ui();
	};

	function getMousePos(canvas, evt) {
       		var rect = canvas.getBoundingClientRect();
       		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
        		};
	}



	canvas.addEventListener('mousedown', function(evt ) {
		var mousePos = getMousePos(canvas, evt);
  		

		var period = DataService.getPeriodGroup();
		var timer = DataService.getTimerCounter();
	
		var shotType = DataService.getShotType(); // Haetaa veto
		var lastPlayerId = DataService.getLastPlayerId(); //Pelaaja nro			
		var whatField = DataService.getwhatfield_Group(); //5vs5,PP, SH

  		console.log("shotType", shotType, lastPlayerId);

		if(shotType == "shot"){
			color = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')';
		}
		if(shotType == "goal"){
			color = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
		}
		if(shotType == "miss"){
			color = 'rgb(' + 255 + ',' + 255 + ',' + 0 + ')';
		}
		if(shotType == "blocked"){
			color = 'rgb(' + 0 + ',' + 0 + ',' + 255 + ')';
		}
		DataService.addEvent(period,lastPlayerId,whatField,shotType,timer,mousePos.x,mousePos.y);//Lisää uusi event
		CanvasService.drawCircle('myCanvas3',mousePos.x,mousePos.y,color);
	}, false);
});









myApp.directive("pihvi", function() {
	return {
		restrict: 'E',
		template: '<div><table><tr><td><table><tr><td><select ng-model="user.lw" ng-change="selectorChange()" ng-options="player.number as player.name for player in players"></select></td><td><select ng-model="user.c" ng-change="selectorChange()" ng-options="player.number as player.name for player in players"></select></td><td> <select ng-model="user.rw" ng-change="selectorChange()" ng-options="player.number as player.name for player in players"></select></td ></tr></table></td></tr><tr><td><table><tr><td width="20%"></td><td><select ng-model="user.ld" ng-change="selectorChange()" ng-options="player.number as player.name for player in players"</option></select></td><td width="20%"></td><td><select ng-model="user.rd" ng-change="selectorChange()" ng-options="player.number as player.name for player in players"></select></td><td width="20%"></td></tr></table></td</tr></table></div>',

		scope:{
			players:"@",
			user:"="
		},

		controller: function($scope,$attrs,DataService) {
			$scope.players = DataService.getPlayerObject();
      
    			$attrs.$observe('user', function(value) {
				$scope.line = value;
        			$scope.user = DataService.getLineObject(value);
    			});

			$scope.selectorChange = function(){
  				console.log("Player Nro:", $scope.user );
				DataService.setLineObject($scope.line,$scope.user);
			}

  			$scope.$watch( function () { return DataService.getLineUpdate(); }, function () {
				$scope.user = DataService.getLineObject($scope.line);
 	 		}, true);

		},
	};
});



myApp.directive("pahkura", function() {
	return {
		restrict: 'E',
		template: '<div><table><tr><td><table><tr><td><input id={{user.lw}} type="radio" name="group1" ng-model="player.id" value={{user.lw}} ng-click="checkStuff()"><label for={{user.lw}}>{{user.lw}}</label></td><td></td><td><input id={{user.c}} type="radio" name="group1" ng-model="player.id" value={{user.c}} ng-click="checkStuff()"><label for={{user.c}}>{{user.c}}</label></td><td></td><td><input id={{user.rw}} type="radio" name="group1" ng-model="player.id" value={{user.rw}} ng-click="checkStuff()"><label for={{user.rw}}>{{user.rw}}</label></td></tr></table></td></tr><tr><td><table><tr><td width="20%"></td><td><input id={{user.ld}} type="radio" name="group1" ng-model="player.id" value={{user.ld}} ng-click="checkStuff()"><label for={{user.ld}}>{{user.ld}}</label></td><td width="20%"></td><td><input id={{user.rd}} type="radio" name="group1" ng-model="player.id" value={{user.rd}} ng-click="checkStuff()"><label for={{user.rd}}>{{user.rd}}</label></td><td width="20%"></td></tr></table></td></tr></table></div>',

		scope:{
			user:"="
		},

		controller: function($scope,DataService) {

    			$scope.checkStuff = function () {
  				console.log("Player Nro:", $scope.player.id );
				DataService.setLastPlayerId($scope.player.id);
        			
    			};
		},
	};
});


myApp.directive("resultpahkura", function() {
	return {
		restrict: 'E',
		template: '<div><table><tr><td><table><tr><td><input id=result+{{user.lw}} type="radio" name="result_group1" ng-model="result_player.id" value={{user.lw}} ng-click="result_checkStuff()"><label for=result+{{user.lw}}>{{user.lw}}</label></td><td></td><td><input id=result+{{user.c}} type="radio" name="result_group1" ng-model="result_player.id" value={{user.c}} ng-click="result_checkStuff()"><label for=result+{{user.c}}>{{user.c}}</label></td><td></td><td><input id=result+{{user.rw}} type="radio" name="result_group1" ng-model="result_player.id" value={{user.rw}} ng-click="result_checkStuff()"><label for=result+{{user.rw}}>{{user.rw}}</label></td></tr></table></td></tr><tr><td><table><tr><td width="20%"></td><td><input id=result+{{user.ld}} type="radio" name="result_group1" ng-model="result_player.id" value={{user.ld}} ng-click="result_checkStuff()"><label for=result+{{user.ld}}>{{user.ld}}</label></td><td width="20%"></td><td><input id=result+{{user.rd}} type="radio" name="result_group1" ng-model="result_player.id" value={{user.rd}} ng-click="result_checkStuff()"><label for=result+{{user.rd}}>{{user.rd}}</label></td><td width="20%"></td></tr></table></td></tr></table></div>',

		scope:{
			user:"="
		},

		controller: function($scope,DataService) {

    			$scope.result_checkStuff = function () {
  				console.log("Player Nro:", $scope.result_player.id );
				DataService.setResultPlayerId($scope.result_player.id);
        			
    			};
		},
	};
});










