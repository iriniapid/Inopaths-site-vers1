$(document).ready(function(){
  
  var posting ;
  var output ;
  var senario_saved=false;
  var comp_data=false;
  var compare_scs=false;

  $('.nav-side-menu ul.menu-content li').on('click', function(){
      $(this).toggleClass('active').siblings().removeClass('active').collapse('hide'); 
  });

    $('.final_level').on('click', function(){
    $('.final_level').removeClass('active'); 
      $(this).addClass('active');
  });

 $('a').on('click', function(){
    var target = $(this).attr('rel');
    $("#"+target).show().siblings("div").hide();
    d3.select("div.tb_data1").remove();
    d3.select("div.tb_data2").remove();
    d3.select("#back-btn").remove();
    d3.select("#compare-btn").remove();
    d3.select("#svg_"+target).select("svg.my_svg").remove();
    d3.select("#svg_"+target).select("svg.my_svg1").remove();
    d3.select("#svg_"+target).select("svg.my_svg2").remove();
    d3.select("#svg_"+target).select("svg.l_svg").remove();
    d3.select("#svg_"+target).select("svg.mysvg").remove();
    d3.select("#svg_"+target).select("svg.mysvg2").remove();
    d3.select("#svg_"+target).style("border-top","1px solid #C0C0C0");

    d3.select("#btn_"+target).append("input")
              .attr("type","button")
              .attr("id","back-btn")
              .attr("value","Go back to current scenario");
    var scenario1_name=localStorage.getItem("load_sc_name");
    var scenario2_name=localStorage.getItem("Chosen_Scenario");
    obj2=JSON.parse(localStorage.getItem("data2"));
    obj1=JSON.parse(localStorage.getItem("data1"));
    data1=obj1[target];
    data2=obj2[target];
    console.log(data2);
    console.log(data1);
    var tag = $("#"+target).find("span").text();
    
      if (target!=="RES_Gross" && target!=="Markets" && target!=="Energy_costs" && target!=="System_costs") {
        var my_div1 = d3.select("#svg_"+target).append("div")
          .attr("class","tb_data1");
        d3.select(".tb_data1")
          .append('p')
          .append("text")
          .text(scenario1_name)
          .style("text-decoration","underline");
        tabulate(data1.Piechart, ["technology","2015","2020","2030","2050"],target,".tb_data1");

        d3.select(".tb_data1")
          .append('p')
          .append("text")
          .text(scenario2_name)
          .style("text-decoration","underline");
        tabulate(data2.Piechart, ["technology","2015","2020","2030","2050"],target,".tb_data1");

         var b_pie = d3.select("div.tb_data1").append("input")
                   .attr("type","button")
                   .attr("class","btn-info")
                   .attr("id","PieDisplay")
                   .attr("value","Display Data - Pie Chart");
         var b_bar = d3.select("div.tb_data1").append("input")
                   .attr("type","button")
                   .attr("class","btn-info")
                   .attr("id","BarDisplay")
                   .attr("value","Display Data - Bar Chart");   
      
    
    b_pie.on("click",function(){
      d3.select("#svg_"+target).select("svg.my_svg1").remove();
      d3.select("#svg_"+target).select("svg.my_svg2").remove();
      d3.select("#svg_"+target).select("svg.l_svg").remove();
      d3.select("#svg_"+target).select("svg.mysvg").remove();
      d3.select("#svg_"+target).select("svg.mysvg2").remove();

      var svg_p2 = d3.select("#svg_"+target).append("svg")
                .attr("width","18%")
                .attr("height","100%")
                .attr("class","my_svg2");
      var svg_p1 = d3.select("#svg_"+target).append("svg")
                .attr("width","18%")
                .attr("height","100%")
                .attr("class","my_svg1");
      var legends = d3.select("#svg_"+target).append("svg")
                .attr("width","15%")
                .attr("height","100%")
                .attr("class","l_svg")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 300 300");

      svg_p1.append("text").attr("x",105)
                          .attr("y", 20)
                          .attr("dy", ".35em")
                          .text(scenario1_name)
                          .style('font-size',"1em")
                          .style('text-decoration',"underline");
      svg_p2.append("text").attr("x",152)
                          .attr("y", 20)
                          .attr("text-anchor","middle")
                          .attr("dy", ".35em")
                          .text(scenario2_name)
                          .style('font-size',"1em")
                          .style('text-decoration',"underline");

      if (target!=="RES_Gross" && target!=="Markets" && target!=="Energy_costs" && target!=="System_costs") {
          drawPie(data1,svg_p1);
          legend(data1.Piechart,legends);
          drawPie(data2,svg_p2);
    } 
    });
    
    b_bar.on("click",function(){
      d3.select("#svg_"+target).select("svg.my_svg1").remove();
      d3.select("#svg_"+target).select("svg.my_svg2").remove();
      d3.select("#svg_"+target).select("svg.l_svg").remove();
      d3.select("#svg_"+target).select("svg.mysvg").remove();
      d3.select("#svg_"+target).select("svg.mysvg2").remove();
      var svg1 = d3.select("#svg_"+target).append("svg")
                .attr("width","100%")
                .attr("height","40%")
                .attr("class","mysvg");
      var svg2 = d3.select("#svg_"+target).append("svg")
                .attr("width","100%")
                .attr("height","40%")
                .attr("class","mysvg2");

      svg1.append("text").attr("x",15)
                          .attr("y",10)
                          .attr("dy", ".35em")
                          .text(scenario1_name)
                          .style('font-size',"1em")
                          .style('text-decoration',"underline");
      svg2.append("text").attr("x",15)
                          .attr("y",10)
                          .attr("dy", ".35em")
                          .text(scenario2_name)
                          .style('font-size',"1em")
                          .style('text-decoration',"underline");

      if (target!=="RES_Gross" && target!=="Markets" && target!=="Energy_costs" && target!=="System_costs") {
          drawBar(data1.Piechart,svg1,tag);
          drawBar(data2.Piechart,svg2,tag);
      } 
    });
   }

    else {
    var my_div2 = d3.select("#svg_"+target).append("div")
          .attr("class","tb_data2");
    d3.select(".tb_data2")
      .append('p')
      .append("text")
      .text(scenario1_name)
      .style("text-decoration","underline");
    tabulate(data1.Piechart, ["technology","2015","2020","2030","2050"],target,".tb_data2");
    d3.select(".tb_data2")
      .append('p')
      .append("text")
      .text(scenario2_name)
      .style("text-decoration","underline");
    tabulate(data2.Piechart, ["technology","2015","2020","2030","2050"],target,".tb_data2");
    }

    $("#back-btn").on("click",function(){
    window.location="RunScenario_logedin.html"; 
    }); 

  });

});



