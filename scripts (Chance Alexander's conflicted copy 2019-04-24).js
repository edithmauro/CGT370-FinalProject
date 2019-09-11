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
  return "<strong>State: </strong> <span class = 'details'> " 
  + dataStateTT.get(d)+ "<br></span>"
    +"<strong>Sex Ed: </strong> <span class = 'details'> "
    +dataSexEdTT.get(d)
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
var dataSexEdTT = d3.map(); //formerly data7
var dataStateTT = d3.map(); //formerly data8
var path = d3.geoPath();

dataSexEdTT.set("10","No Data")
dataSexEdTT.set("20","Not Mandated")
dataSexEdTT.set("30","Mandated")

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
var colorScaleIN = d3.scaleThreshold()
    .domain([0, 8, 16, 24, 32, 40, 48, 56, 64])
    .range(colorScheme);
/*var colorScaleNY = d3.scaleThreshold()
    .domain([3, 8, 13, 18, 23, 28, 31])
    .range(colorScheme);
var colorScaleMD = d3.scaleThreshold()
    .domain([6, 12, 18, 24, 30, 36, 41])
    .range(colorScheme);
var colorScaleAL = d3.scaleThreshold()
    .domain([15, 21, 27, 33, 39, 45, 52])
    .range(colorScheme);
var colorScaleAR = d3.scaleThreshold()
    .domain([16, 25, 34, 43, 52, 61, 70])
    .range(colorScheme);*/
  
d3.queue()
  .defer(d3.json, "https:d3js.org/us-10m.v1.json")
  .defer(d3.csv, "csv/SexEducation.csv",function(d) {dataUS.set(d.id, + d.SexEducationMandated)})
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
          d3.selectAll(".states").remove()
          /*switch(d.id) {
            case 18: indianaMap();
          
            break;
              case 36: newyorkMap();
              
            break;
            case 24: marylandMap();
          break;
            case 01: alabamaMap();
          break;
            case 06: californiaMap();
          break;
            case 5: arkansasMap();
          break;
          }*/

          if(d.id == 18){
            indianaMap();
          }
          else if(d.id == 36){
            newyorkMap();
          }
          else if(d.id == 24){
            marylandMap();
			  
          }
          else if(d.id == 01){
            alabamaMap();
          }
	  	  else if(d.id == 04){
            arizonaMap();
          }
		  else if(d.id == 06){
            californiaMap();
          }
          else if(d.id == 05){
            arkansasMap();
          }
          else if(d.id == 48){
            texasMap();
          }
	  	  else if(d.id == 34){
			  newjerseyMap();
		  }
	  	  else if(d.id == 02){
			  alaskaMap();
		  }
	  	  else if(d.id == 17){
			  illinoisMap();
		  }
	  	  else if(d.id == 23){
			  maineMap();
		  }
	  	  else if(d.id == 55){
			  wisconsinMap();
		  }
	      else if(d.id == 12){
              floridaMap();
          }
	  	  else if(d.id == 53){
			  washingtonMap();
		  }
        })
       
  
    svg_us.append("path")
        .attr("class", "county-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
};
//////////////////////
//READY FUNCTION END//
//////////////////////
    
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
      .translate([-500, 600]);
      
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
      .scale(4000)
      .translate([-750, 400]);
      
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
               .attr("transform", "rotate(8, 0, 0)")
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
        .attr("transform", "rotate(8, 0, 0)")
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
      .scale(1800)
      .translate([750, 350]);
      
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
      .scale(4000)
      .translate([-1050, 500]);
      
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
        .attr("transform", "rotate(0, 0, 0)")
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
        .attr("transform", "rotate(0, 0, 0)")
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
      .scale(3000)
      .translate([-100, 650]);
      
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
      .scale(2500)
      .translate([800, 800]);
      
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
      .scale(3500)
      .translate([-950, 850]);
      
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
        .attr("transform", "rotate(12, 0, 0)")
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
        .attr("transform", "rotate(12, 0, 0)")
        .attr("d", path(topojson.mesh(ME, ME.objects.cb_2015_maine_county_20m , function(a, b) { return a !== b; })
  ))}}; 

////////////////////////
/////MAINE MAP END//////
////////////////////////

////////////////////////
//CALIFORNIA MAP START//
////////////////////////
function arizonaMap() {
  
  var projection = d3.geoAlbersUsa()
      .scale(2000)
      .translate([550, 250]);
      
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
        .attr("transform", "rotate(0, 0, 0)")
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
        .attr("transform", "rotate(0, 0, 0)")
        .attr("d", path(topojson.mesh(AZ, AZ.objects.cb_2015_arizona_county_20m , function(a, b) { return a !== b; })
  ))}}; 
//////////////////////
//CALIFORNIA MAP END//
//////////////////////

////////////////////////
//END STATE/COUNTY MAPS//
/////////////////////////