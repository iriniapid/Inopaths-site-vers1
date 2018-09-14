// set the dimensions and margins of the graph
var margin = {top: 30, right: 70, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 340 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%Y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Imports); });
// define the line
var valueline2 = d3.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Exports); });
  

function draw(data, country,svg_p) {
  
  var dat = data[country];
  
  // format the data
  dat.forEach(function(d) {
      d.Date = parseTime(d.Date);
      d.Imports = +d.Imports;
      d.Exports = +d.Exports;
  });
  
  // sort years ascending
  dat.sort(function(a, b){
    return a["Date"]-b["Date"];
  })
 
  // Scale the range of the data
  x.domain(d3.extent(dat, function(d) { return d.Date; }));
  y.domain([0, d3.max(dat, function(d) {
    return Math.max(d.Imports, d.Exports); })]);
  
  // Add the valueline path.
  svg_p.append("path")
      .data([dat])
      .attr("d", valueline)
      .attr("class", "line1")
      ;
  // Add the valueline path.
  svg_p.append("path")
      .data([dat])
      .attr("d", valueline2)
      .attr("class", "line2")
      ;  
  // Add the X Axis
  svg_p.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg_p.append("g")
      .call(d3.axisLeft(y));

  svg_p.append("text").attr("x",730 - margin.left - margin.right)
                          .attr("y",100)
                          .text("Imports")
                          .attr("font-family","sans-serif")
                          .attr("font-size",12);
  svg_p.append("text").attr("x",730 - margin.left - margin.right)
                            .attr("y",130)
                            .text("Exports")
                            .attr("font-family","sans-serif")
                            .attr("font-size",12);

  svg_p.append("text").attr("x",700 - margin.left - margin.right)
                            .attr("y",340 - margin.top - margin.bottom)
                            .text("(Date)")
                            .attr("font-family","sans-serif")
                            .attr("font-size",12);

  svg_p.append("text").attr("x",0)
                            .attr("y",0)
                            .text("(Amount in tons)")
                            .attr("font-family","sans-serif")
                            .attr("font-size",12);



  svg_p.append("line").attr("x1",700 - margin.left - margin.right)
                    .attr("y1",100)
                    .attr("x2",728 - margin.left - margin.right)
                    .attr("y2",100)
                    .attr("class","line1");

  svg_p.append("line").attr("x1",700 - margin.left - margin.right)
                    .attr("y1",130)
                    .attr("x2",728 - margin.left - margin.right)
                    .attr("y2",130)
                    .attr("class","line2");
  }


//SVG 1
var svg1 = d3.select("#svg_ets-sector").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_ets-sector.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data,"RES-HR",svg1);
});

//SVG 2

var svg2 = d3.select("#svg_Non-ETS-Sector").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Non-ETS-Sector.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data,"Non-ETS",svg2);
});

//SVG 3

var svg3 = d3.select("#svg_RES-HR").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_RES-HR.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "RES-HR",svg3);
});

//SVG 4

var svg4 = d3.select("#svg_RES-E").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_RES-E.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "RES-E",svg4);
});


//SVG 5

var svg5 = d3.select("#svg_RES-T").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_RES-T.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "RES-T",svg5);
});


//SVG 6

var svg6 = d3.select("#svg_industry").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_industry.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "industry",svg6);
});

//SVG 7

var svg7 = d3.select("#svg_Residential").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Residential.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Residential",svg7);
});


//SVG 8

var svg8 = d3.select("#svg_tertiary").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_tertiary.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "tertiary",svg8);
});

//SVG 9

var svg9 = d3.select("#svg_transport").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_transport.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "transport",svg9);
});

//SVG 10

var svg10 = d3.select("#svg_Services").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Services.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Services",svg10);
});

//SVG 11

var svg11 = d3.select("#svg_Agriculture").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Agriculture.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Agriculture",svg11);
});

//SVG 12

var svg12 = d3.select("#svg_Nuclear_Energy").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Nuclear_Energy.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Nuclear_Energy",svg12);
});

//SVG 13

var svg13 = d3.select("#svg_Hydro").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Hydro.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Hydro",svg13);
});

//SVG 14

var svg14 = d3.select("#svg_Wind").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Wind.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Wind",svg14);
});

//SVG 15

var svg15 = d3.select("#svg_Solar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Solar.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Solar",svg15);
});

//SVG 16

var svg16 = d3.select("#svg_Biomass_Waste").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Biomass_Waste.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Biomass_Waste",svg16);
});

//SVG 17

var svg17 = d3.select("#svg_Geothermal_Heat").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Geothermal_Heat.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Geothermal_Heat",svg17);
});

//SVG 18

var svg18 = d3.select("#svg_Coal_Lignite").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Coal_Lignite.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Coal_Lignite",svg18);
});

//SVG 19

var svg19 = d3.select("#svg_Oil_Products").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Oil_Products.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Oil_Products",svg19);
});

//SVG 20

var svg20 = d3.select("#svg_Natural_Gas").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Natural_Gas.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Natural_Gas",svg20);
});

//SVG 21

var svg21 = d3.select("#svg_Coke_Blast").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Coke_Blast.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Coke_Blast",svg21);
});

//SVG 22
var svg22 = d3.select("#svg_Hydrogen").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Hydrogen.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data,"Hydrogen",svg22);
});

//SVG 23

var svg23 = d3.select("#svg_Methanol").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Methanol.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data,"Methanol",svg23);
});

//SVG 24

var svg24 = d3.select("#svg_Clean_Gas").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Clean.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Clean",svg24);
});

//SVG 25

var svg25 = d3.select("#svg_Batteries").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Batteries.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Batteries",svg25);
});


//SVG 26

var svg26 = d3.select("#svg_Power_X").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg_box")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data_Power_X.json", function(error, data) {
  if (error) throw error;
  
  // trigger render
  draw(data, "Power_X",svg26);
});