var run_scenario = localStorage.getItem('PieChartData');

var obj=$.parseJSON(run_scenario);

function drawBar(data,this_svg,target_name){
var margin = {top: 40, right: 40, bottom: 20, left:40},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

var x1 = d3.scaleBand();

var y = d3.scaleLinear().range([height, 0]);

var color = d3.scaleOrdinal(["#ffbb78","#FE9A2E","#aec7e8","#1f77b4"]);

var xAxis = d3.axisBottom()
    .scale(x0);

var yAxis = d3.axisLeft()
    .scale(y)
    .tickFormat(d3.format(".2s"));

dataset = data;

var svg = this_svg.append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var options = d3.keys(dataset[0]).filter(function(key) { if (key !== "technology" && key!=="position" && key!=="valores" ) {return key;}});

dataset.forEach(function(d) {
    d.valores = options.map(function(name) { return {name: name, value: +d[name]}; });
});

x0.domain(dataset.map(function(d) { return d.technology; }));
x1.domain(options).rangeRound([0, x0.bandwidth()]);
y.domain([d3.min(dataset,function(d){return d3.min(d.valores ,function(d){ return d.value; });}),d3.max(dataset, function(d) { return d3.max(d.valores, function(d) { return d.value; });})]);


svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform","translate(-20,0)")
    .attr("transform", "rotate(-90)")
    .attr("y",5)
    .attr("dy", ".5em")
    .style("text-anchor", "end")
    .text(target_name);

var bar = svg.selectAll(".bar")
    .data(dataset)
    .enter().append("g")
    .attr("class", "rect")
    .attr("transform", function(d) { return "translate(" + (5+x0(d.technology))  + ",-2)"; });

bar.selectAll("rect")
    .data(function(d) { return d.valores; })
    .enter().append("rect")
    .attr("width", x1.bandwidth())
    .attr("x", function(d) { return x1(d.name); })
    .attr("y", function(d) { return y(Math.max(0, d.value)); })
    .attr("value", function(d){return d.name;})
    .attr("transform", function(d) { if (d.value < 0) {return "translate(0,40)";} })
    .attr("height", function(d) { if(d.value < 0) { return Math.abs(y(d.value) - y(0));} else {return height - y(d.value);} })
    .style("fill", function(d) { return color(d.name); });


var legend = svg.selectAll(".legend")
    .data(options.slice())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 30 + ")"; });

