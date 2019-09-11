///////////////////
//COUNTY TOOLTIPS//
///////////////////
var tipIN = d3.tip().attr('class','d3-tip').html(function(d) {
  return "<strong>County Name: </strong> <span class = 'details'> " 
    +d.properties.NAME+ "<br></span>"
    +"<strong>Data: </strong> <span class = 'details'> "
    +d.total
    ;});
//////////////////////
//COUNTY TOOLTIP END//
//////////////////////

//////////////////
//STATE TOOLTIPS//
//////////////////
var tipUS = d3.tip().attr('class','d3-tip').html(function(d) {
  return "<strong>Sex Ed: </strong> <span class = 'details'> "
    +dataSexEdTT.get(d)+ "<br></span>"
	  +"<strong>Click to View County Map</strong> <span class = 'details'>"
    ;});

var tipAbs = d3.tip().attr('class','d3-tip').html(function(d) {
  return "<strong>Abstinence: </strong> <span class = 'details'> "
    +dataAbsTT.get(d)+ "<br></span>"
	  +"<strong>Click to View County Map</strong> <span class = 'details'>"
    ;});
var tipBirthRate = d3.tip().attr('class','d3-tip').html(function(d) {
  return "<strong>Birth Rate: </strong> <span class = 'details'> "
    +d.total + "<br></span>"
    +"<strong>Click to View County Map</strong> <span class = 'details'>"
    ;});
/////////////////////
//STATE TOOLTIP END//
/////////////////////

var svg_us = d3.select("#usa_map")
      .append("svg")
      .attr("width", 950)
      .attr("height", 800);

var svg_state = d3.select("#state_map")
      .append("svg")
      .attr("width", 400)
      .attr("height", 800);

var dataUS = d3.map();
var dataAbs = d3.map();
var dataBirthRates = d3.map();
var dataIN = d3.map();
var dataNY = d3.map();
var dataMD = d3.map();
var dataAL = d3.map();
var dataAR = d3.map();
var dataCA = d3.map();
var dataTX = d3.map();
var dataNJ = d3.map();
var dataAK = d3.map();
var dataIL = d3.map();
var dataWI = d3.map();
var dataFL = d3.map();
var dataWA = d3.map();
var dataME = d3.map();
var dataAZ = d3.map();
var dataMI = d3.map();
var dataMS = d3.map();
var dataSC = d3.map();
var dataNC = d3.map();
var dataND = d3.map();
var dataSD = d3.map();
var dataCO = d3.map();
var dataOK = d3.map();
var dataGA = d3.map();
var dataOR = d3.map();
var dataNV = d3.map();
var dataLA = d3.map();
var dataOH = d3.map();
var dataVA = d3.map();
var dataWV = d3.map();
var dataKY = d3.map();
var dataPA = d3.map();
var dataTN = d3.map();
var dataRI = d3.map();
var dataDE = d3.map();
var dataNH = d3.map();
var dataVT = d3.map();
var dataMA = d3.map();
var dataCT = d3.map();
var dataID = d3.map();
var dataUT = d3.map();
var dataWY = d3.map();
var dataMT = d3.map();
var dataNM = d3.map();
var dataMO = d3.map();
var dataIA = d3.map();
var dataMN = d3.map();
var dataNE = d3.map();
var dataKS = d3.map();
var dataHI = d3.map();
var dataSexEdTT = d3.map(); //formerly data7
var dataAbsTT = d3.map();
var path = d3.geoPath();

dataSexEdTT.set("10","No Data")
dataSexEdTT.set("20","Not Mandated")
dataSexEdTT.set("30","Mandated")

dataAbsTT.set("10", "No Data")
dataAbsTT.set("20", "Stressed")
dataAbsTT.set("30", "Not Included")
dataAbsTT.set("40", "Covered")


console.log(dataSexEdTT.get("10"))

console.log(dataSexEdTT)

//////////////////////////
//DEFINING COLOR SCHEMES//
//////////////////////////
var colorScheme = d3.schemeBlues[9];
colorScheme.unshift("#eee")
var colorScaleUS = d3.scaleThreshold()
    .domain([11, 21, 31])
    .range(["lightgray", "lightblue", "royalblue"]);
var colorScaleAbs = d3.scaleThreshold()
    .domain([11, 21, 31, 41])
    .range(["lightgray", "tomato", "lightblue", "royalblue"]);
var colorScaleIN = d3.scaleThreshold()
    .domain([0, 8, 16, 24, 32, 40, 48, 56, 64])
    .range(colorScheme);
function sexEd(){  
d3.queue()
  .defer(d3.json, "https:d3js.org/us-10m.v1.json")
  .defer(d3.csv, "csv/SexEducation.csv",function(d) {
    dataUS.set(d.id, + d.SexEducationMandated)
    dataAbs.set(d.id, + d.Abstinence)
  })
  .await(ready);

////////////////////////
//READY FUNCTION START//
////////////////////////
function ready(error, us) {
  if (error) throw error;
  
  console.log(dataSexEdTT)
    var originalColor;

  svg_us.call(tipUS);
  
  console.log(dataUS)
  console.log(dataAbs)

  svg_us.append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)

        .attr("fill", function (d){	
          d.total = dataUS.get(d.id) || 0
          return colorScaleUS(d.total);})
          
        .on("mouseover", function(d){
          d3.select(this)
            .style("fill","blue");
          //console.log(dataSexEdTT.get(d.id))
          tipUS.show(d.total);})
            
        .on("mouseout", function(d){
          d3.select(this)
            .style("fill", originalColor);
          tipUS.hide(d.total);})

        .on("click", function (d){ 
	  	  console.log(d.id);
          d3.selectAll(".states").remove()
          
          if(d.id == 01){
             alabamaMap();
          }
	  	  else if(d.id == 02){
			  alaskaMap();
		  }
	  	  else if(d.id == 04){
             arizonaMap();
          }
          else if(d.id == 05){
             arkansasMap();
          }
	  	  else if(d.id == 06){
             californiaMap();
          }
	  	  else if(d.id == 08){
			 coloradoMap();
		  }
	  	  else if(d.id == 09){
			  connecticutMap();
		  }
	  	  else if(d.id == 10){
			  delawareMap();
		  }
	  	  else if(d.id == 12){
              floridaMap();
          }
	      else if(d.id == 13){
			  georgiaMap();
		  }
	   	  else if(d.id == 15){
			  hawaiiMap();
		  }
	  	  else if(d.id == 16){
			  idahoMap();
		  }
	  	  else if(d.id == 17){
			  illinoisMap();
		  }
	  	  else if(d.id == 18){
              indianaMap();
          }
	  	  else if(d.id == 19){
			  iowaMap();
		  }
	  	  else if(d.id == 20){
			  kansasMap();
		  }
	      else if(d.id == 21){
			  kentuckyMap();
		  }
	  	  else if(d.id == 22){
			  louisianaMap();
		  }
	  	  else if(d.id == 23){
			  maineMap();
		  }
          else if(d.id == 24){
              marylandMap();
			  
          }
	  	  else if(d.id == 25){
			  massachusettsMap();
		  }
	  	  else if(d.id == 26){
			 michiganMap();
		  }
	  	  else if(d.id == 27){
			 minnesotaMap();
		  }
	  	  else if(d.id == 28){
			  mississippiMap();
		  }
	  	  else if(d.id == 29){
			  missouriMap();
		  }
	  	  else if(d.id == 30){
			  montanaMap();
		  }
	  	  else if(d.id == 31){
			  nebraskaMap();
		  }
	  	  else if(d.id == 32){
			  nevadaMap();
		  }
	  	  else if(d.id == 33){
			  newhampshireMap();
		  }
	  	  else if(d.id == 34){
			  newjerseyMap();
		  }
	  	  else if(d.id == 35){
			  newmexicoMap();
		  }
	  	  else if(d.id == 36){
              newyorkMap();
          }
	  	  else if(d.id == 37){
			  northcarolinaMap();
		  }
	  	  else if(d.id == 38){
			  northdakotaMap();
		  }
	  	  else if(d.id == 39){
			  ohioMap();
		  }
	  	  else if(d.id == 40){
			  oklahomaMap();
		  }
	  	  else if(d.id == 41){
			  oregonMap();
		  }
	  	  else if(d.id == 42){
			  pennsylvaniaMap();
		  }
	  	  else if(d.id == 44){
			  rhodeislandMap();
		  }
	      else if(d.id == 45){
			  southcarolinaMap();
		  }
	  	  else if(d.id == 46){
			  southdakotaMap();
		  }
	      else if(d.id == 47){
			  tennesseeMap();
		  }
          else if(d.id == 48){
              texasMap();
          }
	  	  else if(d.id == 49){
			  utahMap();
		  }
	  	  else if(d.id == 50){
			  vermontMap();
		  }
	  	  else if(d.id == 51){
			  virginiaMap();
		  }
	  	  else if(d.id == 53){
			  washingtonMap();
		  }
	      else if(d.id == 54){
			  westvirginiaMap();
		  }
	  	  else if(d.id == 55){
			  wisconsinMap();
		  }
	  	  else if(d.id == 56){
			  wyomingMap();
		  }

        })
       
  
    svg_us.append("path")
        .attr("class", "county-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
};
//////////////////////
//READY FUNCTION END//
//////////////////////

var originalColor;

//////////////////
//BUTTON 1 BEGIN//
//////////////////

/*document.getElementById("button1").onclick = function() {
  function ready(error, us) {
    if (error) throw error;
  
    svg_us.call(tipUS);
  
    svg_us.append("g")
          .attr("class", "counties")
          .selectAll("path")
          .data(topojson.feature(us, us.objects.states).features)
          .enter().append("path")
          .attr("d", path)
  
          .attr("fill", function (d){	
            d.total = dataUS.get(d.id) || 0
            return colorScaleUS(d.total);})
            
          .on("mouseover", function(d){
            d3.select(this)
              .style("fill","blue");
            tipUS.show(d.total);})
              
          .on("mouseout", function(d){
            d3.select(this)
              .style("fill", originalColor);
            tipUS.hide(d.total);})
         
      svg_us.append("path")
          .attr("class", "county-borders")
          .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
  };

console.log(dataUS)

}
////////////////
//BUTTON 1 END//
////////////////

//////////////////
//BUTTON 2 BEGIN//
//////////////////
document.getElementById("button2").onclick = function() {
  function ready(error, us) {
    if (error) throw error;
  
    svg_us.call(tipUS);
  
    svg_us.append("g")
          .attr("class", "counties")
          .selectAll("path")
          .data(topojson.feature(us, us.objects.states).features)
          .enter().append("path")
          .attr("d", path)
  
          .attr("fill", function (d){	
            d.total = dataAbs.get(d.id) || 0
            return colorScaleAbs(d.total);})
            
          .on("mouseover", function(d){
            d3.select(this)
              .style("fill","blue");
            tipUS.show(d.total);})
              
          .on("mouseout", function(d){
            d3.select(this)
              .style("fill", originalColor);
            tipUS.hide(d.total);})
         
      svg_us.append("path")
          .attr("class", "county-borders")
          .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
  };

      console.log(dataAbs)


}
////////////////
//BUTTON 2 END//
////////////////*/
    
///////////////////////////
//BEGIN STATE/COUNTY MAPS//
///////////////////////////

//////////////////////
//ARKANSAS MAP START//
//////////////////////
function arkansasMap() {
  
  var projection = d3.geoAlbersUsa()
    .scale(4500)
    .translate([-50, 0]);
      
  var path = d3.geoPath()
    .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/AR.json")
    .defer(d3.csv, "csv/ArkansasBirthrateCounties.csv",function(d) { dataAR.set(d.County, + d.BirthRate)})
    .await(ready);
    
  function ready(error, AR) {

    if (error) throw error;
    var originalColorAR;
    svg_state.call(tipIN);
    svg_state.append("g")
             .attr("class", "counties states")
             .selectAll("path")
             .data(topojson.feature(AR, AR.objects.cb_2015_arkansas_county_20m).features)
             .enter().append("path")
             .attr("d", path)
             .attr("transform", "rotate(1, 0, 0)")
             .attr("fill", function (d){
                d.total = dataAR.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

             .on("mouseover", function(d){
                tipIN.show(d);
                d3.select(this)
                  .style("fill","blue");})

             .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorAR);})
    
    svg_state.append("path")
             .attr("class", "county-borders states")
             .attr("transform", "rotate(1, 0, 0)")
             .attr("d", path(topojson.mesh(AR, AR.objects.cb_2015_arkansas_county_20m , function(a, b) { return a !== b; })
    
))}}; 
//////////////////////
//ARKANSAS MAP END////
//////////////////////

/////////////////////
//ALABAMA MAP START//
/////////////////////
function alabamaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(5000)
      .translate([-500, -200]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
      .defer(d3.json, "json/AL.json")
      .defer(d3.csv, "csv/AlabamaBirthrateCounties.csv",function(d) { dataAL.set(d.County, + d.BirthRate)})
      .await(ready);
    
    function ready(error, AL) {

      if (error) throw error;
      var originalColorAL;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(AL, AL.objects.cb_2015_alabama_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(4, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataAL.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

              .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorAL);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(4, 0, 0)")
        .attr("d", path(topojson.mesh(AL, AL.objects.cb_2015_alabama_county_20m , function(a, b) { return a !== b; })
))}};
///////////////////
//ALABAMA MAP END//
///////////////////


/////////////////////
//INDIANA MAP START//
/////////////////////
function indianaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(5000)
      .translate([-500, 450]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/IN.json")
    .defer(d3.csv, "csv/IndianaBirthrateCounties.csv",function(d) { dataIN.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, IN) {

      if (error) throw error;
      var originalColorIN;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(IN, IN.objects.cb_2015_indiana_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(5, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataIN.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorIN);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(5, 0, 0)")
        .attr("d", path(topojson.mesh(IN, IN.objects.cb_2015_indiana_county_20m , function(a, b) { return a !== b; })
))}}; 
///////////////////
//INDIANA MAP END//
///////////////////

//////////////////////
//NEW YORK MAP START//
//////////////////////
function newyorkMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([-600, 600]);
      
  var path = d3.geoPath()
      .projection(projection);
  svg_state.call(tipIN);	
  d3.queue()
     .defer(d3.json, "json/NY.json")
     .defer(d3.csv, "csv/NewYorkBirthrateCounties.csv",function(d) { dataNY.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, NY) {

      if (error) throw error;
      var originalColorNY;
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NY, NY.objects.cb_2015_new_york_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(9, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNY.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNY);})
      
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(9, 0, 0)")
        .attr("d", path(topojson.mesh(NY, NY.objects.cb_2015_new_york_county_20m , function(a, b) { return a !== b; })
  ))}};
////////////////////
//NEW YORK MAP END//
////////////////////
  
//////////////////////
//MARYLAND MAP START//
//////////////////////
function marylandMap() {

  svg_state.call(tipIN)
  var projection = d3.geoAlbersUsa()
      .scale(6000)
      .translate([-1350, 550]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
      .defer(d3.json, "json/MD.json")
      .defer(d3.csv, "csv/MarylandBirthrateCounties.csv",function(d) { dataMD.set(d.County, + d.BirthRate)})
      .await(ready);
    
    function ready(error, MD) {

      if (error) throw error;
      var originalColorMD;
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(MD, MD.objects.cb_2015_maryland_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(10, 0, 0)")
               .attr("fill", function (d){
                d.total = dataMD.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                tipIN.show(d); 
                d3.select(this)
                  .style("fill","blue");})

              .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorMD);})
      
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(10, 0, 0)")
        .attr("d", path(topojson.mesh(MD, MD.objects.cb_2015_maryland_county_20m , function(a, b) { return a !== b; })
))}};
////////////////////
//MARYLAND MAP END//
////////////////////
  