legend.append("rect")
    .attr("x", width + 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

legend.append("text")
    .attr("x", width +69)
    .attr("y", 5)
    .attr("dy", ".8em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });

var x_line = svg.append("g")
   .attr("class", "x axis")
   .attr("transform","translate(0,"+height+")") 
   .call(xAxis) 
   .selectAll(".tick text")
   .data(dataset)
   .call(wrap, x1.bandwidth())
   .attr("transform",function(d){for(i=0; i<d.valores.length;i++) {if(d.valores[i].value<0){return "translate(0,-40)" }} return "translate(0,0)"} );
}

function drawPie(data,this_svg){
  var svg=this_svg,
      width = 220,
      height = 220,
      radius = Math.min(width, height) / 2,
      g1 = svg.append("g").attr("transform", "translate(" + ( width / 2 + 40) + "," + (height / 2 + 70 ) + ")")
                          .attr("class","pie");
      g2 = svg.append("g").attr("transform", "translate(" +( width / 2 + 40) + "," + (2*radius +  height/ 2 + 140 ) + ")")
                          .attr("class","pie");
      g3 = svg.append("g").attr("transform", "translate(" +( width / 2 + 40) + "," + (4*radius +  height/ 2 +210) + ")")
                          .attr("class","pie");
      g4 = svg.append("g").attr("transform", "translate(" + ( width / 2 + 40) + "," + (6*radius + height / 2 +280) + ")")
                          .attr("class","pie");

var color = d3.scaleOrdinal(["#ffbb78","#FE9A2E","#FE642E","#aec7e8","#2698e9","#1f77b4","#A65DE6","#9332E8","#6632E8","#2EFE9A","#81F7BE"]);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var path = d3.arc()
    .outerRadius(radius-5)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius-30)
    .innerRadius(radius-30);

function pchart(g,data,year) {

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d[year]; });

  g.append("text")
    .attr("x",-15)
    .attr("y",-130)
    .style("font-family","sans-serif")
    .style("font-size","15px")
    .style("font-weight","bold")
    .text(year);

  var arc = g.selectAll(".arc")
  .data(pie(data.Piechart))
  .enter().append("g")
  .attr("class", "arc");

  arc.append("path")
    .attr("d", path)
    .attr("class","pie")
    .attr("stroke", function(d) { return color(d.data.technology);})
    .attr("fill", function(d) { return color(d.data.technology); });

}

 pchart(g1,data,"2015");
 pchart(g2,data,"2020");
 pchart(g3,data,"2030");
 pchart(g4,data,"2050");
  
}

function legend(data,this_svg) {
  var margin = {top: 20, right: 40, bottom: 20, left:40};

  var color = d3.scaleOrdinal(["#ffbb78","#FE9A2E","#FE642E","#aec7e8","#2698e9","#1f77b4","#A65DE6","#9332E8","#6632E8","#2EFE9A","#81F7BE"]);  
  dataset = data;
  var svg = this_svg.append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var legend = svg.selectAll(".legend")
    .data(dataset)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(40," + i * 30 + ")"; });

  legend.append("line")
    .data(dataset)
    .attr("x1", 125)
    .attr("x2", 155)
    .attr("y1", 33)
    .attr("y2", 33)
    .style("stroke",function(d){return color(d.technology)})
    .style("stroke-width","1.2em");

  legend.append("text")
    .data(dataset)
    .attr("x",120)
    .attr("y", 28)
    .attr("dy", ".4em")
    .style("text-anchor", "end")
    .text( function(d) {return d.technology; });
}

function tabulate(data,columns,title,div_class) {
    console.log(data);
    var table = d3.select(div_class).append('table')
    var thead = table.append('thead')
    var tbody = table.append('tbody');
    var headers= [" ","2015","2020","2030","2050"]
    // append the header row
    thead.append('tr')
      .selectAll('th')
      .data(headers).enter()
      .append('th')
        .text(function (column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll('tr')
      .data(data)
      .enter()
      .append('tr')
      .attr("class",function (d,i) {
        if ( title != "RES_Gross" && title != "Markets" && title != "Energy_costs" && title != "System_costs") 
          { console.log(title); return "color"+ i ; }
      });


    // create a cell in each row for each column
    var cells = rows.selectAll('td')
      .data(function (row) {
        return columns.map(function (column) {
          return {column: column, value: row[column]};
        });
      })
      .enter()
      .append('td')
      .text(function (d) { return d.value; });

    return table;
  }

 function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });

}