////////////////////////
//CALIFORNIA MAP START//
////////////////////////
function californiaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2500)
      .translate([850, 450]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/CA.json")
     .defer(d3.csv, "csv/CaliforniaBirthrateCounties.csv",function(d) { dataCA.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, CA) {

      if (error) throw error;
      var originalColorCA;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(CA, CA.objects.cb_2015_california_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("fill", function (d){
          d.total = dataCA.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorCA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("d", path(topojson.mesh(CA, CA.objects.cb_2015_california_county_20m , function(a, b) { return a !== b; })
  ))}}; 
//////////////////////
//CALIFORNIA MAP END//
//////////////////////

///////////////////
//TEXAS MAP START//
///////////////////
function texasMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2000)
      .translate([300, 100]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/TX.json")
     .defer(d3.csv, "csv/TexasBirthrateCounties.csv",function(d) { dataTX.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, TX) {

      if (error) throw error;
      var originalColorTX;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(TX, TX.objects.cb_2015_texas_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-4, 0, 0)")
        .attr("fill", function (d){
          d.total = dataTX.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorTX);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-4, 0, 0)")
        .attr("d", path(topojson.mesh(TX, TX.objects.cb_2015_texas_county_20m , function(a, b) { return a !== b; })
  ))}}; 
/////////////////
//TEXAS MAP END//
/////////////////
function newjerseyMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(7000)
      .translate([-2020, 750]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/NJ.json")
     .defer(d3.csv, "csv/NewJerseyBirthrateCounties.csv",function(d) { dataNJ.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, NJ) {

      if (error) throw error;
      var originalColorNJ;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NJ, NJ.objects.cb_2015_new_jersey_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-20, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNJ.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNJ);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-20, 0, 0)")
        .attr("d", path(topojson.mesh(NJ, NJ.objects.cb_2015_new_jersey_county_20m , function(a, b) { return a !== b; })
  ))}}; 

/////////////////////////
//NEW JERSEY MAP END/////
/////////////////////////

///////////////////////
//ALASKA MAP START////
//////////////////////
function alaskaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([1050, -150]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/AK.json")
     .defer(d3.csv, "csv/AlaskaBirthrateCounties.csv",function(d) { dataAK.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, AK) {

      if (error) throw error;
      var originalColorAK;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(AK, AK.objects.cb_2015_alaska_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(8, 0, 0)")
        .attr("fill", function (d){
          d.total = dataAK.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorAK);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(8, 0, 0)")
        .attr("d", path(topojson.mesh(AK, AK.objects.cb_2015_alaska_county_20m , function(a, b) { return a !== b; })
  ))}}; 

///////////////////////
/////ALASKA MAP END////
///////////////////////
///////////////////////
//ILLINOIS MAP START///
///////////////////////
function illinoisMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([-200, 400]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/IL.json")
     .defer(d3.csv, "csv/IllinoisBirthrateCounties.csv",function(d) { dataIL.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, IL) {

      if (error) throw error;
      var originalColorIL;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(IL, IL.objects.cb_2015_illinois_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(2, 0, 0)")
        .attr("fill", function (d){
          d.total = dataIL.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorIL);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(2, 0, 0)")
        .attr("d", path(topojson.mesh(IL, IL.objects.cb_2015_illinois_county_20m , function(a, b) { return a !== b; })
  ))}}; 
////////////////////////
/////ILLINOIS MAP END///
////////////////////////
///////////////////////
//WISCONSIN MAP START//
///////////////////////
function wisconsinMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-150, 750]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/WI.json")
     .defer(d3.csv, "csv/WisconsinBirthrateCounties.csv",function(d) { dataWI.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, WI) {

      if (error) throw error;
      var originalColorWI;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(WI, WI.objects.cb_2015_wisconsin_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(2, 0, 0)")
        .attr("fill", function (d){
          d.total = dataWI.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorWI);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(2, 0, 0)")
        .attr("d", path(topojson.mesh(WI, WI.objects.cb_2015_wisconsin_county_20m , function(a, b) { return a !== b; })
  ))}}; 


////////////////////////
///WISCONSIN MAP END////
////////////////////////
////////////////////////
/////FLORIDA MAP START//
////////////////////////

function floridaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2000)
      .translate([-250, 0]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/FL.json")
     .defer(d3.csv, "csv/FloridaBirthrateCounties.csv",function(d) { dataFL.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, FL) {

      if (error) throw error;
      var originalColorFL;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(FL, FL.objects.cb_2015_florida_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(2, 0, 0)")
        .attr("fill", function (d){
          d.total = dataFL.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorFL);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(2, 0, 0)")
        .attr("d", path(topojson.mesh(FL, FL.objects.cb_2015_florida_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
////FLORIDA MAP END/////
////////////////////////

////////////////////////
//WASHINGTON MAP START//
////////////////////////

function washingtonMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([900, 1000]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/WA.json")
     .defer(d3.csv, "csv/WashingtonBirthrateCounties.csv",function(d) { dataWA.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, WA) {

      if (error) throw error;
      var originalColorWA;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(WA, WA.objects.cb_2015_washington_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("fill", function (d){
          d.total = dataWA.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorWA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("d", path(topojson.mesh(WA, WA.objects.cb_2015_washington_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
///WASHINGTON MAP END///
////////////////////////

////////////////////////
////MAINE MAP START////
////////////////////////

function maineMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-1150, 900]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/ME.json")
     .defer(d3.csv, "csv/MaineBirthrateCounties.csv",function(d) { dataME.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, ME) {

      if (error) throw error;
      var originalColorME;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(ME, ME.objects.cb_2015_maine_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(14, 0, 0)")
        .attr("fill", function (d){
          d.total = dataME.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorME);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(14, 0, 0)")
        .attr("d", path(topojson.mesh(ME, ME.objects.cb_2015_maine_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
/////MAINE MAP END//////
////////////////////////

////////////////////////
///ARIZONA MAP START///
///////////////////////
function arizonaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([800, 200]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/AZ.json")
     .defer(d3.csv, "csv/ArizonaBirthrateCounties.csv",function(d) { dataAZ.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, AZ) {

      if (error) throw error;
      var originalColorAZ;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(AZ, AZ.objects.cb_2015_arizona_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-10, 0, 0)")
        .attr("fill", function (d){
          d.total = dataAZ.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorAZ);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-10, 0, 0)")
        .attr("d", path(topojson.mesh(AZ, AZ.objects.cb_2015_arizona_county_20m , function(a, b) { return a !== b; })
  ))}}; 
//////////////////////
///ARIZONA MAP END///
//////////////////////

///////////////////////
//MICHIGAN MAP START//
///////////////////////
function michiganMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([-200, 650]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/MI.json")
     .defer(d3.csv, "csv/MichiganBirthrateCounties.csv",function(d) { dataMI.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, MI) {

      if (error) throw error;
      var originalColorMI;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(MI, MI.objects.cb_2015_michigan_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(4, 0, 0)")
        .attr("fill", function (d){
          d.total = dataMI.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorMI);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(4, 0, 0)")
        .attr("d", path(topojson.mesh(MI, MI.objects.cb_2015_michigan_county_20m , function(a, b) { return a !== b; })
  ))}}; 


////////////////////////
///MICHIGAN MAP END////
////////////////////////

////////////////////////
////GEORGIA MAP START//
////////////////////////

function georgiaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-600, -50]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/GA.json")
     .defer(d3.csv, "csv/GeorgiaBirthrateCounties.csv",function(d) { dataGA.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, GA) {

      if (error) throw error;
      var originalColorGA;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(GA, GA.objects.cb_2015_georgia_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(5, 0, 0)")
        .attr("fill", function (d){
          d.total = dataGA.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorGA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(5, 0, 0)")
        .attr("d", path(topojson.mesh(GA, GA.objects.cb_2015_georgia_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
////GEORGIA MAP END/////
////////////////////////

/////////////////////////
//MISSISSIPPI MAP START//
/////////////////////////

function mississippiMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-250, -100]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/MS.json")
     .defer(d3.csv, "csv/MississippiBirthrateCounties.csv",function(d) { dataMS.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, MS) {

      if (error) throw error;
      var originalColorMS;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(MS, MS.objects.cb_2015_mississippi_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(3, 0, 0)")
        .attr("fill", function (d){
          d.total = dataMS.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorMS);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(3, 0, 0)")
        .attr("d", path(topojson.mesh(MS, MS.objects.cb_2015_mississippi_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
//MISSISSIPPI MAP END///
////////////////////////

////////////////////////////
//SOUTH CAROLINA MAP START//
////////////////////////////
function southcarolinaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-720, 150]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/SC.json")
     .defer(d3.csv, "csv/SouthCarolinaBirthrateCounties.csv",function(d) { dataSC.set(d.County, + d.BirthRate)})
     .await(ready);
	
    function ready(error, SC) {

      if (error) throw error;
      var originalColorSC;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(SC, SC.objects.cb_2015_south_carolina_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(2, 0, 0)")
        .attr("fill", function (d){
          d.total = dataSC.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorSC);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(2, 0, 0)")
        .attr("d", path(topojson.mesh(SC, SC.objects.cb_2015_south_carolina_county_20m , function(a, b) { return a !== b; })
  ))}}; 

//////////////////////////
//SOUTH CAROLINA MAP END//
//////////////////////////

////////////////////////////
//NORTH CAROLINA MAP START//
////////////////////////////
function northcarolinaMap() {
  var projection = d3.geoAlbersUsa()
      .scale(3500)
      .translate([-540, 175]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/NC.json")
     .defer(d3.csv, "csv/NorthCarolinaBirthrateCounties.csv",function(d) { dataNC.set(d.County, + d.BirthRate)})
     .await(ready);
	
    function ready(error, NC) {

      if (error) throw error;
      var originalColorNC;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NC, NC.objects.cb_2015_north_carolina_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(8, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNC.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNC);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(8, 0, 0)")
        .attr("d", path(topojson.mesh(NC, NC.objects.cb_2015_north_carolina_county_20m , function(a, b) { return a !== b; })
  ))}}; 

//////////////////////////
//NORTH CAROLINA MAP END//
//////////////////////////

//////////////////////
//OKLAHOMA MAP START//
//////////////////////
function oklahomaMap() {
  
  var projection = d3.geoAlbersUsa()
    .scale(2500)
    .translate([200, 250]);
      
  var path = d3.geoPath()
    .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/OK.json")
    .defer(d3.csv, "csv/OklahomaBirthrateCounties.csv",function(d) { dataOK.set(d.County, + d.BirthRate)})
    .await(ready);
    
  function ready(error, OK) {

    if (error) throw error;
    var originalColorOK;
    svg_state.call(tipIN);
    svg_state.append("g")
             .attr("class", "counties states")
             .selectAll("path")
             .data(topojson.feature(OK, OK.objects.cb_2015_oklahoma_county_20m).features)
             .enter().append("path")
             .attr("d", path)
             .attr("transform", "rotate(-3, 0, 0)")
             .attr("fill", function (d){
                d.total = dataOK.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

             .on("mouseover", function(d){
                tipIN.show(d);
                d3.select(this)
                  .style("fill","blue");})

             .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorOK);})
    
    svg_state.append("path")
             .attr("class", "county-borders states")
             .attr("transform", "rotate(-3, 0, 0)")
             .attr("d", path(topojson.mesh(OK, OK.objects.cb_2015_oklahoma_county_20m , function(a, b) { return a !== b; })
    
))}}; 
//////////////////////
//OKLAHOMA MAP END////
//////////////////////

///////////////////////
//LOUISIANA MAP START//
///////////////////////

function louisianaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3500)
      .translate([-100, -50]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/LA.json")
     .defer(d3.csv, "csv/LouisianaBirthrateCounties.csv",function(d) { dataLA.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, LA) {

      if (error) throw error;
      var originalColorLA;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(LA, LA.objects.cb_2015_louisiana_parish_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(0, 0, 0)")
        .attr("fill", function (d){
          d.total = dataLA.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorLA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(0, 0, 0)")
        .attr("d", path(topojson.mesh(LA, LA.objects.cb_2015_louisiana_parish_20m , function(a, b) { return a !== b; })
  ))}}; 

//////////////////////
////OHIO MAP START////
//////////////////////

function ohioMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-500, 500]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/OH.json")
    .defer(d3.csv, "csv/OhioBirthrateCounties.csv",function(d) { dataOH.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, OH) {

      if (error) throw error;
      var originalColorOH;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(OH, OH.objects.cb_2015_ohio_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(5, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataOH.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorOH);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(5, 0, 0)")
        .attr("d", path(topojson.mesh(OH, OH.objects.cb_2015_ohio_county_20m , function(a, b) { return a !== b; })
))}}; 

//////////////////
///OHIO MAP END///
//////////////////

//////////////////////
//KENTUCKY MAP START//
//////////////////////

function kentuckyMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3500)
      .translate([-280, 300]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/KY.json")
    .defer(d3.csv, "csv/KentuckyBirthrateCounties.csv",function(d) { dataKY.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, KY) {

      if (error) throw error;
      var originalColorKY;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(KY, KY.objects.cb_2015_kentucky_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(5, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataKY.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorKY);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(5, 0, 0)")
        .attr("d", path(topojson.mesh(KY, KY.objects.cb_2015_kentucky_county_20m , function(a, b) { return a !== b; })
))}}; 

///////////////////
//KENTUKY MAP END//
///////////////////
///////////////////////
//TENNESSEE MAP START//
///////////////////////
function tennesseeMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([-200, 300]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/TN.json")
    .defer(d3.csv, "csv/tennesseeBirthrateCounties.csv",function(d) { dataTN.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, TN) {

      if (error) throw error;
      var originalColorTN;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(TN, TN.objects.cb_2015_tennessee_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(5, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataTN.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorTN);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(5, 0, 0)")
        .attr("d", path(topojson.mesh(TN, TN.objects.cb_2015_tennessee_county_20m , function(a, b) { return a !== b; })
))}}; 
/////////////////////
//TENNESSEE MAP END//
/////////////////////
//////////////////////
//VIRGINIA MAP START//
//////////////////////

function virginiaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3400)
      .translate([-550, 350]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/VA.json")
    .defer(d3.csv, "csv/VirginiaBirthrateCounties.csv",function(d) { dataVA.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, VA) {

      if (error) throw error;
      var originalColorVA;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(VA, VA.objects.cb_2015_virginia_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(8, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataVA.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorVA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(8, 0, 0)")
        .attr("d", path(topojson.mesh(VA, VA.objects.cb_2015_virginia_county_20m , function(a, b) { return a !== b; })
))}}; 

///////////////////
//VIRGINIA MAP END//
///////////////////

///////////////////////////
//WEST VIRGINIA MAP START//
//////////////////////////

function westvirginiaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-500, 150]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/WV.json")
    .defer(d3.csv, "csv/WestVirginiaBirthrateCounties.csv",function(d) { dataWV.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, WV) {

      if (error) throw error;
      var originalColorWV;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(WV, WV.objects.cb_2015_west_virginia_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(55, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataWV.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorWV);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(55, 0, 0)")
        .attr("d", path(topojson.mesh(WV, WV.objects.cb_2015_west_virginia_county_20m , function(a, b) { return a !== b; })
))}}; 

/////////////////////////
//WEST VIRGINIA MAP END//
/////////////////////////
 
//////////////////////////
//PENNSYLVANIA MAP START//
//////////////////////////

function pennsylvaniaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-800, 600]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/PA.json")
    .defer(d3.csv, "csv/PennsylvaniaBirthrateCounties.csv",function(d) { dataPA.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, PA) {

      if (error) throw error;
      var originalColorPA;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(PA, PA.objects.cb_2015_pennsylvania_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(10, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataPA.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorPA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(10, 0, 0)")
        .attr("d", path(topojson.mesh(PA, PA.objects.cb_2015_pennsylvania_county_20m , function(a, b) { return a !== b; })
))}}; 

//////////////////////////
///PENNSYLVANIA MAP END///
/////////////////////////

/////////////////////
//VERMONT MAP START//
/////////////////////

function vermontMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(5000)
      .translate([-1300, 900]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/VT.json")
    .defer(d3.csv, "csv/VermontBirthrateCounties.csv",function(d) { dataVT.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, VT) {

      if (error) throw error;
      var originalColorVT;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(VT, VT.objects.cb_2015_vermont_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(12, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataVT.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorVT);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(VT, VT.objects.cb_2015_vermont_county_20m , function(a, b) { return a !== b; })
))}}; 

/////////////////////
///VERMONT MAP END///
/////////////////////

///////////////////////////
//NEW HAMPSHIRE MAP START//
///////////////////////////

function newhampshireMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(5000)
      .translate([-1400, 950]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/NH.json")
    .defer(d3.csv, "csv/NewHampshireBirthrateCounties.csv",function(d) { dataNH.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, NH) {

      if (error) throw error;
      var originalColorNH;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(NH, NH.objects.cb_2015_new_hampshire_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(12, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataNH.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorNH);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(NH, NH.objects.cb_2015_new_hampshire_county_20m , function(a, b) { return a !== b; })
))}}; 

///////////////////////////
///NEW HAMPSHIRE MAP END///
///////////////////////////

///////////////////////////
//MASSACHUSETTS MAP START//
///////////////////////////

function massachusettsMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(6000)
      .translate([-1700, 900]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/MA.json")
    .defer(d3.csv, "csv/MassachusettsBirthrateCounties.csv",function(d) { dataMA.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, MA) {

      if (error) throw error;
      var originalColorMA;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(MA, MA.objects.cb_2015_massachusetts_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(12, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataMA.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorMA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(MA, MA.objects.cb_2015_massachusetts_county_20m , function(a, b) { return a !== b; })
))}}; 

///////////////////////////
///MASSACHUSETTS MAP END///
///////////////////////////

/////////////////////////
//CONNECTICUT MAP START//
/////////////////////////

function connecticutMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(8000)
      .translate([-2200, 1000]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/CT.json")
    .defer(d3.csv, "csv/ConnecticutBirthrateCounties.csv",function(d) { dataCT.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, CT) {

      if (error) throw error;
      var originalColorCT;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(CT, CT.objects.cb_2015_connecticut_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(12, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataCT.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorCT);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(CT, CT.objects.cb_2015_connecticut_county_20m , function(a, b) { return a !== b; })
))}}; 

/////////////////////////
///CONNECTICUT MAP END///
/////////////////////////

//////////////////////
//DELAWARE MAP START//
//////////////////////

function delawareMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(8000)
      .translate([-2100, 600]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/DE.json")
    .defer(d3.csv, "csv/DelawareBirthrateCounties.csv",function(d) { dataDE.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, DE) {

      if (error) throw error;
      var originalColorDE;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(DE, DE.objects.cb_2015_delaware_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(12, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataDE.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorDE);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(DE, DE.objects.cb_2015_delaware_county_20m , function(a, b) { return a !== b; })
))}}; 

//////////////////////
///DELAWARE MAP END///
//////////////////////

//////////////////////////
//RHODE ISLAND MAP START//
//////////////////////////

function rhodeislandMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(13000)
      .translate([-4000, 1500]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/RI.json")
    .defer(d3.csv, "csv/RhodeIslandBirthrateCounties.csv",function(d) { dataRI.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, RI) {

      if (error) throw error;
      var originalColorRI;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(RI, RI.objects.cb_2015_rhode_island_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(15, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataRI.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorRI);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(15, 0, 0)")
        .attr("d", path(topojson.mesh(RI, RI.objects.cb_2015_rhode_island_county_20m , function(a, b) { return a !== b; })
))}}; 

//////////////////////////
///RHODE ISLAND MAP END///
//////////////////////////

/////////////////////
//OREGON MAP START//
////////////////////

function oregonMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([900, 850]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/OR.json")
     .defer(d3.csv, "csv/OregonBirthrateCounties.csv",function(d) { dataOR.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, OR) {

      if (error) throw error;
      var originalColorOR;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(OR, OR.objects.cb_2015_oregon_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("fill", function (d){
          d.total = dataOR.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorOR);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("d", path(topojson.mesh(OR, OR.objects.cb_2015_oregon_county_20m , function(a, b) { return a !== b; })
  ))}}; 

///////////////////
//OREGON MAP END///
///////////////////

///////////////////
//IDAHO MAP START//
///////////////////

function idahoMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([700, 850]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/ID.json")
     .defer(d3.csv, "csv/IdahoBirthrateCounties.csv",function(d) { dataID.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, ID) {

      if (error) throw error;
      var originalColorID;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(ID, ID.objects.cb_2015_idaho_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-12, 0, 0)")
        .attr("fill", function (d){
          d.total = dataID.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorID);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-12, 0, 0)")
        .attr("d", path(topojson.mesh(ID, ID.objects.cb_2015_idaho_county_20m , function(a, b) { return a !== b; })
  ))}}; 

//////////////////
//IDAHO MAP END///
//////////////////

//////////////////////////
//NORTH DAKOTA MAP START//
//////////////////////////

function northdakotaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([300, 850]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/ND.json")
     .defer(d3.csv, "csv/NorthDakotaBirthrateCounties.csv",function(d) { dataND.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, ND) {

      if (error) throw error;
      var originalColorND;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(ND, ND.objects.cb_2015_north_dakota_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-5, 0, 0)")
        .attr("fill", function (d){
          d.total = dataND.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorND);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-5, 0, 0)")
        .attr("d", path(topojson.mesh(ND, ND.objects.cb_2015_north_dakota_county_20m , function(a, b) { return a !== b; })
  ))}}; 

/////////////////////////
//NORTH DAKOTA MAP END///
////////////////////////

//////////////////////////
//SOUTH DAKOTA MAP START//
//////////////////////////

function southdakotaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([300, 750]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/SD.json")
     .defer(d3.csv, "csv/SouthDakotaBirthrateCounties.csv",function(d) { dataSD.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, SD) {

      if (error) throw error;
      var originalColorSD;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(SD, SD.objects.cb_2015_south_dakota_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-5, 0, 0)")
        .attr("fill", function (d){
          d.total = dataSD.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorSD);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-5, 0, 0)")
        .attr("d", path(topojson.mesh(SD, SD.objects.cb_2015_south_dakota_county_20m , function(a, b) { return a !== b; })
  ))}}; 

/////////////////////////
//SOUTH DAKOTA MAP END///
////////////////////////

////////////////////
//NEVADA MAP START//
////////////////////
function nevadaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2800)
      .translate([880, 500]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/NV.json")
     .defer(d3.csv, "csv/NevadaBirthrateCounties.csv",function(d) { dataNV.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, NV) {

      if (error) throw error;
      var originalColorNV;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NV, NV.objects.cb_2015_nevada_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-14, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNV.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNV);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-14, 0, 0)")
        .attr("d", path(topojson.mesh(NV, NV.objects.cb_2015_nevada_county_20m , function(a, b) { return a !== b; })
  ))}}; 
//////////////////
//NEVADA MAP END//
//////////////////

//////////////////
//UTAH MAP START//
//////////////////
function utahMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2800)
      .translate([600, 500]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/UT.json")
     .defer(d3.csv, "csv/UtahBirthrateCounties.csv",function(d) { dataUT.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, UT) {

      if (error) throw error;
      var originalColorUT;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(UT, UT.objects.cb_2015_utah_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-11, 0, 0)")
        .attr("fill", function (d){
          d.total = dataUT.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorUT);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-11, 0, 0)")
        .attr("d", path(topojson.mesh(UT, UT.objects.cb_2015_utah_county_20m , function(a, b) { return a !== b; })
  ))}}; 
////////////////
//UTAH MAP END//
////////////////

/////////////////////
//MONTANA MAP START//
/////////////////////

function montanaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2500)
      .translate([500, 800]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/MT.json")
     .defer(d3.csv, "csv/MontanaBirthrateCounties.csv",function(d) { dataMT.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, MT) {

      if (error) throw error;
      var originalColorMT;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(MT, MT.objects.cb_2015_montana_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-10, 0, 0)")
        .attr("fill", function (d){
          d.total = dataMT.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorMT);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-10, 0, 0)")
        .attr("d", path(topojson.mesh(MT, MT.objects.cb_2015_montana_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////
//MONTANA MAP END///
////////////////////

/////////////////////
//WYOMING MAP START//
/////////////////////

function wyomingMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([500, 700]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/WY.json")
     .defer(d3.csv, "csv/WyomingBirthrateCounties.csv",function(d) { dataWY.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, WY) {

      if (error) throw error;
      var originalColorWY;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(WY, WY.objects.cb_2015_wyoming_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-8, 0, 0)")
        .attr("fill", function (d){
          d.total = dataWY.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorWY);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-8, 0, 0)")
        .attr("d", path(topojson.mesh(WY, WY.objects.cb_2015_wyoming_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////
//WYOMING MAP END///
////////////////////

//////////////////////////
///NEW MEXICO MAP START///
/////////////////////////
function newmexicoMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([550, 200]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/NM.json")
     .defer(d3.csv, "csv/NewMexicoBirthrateCounties.csv",function(d) { dataNM.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, NM) {

      if (error) throw error;
      var originalColorNM;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NM, NM.objects.cb_2015_new_mexico_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-8, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNM.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNM);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-8, 0, 0)")
        .attr("d", path(topojson.mesh(NM, NM.objects.cb_2015_new_mexico_county_20m , function(a, b) { return a !== b; })
  ))}}; 
////////////////////////
///NEW MEXICO MAP END///
////////////////////////
//////////////////////
//MISSOURI MAP START//
//////////////////////
function missouriMap() {
  
  var projection = d3.geoAlbersUsa()
    .scale(3500)
    .translate([-50, 400]);
      
  var path = d3.geoPath()
    .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/MO.json")
    .defer(d3.csv, "csv/MissouriBirthrateCounties.csv",function(d) { dataMO.set(d.County, + d.BirthRate)})
    .await(ready);
    
  function ready(error, MO) {

    if (error) throw error;
    var originalColorMO;
    svg_state.call(tipIN);
    svg_state.append("g")
             .attr("class", "counties states")
             .selectAll("path")
             .data(topojson.feature(MO, MO.objects.cb_2015_missouri_county_20m).features)
             .enter().append("path")
             .attr("d", path)
             .attr("transform", "rotate(1, 0, 0)")
             .attr("fill", function (d){
                d.total = dataMO.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

             .on("mouseover", function(d){
                tipIN.show(d);
                d3.select(this)
                  .style("fill","blue");})

             .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorMO);})
    
    svg_state.append("path")
             .attr("class", "county-borders states")
             .attr("transform", "rotate(1, 0, 0)")
             .attr("d", path(topojson.mesh(MO, MO.objects.cb_2015_missouri_county_20m , function(a, b) { return a !== b; })
    
))}}; 
//////////////////////
//MISSOURI MAP END//
//////////////////////

///////////////////
//IOWA MAP START//
//////////////////
function iowaMap() {
  
  var projection = d3.geoAlbersUsa()
    .scale(3500)
    .translate([50, 550]);
      
  var path = d3.geoPath()
    .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/IA.json")
    .defer(d3.csv, "csv/IowaBirthrateCounties.csv",function(d) { dataIA.set(d.County, + d.BirthRate)})
    .await(ready);
    
  function ready(error, IA) {

    if (error) throw error;
    var originalColorIA;
    svg_state.call(tipIN);
    svg_state.append("g")
             .attr("class", "counties states")
             .selectAll("path")
             .data(topojson.feature(IA, IA.objects.cb_2015_iowa_county_20m).features)
             .enter().append("path")
             .attr("d", path)
             .attr("transform", "rotate(1, 0, 0)")
             .attr("fill", function (d){
                d.total = dataIA.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

             .on("mouseover", function(d){
                tipIN.show(d);
                d3.select(this)
                  .style("fill","blue");})

             .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorIA);})
    
    svg_state.append("path")
             .attr("class", "county-borders states")
             .attr("transform", "rotate(1, 0, 0)")
             .attr("d", path(topojson.mesh(IA, IA.objects.cb_2015_iowa_county_20m , function(a, b) { return a !== b; })
    
))}}; 
////////////////
//IOWA MAP END//
////////////////

///////////////////
//MINNESOTA MAP START//
//////////////////
function minnesotaMap() {
  
  var projection = d3.geoAlbersUsa()
    .scale(3000)
    .translate([50, 800]);
      
  var path = d3.geoPath()
    .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/MN.json")
    .defer(d3.csv, "csv/MinnesotaBirthrateCounties.csv",function(d) { dataMN.set(d.County, + d.BirthRate)})
    .await(ready);
    
  function ready(error, MN) {

    if (error) throw error;
    var originalColorMN;
    svg_state.call(tipIN);
    svg_state.append("g")
             .attr("class", "counties states")
             .selectAll("path")
             .data(topojson.feature(MN, MN.objects.cb_2015_minnesota_county_20m).features)
             .enter().append("path")
             .attr("d", path)
             .attr("transform", "rotate(1, 0, 0)")
             .attr("fill", function (d){
                d.total = dataMN.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

             .on("mouseover", function(d){
                tipIN.show(d);
                d3.select(this)
                  .style("fill","blue");})

             .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorMN);})
    
    svg_state.append("path")
             .attr("class", "county-borders states")
             .attr("transform", "rotate(1, 0, 0)")
             .attr("d", path(topojson.mesh(MN, MN.objects.cb_2015_minnesota_county_20m , function(a, b) { return a !== b; })
    
))}}; 
//////////////////////
//MINNESOTA MAP END//
//////////////////////

/////////////////////
//COLORADO MAP START//
/////////////////////

function coloradoMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([480, 520]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/CO.json")
     .defer(d3.csv, "csv/ColoradoBirthrateCounties.csv",function(d) { dataCO.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, CO) {

      if (error) throw error;
      var originalColorCO;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(CO, CO.objects.cb_2015_colorado_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-7, 0, 0)")
        .attr("fill", function (d){
          d.total = dataCO.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorCO);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-7, 0, 0)")
        .attr("d", path(topojson.mesh(CO, CO.objects.cb_2015_colorado_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////
//COLORADO MAP END///
////////////////////

//////////////////////
//NEBRASKA MAP START//
//////////////////////

function nebraskaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([250, 600]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/NE.json")
     .defer(d3.csv, "csv/NebraskaBirthrateCounties.csv",function(d) { dataNE.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, NE) {

      if (error) throw error;
      var originalColorNE;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NE, NE.objects.cb_2015_nebraska_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-3, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNE.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNE);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-3, 0, 0)")
        .attr("d", path(topojson.mesh(NE, NE.objects.cb_2015_nebraska_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////
//NEBRASKA MAP END//
////////////////////

////////////////////
//KANSAS MAP START//
////////////////////

function kansasMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([200, 450]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/KS.json")
     .defer(d3.csv, "csv/KansasBirthrateCounties.csv",function(d) { dataKS.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, KS) {

      if (error) throw error;
      var originalColorKS;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(KS, KS.objects.cb_2015_kansas_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-3, 0, 0)")
        .attr("fill", function (d){
          d.total = dataKS.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorKS);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-3, 0, 0)")
        .attr("d", path(topojson.mesh(KS, KS.objects.cb_2015_kansas_county_20m , function(a, b) { return a !== b; })
  ))}}; 

//////////////////
//KANSAS MAP END//
//////////////////

///////////////////////
//HAWAII MAP START////
//////////////////////
function hawaiiMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([530, -150]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/HI.json")
     .defer(d3.csv, "csv/HawaiiBirthrateCounties.csv",function(d) { dataHI.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, HI) {

      if (error) throw error;
      var originalColorHI;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(HI, HI.objects.cb_2015_hawaii_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-30, 0, 0)")
        .attr("fill", function (d){
          d.total = dataHI.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorHI);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-30, 0, 0)")
        .attr("d", path(topojson.mesh(HI, HI.objects.cb_2015_hawaii_county_20m , function(a, b) { return a !== b; })
  ))}}; }
/////////////////
////BUTTON 2/////
/////////////////
function abstinence(){  
d3.queue()
  .defer(d3.json, "https:d3js.org/us-10m.v1.json")
  .defer(d3.csv, "csv/SexEducation.csv",function(d) {
    dataUS.set(d.id, + d.SexEducationMandated)
    dataAbs.set(d.id, + d.Abstinence)
  })
  .await(ready);

////////////////////////
//READY FUNCTION START//
////////////////////////
function ready(error, us) {
  if (error) throw error;
  
  console.log(dataSexEdTT)
    var originalColor;

  svg_us.call(tipAbs);
  
  console.log(dataUS)
  console.log(dataAbs)

  svg_us.append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)

        .attr("fill", function (d){	
          d.total = dataAbs.get(d.id) || 0
          return colorScaleAbs(d.total);})
          
        .on("mouseover", function(d){
          d3.select(this)
            .style("fill","blue");
          //console.log(dataSexEdTT.get(d.id))
          tipAbs.show(d.total);})
            
        .on("mouseout", function(d){
          d3.select(this)
            .style("fill", originalColor);
          tipAbs.hide(d.total);})

        .on("click", function (d){ 
	  	  console.log(d.id);
          d3.selectAll(".states").remove()
          
          if(d.id == 01){
             alabamaMap();
          }
	  	  else if(d.id == 02){
			  alaskaMap();
		  }
	  	  else if(d.id == 04){
             arizonaMap();
          }
          else if(d.id == 05){
             arkansasMap();
          }
	  	  else if(d.id == 06){
             californiaMap();
          }
	  	  else if(d.id == 08){
			 coloradoMap();
		  }
	  	  else if(d.id == 09){
			  connecticutMap();
		  }
	  	  else if(d.id == 10){
			  delawareMap();
		  }
	  	  else if(d.id == 12){
              floridaMap();
          }
	      else if(d.id == 13){
			  georgiaMap();
		  }
	   	  else if(d.id == 15){
			  hawaiiMap();
		  }
	  	  else if(d.id == 16){
			  idahoMap();
		  }
	  	  else if(d.id == 17){
			  illinoisMap();
		  }
	  	  else if(d.id == 18){
              indianaMap();
          }
	  	  else if(d.id == 19){
			  iowaMap();
		  }
	  	  else if(d.id == 20){
			  kansasMap();
		  }
	      else if(d.id == 21){
			  kentuckyMap();
		  }
	  	  else if(d.id == 22){
			  louisianaMap();
		  }
	  	  else if(d.id == 23){
			  maineMap();
		  }
          else if(d.id == 24){
              marylandMap();
			  
          }
	  	  else if(d.id == 25){
			  massachusettsMap();
		  }
	  	  else if(d.id == 26){
			 michiganMap();
		  }
	  	  else if(d.id == 27){
			 minnesotaMap();
		  }
	  	  else if(d.id == 28){
			  mississippiMap();
		  }
	  	  else if(d.id == 29){
			  missouriMap();
		  }
	  	  else if(d.id == 30){
			  montanaMap();
		  }
	  	  else if(d.id == 31){
			  nebraskaMap();
		  }
	  	  else if(d.id == 32){
			  nevadaMap();
		  }
	  	  else if(d.id == 33){
			  newhampshireMap();
		  }
	  	  else if(d.id == 34){
			  newjerseyMap();
		  }
	  	  else if(d.id == 35){
			  newmexicoMap();
		  }
	  	  else if(d.id == 36){
              newyorkMap();
          }
	  	  else if(d.id == 37){
			  northcarolinaMap();
		  }
	  	  else if(d.id == 38){
			  northdakotaMap();
		  }
	  	  else if(d.id == 39){
			  ohioMap();
		  }
	  	  else if(d.id == 40){
			  oklahomaMap();
		  }
	  	  else if(d.id == 41){
			  oregonMap();
		  }
	  	  else if(d.id == 42){
			  pennsylvaniaMap();
		  }
	  	  else if(d.id == 44){
			  rhodeislandMap();
		  }
	      else if(d.id == 45){
			  southcarolinaMap();
		  }
	  	  else if(d.id == 46){
			  southdakotaMap();
		  }
	      else if(d.id == 47){
			  tennesseeMap();
		  }
          else if(d.id == 48){
              texasMap();
          }
	  	  else if(d.id == 49){
			  utahMap();
		  }
	  	  else if(d.id == 50){
			  vermontMap();
		  }
	  	  else if(d.id == 51){
			  virginiaMap();
		  }
	  	  else if(d.id == 53){
			  washingtonMap();
		  }
	      else if(d.id == 54){
			  westvirginiaMap();
		  }
	  	  else if(d.id == 55){
			  wisconsinMap();
		  }
	  	  else if(d.id == 56){
			  wyomingMap();
		  }

        })
       
  
    svg_us.append("path")
        .attr("class", "county-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
};
//////////////////////
//READY FUNCTION END//
//////////////////////

var originalColor;

//////////////////
//BUTTON 1 BEGIN//
//////////////////

/*document.getElementById("button1").onclick = function() {
  function ready(error, us) {
    if (error) throw error;
  
    svg_us.call(tipUS);
  
    svg_us.append("g")
          .attr("class", "counties")
          .selectAll("path")
          .data(topojson.feature(us, us.objects.states).features)
          .enter().append("path")
          .attr("d", path)
  
          .attr("fill", function (d){	
            d.total = dataUS.get(d.id) || 0
            return colorScaleUS(d.total);})
            
          .on("mouseover", function(d){
            d3.select(this)
              .style("fill","blue");
            tipUS.show(d.total);})
              
          .on("mouseout", function(d){
            d3.select(this)
              .style("fill", originalColor);
            tipUS.hide(d.total);})
         
      svg_us.append("path")
          .attr("class", "county-borders")
          .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
  };

console.log(dataUS)

}
////////////////
//BUTTON 1 END//
////////////////

//////////////////
//BUTTON 2 BEGIN//
//////////////////
document.getElementById("button2").onclick = function() {
  function ready(error, us) {
    if (error) throw error;
  
    svg_us.call(tipUS);
  
    svg_us.append("g")
          .attr("class", "counties")
          .selectAll("path")
          .data(topojson.feature(us, us.objects.states).features)
          .enter().append("path")
          .attr("d", path)
  
          .attr("fill", function (d){	
            d.total = dataAbs.get(d.id) || 0
            return colorScaleAbs(d.total);})
            
          .on("mouseover", function(d){
            d3.select(this)
              .style("fill","blue");
            tipUS.show(d.total);})
              
          .on("mouseout", function(d){
            d3.select(this)
              .style("fill", originalColor);
            tipUS.hide(d.total);})
         
      svg_us.append("path")
          .attr("class", "county-borders")
          .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
  };

      console.log(dataAbs)


}
////////////////
//BUTTON 2 END//
////////////////*/
    
///////////////////////////
//BEGIN STATE/COUNTY MAPS//
///////////////////////////

//////////////////////
//ARKANSAS MAP START//
//////////////////////
function arkansasMap() {
  
  var projection = d3.geoAlbersUsa()
    .scale(4500)
    .translate([-50, 0]);
      
  var path = d3.geoPath()
    .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/AR.json")
    .defer(d3.csv, "csv/ArkansasBirthrateCounties.csv",function(d) { dataAR.set(d.County, + d.BirthRate)})
    .await(ready);
    
  function ready(error, AR) {

    if (error) throw error;
    var originalColorAR;
    svg_state.call(tipIN);
    svg_state.append("g")
             .attr("class", "counties states")
             .selectAll("path")
             .data(topojson.feature(AR, AR.objects.cb_2015_arkansas_county_20m).features)
             .enter().append("path")
             .attr("d", path)
             .attr("transform", "rotate(1, 0, 0)")
             .attr("fill", function (d){
                d.total = dataAR.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

             .on("mouseover", function(d){
                tipIN.show(d);
                d3.select(this)
                  .style("fill","blue");})

             .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorAR);})
    
    svg_state.append("path")
             .attr("class", "county-borders states")
             .attr("transform", "rotate(1, 0, 0)")
             .attr("d", path(topojson.mesh(AR, AR.objects.cb_2015_arkansas_county_20m , function(a, b) { return a !== b; })
    
))}}; 
//////////////////////
//ARKANSAS MAP END////
//////////////////////

/////////////////////
//ALABAMA MAP START//
/////////////////////
function alabamaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(5000)
      .translate([-500, -200]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
      .defer(d3.json, "json/AL.json")
      .defer(d3.csv, "csv/AlabamaBirthrateCounties.csv",function(d) { dataAL.set(d.County, + d.BirthRate)})
      .await(ready);
    
    function ready(error, AL) {

      if (error) throw error;
      var originalColorAL;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(AL, AL.objects.cb_2015_alabama_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(4, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataAL.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

              .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorAL);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(4, 0, 0)")
        .attr("d", path(topojson.mesh(AL, AL.objects.cb_2015_alabama_county_20m , function(a, b) { return a !== b; })
))}};
///////////////////
//ALABAMA MAP END//
///////////////////


/////////////////////
//INDIANA MAP START//
/////////////////////
function indianaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(5000)
      .translate([-500, 450]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/IN.json")
    .defer(d3.csv, "csv/IndianaBirthrateCounties.csv",function(d) { dataIN.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, IN) {

      if (error) throw error;
      var originalColorIN;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(IN, IN.objects.cb_2015_indiana_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(5, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataIN.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorIN);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(5, 0, 0)")
        .attr("d", path(topojson.mesh(IN, IN.objects.cb_2015_indiana_county_20m , function(a, b) { return a !== b; })
))}}; 
///////////////////
//INDIANA MAP END//
///////////////////

//////////////////////
//NEW YORK MAP START//
//////////////////////
function newyorkMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([-600, 600]);
      
  var path = d3.geoPath()
      .projection(projection);
  svg_state.call(tipIN);	
  d3.queue()
     .defer(d3.json, "json/NY.json")
     .defer(d3.csv, "csv/NewYorkBirthrateCounties.csv",function(d) { dataNY.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, NY) {

      if (error) throw error;
      var originalColorNY;
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NY, NY.objects.cb_2015_new_york_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(9, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNY.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNY);})
      
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(9, 0, 0)")
        .attr("d", path(topojson.mesh(NY, NY.objects.cb_2015_new_york_county_20m , function(a, b) { return a !== b; })
  ))}};
////////////////////
//NEW YORK MAP END//
////////////////////
  
//////////////////////
//MARYLAND MAP START//
//////////////////////
function marylandMap() {

  svg_state.call(tipIN)
  var projection = d3.geoAlbersUsa()
      .scale(6000)
      .translate([-1350, 550]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
      .defer(d3.json, "json/MD.json")
      .defer(d3.csv, "csv/MarylandBirthrateCounties.csv",function(d) { dataMD.set(d.County, + d.BirthRate)})
      .await(ready);
    
    function ready(error, MD) {

      if (error) throw error;
      var originalColorMD;
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(MD, MD.objects.cb_2015_maryland_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(10, 0, 0)")
               .attr("fill", function (d){
                d.total = dataMD.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                tipIN.show(d); 
                d3.select(this)
                  .style("fill","blue");})

              .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorMD);})
      
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(10, 0, 0)")
        .attr("d", path(topojson.mesh(MD, MD.objects.cb_2015_maryland_county_20m , function(a, b) { return a !== b; })
))}};
////////////////////
//MARYLAND MAP END//
////////////////////
  
////////////////////////
//CALIFORNIA MAP START//
////////////////////////
function californiaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2500)
      .translate([850, 450]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/CA.json")
     .defer(d3.csv, "csv/CaliforniaBirthrateCounties.csv",function(d) { dataCA.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, CA) {

      if (error) throw error;
      var originalColorCA;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(CA, CA.objects.cb_2015_california_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("fill", function (d){
          d.total = dataCA.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorCA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("d", path(topojson.mesh(CA, CA.objects.cb_2015_california_county_20m , function(a, b) { return a !== b; })
  ))}}; 
//////////////////////
//CALIFORNIA MAP END//
//////////////////////

///////////////////
//TEXAS MAP START//
///////////////////
function texasMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2000)
      .translate([300, 100]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/TX.json")
     .defer(d3.csv, "csv/TexasBirthrateCounties.csv",function(d) { dataTX.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, TX) {

      if (error) throw error;
      var originalColorTX;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(TX, TX.objects.cb_2015_texas_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-4, 0, 0)")
        .attr("fill", function (d){
          d.total = dataTX.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorTX);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-4, 0, 0)")
        .attr("d", path(topojson.mesh(TX, TX.objects.cb_2015_texas_county_20m , function(a, b) { return a !== b; })
  ))}}; 
/////////////////
//TEXAS MAP END//
/////////////////
function newjerseyMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(7000)
      .translate([-2020, 750]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/NJ.json")
     .defer(d3.csv, "csv/NewJerseyBirthrateCounties.csv",function(d) { dataNJ.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, NJ) {

      if (error) throw error;
      var originalColorNJ;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NJ, NJ.objects.cb_2015_new_jersey_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-20, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNJ.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNJ);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-20, 0, 0)")
        .attr("d", path(topojson.mesh(NJ, NJ.objects.cb_2015_new_jersey_county_20m , function(a, b) { return a !== b; })
  ))}}; 

/////////////////////////
//NEW JERSEY MAP END/////
/////////////////////////

///////////////////////
//ALASKA MAP START////
//////////////////////
function alaskaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([1050, -150]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/AK.json")
     .defer(d3.csv, "csv/AlaskaBirthrateCounties.csv",function(d) { dataAK.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, AK) {

      if (error) throw error;
      var originalColorAK;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(AK, AK.objects.cb_2015_alaska_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(8, 0, 0)")
        .attr("fill", function (d){
          d.total = dataAK.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorAK);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(8, 0, 0)")
        .attr("d", path(topojson.mesh(AK, AK.objects.cb_2015_alaska_county_20m , function(a, b) { return a !== b; })
  ))}}; 

///////////////////////
/////ALASKA MAP END////
///////////////////////
///////////////////////
//ILLINOIS MAP START///
///////////////////////
function illinoisMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([-200, 400]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/IL.json")
     .defer(d3.csv, "csv/IllinoisBirthrateCounties.csv",function(d) { dataIL.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, IL) {

      if (error) throw error;
      var originalColorIL;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(IL, IL.objects.cb_2015_illinois_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(2, 0, 0)")
        .attr("fill", function (d){
          d.total = dataIL.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorIL);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(2, 0, 0)")
        .attr("d", path(topojson.mesh(IL, IL.objects.cb_2015_illinois_county_20m , function(a, b) { return a !== b; })
  ))}}; 
////////////////////////
/////ILLINOIS MAP END///
////////////////////////
///////////////////////
//WISCONSIN MAP START//
///////////////////////
function wisconsinMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-150, 750]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/WI.json")
     .defer(d3.csv, "csv/WisconsinBirthrateCounties.csv",function(d) { dataWI.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, WI) {

      if (error) throw error;
      var originalColorWI;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(WI, WI.objects.cb_2015_wisconsin_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(2, 0, 0)")
        .attr("fill", function (d){
          d.total = dataWI.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorWI);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(2, 0, 0)")
        .attr("d", path(topojson.mesh(WI, WI.objects.cb_2015_wisconsin_county_20m , function(a, b) { return a !== b; })
  ))}}; 


////////////////////////
///WISCONSIN MAP END////
////////////////////////
////////////////////////
/////FLORIDA MAP START//
////////////////////////

function floridaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2000)
      .translate([-250, 0]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/FL.json")
     .defer(d3.csv, "csv/FloridaBirthrateCounties.csv",function(d) { dataFL.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, FL) {

      if (error) throw error;
      var originalColorFL;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(FL, FL.objects.cb_2015_florida_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(2, 0, 0)")
        .attr("fill", function (d){
          d.total = dataFL.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorFL);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(2, 0, 0)")
        .attr("d", path(topojson.mesh(FL, FL.objects.cb_2015_florida_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
////FLORIDA MAP END/////
////////////////////////

////////////////////////
//WASHINGTON MAP START//
////////////////////////

function washingtonMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([900, 1000]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/WA.json")
     .defer(d3.csv, "csv/WashingtonBirthrateCounties.csv",function(d) { dataWA.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, WA) {

      if (error) throw error;
      var originalColorWA;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(WA, WA.objects.cb_2015_washington_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("fill", function (d){
          d.total = dataWA.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorWA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("d", path(topojson.mesh(WA, WA.objects.cb_2015_washington_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
///WASHINGTON MAP END///
////////////////////////

////////////////////////
////MAINE MAP START////
////////////////////////

function maineMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-1150, 900]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/ME.json")
     .defer(d3.csv, "csv/MaineBirthrateCounties.csv",function(d) { dataME.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, ME) {

      if (error) throw error;
      var originalColorME;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(ME, ME.objects.cb_2015_maine_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(14, 0, 0)")
        .attr("fill", function (d){
          d.total = dataME.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorME);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(14, 0, 0)")
        .attr("d", path(topojson.mesh(ME, ME.objects.cb_2015_maine_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
/////MAINE MAP END//////
////////////////////////

////////////////////////
///ARIZONA MAP START///
///////////////////////
function arizonaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([800, 200]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/AZ.json")
     .defer(d3.csv, "csv/ArizonaBirthrateCounties.csv",function(d) { dataAZ.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, AZ) {

      if (error) throw error;
      var originalColorAZ;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(AZ, AZ.objects.cb_2015_arizona_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-10, 0, 0)")
        .attr("fill", function (d){
          d.total = dataAZ.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorAZ);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-10, 0, 0)")
        .attr("d", path(topojson.mesh(AZ, AZ.objects.cb_2015_arizona_county_20m , function(a, b) { return a !== b; })
  ))}}; 
//////////////////////
///ARIZONA MAP END///
//////////////////////

///////////////////////
//MICHIGAN MAP START//
///////////////////////
function michiganMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([-200, 650]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/MI.json")
     .defer(d3.csv, "csv/MichiganBirthrateCounties.csv",function(d) { dataMI.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, MI) {

      if (error) throw error;
      var originalColorMI;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(MI, MI.objects.cb_2015_michigan_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(4, 0, 0)")
        .attr("fill", function (d){
          d.total = dataMI.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorMI);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(4, 0, 0)")
        .attr("d", path(topojson.mesh(MI, MI.objects.cb_2015_michigan_county_20m , function(a, b) { return a !== b; })
  ))}}; 


////////////////////////
///MICHIGAN MAP END////
////////////////////////

////////////////////////
////GEORGIA MAP START//
////////////////////////

function georgiaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-600, -50]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/GA.json")
     .defer(d3.csv, "csv/GeorgiaBirthrateCounties.csv",function(d) { dataGA.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, GA) {

      if (error) throw error;
      var originalColorGA;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(GA, GA.objects.cb_2015_georgia_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(5, 0, 0)")
        .attr("fill", function (d){
          d.total = dataGA.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorGA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(5, 0, 0)")
        .attr("d", path(topojson.mesh(GA, GA.objects.cb_2015_georgia_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
////GEORGIA MAP END/////
////////////////////////

/////////////////////////
//MISSISSIPPI MAP START//
/////////////////////////

function mississippiMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-250, -100]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/MS.json")
     .defer(d3.csv, "csv/MississippiBirthrateCounties.csv",function(d) { dataMS.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, MS) {

      if (error) throw error;
      var originalColorMS;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(MS, MS.objects.cb_2015_mississippi_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(3, 0, 0)")
        .attr("fill", function (d){
          d.total = dataMS.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorMS);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(3, 0, 0)")
        .attr("d", path(topojson.mesh(MS, MS.objects.cb_2015_mississippi_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
//MISSISSIPPI MAP END///
////////////////////////

////////////////////////////
//SOUTH CAROLINA MAP START//
////////////////////////////
function southcarolinaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-720, 150]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/SC.json")
     .defer(d3.csv, "csv/SouthCarolinaBirthrateCounties.csv",function(d) { dataSC.set(d.County, + d.BirthRate)})
     .await(ready);
	
    function ready(error, SC) {

      if (error) throw error;
      var originalColorSC;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(SC, SC.objects.cb_2015_south_carolina_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(2, 0, 0)")
        .attr("fill", function (d){
          d.total = dataSC.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorSC);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(2, 0, 0)")
        .attr("d", path(topojson.mesh(SC, SC.objects.cb_2015_south_carolina_county_20m , function(a, b) { return a !== b; })
  ))}}; 

//////////////////////////
//SOUTH CAROLINA MAP END//
//////////////////////////

////////////////////////////
//NORTH CAROLINA MAP START//
////////////////////////////
function northcarolinaMap() {
  var projection = d3.geoAlbersUsa()
      .scale(3500)
      .translate([-540, 175]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/NC.json")
     .defer(d3.csv, "csv/NorthCarolinaBirthrateCounties.csv",function(d) { dataNC.set(d.County, + d.BirthRate)})
     .await(ready);
	
    function ready(error, NC) {

      if (error) throw error;
      var originalColorNC;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NC, NC.objects.cb_2015_north_carolina_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(8, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNC.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNC);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(8, 0, 0)")
        .attr("d", path(topojson.mesh(NC, NC.objects.cb_2015_north_carolina_county_20m , function(a, b) { return a !== b; })
  ))}}; 

//////////////////////////
//NORTH CAROLINA MAP END//
//////////////////////////

//////////////////////
//OKLAHOMA MAP START//
//////////////////////
function oklahomaMap() {
  
  var projection = d3.geoAlbersUsa()
    .scale(2500)
    .translate([200, 250]);
      
  var path = d3.geoPath()
    .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/OK.json")
    .defer(d3.csv, "csv/OklahomaBirthrateCounties.csv",function(d) { dataOK.set(d.County, + d.BirthRate)})
    .await(ready);
    
  function ready(error, OK) {

    if (error) throw error;
    var originalColorOK;
    svg_state.call(tipIN);
    svg_state.append("g")
             .attr("class", "counties states")
             .selectAll("path")
             .data(topojson.feature(OK, OK.objects.cb_2015_oklahoma_county_20m).features)
             .enter().append("path")
             .attr("d", path)
             .attr("transform", "rotate(-3, 0, 0)")
             .attr("fill", function (d){
                d.total = dataOK.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

             .on("mouseover", function(d){
                tipIN.show(d);
                d3.select(this)
                  .style("fill","blue");})

             .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorOK);})
    
    svg_state.append("path")
             .attr("class", "county-borders states")
             .attr("transform", "rotate(-3, 0, 0)")
             .attr("d", path(topojson.mesh(OK, OK.objects.cb_2015_oklahoma_county_20m , function(a, b) { return a !== b; })
    
))}}; 
//////////////////////
//OKLAHOMA MAP END////
//////////////////////

///////////////////////
//LOUISIANA MAP START//
///////////////////////

function louisianaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3500)
      .translate([-100, -50]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/LA.json")
     .defer(d3.csv, "csv/LouisianaBirthrateCounties.csv",function(d) { dataLA.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, LA) {

      if (error) throw error;
      var originalColorLA;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(LA, LA.objects.cb_2015_louisiana_parish_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(0, 0, 0)")
        .attr("fill", function (d){
          d.total = dataLA.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorLA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(0, 0, 0)")
        .attr("d", path(topojson.mesh(LA, LA.objects.cb_2015_louisiana_parish_20m , function(a, b) { return a !== b; })
  ))}}; 

//////////////////////
////OHIO MAP START////
//////////////////////

function ohioMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-500, 500]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/OH.json")
    .defer(d3.csv, "csv/OhioBirthrateCounties.csv",function(d) { dataOH.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, OH) {

      if (error) throw error;
      var originalColorOH;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(OH, OH.objects.cb_2015_ohio_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(5, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataOH.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorOH);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(5, 0, 0)")
        .attr("d", path(topojson.mesh(OH, OH.objects.cb_2015_ohio_county_20m , function(a, b) { return a !== b; })
))}}; 

//////////////////
///OHIO MAP END///
//////////////////

//////////////////////
//KENTUCKY MAP START//
//////////////////////

function kentuckyMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3500)
      .translate([-280, 300]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/KY.json")
    .defer(d3.csv, "csv/KentuckyBirthrateCounties.csv",function(d) { dataKY.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, KY) {

      if (error) throw error;
      var originalColorKY;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(KY, KY.objects.cb_2015_kentucky_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(5, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataKY.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorKY);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(5, 0, 0)")
        .attr("d", path(topojson.mesh(KY, KY.objects.cb_2015_kentucky_county_20m , function(a, b) { return a !== b; })
))}}; 

///////////////////
//KENTUKY MAP END//
///////////////////
///////////////////////
//TENNESSEE MAP START//
///////////////////////
function tennesseeMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([-200, 300]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/TN.json")
    .defer(d3.csv, "csv/tennesseeBirthrateCounties.csv",function(d) { dataTN.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, TN) {

      if (error) throw error;
      var originalColorTN;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(TN, TN.objects.cb_2015_tennessee_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(5, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataTN.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorTN);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(5, 0, 0)")
        .attr("d", path(topojson.mesh(TN, TN.objects.cb_2015_tennessee_county_20m , function(a, b) { return a !== b; })
))}}; 
/////////////////////
//TENNESSEE MAP END//
/////////////////////
//////////////////////
//VIRGINIA MAP START//
//////////////////////

function virginiaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3400)
      .translate([-550, 350]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/VA.json")
    .defer(d3.csv, "csv/VirginiaBirthrateCounties.csv",function(d) { dataVA.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, VA) {

      if (error) throw error;
      var originalColorVA;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(VA, VA.objects.cb_2015_virginia_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(8, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataVA.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorVA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(8, 0, 0)")
        .attr("d", path(topojson.mesh(VA, VA.objects.cb_2015_virginia_county_20m , function(a, b) { return a !== b; })
))}}; 

///////////////////
//VIRGINIA MAP END//
///////////////////

///////////////////////////
//WEST VIRGINIA MAP START//
//////////////////////////

function westvirginiaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-500, 150]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/WV.json")
    .defer(d3.csv, "csv/WestVirginiaBirthrateCounties.csv",function(d) { dataWV.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, WV) {

      if (error) throw error;
      var originalColorWV;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(WV, WV.objects.cb_2015_west_virginia_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(55, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataWV.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorWV);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(55, 0, 0)")
        .attr("d", path(topojson.mesh(WV, WV.objects.cb_2015_west_virginia_county_20m , function(a, b) { return a !== b; })
))}}; 

/////////////////////////
//WEST VIRGINIA MAP END//
/////////////////////////
 
//////////////////////////
//PENNSYLVANIA MAP START//
//////////////////////////

function pennsylvaniaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-800, 600]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/PA.json")
    .defer(d3.csv, "csv/PennsylvaniaBirthrateCounties.csv",function(d) { dataPA.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, PA) {

      if (error) throw error;
      var originalColorPA;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(PA, PA.objects.cb_2015_pennsylvania_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(10, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataPA.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorPA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(10, 0, 0)")
        .attr("d", path(topojson.mesh(PA, PA.objects.cb_2015_pennsylvania_county_20m , function(a, b) { return a !== b; })
))}}; 

//////////////////////////
///PENNSYLVANIA MAP END///
/////////////////////////

/////////////////////
//VERMONT MAP START//
/////////////////////

function vermontMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(5000)
      .translate([-1300, 900]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/VT.json")
    .defer(d3.csv, "csv/VermontBirthrateCounties.csv",function(d) { dataVT.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, VT) {

      if (error) throw error;
      var originalColorVT;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(VT, VT.objects.cb_2015_vermont_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(12, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataVT.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorVT);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(VT, VT.objects.cb_2015_vermont_county_20m , function(a, b) { return a !== b; })
))}}; 

/////////////////////
///VERMONT MAP END///
/////////////////////

///////////////////////////
//NEW HAMPSHIRE MAP START//
///////////////////////////

function newhampshireMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(5000)
      .translate([-1400, 950]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/NH.json")
    .defer(d3.csv, "csv/NewHampshireBirthrateCounties.csv",function(d) { dataNH.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, NH) {

      if (error) throw error;
      var originalColorNH;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(NH, NH.objects.cb_2015_new_hampshire_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(12, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataNH.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorNH);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(NH, NH.objects.cb_2015_new_hampshire_county_20m , function(a, b) { return a !== b; })
))}}; 

///////////////////////////
///NEW HAMPSHIRE MAP END///
///////////////////////////

///////////////////////////
//MASSACHUSETTS MAP START//
///////////////////////////

function massachusettsMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(6000)
      .translate([-1700, 900]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/MA.json")
    .defer(d3.csv, "csv/MassachusettsBirthrateCounties.csv",function(d) { dataMA.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, MA) {

      if (error) throw error;
      var originalColorMA;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(MA, MA.objects.cb_2015_massachusetts_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(12, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataMA.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorMA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(MA, MA.objects.cb_2015_massachusetts_county_20m , function(a, b) { return a !== b; })
))}}; 

///////////////////////////
///MASSACHUSETTS MAP END///
///////////////////////////

/////////////////////////
//CONNECTICUT MAP START//
/////////////////////////

function connecticutMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(8000)
      .translate([-2200, 1000]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/CT.json")
    .defer(d3.csv, "csv/ConnecticutBirthrateCounties.csv",function(d) { dataCT.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, CT) {

      if (error) throw error;
      var originalColorCT;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(CT, CT.objects.cb_2015_connecticut_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(12, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataCT.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorCT);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(CT, CT.objects.cb_2015_connecticut_county_20m , function(a, b) { return a !== b; })
))}}; 

/////////////////////////
///CONNECTICUT MAP END///
/////////////////////////

//////////////////////
//DELAWARE MAP START//
//////////////////////

function delawareMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(8000)
      .translate([-2100, 600]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/DE.json")
    .defer(d3.csv, "csv/DelawareBirthrateCounties.csv",function(d) { dataDE.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, DE) {

      if (error) throw error;
      var originalColorDE;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(DE, DE.objects.cb_2015_delaware_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(12, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataDE.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorDE);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(DE, DE.objects.cb_2015_delaware_county_20m , function(a, b) { return a !== b; })
))}}; 

//////////////////////
///DELAWARE MAP END///
//////////////////////

//////////////////////////
//RHODE ISLAND MAP START//
//////////////////////////

function rhodeislandMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(13000)
      .translate([-4000, 1500]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/RI.json")
    .defer(d3.csv, "csv/RhodeIslandBirthrateCounties.csv",function(d) { dataRI.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, RI) {

      if (error) throw error;
      var originalColorRI;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(RI, RI.objects.cb_2015_rhode_island_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(15, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataRI.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorRI);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(15, 0, 0)")
        .attr("d", path(topojson.mesh(RI, RI.objects.cb_2015_rhode_island_county_20m , function(a, b) { return a !== b; })
))}}; 

//////////////////////////
///RHODE ISLAND MAP END///
//////////////////////////

/////////////////////
//OREGON MAP START//
////////////////////

function oregonMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([900, 850]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/OR.json")
     .defer(d3.csv, "csv/OregonBirthrateCounties.csv",function(d) { dataOR.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, OR) {

      if (error) throw error;
      var originalColorOR;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(OR, OR.objects.cb_2015_oregon_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("fill", function (d){
          d.total = dataOR.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorOR);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("d", path(topojson.mesh(OR, OR.objects.cb_2015_oregon_county_20m , function(a, b) { return a !== b; })
  ))}}; 

///////////////////
//OREGON MAP END///
///////////////////

///////////////////
//IDAHO MAP START//
///////////////////

function idahoMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([700, 850]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/ID.json")
     .defer(d3.csv, "csv/IdahoBirthrateCounties.csv",function(d) { dataID.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, ID) {

      if (error) throw error;
      var originalColorID;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(ID, ID.objects.cb_2015_idaho_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-12, 0, 0)")
        .attr("fill", function (d){
          d.total = dataID.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorID);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-12, 0, 0)")
        .attr("d", path(topojson.mesh(ID, ID.objects.cb_2015_idaho_county_20m , function(a, b) { return a !== b; })
  ))}}; 

//////////////////
//IDAHO MAP END///
//////////////////

//////////////////////////
//NORTH DAKOTA MAP START//
//////////////////////////

function northdakotaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([300, 850]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/ND.json")
     .defer(d3.csv, "csv/NorthDakotaBirthrateCounties.csv",function(d) { dataND.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, ND) {

      if (error) throw error;
      var originalColorND;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(ND, ND.objects.cb_2015_north_dakota_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-5, 0, 0)")
        .attr("fill", function (d){
          d.total = dataND.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorND);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-5, 0, 0)")
        .attr("d", path(topojson.mesh(ND, ND.objects.cb_2015_north_dakota_county_20m , function(a, b) { return a !== b; })
  ))}}; 

/////////////////////////
//NORTH DAKOTA MAP END///
////////////////////////

//////////////////////////
//SOUTH DAKOTA MAP START//
//////////////////////////

function southdakotaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([300, 750]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/SD.json")
     .defer(d3.csv, "csv/SouthDakotaBirthrateCounties.csv",function(d) { dataSD.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, SD) {

      if (error) throw error;
      var originalColorSD;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(SD, SD.objects.cb_2015_south_dakota_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-5, 0, 0)")
        .attr("fill", function (d){
          d.total = dataSD.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorSD);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-5, 0, 0)")
        .attr("d", path(topojson.mesh(SD, SD.objects.cb_2015_south_dakota_county_20m , function(a, b) { return a !== b; })
  ))}}; 

/////////////////////////
//SOUTH DAKOTA MAP END///
////////////////////////

////////////////////
//NEVADA MAP START//
////////////////////
function nevadaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2800)
      .translate([880, 500]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/NV.json")
     .defer(d3.csv, "csv/NevadaBirthrateCounties.csv",function(d) { dataNV.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, NV) {

      if (error) throw error;
      var originalColorNV;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NV, NV.objects.cb_2015_nevada_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-14, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNV.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNV);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-14, 0, 0)")
        .attr("d", path(topojson.mesh(NV, NV.objects.cb_2015_nevada_county_20m , function(a, b) { return a !== b; })
  ))}}; 
//////////////////
//NEVADA MAP END//
//////////////////

//////////////////
//UTAH MAP START//
//////////////////
function utahMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2800)
      .translate([600, 500]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/UT.json")
     .defer(d3.csv, "csv/UtahBirthrateCounties.csv",function(d) { dataUT.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, UT) {

      if (error) throw error;
      var originalColorUT;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(UT, UT.objects.cb_2015_utah_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-11, 0, 0)")
        .attr("fill", function (d){
          d.total = dataUT.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorUT);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-11, 0, 0)")
        .attr("d", path(topojson.mesh(UT, UT.objects.cb_2015_utah_county_20m , function(a, b) { return a !== b; })
  ))}}; 
////////////////
//UTAH MAP END//
////////////////

/////////////////////
//MONTANA MAP START//
/////////////////////

function montanaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2500)
      .translate([500, 800]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/MT.json")
     .defer(d3.csv, "csv/MontanaBirthrateCounties.csv",function(d) { dataMT.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, MT) {

      if (error) throw error;
      var originalColorMT;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(MT, MT.objects.cb_2015_montana_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-10, 0, 0)")
        .attr("fill", function (d){
          d.total = dataMT.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorMT);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-10, 0, 0)")
        .attr("d", path(topojson.mesh(MT, MT.objects.cb_2015_montana_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////
//MONTANA MAP END///
////////////////////

/////////////////////
//WYOMING MAP START//
/////////////////////

function wyomingMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([500, 700]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/WY.json")
     .defer(d3.csv, "csv/WyomingBirthrateCounties.csv",function(d) { dataWY.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, WY) {

      if (error) throw error;
      var originalColorWY;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(WY, WY.objects.cb_2015_wyoming_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-8, 0, 0)")
        .attr("fill", function (d){
          d.total = dataWY.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorWY);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-8, 0, 0)")
        .attr("d", path(topojson.mesh(WY, WY.objects.cb_2015_wyoming_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////
//WYOMING MAP END///
////////////////////

//////////////////////////
///NEW MEXICO MAP START///
/////////////////////////
function newmexicoMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([550, 200]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/NM.json")
     .defer(d3.csv, "csv/NewMexicoBirthrateCounties.csv",function(d) { dataNM.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, NM) {

      if (error) throw error;
      var originalColorNM;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NM, NM.objects.cb_2015_new_mexico_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-8, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNM.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNM);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-8, 0, 0)")
        .attr("d", path(topojson.mesh(NM, NM.objects.cb_2015_new_mexico_county_20m , function(a, b) { return a !== b; })
  ))}}; 
////////////////////////
///NEW MEXICO MAP END///
////////////////////////
//////////////////////
//MISSOURI MAP START//
//////////////////////
function missouriMap() {
  
  var projection = d3.geoAlbersUsa()
    .scale(3500)
    .translate([-50, 400]);
      
  var path = d3.geoPath()
    .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/MO.json")
    .defer(d3.csv, "csv/MissouriBirthrateCounties.csv",function(d) { dataMO.set(d.County, + d.BirthRate)})
    .await(ready);
    
  function ready(error, MO) {

    if (error) throw error;
    var originalColorMO;
    svg_state.call(tipIN);
    svg_state.append("g")
             .attr("class", "counties states")
             .selectAll("path")
             .data(topojson.feature(MO, MO.objects.cb_2015_missouri_county_20m).features)
             .enter().append("path")
             .attr("d", path)
             .attr("transform", "rotate(1, 0, 0)")
             .attr("fill", function (d){
                d.total = dataMO.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

             .on("mouseover", function(d){
                tipIN.show(d);
                d3.select(this)
                  .style("fill","blue");})

             .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorMO);})
    
    svg_state.append("path")
             .attr("class", "county-borders states")
             .attr("transform", "rotate(1, 0, 0)")
             .attr("d", path(topojson.mesh(MO, MO.objects.cb_2015_missouri_county_20m , function(a, b) { return a !== b; })
    
))}}; 
//////////////////////
//MISSOURI MAP END//
//////////////////////

///////////////////
//IOWA MAP START//
//////////////////
function iowaMap() {
  
  var projection = d3.geoAlbersUsa()
    .scale(3500)
    .translate([50, 550]);
      
  var path = d3.geoPath()
    .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/IA.json")
    .defer(d3.csv, "csv/IowaBirthrateCounties.csv",function(d) { dataIA.set(d.County, + d.BirthRate)})
    .await(ready);
    
  function ready(error, IA) {

    if (error) throw error;
    var originalColorIA;
    svg_state.call(tipIN);
    svg_state.append("g")
             .attr("class", "counties states")
             .selectAll("path")
             .data(topojson.feature(IA, IA.objects.cb_2015_iowa_county_20m).features)
             .enter().append("path")
             .attr("d", path)
             .attr("transform", "rotate(1, 0, 0)")
             .attr("fill", function (d){
                d.total = dataIA.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

             .on("mouseover", function(d){
                tipIN.show(d);
                d3.select(this)
                  .style("fill","blue");})

             .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorIA);})

    
    svg_state.append("path")
             .attr("class", "county-borders states")
             .attr("transform", "rotate(1, 0, 0)")
             .attr("d", path(topojson.mesh(IA, IA.objects.cb_2015_iowa_county_20m , function(a, b) { return a !== b; })
    
))}}; 
////////////////
//IOWA MAP END//
////////////////

///////////////////
//MINNESOTA MAP START//
//////////////////
function minnesotaMap() {
  
  var projection = d3.geoAlbersUsa()
    .scale(3000)
    .translate([50, 800]);
      
  var path = d3.geoPath()
    .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/MN.json")
    .defer(d3.csv, "csv/MinnesotaBirthrateCounties.csv",function(d) { dataMN.set(d.County, + d.BirthRate)})
    .await(ready);
    
  function ready(error, MN) {

    if (error) throw error;
    var originalColorMN;
    svg_state.call(tipIN);
    svg_state.append("g")
             .attr("class", "counties states")
             .selectAll("path")
             .data(topojson.feature(MN, MN.objects.cb_2015_minnesota_county_20m).features)
             .enter().append("path")
             .attr("d", path)
             .attr("transform", "rotate(1, 0, 0)")
             .attr("fill", function (d){
                d.total = dataMN.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

             .on("mouseover", function(d){
                tipIN.show(d);
                d3.select(this)
                  .style("fill","blue");})

             .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorMN);})
    
    svg_state.append("path")
             .attr("class", "county-borders states")
             .attr("transform", "rotate(1, 0, 0)")
             .attr("d", path(topojson.mesh(MN, MN.objects.cb_2015_minnesota_county_20m , function(a, b) { return a !== b; })
    
))}}; 
//////////////////////
//MINNESOTA MAP END//
//////////////////////

/////////////////////
//COLORADO MAP START//
/////////////////////

function coloradoMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([480, 520]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/CO.json")
     .defer(d3.csv, "csv/ColoradoBirthrateCounties.csv",function(d) { dataCO.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, CO) {

      if (error) throw error;
      var originalColorCO;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(CO, CO.objects.cb_2015_colorado_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-7, 0, 0)")
        .attr("fill", function (d){
          d.total = dataCO.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorCO);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-7, 0, 0)")
        .attr("d", path(topojson.mesh(CO, CO.objects.cb_2015_colorado_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////
//COLORADO MAP END///
////////////////////

//////////////////////
//NEBRASKA MAP START//
//////////////////////

function nebraskaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([250, 600]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/NE.json")
     .defer(d3.csv, "csv/NebraskaBirthrateCounties.csv",function(d) { dataNE.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, NE) {

      if (error) throw error;
      var originalColorNE;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NE, NE.objects.cb_2015_nebraska_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-3, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNE.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNE);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-3, 0, 0)")
        .attr("d", path(topojson.mesh(NE, NE.objects.cb_2015_nebraska_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////
//NEBRASKA MAP END//
////////////////////

////////////////////
//KANSAS MAP START//
////////////////////

function kansasMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([200, 450]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/KS.json")
     .defer(d3.csv, "csv/KansasBirthrateCounties.csv",function(d) { dataKS.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, KS) {

      if (error) throw error;
      var originalColorKS;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(KS, KS.objects.cb_2015_kansas_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-3, 0, 0)")
        .attr("fill", function (d){
          d.total = dataKS.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorKS);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-3, 0, 0)")
        .attr("d", path(topojson.mesh(KS, KS.objects.cb_2015_kansas_county_20m , function(a, b) { return a !== b; })
  ))}}; 

//////////////////
//KANSAS MAP END//
//////////////////

///////////////////////
//HAWAII MAP START////
//////////////////////
function hawaiiMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([530, -150]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/HI.json")
     .defer(d3.csv, "csv/HawaiiBirthrateCounties.csv",function(d) { dataHI.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, HI) {

      if (error) throw error;
      var originalColorHI;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(HI, HI.objects.cb_2015_hawaii_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-30, 0, 0)")
        .attr("fill", function (d){
          d.total = dataHI.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorHI);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-30, 0, 0)")
        .attr("d", path(topojson.mesh(HI, HI.objects.cb_2015_hawaii_county_20m , function(a, b) { return a !== b; })
  ))}}; }

///////////////////////
/////HAWAII MAP END////
///////////////////////
////////////////////////
//END STATE/COUNTY MAPS//
/////////////////////////

////////////
//BUTTON 3//
////////////
function birthRates(){  
d3.queue()
  .defer(d3.json, "https:d3js.org/us-10m.v1.json")
  .defer(d3.csv, "csv/teenbirth_2015.csv",function(d) {
    dataBirthRates.set(d.id, + d.BirthRate)
  })
  .await(ready);

////////////////////////
//READY FUNCTION START//
////////////////////////
function ready(error, us) {
  if (error) throw error;
  
    var originalColor;

  svg_us.call(tipBirthRate);
  

  svg_us.append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)

        .attr("fill", function (d){	
          d.total = dataBirthRates.get(d.id) || 0
          return colorScaleIN(d.total);})
          
        .on("mouseover", function(d){
          d3.select(this)
            .style("fill","blue");
          //console.log(dataSexEdTT.get(d.id))
          tipBirthRate.show(d);})
            
        .on("mouseout", function(d){
          d3.select(this)
            .style("fill", originalColor);
          tipBirthRate.hide(d);})

        .on("click", function (d){ 
        //console.log(d.id);
        console.log(d.total);
          d3.selectAll(".states").remove()
          
          if(d.id == 01){
             alabamaMap();
          }
	  	  else if(d.id == 02){
			  alaskaMap();
		  }
	  	  else if(d.id == 04){
             arizonaMap();
          }
          else if(d.id == 05){
             arkansasMap();
          }
	  	  else if(d.id == 06){
             californiaMap();
          }
	  	  else if(d.id == 08){
			 coloradoMap();
		  }
	  	  else if(d.id == 09){
			  connecticutMap();
		  }
	  	  else if(d.id == 10){
			  delawareMap();
		  }
	  	  else if(d.id == 12){
              floridaMap();
          }
	      else if(d.id == 13){
			  georgiaMap();
		  }
	   	  else if(d.id == 15){
			  hawaiiMap();
		  }
	  	  else if(d.id == 16){
			  idahoMap();
		  }
	  	  else if(d.id == 17){
			  illinoisMap();
		  }
	  	  else if(d.id == 18){
              indianaMap();
          }
	  	  else if(d.id == 19){
			  iowaMap();
		  }
	  	  else if(d.id == 20){
			  kansasMap();
		  }
	      else if(d.id == 21){
			  kentuckyMap();
		  }
	  	  else if(d.id == 22){
			  louisianaMap();
		  }
	  	  else if(d.id == 23){
			  maineMap();
		  }
          else if(d.id == 24){
              marylandMap();
			  
          }
	  	  else if(d.id == 25){
			  massachusettsMap();
		  }
	  	  else if(d.id == 26){
			 michiganMap();
		  }
	  	  else if(d.id == 27){
			 minnesotaMap();
		  }
	  	  else if(d.id == 28){
			  mississippiMap();
		  }
	  	  else if(d.id == 29){
			  missouriMap();
		  }
	  	  else if(d.id == 30){
			  montanaMap();
		  }
	  	  else if(d.id == 31){
			  nebraskaMap();
		  }
	  	  else if(d.id == 32){
			  nevadaMap();
		  }
	  	  else if(d.id == 33){
			  newhampshireMap();
		  }
	  	  else if(d.id == 34){
			  newjerseyMap();
		  }
	  	  else if(d.id == 35){
			  newmexicoMap();
		  }
	  	  else if(d.id == 36){
              newyorkMap();
          }
	  	  else if(d.id == 37){
			  northcarolinaMap();
		  }
	  	  else if(d.id == 38){
			  northdakotaMap();
		  }
	  	  else if(d.id == 39){
			  ohioMap();
		  }
	  	  else if(d.id == 40){
			  oklahomaMap();
		  }
	  	  else if(d.id == 41){
			  oregonMap();
		  }
	  	  else if(d.id == 42){
			  pennsylvaniaMap();
		  }
	  	  else if(d.id == 44){
			  rhodeislandMap();
		  }
	      else if(d.id == 45){
			  southcarolinaMap();
		  }
	  	  else if(d.id == 46){
			  southdakotaMap();
		  }
	      else if(d.id == 47){
			  tennesseeMap();
		  }
          else if(d.id == 48){
              texasMap();
          }
	  	  else if(d.id == 49){
			  utahMap();
		  }
	  	  else if(d.id == 50){
			  vermontMap();
		  }
	  	  else if(d.id == 51){
			  virginiaMap();
		  }
	  	  else if(d.id == 53){
			  washingtonMap();
		  }
	      else if(d.id == 54){
			  westvirginiaMap();
		  }
	  	  else if(d.id == 55){
			  wisconsinMap();
		  }
	  	  else if(d.id == 56){
			  wyomingMap();
		  }

        })
       
  
    svg_us.append("path")
        .attr("class", "county-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
};
//////////////////////
//READY FUNCTION END//
//////////////////////

var originalColor;

//////////////////
//BUTTON 1 BEGIN//
//////////////////

/*document.getElementById("button1").onclick = function() {
  function ready(error, us) {
    if (error) throw error;
  
    svg_us.call(tipUS);
  
    svg_us.append("g")
          .attr("class", "counties")
          .selectAll("path")
          .data(topojson.feature(us, us.objects.states).features)
          .enter().append("path")
          .attr("d", path)
  
          .attr("fill", function (d){	
            d.total = dataUS.get(d.id) || 0
            return colorScaleUS(d.total);})
            
          .on("mouseover", function(d){
            d3.select(this)
              .style("fill","blue");
            tipUS.show(d.total);})
              
          .on("mouseout", function(d){
            d3.select(this)
              .style("fill", originalColor);
            tipUS.hide(d.total);})
         
      svg_us.append("path")
          .attr("class", "county-borders")
          .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
  };

console.log(dataUS)

}
////////////////
//BUTTON 1 END//
////////////////

//////////////////
//BUTTON 2 BEGIN//
//////////////////
document.getElementById("button2").onclick = function() {
  function ready(error, us) {
    if (error) throw error;
  
    svg_us.call(tipUS);
  
    svg_us.append("g")
          .attr("class", "counties")
          .selectAll("path")
          .data(topojson.feature(us, us.objects.states).features)
          .enter().append("path")
          .attr("d", path)
  
          .attr("fill", function (d){	
            d.total = dataAbs.get(d.id) || 0
            return colorScaleAbs(d.total);})
            
          .on("mouseover", function(d){
            d3.select(this)
              .style("fill","blue");
            tipUS.show(d.total);})
              
          .on("mouseout", function(d){
            d3.select(this)
              .style("fill", originalColor);
            tipUS.hide(d.total);})
         
      svg_us.append("path")
          .attr("class", "county-borders")
          .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
  };

      console.log(dataAbs)


}
////////////////
//BUTTON 2 END//
////////////////*/
    
///////////////////////////
//BEGIN STATE/COUNTY MAPS//
///////////////////////////

//////////////////////
//ARKANSAS MAP START//
//////////////////////
function arkansasMap() {
  
  var projection = d3.geoAlbersUsa()
    .scale(4500)
    .translate([-50, 0]);
      
  var path = d3.geoPath()
    .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/AR.json")
    .defer(d3.csv, "csv/ArkansasBirthrateCounties.csv",function(d) { dataAR.set(d.County, + d.BirthRate)})
    .await(ready);
    
  function ready(error, AR) {

    if (error) throw error;
    var originalColorAR;
    svg_state.call(tipIN);
    svg_state.append("g")
             .attr("class", "counties states")
             .selectAll("path")
             .data(topojson.feature(AR, AR.objects.cb_2015_arkansas_county_20m).features)
             .enter().append("path")
             .attr("d", path)
             .attr("transform", "rotate(1, 0, 0)")
             .attr("fill", function (d){
                d.total = dataAR.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

             .on("mouseover", function(d){
                tipIN.show(d);
                d3.select(this)
                  .style("fill","blue");})

             .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorAR);})
    
    svg_state.append("path")
             .attr("class", "county-borders states")
             .attr("transform", "rotate(1, 0, 0)")
             .attr("d", path(topojson.mesh(AR, AR.objects.cb_2015_arkansas_county_20m , function(a, b) { return a !== b; })
    
))}}; 
//////////////////////
//ARKANSAS MAP END////
//////////////////////

/////////////////////
//ALABAMA MAP START//
/////////////////////
function alabamaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(5000)
      .translate([-500, -200]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
      .defer(d3.json, "json/AL.json")
      .defer(d3.csv, "csv/AlabamaBirthrateCounties.csv",function(d) { dataAL.set(d.County, + d.BirthRate)})
      .await(ready);
    
    function ready(error, AL) {

      if (error) throw error;
      var originalColorAL;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(AL, AL.objects.cb_2015_alabama_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(4, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataAL.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

              .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorAL);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(4, 0, 0)")
        .attr("d", path(topojson.mesh(AL, AL.objects.cb_2015_alabama_county_20m , function(a, b) { return a !== b; })
))}};
///////////////////
//ALABAMA MAP END//
///////////////////


/////////////////////
//INDIANA MAP START//
/////////////////////
function indianaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(5000)
      .translate([-500, 450]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/IN.json")
    .defer(d3.csv, "csv/IndianaBirthrateCounties.csv",function(d) { dataIN.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, IN) {

      if (error) throw error;
      var originalColorIN;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(IN, IN.objects.cb_2015_indiana_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(5, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataIN.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorIN);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(5, 0, 0)")
        .attr("d", path(topojson.mesh(IN, IN.objects.cb_2015_indiana_county_20m , function(a, b) { return a !== b; })
))}}; 
///////////////////
//INDIANA MAP END//
///////////////////

//////////////////////
//NEW YORK MAP START//
//////////////////////
function newyorkMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([-600, 600]);
      
  var path = d3.geoPath()
      .projection(projection);
  svg_state.call(tipIN);	
  d3.queue()
     .defer(d3.json, "json/NY.json")
     .defer(d3.csv, "csv/NewYorkBirthrateCounties.csv",function(d) { dataNY.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, NY) {

      if (error) throw error;
      var originalColorNY;
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NY, NY.objects.cb_2015_new_york_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(9, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNY.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNY);})
      
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(9, 0, 0)")
        .attr("d", path(topojson.mesh(NY, NY.objects.cb_2015_new_york_county_20m , function(a, b) { return a !== b; })
  ))}};
////////////////////
//NEW YORK MAP END//
////////////////////
  
//////////////////////
//MARYLAND MAP START//
//////////////////////
function marylandMap() {

  svg_state.call(tipIN)
  var projection = d3.geoAlbersUsa()
      .scale(6000)
      .translate([-1350, 550]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
      .defer(d3.json, "json/MD.json")
      .defer(d3.csv, "csv/MarylandBirthrateCounties.csv",function(d) { dataMD.set(d.County, + d.BirthRate)})
      .await(ready);
    
    function ready(error, MD) {

      if (error) throw error;
      var originalColorMD;
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(MD, MD.objects.cb_2015_maryland_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(10, 0, 0)")
               .attr("fill", function (d){
                d.total = dataMD.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                tipIN.show(d); 
                d3.select(this)
                  .style("fill","blue");})

              .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorMD);})
      
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(10, 0, 0)")
        .attr("d", path(topojson.mesh(MD, MD.objects.cb_2015_maryland_county_20m , function(a, b) { return a !== b; })
))}};
////////////////////
//MARYLAND MAP END//
////////////////////
  
////////////////////////
//CALIFORNIA MAP START//
////////////////////////
function californiaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2500)
      .translate([850, 450]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/CA.json")
     .defer(d3.csv, "csv/CaliforniaBirthrateCounties.csv",function(d) { dataCA.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, CA) {

      if (error) throw error;
      var originalColorCA;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(CA, CA.objects.cb_2015_california_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("fill", function (d){
          d.total = dataCA.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorCA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("d", path(topojson.mesh(CA, CA.objects.cb_2015_california_county_20m , function(a, b) { return a !== b; })
  ))}}; 
//////////////////////
//CALIFORNIA MAP END//
//////////////////////

///////////////////
//TEXAS MAP START//
///////////////////
function texasMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2000)
      .translate([300, 100]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/TX.json")
     .defer(d3.csv, "csv/TexasBirthrateCounties.csv",function(d) { dataTX.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, TX) {

      if (error) throw error;
      var originalColorTX;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(TX, TX.objects.cb_2015_texas_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-4, 0, 0)")
        .attr("fill", function (d){
          d.total = dataTX.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorTX);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-4, 0, 0)")
        .attr("d", path(topojson.mesh(TX, TX.objects.cb_2015_texas_county_20m , function(a, b) { return a !== b; })
  ))}}; 
/////////////////
//TEXAS MAP END//
/////////////////
function newjerseyMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(7000)
      .translate([-2020, 750]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/NJ.json")
     .defer(d3.csv, "csv/NewJerseyBirthrateCounties.csv",function(d) { dataNJ.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, NJ) {

      if (error) throw error;
      var originalColorNJ;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NJ, NJ.objects.cb_2015_new_jersey_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-20, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNJ.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNJ);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-20, 0, 0)")
        .attr("d", path(topojson.mesh(NJ, NJ.objects.cb_2015_new_jersey_county_20m , function(a, b) { return a !== b; })
  ))}}; 

/////////////////////////
//NEW JERSEY MAP END/////
/////////////////////////

///////////////////////
//ALASKA MAP START////
//////////////////////
function alaskaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([1050, -150]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/AK.json")
     .defer(d3.csv, "csv/AlaskaBirthrateCounties.csv",function(d) { dataAK.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, AK) {

      if (error) throw error;
      var originalColorAK;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(AK, AK.objects.cb_2015_alaska_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(8, 0, 0)")
        .attr("fill", function (d){
          d.total = dataAK.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorAK);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(8, 0, 0)")
        .attr("d", path(topojson.mesh(AK, AK.objects.cb_2015_alaska_county_20m , function(a, b) { return a !== b; })
  ))}}; 

///////////////////////
/////ALASKA MAP END////
///////////////////////
///////////////////////
//ILLINOIS MAP START///
///////////////////////
function illinoisMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([-200, 400]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/IL.json")
     .defer(d3.csv, "csv/IllinoisBirthrateCounties.csv",function(d) { dataIL.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, IL) {

      if (error) throw error;
      var originalColorIL;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(IL, IL.objects.cb_2015_illinois_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(2, 0, 0)")
        .attr("fill", function (d){
          d.total = dataIL.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorIL);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(2, 0, 0)")
        .attr("d", path(topojson.mesh(IL, IL.objects.cb_2015_illinois_county_20m , function(a, b) { return a !== b; })
  ))}}; 
////////////////////////
/////ILLINOIS MAP END///
////////////////////////
///////////////////////
//WISCONSIN MAP START//
///////////////////////
function wisconsinMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-150, 750]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/WI.json")
     .defer(d3.csv, "csv/WisconsinBirthrateCounties.csv",function(d) { dataWI.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, WI) {

      if (error) throw error;
      var originalColorWI;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(WI, WI.objects.cb_2015_wisconsin_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(2, 0, 0)")
        .attr("fill", function (d){
          d.total = dataWI.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorWI);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(2, 0, 0)")
        .attr("d", path(topojson.mesh(WI, WI.objects.cb_2015_wisconsin_county_20m , function(a, b) { return a !== b; })
  ))}}; 


////////////////////////
///WISCONSIN MAP END////
////////////////////////
////////////////////////
/////FLORIDA MAP START//
////////////////////////

function floridaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2000)
      .translate([-250, 0]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/FL.json")
     .defer(d3.csv, "csv/FloridaBirthrateCounties.csv",function(d) { dataFL.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, FL) {

      if (error) throw error;
      var originalColorFL;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(FL, FL.objects.cb_2015_florida_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(2, 0, 0)")
        .attr("fill", function (d){
          d.total = dataFL.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorFL);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(2, 0, 0)")
        .attr("d", path(topojson.mesh(FL, FL.objects.cb_2015_florida_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
////FLORIDA MAP END/////
////////////////////////

////////////////////////
//WASHINGTON MAP START//
////////////////////////

function washingtonMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([900, 1000]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/WA.json")
     .defer(d3.csv, "csv/WashingtonBirthrateCounties.csv",function(d) { dataWA.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, WA) {

      if (error) throw error;
      var originalColorWA;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(WA, WA.objects.cb_2015_washington_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("fill", function (d){
          d.total = dataWA.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorWA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("d", path(topojson.mesh(WA, WA.objects.cb_2015_washington_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
///WASHINGTON MAP END///
////////////////////////

////////////////////////
////MAINE MAP START////
////////////////////////

function maineMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-1150, 900]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/ME.json")
     .defer(d3.csv, "csv/MaineBirthrateCounties.csv",function(d) { dataME.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, ME) {

      if (error) throw error;
      var originalColorME;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(ME, ME.objects.cb_2015_maine_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(14, 0, 0)")
        .attr("fill", function (d){
          d.total = dataME.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorME);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(14, 0, 0)")
        .attr("d", path(topojson.mesh(ME, ME.objects.cb_2015_maine_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
/////MAINE MAP END//////
////////////////////////

////////////////////////
///ARIZONA MAP START///
///////////////////////
function arizonaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([800, 200]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/AZ.json")
     .defer(d3.csv, "csv/ArizonaBirthrateCounties.csv",function(d) { dataAZ.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, AZ) {

      if (error) throw error;
      var originalColorAZ;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(AZ, AZ.objects.cb_2015_arizona_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-10, 0, 0)")
        .attr("fill", function (d){
          d.total = dataAZ.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorAZ);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-10, 0, 0)")
        .attr("d", path(topojson.mesh(AZ, AZ.objects.cb_2015_arizona_county_20m , function(a, b) { return a !== b; })
  ))}}; 
//////////////////////
///ARIZONA MAP END///
//////////////////////

///////////////////////
//MICHIGAN MAP START//
///////////////////////
function michiganMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([-200, 650]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/MI.json")
     .defer(d3.csv, "csv/MichiganBirthrateCounties.csv",function(d) { dataMI.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, MI) {

      if (error) throw error;
      var originalColorMI;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(MI, MI.objects.cb_2015_michigan_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(4, 0, 0)")
        .attr("fill", function (d){
          d.total = dataMI.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorMI);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(4, 0, 0)")
        .attr("d", path(topojson.mesh(MI, MI.objects.cb_2015_michigan_county_20m , function(a, b) { return a !== b; })
  ))}}; 


////////////////////////
///MICHIGAN MAP END////
////////////////////////

////////////////////////
////GEORGIA MAP START//
////////////////////////

function georgiaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-600, -50]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/GA.json")
     .defer(d3.csv, "csv/GeorgiaBirthrateCounties.csv",function(d) { dataGA.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, GA) {

      if (error) throw error;
      var originalColorGA;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(GA, GA.objects.cb_2015_georgia_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(5, 0, 0)")
        .attr("fill", function (d){
          d.total = dataGA.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorGA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(5, 0, 0)")
        .attr("d", path(topojson.mesh(GA, GA.objects.cb_2015_georgia_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
////GEORGIA MAP END/////
////////////////////////

/////////////////////////
//MISSISSIPPI MAP START//
/////////////////////////

function mississippiMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-250, -100]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/MS.json")
     .defer(d3.csv, "csv/MississippiBirthrateCounties.csv",function(d) { dataMS.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, MS) {

      if (error) throw error;
      var originalColorMS;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(MS, MS.objects.cb_2015_mississippi_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(3, 0, 0)")
        .attr("fill", function (d){
          d.total = dataMS.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorMS);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(3, 0, 0)")
        .attr("d", path(topojson.mesh(MS, MS.objects.cb_2015_mississippi_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
//MISSISSIPPI MAP END///
////////////////////////

////////////////////////////
//SOUTH CAROLINA MAP START//
////////////////////////////
function southcarolinaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-720, 150]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/SC.json")
     .defer(d3.csv, "csv/SouthCarolinaBirthrateCounties.csv",function(d) { dataSC.set(d.County, + d.BirthRate)})
     .await(ready);
	
    function ready(error, SC) {

      if (error) throw error;
      var originalColorSC;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(SC, SC.objects.cb_2015_south_carolina_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(2, 0, 0)")
        .attr("fill", function (d){
          d.total = dataSC.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorSC);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(2, 0, 0)")
        .attr("d", path(topojson.mesh(SC, SC.objects.cb_2015_south_carolina_county_20m , function(a, b) { return a !== b; })
  ))}}; 

//////////////////////////
//SOUTH CAROLINA MAP END//
//////////////////////////

////////////////////////////
//NORTH CAROLINA MAP START//
////////////////////////////
function northcarolinaMap() {
  var projection = d3.geoAlbersUsa()
      .scale(3500)
      .translate([-540, 175]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/NC.json")
     .defer(d3.csv, "csv/NorthCarolinaBirthrateCounties.csv",function(d) { dataNC.set(d.County, + d.BirthRate)})
     .await(ready);
	
    function ready(error, NC) {

      if (error) throw error;
      var originalColorNC;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NC, NC.objects.cb_2015_north_carolina_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(8, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNC.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNC);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(8, 0, 0)")
        .attr("d", path(topojson.mesh(NC, NC.objects.cb_2015_north_carolina_county_20m , function(a, b) { return a !== b; })
  ))}}; 

//////////////////////////
//NORTH CAROLINA MAP END//
//////////////////////////

//////////////////////
//OKLAHOMA MAP START//
//////////////////////
function oklahomaMap() {
  
  var projection = d3.geoAlbersUsa()
    .scale(2500)
    .translate([200, 250]);
      
  var path = d3.geoPath()
    .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/OK.json")
    .defer(d3.csv, "csv/OklahomaBirthrateCounties.csv",function(d) { dataOK.set(d.County, + d.BirthRate)})
    .await(ready);
    
  function ready(error, OK) {

    if (error) throw error;
    var originalColorOK;
    svg_state.call(tipIN);
    svg_state.append("g")
             .attr("class", "counties states")
             .selectAll("path")
             .data(topojson.feature(OK, OK.objects.cb_2015_oklahoma_county_20m).features)
             .enter().append("path")
             .attr("d", path)
             .attr("transform", "rotate(-3, 0, 0)")
             .attr("fill", function (d){
                d.total = dataOK.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

             .on("mouseover", function(d){
                tipIN.show(d);
                d3.select(this)
                  .style("fill","blue");})

             .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorOK);})
    
    svg_state.append("path")
             .attr("class", "county-borders states")
             .attr("transform", "rotate(-3, 0, 0)")
             .attr("d", path(topojson.mesh(OK, OK.objects.cb_2015_oklahoma_county_20m , function(a, b) { return a !== b; })
    
))}}; 
//////////////////////
//OKLAHOMA MAP END////
//////////////////////

///////////////////////
//LOUISIANA MAP START//
///////////////////////

function louisianaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3500)
      .translate([-100, -50]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/LA.json")
     .defer(d3.csv, "csv/LouisianaBirthrateCounties.csv",function(d) { dataLA.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, LA) {

      if (error) throw error;
      var originalColorLA;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(LA, LA.objects.cb_2015_louisiana_parish_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(0, 0, 0)")
        .attr("fill", function (d){
          d.total = dataLA.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorLA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(0, 0, 0)")
        .attr("d", path(topojson.mesh(LA, LA.objects.cb_2015_louisiana_parish_20m , function(a, b) { return a !== b; })
  ))}}; 

//////////////////////
////OHIO MAP START////
//////////////////////

function ohioMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-500, 500]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/OH.json")
    .defer(d3.csv, "csv/OhioBirthrateCounties.csv",function(d) { dataOH.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, OH) {

      if (error) throw error;
      var originalColorOH;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(OH, OH.objects.cb_2015_ohio_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(5, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataOH.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorOH);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(5, 0, 0)")
        .attr("d", path(topojson.mesh(OH, OH.objects.cb_2015_ohio_county_20m , function(a, b) { return a !== b; })
))}}; 

//////////////////
///OHIO MAP END///
//////////////////

//////////////////////
//KENTUCKY MAP START//
//////////////////////

function kentuckyMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3500)
      .translate([-280, 300]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/KY.json")
    .defer(d3.csv, "csv/KentuckyBirthrateCounties.csv",function(d) { dataKY.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, KY) {

      if (error) throw error;
      var originalColorKY;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(KY, KY.objects.cb_2015_kentucky_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(5, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataKY.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorKY);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(5, 0, 0)")
        .attr("d", path(topojson.mesh(KY, KY.objects.cb_2015_kentucky_county_20m , function(a, b) { return a !== b; })
))}}; 

///////////////////
//KENTUKY MAP END//
///////////////////
///////////////////////
//TENNESSEE MAP START//
///////////////////////
function tennesseeMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([-200, 300]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/TN.json")
    .defer(d3.csv, "csv/tennesseeBirthrateCounties.csv",function(d) { dataTN.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, TN) {

      if (error) throw error;
      var originalColorTN;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(TN, TN.objects.cb_2015_tennessee_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(5, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataTN.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorTN);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(5, 0, 0)")
        .attr("d", path(topojson.mesh(TN, TN.objects.cb_2015_tennessee_county_20m , function(a, b) { return a !== b; })
))}}; 
/////////////////////
//TENNESSEE MAP END//
/////////////////////
//////////////////////
//VIRGINIA MAP START//
//////////////////////

function virginiaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3400)
      .translate([-550, 350]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/VA.json")
    .defer(d3.csv, "csv/VirginiaBirthrateCounties.csv",function(d) { dataVA.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, VA) {

      if (error) throw error;
      var originalColorVA;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(VA, VA.objects.cb_2015_virginia_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(8, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataVA.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorVA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(8, 0, 0)")
        .attr("d", path(topojson.mesh(VA, VA.objects.cb_2015_virginia_county_20m , function(a, b) { return a !== b; })
))}}; 

///////////////////
//VIRGINIA MAP END//
///////////////////

///////////////////////////
//WEST VIRGINIA MAP START//
//////////////////////////

function westvirginiaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-500, 150]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/WV.json")
    .defer(d3.csv, "csv/WestVirginiaBirthrateCounties.csv",function(d) { dataWV.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, WV) {

      if (error) throw error;
      var originalColorWV;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(WV, WV.objects.cb_2015_west_virginia_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(55, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataWV.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorWV);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(55, 0, 0)")
        .attr("d", path(topojson.mesh(WV, WV.objects.cb_2015_west_virginia_county_20m , function(a, b) { return a !== b; })
))}}; 

/////////////////////////
//WEST VIRGINIA MAP END//
/////////////////////////
 
//////////////////////////
//PENNSYLVANIA MAP START//
//////////////////////////

function pennsylvaniaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(4000)
      .translate([-800, 600]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/PA.json")
    .defer(d3.csv, "csv/PennsylvaniaBirthrateCounties.csv",function(d) { dataPA.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, PA) {

      if (error) throw error;
      var originalColorPA;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(PA, PA.objects.cb_2015_pennsylvania_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(10, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataPA.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorPA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(10, 0, 0)")
        .attr("d", path(topojson.mesh(PA, PA.objects.cb_2015_pennsylvania_county_20m , function(a, b) { return a !== b; })
))}}; 

//////////////////////////
///PENNSYLVANIA MAP END///
/////////////////////////

/////////////////////
//VERMONT MAP START//
/////////////////////

function vermontMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(5000)
      .translate([-1300, 900]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/VT.json")
    .defer(d3.csv, "csv/VermontBirthrateCounties.csv",function(d) { dataVT.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, VT) {

      if (error) throw error;
      var originalColorVT;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(VT, VT.objects.cb_2015_vermont_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(12, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataVT.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorVT);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(VT, VT.objects.cb_2015_vermont_county_20m , function(a, b) { return a !== b; })
))}}; 

/////////////////////
///VERMONT MAP END///
/////////////////////

///////////////////////////
//NEW HAMPSHIRE MAP START//
///////////////////////////

function newhampshireMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(5000)
      .translate([-1400, 950]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/NH.json")
    .defer(d3.csv, "csv/NewHampshireBirthrateCounties.csv",function(d) { dataNH.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, NH) {

      if (error) throw error;
      var originalColorNH;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(NH, NH.objects.cb_2015_new_hampshire_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(12, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataNH.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorNH);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(NH, NH.objects.cb_2015_new_hampshire_county_20m , function(a, b) { return a !== b; })
))}}; 

///////////////////////////
///NEW HAMPSHIRE MAP END///
///////////////////////////

///////////////////////////
//MASSACHUSETTS MAP START//
///////////////////////////

function massachusettsMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(6000)
      .translate([-1700, 900]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/MA.json")
    .defer(d3.csv, "csv/MassachusettsBirthrateCounties.csv",function(d) { dataMA.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, MA) {

      if (error) throw error;
      var originalColorMA;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(MA, MA.objects.cb_2015_massachusetts_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(12, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataMA.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorMA);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(MA, MA.objects.cb_2015_massachusetts_county_20m , function(a, b) { return a !== b; })
))}}; 

///////////////////////////
///MASSACHUSETTS MAP END///
///////////////////////////

/////////////////////////
//CONNECTICUT MAP START//
/////////////////////////

function connecticutMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(8000)
      .translate([-2200, 1000]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/CT.json")
    .defer(d3.csv, "csv/ConnecticutBirthrateCounties.csv",function(d) { dataCT.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, CT) {

      if (error) throw error;
      var originalColorCT;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(CT, CT.objects.cb_2015_connecticut_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(12, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataCT.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorCT);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(CT, CT.objects.cb_2015_connecticut_county_20m , function(a, b) { return a !== b; })
))}}; 

/////////////////////////
///CONNECTICUT MAP END///
/////////////////////////

//////////////////////
//DELAWARE MAP START//
//////////////////////

function delawareMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(8000)
      .translate([-2100, 600]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/DE.json")
    .defer(d3.csv, "csv/DelawareBirthrateCounties.csv",function(d) { dataDE.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, DE) {

      if (error) throw error;
      var originalColorDE;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(DE, DE.objects.cb_2015_delaware_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(12, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataDE.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorDE);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(DE, DE.objects.cb_2015_delaware_county_20m , function(a, b) { return a !== b; })
))}}; 

//////////////////////
///DELAWARE MAP END///
//////////////////////

//////////////////////////
//RHODE ISLAND MAP START//
//////////////////////////

function rhodeislandMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(13000)
      .translate([-4000, 1500]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/RI.json")
    .defer(d3.csv, "csv/RhodeIslandBirthrateCounties.csv",function(d) { dataRI.set(d.County, + d.BirthRate)})
    .await(ready);
    
    function ready(error, RI) {

      if (error) throw error;
      var originalColorRI;
      svg_state.call(tipIN);
      svg_state.append("g")
               .attr("class", "counties states")
               .selectAll("path")
               .data(topojson.feature(RI, RI.objects.cb_2015_rhode_island_county_20m).features)
               .enter().append("path")
               .attr("d", path)
               .attr("transform", "rotate(15, 0, 0)")
               .attr("fill", function (d){
                  d.total = dataRI.get(d.properties.NAME) || 0;
                  return colorScaleIN(d.total);})

               .on("mouseover", function(d){
                  tipIN.show(d); 
                  d3.select(this)
                    .style("fill","blue");})

               .on("mouseout", function(d){
                  tipIN.hide(d);
                  d3.select(this)
                    .style("fill", originalColorRI);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(15, 0, 0)")
        .attr("d", path(topojson.mesh(RI, RI.objects.cb_2015_rhode_island_county_20m , function(a, b) { return a !== b; })
))}}; 

//////////////////////////
///RHODE ISLAND MAP END///
//////////////////////////

/////////////////////
//OREGON MAP START//
////////////////////

function oregonMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([900, 850]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/OR.json")
     .defer(d3.csv, "csv/OregonBirthrateCounties.csv",function(d) { dataOR.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, OR) {

      if (error) throw error;
      var originalColorOR;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(OR, OR.objects.cb_2015_oregon_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("fill", function (d){
          d.total = dataOR.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorOR);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-15, 0, 0)")
        .attr("d", path(topojson.mesh(OR, OR.objects.cb_2015_oregon_county_20m , function(a, b) { return a !== b; })
  ))}}; 

///////////////////
//OREGON MAP END///
///////////////////

///////////////////
//IDAHO MAP START//
///////////////////

function idahoMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([700, 850]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/ID.json")
     .defer(d3.csv, "csv/IdahoBirthrateCounties.csv",function(d) { dataID.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, ID) {

      if (error) throw error;
      var originalColorID;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(ID, ID.objects.cb_2015_idaho_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-12, 0, 0)")
        .attr("fill", function (d){
          d.total = dataID.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorID);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-12, 0, 0)")
        .attr("d", path(topojson.mesh(ID, ID.objects.cb_2015_idaho_county_20m , function(a, b) { return a !== b; })
  ))}}; 

//////////////////
//IDAHO MAP END///
//////////////////

//////////////////////////
//NORTH DAKOTA MAP START//
//////////////////////////

function northdakotaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([300, 850]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/ND.json")
     .defer(d3.csv, "csv/NorthDakotaBirthrateCounties.csv",function(d) { dataND.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, ND) {

      if (error) throw error;
      var originalColorND;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(ND, ND.objects.cb_2015_north_dakota_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-5, 0, 0)")
        .attr("fill", function (d){
          d.total = dataND.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorND);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-5, 0, 0)")
        .attr("d", path(topojson.mesh(ND, ND.objects.cb_2015_north_dakota_county_20m , function(a, b) { return a !== b; })
  ))}}; 

/////////////////////////
//NORTH DAKOTA MAP END///
////////////////////////

//////////////////////////
//SOUTH DAKOTA MAP START//
//////////////////////////

function southdakotaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([300, 750]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/SD.json")
     .defer(d3.csv, "csv/SouthDakotaBirthrateCounties.csv",function(d) { dataSD.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, SD) {

      if (error) throw error;
      var originalColorSD;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(SD, SD.objects.cb_2015_south_dakota_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-5, 0, 0)")
        .attr("fill", function (d){
          d.total = dataSD.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorSD);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-5, 0, 0)")
        .attr("d", path(topojson.mesh(SD, SD.objects.cb_2015_south_dakota_county_20m , function(a, b) { return a !== b; })
  ))}}; 

/////////////////////////
//SOUTH DAKOTA MAP END///
////////////////////////

////////////////////
//NEVADA MAP START//
////////////////////
function nevadaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2800)
      .translate([880, 500]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/NV.json")
     .defer(d3.csv, "csv/NevadaBirthrateCounties.csv",function(d) { dataNV.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, NV) {

      if (error) throw error;
      var originalColorNV;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NV, NV.objects.cb_2015_nevada_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-14, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNV.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNV);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-14, 0, 0)")
        .attr("d", path(topojson.mesh(NV, NV.objects.cb_2015_nevada_county_20m , function(a, b) { return a !== b; })
  ))}}; 
//////////////////
//NEVADA MAP END//
//////////////////

//////////////////
//UTAH MAP START//
//////////////////
function utahMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2800)
      .translate([600, 500]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/UT.json")
     .defer(d3.csv, "csv/UtahBirthrateCounties.csv",function(d) { dataUT.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, UT) {

      if (error) throw error;
      var originalColorUT;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(UT, UT.objects.cb_2015_utah_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-11, 0, 0)")
        .attr("fill", function (d){
          d.total = dataUT.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorUT);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-11, 0, 0)")
        .attr("d", path(topojson.mesh(UT, UT.objects.cb_2015_utah_county_20m , function(a, b) { return a !== b; })
  ))}}; 
////////////////
//UTAH MAP END//
////////////////

/////////////////////
//MONTANA MAP START//
/////////////////////

function montanaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2500)
      .translate([500, 800]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/MT.json")
     .defer(d3.csv, "csv/MontanaBirthrateCounties.csv",function(d) { dataMT.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, MT) {

      if (error) throw error;
      var originalColorMT;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(MT, MT.objects.cb_2015_montana_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-10, 0, 0)")
        .attr("fill", function (d){
          d.total = dataMT.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorMT);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-10, 0, 0)")
        .attr("d", path(topojson.mesh(MT, MT.objects.cb_2015_montana_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////
//MONTANA MAP END///
////////////////////

/////////////////////
//WYOMING MAP START//
/////////////////////

function wyomingMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([500, 700]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/WY.json")
     .defer(d3.csv, "csv/WyomingBirthrateCounties.csv",function(d) { dataWY.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, WY) {

      if (error) throw error;
      var originalColorWY;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(WY, WY.objects.cb_2015_wyoming_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-8, 0, 0)")
        .attr("fill", function (d){
          d.total = dataWY.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorWY);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-8, 0, 0)")
        .attr("d", path(topojson.mesh(WY, WY.objects.cb_2015_wyoming_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////
//WYOMING MAP END///
////////////////////

//////////////////////////
///NEW MEXICO MAP START///
/////////////////////////
function newmexicoMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([550, 200]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/NM.json")
     .defer(d3.csv, "csv/NewMexicoBirthrateCounties.csv",function(d) { dataNM.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, NM) {

      if (error) throw error;
      var originalColorNM;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NM, NM.objects.cb_2015_new_mexico_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-8, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNM.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNM);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-8, 0, 0)")
        .attr("d", path(topojson.mesh(NM, NM.objects.cb_2015_new_mexico_county_20m , function(a, b) { return a !== b; })
  ))}}; 
////////////////////////
///NEW MEXICO MAP END///
////////////////////////
//////////////////////
//MISSOURI MAP START//
//////////////////////
function missouriMap() {
  
  var projection = d3.geoAlbersUsa()
    .scale(3500)
    .translate([-50, 400]);
      
  var path = d3.geoPath()
    .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/MO.json")
    .defer(d3.csv, "csv/MissouriBirthrateCounties.csv",function(d) { dataMO.set(d.County, + d.BirthRate)})
    .await(ready);
    
  function ready(error, MO) {

    if (error) throw error;
    var originalColorMO;
    svg_state.call(tipIN);
    svg_state.append("g")
             .attr("class", "counties states")
             .selectAll("path")
             .data(topojson.feature(MO, MO.objects.cb_2015_missouri_county_20m).features)
             .enter().append("path")
             .attr("d", path)
             .attr("transform", "rotate(1, 0, 0)")
             .attr("fill", function (d){
                d.total = dataMO.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

             .on("mouseover", function(d){
                tipIN.show(d);
                d3.select(this)
                  .style("fill","blue");})

             .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorMO);})
    
    svg_state.append("path")
             .attr("class", "county-borders states")
             .attr("transform", "rotate(1, 0, 0)")
             .attr("d", path(topojson.mesh(MO, MO.objects.cb_2015_missouri_county_20m , function(a, b) { return a !== b; })
    
))}}; 
//////////////////////
//MISSOURI MAP END//
//////////////////////

///////////////////
//IOWA MAP START//
//////////////////
function iowaMap() {
  
  var projection = d3.geoAlbersUsa()
    .scale(3500)
    .translate([50, 550]);
      
  var path = d3.geoPath()
    .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/IA.json")
    .defer(d3.csv, "csv/IowaBirthrateCounties.csv",function(d) { dataIA.set(d.County, + d.BirthRate)})
    .await(ready);
    
  function ready(error, IA) {

    if (error) throw error;
    var originalColorIA;
    svg_state.call(tipIN);
    svg_state.append("g")
             .attr("class", "counties states")
             .selectAll("path")
             .data(topojson.feature(IA, IA.objects.cb_2015_iowa_county_20m).features)
             .enter().append("path")
             .attr("d", path)
             .attr("transform", "rotate(1, 0, 0)")
             .attr("fill", function (d){
                d.total = dataIA.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

             .on("mouseover", function(d){
                tipIN.show(d);
                d3.select(this)
                  .style("fill","blue");})

             .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorIA);})

    
    svg_state.append("path")
             .attr("class", "county-borders states")
             .attr("transform", "rotate(1, 0, 0)")
             .attr("d", path(topojson.mesh(IA, IA.objects.cb_2015_iowa_county_20m , function(a, b) { return a !== b; })
    
))}}; 
////////////////
//IOWA MAP END//
////////////////

///////////////////
//MINNESOTA MAP START//
//////////////////
function minnesotaMap() {
  
  var projection = d3.geoAlbersUsa()
    .scale(3000)
    .translate([50, 800]);
      
  var path = d3.geoPath()
    .projection(projection);
    
  d3.queue()
    .defer(d3.json, "json/MN.json")
    .defer(d3.csv, "csv/MinnesotaBirthrateCounties.csv",function(d) { dataMN.set(d.County, + d.BirthRate)})
    .await(ready);
    
  function ready(error, MN) {

    if (error) throw error;
    var originalColorMN;
    svg_state.call(tipIN);
    svg_state.append("g")
             .attr("class", "counties states")
             .selectAll("path")
             .data(topojson.feature(MN, MN.objects.cb_2015_minnesota_county_20m).features)
             .enter().append("path")
             .attr("d", path)
             .attr("transform", "rotate(1, 0, 0)")
             .attr("fill", function (d){
                d.total = dataMN.get(d.properties.NAME) || 0;
                return colorScaleIN(d.total);})

             .on("mouseover", function(d){
                tipIN.show(d);
                d3.select(this)
                  .style("fill","blue");})

             .on("mouseout", function(d){
                tipIN.hide(d);
                d3.select(this)
                  .style("fill", originalColorMN);})
    
    svg_state.append("path")
             .attr("class", "county-borders states")
             .attr("transform", "rotate(1, 0, 0)")
             .attr("d", path(topojson.mesh(MN, MN.objects.cb_2015_minnesota_county_20m , function(a, b) { return a !== b; })
    
))}}; 
//////////////////////
//MINNESOTA MAP END//
//////////////////////

/////////////////////
//COLORADO MAP START//
/////////////////////

function coloradoMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([480, 520]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/CO.json")
     .defer(d3.csv, "csv/ColoradoBirthrateCounties.csv",function(d) { dataCO.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, CO) {

      if (error) throw error;
      var originalColorCO;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(CO, CO.objects.cb_2015_colorado_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-7, 0, 0)")
        .attr("fill", function (d){
          d.total = dataCO.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorCO);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-7, 0, 0)")
        .attr("d", path(topojson.mesh(CO, CO.objects.cb_2015_colorado_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////
//COLORADO MAP END///
////////////////////

//////////////////////
//NEBRASKA MAP START//
//////////////////////

function nebraskaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([250, 600]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/NE.json")
     .defer(d3.csv, "csv/NebraskaBirthrateCounties.csv",function(d) { dataNE.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, NE) {

      if (error) throw error;
      var originalColorNE;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(NE, NE.objects.cb_2015_nebraska_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-3, 0, 0)")
        .attr("fill", function (d){
          d.total = dataNE.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorNE);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-3, 0, 0)")
        .attr("d", path(topojson.mesh(NE, NE.objects.cb_2015_nebraska_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////
//NEBRASKA MAP END//
////////////////////

////////////////////
//KANSAS MAP START//
////////////////////

function kansasMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([200, 450]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/KS.json")
     .defer(d3.csv, "csv/KansasBirthrateCounties.csv",function(d) { dataKS.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, KS) {

      if (error) throw error;
      var originalColorKS;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(KS, KS.objects.cb_2015_kansas_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-3, 0, 0)")
        .attr("fill", function (d){
          d.total = dataKS.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorKS);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-3, 0, 0)")
        .attr("d", path(topojson.mesh(KS, KS.objects.cb_2015_kansas_county_20m , function(a, b) { return a !== b; })
  ))}}; 

//////////////////
//KANSAS MAP END//
//////////////////

///////////////////////
//HAWAII MAP START////
//////////////////////
function hawaiiMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(3000)
      .translate([530, -150]);
      
  var path = d3.geoPath()
      .projection(projection);
    
  d3.queue()
     .defer(d3.json, "json/HI.json")
     .defer(d3.csv, "csv/HawaiiBirthrateCounties.csv",function(d) { dataHI.set(d.County, + d.BirthRate)})
     .await(ready);
    
    function ready(error, HI) {

      if (error) throw error;
      var originalColorHI;
      svg_state.call(tipIN);
      svg_state.append("g")
        .attr("class", "counties states")
        .selectAll("path")
        .data(topojson.feature(HI, HI.objects.cb_2015_hawaii_county_20m).features)
        .enter().append("path")
        .attr("d", path)
        .attr("transform", "rotate(-30, 0, 0)")
        .attr("fill", function (d){
          d.total = dataHI.get(d.properties.NAME) || 0;
          return colorScaleIN(d.total);})

        .on("mouseover", function(d){
          tipIN.show(d); 
          d3.select(this)
            .style("fill","blue");})

        .on("mouseout", function(d){
          tipIN.hide(d);
          d3.select(this)
            .style("fill", originalColorHI);})
    
      svg_state.append("path")
        .attr("class", "county-borders states")
        .attr("transform", "rotate(-30, 0, 0)")
        .attr("d", path(topojson.mesh(HI, HI.objects.cb_2015_hawaii_county_20m , function(a, b) { return a !== b; })
  ))}}; }