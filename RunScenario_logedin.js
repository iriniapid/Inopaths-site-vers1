/*$(document).ready(function(){

  var my_ip="http://192.168.4.49:8002";
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
    d3.select("#save-btn").remove();
    d3.select("#compare-btn").remove();
    d3.select("#svg_"+target).select("svg.my_svg").remove();
    d3.select("#svg_"+target).select("svg.my_svg1").remove();
    d3.select("#svg_"+target).select("svg.my_svg2").remove();
    d3.select("#svg_"+target).select("svg.l_svg").remove();
    d3.select("#svg_"+target).select("svg.mysvg").remove();
    d3.select("#svg_"+target).select("svg.mysvg2").remove();
    d3.select("#svg_"+target).style("border-top","1px solid #C0C0C0");

    //create save-compare buttons
    if (senario_saved==false){
    d3.select("#btn_"+target).append("input")
                .attr("type","button")
                .attr("id","save-btn")
                .attr("value","Save Scenario");}
  
    d3.select("#btn_"+target).append("input")
              .attr("type","button")
              .attr("id","compare-btn")
              .attr("value","Compare Scenario");

    var tag = $("#"+target).find("span").text();
    
    var data = obj[target];
    
   if (target!=="RES_Gross" && target!=="Markets" && target!=="Energy_costs" && target!=="System_costs") {
      var my_div = d3.select("#svg_"+target).append("div")
                  .attr("class","tb_data1");
      tabulate( data.Piechart, ["technology","2015","2020","2030","2050"],target,".tb_data1");

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
      d3.select("#svg_"+target).select("svg.my_svg").remove();
      d3.select("#svg_"+target).select("svg.l_svg").remove();
      d3.select("#svg_"+target).select("svg.mysvg").remove();
      var svg_p = d3.select("#svg_"+target).append("svg")
                .attr("width","20%")
                .attr("height","100%")
                .attr("class","my_svg");
      var legends = d3.select("#svg_"+target).append("svg")
                .attr("width","20%")
                .attr("height","100%")
                .attr("class","l_svg")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 300 300");
      if (target!=="RES_Gross" && target!=="Markets" && target!=="Energy_costs" && target!=="System_costs") {
          drawPie(data,svg_p);
          legend(data.Piechart,legends);
    } 
    });
    
    b_bar.on("click",function(){
      d3.select("#svg_"+target).select("svg.my_svg").remove();
      d3.select("#svg_"+target).select("svg.l_svg").remove();
      d3.select("#svg_"+target).select("svg.mysvg").remove();
      var svg = d3.select("#svg_"+target).append("svg")
                .attr("width","100%")
                .attr("height","100%")
                .attr("class","mysvg");
      if (target!=="RES_Gross" && target!=="Markets" && target!=="Energy_costs" && target!=="System_costs") {
          drawBar(data.Piechart,svg,tag);
      } 
    });    
    
    }

    else {
      var my_div = d3.select("#svg_"+target).append("div")
                  .attr("class","tb_data2");
      tabulate( data.Piechart, ["technology","2015","2020","2030","2050"],target,".tb_data2");
    }

    $("#save-btn").on("click",function(){
      d3.select("#id01").style("display","block");
     $("#sc_save").on("click","button.signupbtn",function(e){
        e.preventDefault();
        var sc_name= $("#username").val();
        var name=localStorage.getItem("username");
        var slider_data=localStorage.getItem("SliderData");
        console.log(sc_name,name,slider_data);
        $.get( my_ip+"/save_scenarios", {data:slider_data,username:name,sc_name:sc_name }).done(function(data){
          senario_saved=data;
          d3.select("#save-btn").remove();
          d3.select("#id01").style("display","none");
        });    
      }); 
    });

    $("#compare-btn").on("click",function(){
      d3.select("#id02").style("display","block");
      $.get( my_ip+"/load_scenarios", {username:username}).done(function(data){
        console.log(data.length);
        var myarray=[]
        for (var i = 0; i < data.length; i++) {
            console.log("Scenario : "+data[i].scenario+" created at : "+ data[i].date);
            myarray.push("<li class='scenario_list' id="+data[i].scenario.split(" ").join("|")+"><a href='#'>Scenario : "+"<span class='sc_name'>"+ data[i].scenario+"</span>"+" created at : "+"<span class='sc_name'>"+data[i].date+"</span>"+"</a></li>"); 
            }  
        return $("ul.saved_scenarios").html(myarray);
    });

      $("ul.saved_scenarios").on("click",".scenario_list",function(){
        var name = $(this).attr("id").split("|").join(" ");
        localStorage.setItem("Chosen_Scenario",name);
        $.get(my_ip+"/compare",{username:username,sc_name:name}).done(function(data){
          comp_data=JSON.parse(data);
          localStorage.setItem("data1",JSON.stringify(obj));
          localStorage.setItem("data2",data);
          window.location="RunScenario_compare.html";
        });
      });
    });
   
  });

});



var run_scenario = localStorage.getItem('PieChartData');

var obj=$.parseJSON(run_scenario);

function drawBar(data,this_svg,target_name){
var margin = {top: 20, right: 40, bottom: 20, left:40},
    width = 1100 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

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
    .attr("transform", function(d) { if (d.value < 0) {return "translate(0,47)";} })
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
      g1 = svg.append("g").attr("transform", "translate(" + ( width / 2 + 40) + "," + (height / 2 + 50 ) + ")")
                          .attr("class","pie");
      g2 = svg.append("g").attr("transform", "translate(" +( width / 2 + 40) + "," + (2*radius +  height/ 2 + 120 ) + ")")
                          .attr("class","pie");
      g3 = svg.append("g").attr("transform", "translate(" +( width / 2 + 40) + "," + (4*radius +  height/ 2 +190) + ")")
                          .attr("class","pie");
      g4 = svg.append("g").attr("transform", "translate(" + ( width / 2 + 40) + "," + (6*radius + height / 2 +260) + ")")
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
  var margin = {top: 20, right: 40, bottom: 20, left:120};

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
    .attr("dy", ".5em")
    .style("text-anchor", "end")
    .text( function(d) {return d.technology; });
}

function tabulate(data,columns,title,div_class) {
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
} */


$(document).ready(function(){

  var posting ;
  var output ;
  var senario_saved=false;
  var comp_data=false;
  var compare_scs=false;
  var run_scenario = localStorage.getItem('PieChartData');
  var obj=$.parseJSON(run_scenario);
  console.log(obj);
  var par_split;
  var data;
  var data_temp;
  var USa;
  
  var USa_dict = {P_Car:"Private transport of passengers cars and motos",I_ElecSp:"Specific Electricity",I_Steam:"Steam uses",
                  I_Heat:"Low Enthalpy Heat",I_ThProc:"Thermal Processing",I_ElProc:"Electric Processing",I_Furn:"Furnaces and Kilns",
                  I_Raw:"Raw Material",D_HeatCool:"Heating and Cooling",D_OthHeat:"Other heat uses",D_White:"White appliances",
                  D_Light:"Lighting",D_Black:"Black appliances",D_ElecServ:"Electric appliances services",D_Green:"Grrenhouses and heat uses agriculture",
                  D_Motor:"Motors and pumping",P_Bus:"Public transport of passengers road",P_Met:"Public transport of passengers metro and tram",
                  P_Rai:"Public transport of passengers rail",P_Avi:"Public transport of passengers aviation",P_Nav:"Transport of passengers navigation",
                  F_Rai:"Freight transport rail",F_Tru:"Freight transport trucks",F_Nav:"Freight transport navigation",
                  F_OTR:"Freight other transport and pipeline",B_Nav:"Bunkers Navigation"
                  }

 var par_names={"VDriver-HOUa":"Income per Capita","VDriver-HWHa":"Income per Capita","VDriver-HBLa":"Number of Households","VDriver-HLHa":"Number of Households",
    "VDriver-SERa":"Services","VDriver-AGRa":"Agriculture","VDriver-PTRa":"Income per Capita","VDriver-FTRa":"GDP","VDriver-ISa":"Iron & Steel",
    "VDriver-NFa":"Non Ferrous","VDriver-CHa":"Chemicals","VDriver-BMa":"Building Materials","VDriver-PPa":"Paper & Pulp","VDriver-FDa":"Food, Drink & Tobacco",
    "VDriver-EGa":"Engineering","VDriver-OTa":"Textiles & Other Industries","VDriver-NEa":"GDP","VDriver-OTRa":"GDP","VDriver-BUNa":"GDP",
    VServices:"Demand for energy services in specific units",VUseful:"Demand for energy in useful terms after savings where applicable in specific units",
    VProcess:" Demand for energy in useful terms per process in specific units",VProcess_FEI:" Final energy intensity of a process as a ratio",VEnergy:"Demand for energy in final energy terms per fuel in ktoe",
    VLosses:"Transmission and distribution losses in ktoe"}
  

  $('.nav-side-menu ul.menu-content li').on('click', function(){
      $(this).toggleClass('active').siblings().removeClass('active').collapse('hide'); 
  });

    $('.final_level').on('click', function(){
    $('.final_level').removeClass('active'); 
      $(this).addClass('active');
  });

 $('li.final_level').on('click', function(){
    var target = $("a",this).attr('rel');
    $("#"+target).show().siblings("div").hide();
    console.log(target);
    if (target=="VLosses") {
      data=obj[target];
      d3.select("div.tb_data1").remove();
            var my_div = d3.select("#svg_"+target).append("div")
                                                  .attr("class","tb_data1");
      tabulate2(data,Object.keys(Object.values(data)[0]),Object.keys(data),par_names[target],".tb_data1");
    }
    else {
         par_split=target.split("-");
        if(par_split[0]=="VDriver"){
          for (var i = 0; i<par_split.length-1; i++) {
            data=obj[par_split[i]][par_split[i+1]];
            d3.select("div.tb_data1").remove();
            var my_div = d3.select("#svg_"+target).append("div")
                                                  .attr("class","tb_data1");
            tabulate(data,Object.keys(data),Object.keys(data),par_names[target],".tb_data1");
          }
        }

        else if ( par_split[0]=="VServices" || par_split[0]=="VUseful"){
          for (var i = 0; i<par_split.length-1; i++) {
            data=obj[par_split[i]][par_split[i+1]];
            d3.select("div.tb_data1").remove();
            var my_div = d3.select("#svg_"+target).append("div")
                                                  .attr("class","tb_data1");
            tabulate(data,Object.keys(data),Object.keys(data),par_names[par_split[0]],".tb_data1");
            //d3.select("#svg_"+target).select("svg.mysvg").remove();
            //var svg = d3.select("#svg_"+target).append("svg")
            //            .attr("width","100%")
            //            .attr("height","100%")
            //            .attr("class","mysvg");
            //drawBar(data,svg,par_names[par_split[0]]);
          }
        }
        else if(par_split[0]=="VProcess" || par_split[0]=="VProcess_FEI"){

          for (var i = 0; i < par_split.length-1; i++) {
            data_temp=obj[par_split[i]][par_split[i+1]];
            console.log(data_temp);
            USa=Object.keys(data_temp);
            var myarray=["<h4 class='USa_title'>USa</h4>"];
            for(i = 0; i < USa.length; i++) {
              myarray.push("<li class='USa_style' id="+target+"_"+USa[i]+" rel="+USa[i]+">"+ USa_dict[USa[i]]+"</li>");
              $('#svg_'+target).html(myarray);
            }
            $('.USa_style').removeClass('active'); 
            $('#'+target+"_"+USa[0]).addClass('active'); 
              var key=$('.USa_style.active').attr("rel");
              console.log(key);
              data=data_temp[key];
              d3.select("div.tb_data2").remove();
              var my_div = d3.select("#svg_"+target).append("div")
                                                  .attr("class","tb_data2");
              tabulate(data,Object.keys(data),Object.keys(data),par_names[par_split[0]],".tb_data2");
            $('.USa_style').on("click", function(){
              $('.USa_style').removeClass('active'); 
              $(this).addClass('active');
              var key=$(this).attr("rel");
              console.log(key);
              data=data_temp[key];
              d3.select("div.tb_data2").remove();
              var my_div = d3.select("#svg_"+target).append("div")
                                                  .attr("class","tb_data2");
              tabulate(data,Object.keys(data),Object.keys(data),par_names[par_split[0]],".tb_data2");
            }); 
          }
        }

        else if(par_split[0]=="VEnergy"){
          for (var i = 0; i < par_split.length-1; i++) {
            data_temp=obj[par_split[i]][par_split[i+1]];
            console.log(data_temp);
            USa=Object.keys(data_temp);
            var myarray=["<h4 class='USa_title'>USa</h4>"];
            for(i = 0; i < USa.length; i++) {
              myarray.push("<li class='USa_style' id="+target+"_"+USa[i]+" rel="+USa[i]+">"+ USa_dict[USa[i]]+"</li>");
              $('#svg_'+target).html(myarray);
            }
            $('.USa_style').removeClass('active'); 
            $('#'+target+"_"+USa[0]).addClass('active'); 
              var key=$('.USa_style.active').attr("rel");
              console.log(key);
              data=data_temp[key];
              d3.select("div.tb_data2").remove();
              var my_div = d3.select("#svg_"+target).append("div")
                                                  .attr("class","tb_data2");
              tabulate2(data,Object.keys(Object.values(data)[0]),Object.keys(data),par_names[par_split[0]],".tb_data2");

            $('.USa_style').on("click", function(){
              $('.USa_style').removeClass('active'); 
              $(this).addClass('active');
              var key=$(this).attr("rel");
              console.log(key);
              data=data_temp[key];
              d3.select("div.tb_data2").remove();
              var my_div = d3.select("#svg_"+target).append("div")
                                                  .attr("class","tb_data2");
              tabulate2(data,Object.keys(Object.values(data)[0]),Object.keys(data),par_names[par_split[0]],".tb_data2");
            });
          }
        }
      }
   //catch(err){
     // if (err=="TypeError: Cannot convert undefined or null to object") {
       //$('#svg_'+target).html("<h4 class='USa_title'>No output data to display</h4>");
     //}
     //else {throw err;}
    //}
          
  });
 
});


function tabulate(data,headers,columns,title,div_class) {
    console.log(data,headers,columns,title);
    var table = d3.select(div_class).append('table')
    var thead = table.append('thead')
    var tbody = table.append('tbody');
    // append the header row
    heading=thead.append('tr');
    heading.append("th")
           .attr("colspan",columns)
           .text(title);
    thead.append('tr')
      .selectAll('th')
      .data(headers)
      .enter()
      .append('th')
      .text(function (column) { return column; })
      .attr("id",function(d){ return "td_"+d;});
    // create a row for each object in the data
    var rows = tbody.append('tr')
                    .selectAll('td')
                    .data(Object.values(data))
                    .enter()
                    .append('td')
                    .text(function (d) { return d;})
                    .attr("style","font-weight:lighter;");
      
    return table;
  }

  function tabulate2(data,headers,columns,title,div_class) {
    
    for (var i = 0; i < columns.length; i++) {
      data[columns[i]]["Fuel"]=columns[i];
    };

    if(headers.indexOf("Fuel")!= -1){
      var index = headers.indexOf("Fuel");
        headers.splice(index, 1);
      }
    
    headers.unshift("Fuel");
    var table = d3.select(div_class).append('table')
    var thead = table.append('thead')
    var tbody = table.append('tbody');
    // append the header row
    heading=thead.append('tr');
    heading.append("th")
           .attr("colspan",headers.length)
           .text(title);

    thead.append('tr')
      .selectAll('th')
      .data(headers)
      .enter()
      .append('th')
      .text(function (column) { return column; });


    // create a row for each object in the data

    var rows = tbody.selectAll('tr')
                     .data(columns)
                     .enter()
                     .append("tr");
      
      

    // create a cell in each row for each column
    var order=[];
    var cells = rows.selectAll('td')
      .data(function(d){       
        for (var i = 0; i < Object.values(data[d]).length; i++) {
          order[0]=Object.values(data[d])[10];
          if(i!=10){
             order[i+1]=Object.values(data[d])[i];
          };     
        }
        console.log(order);
        return order;
      }) 
      .enter()
      .append('td')
      .text(function (d) { return d; })
      .attr("id",function(d){
        return "td_"+d;
      });
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


function drawBar(data,this_svg,target_name){
var margin = {top: 20, right: 40, bottom: 20, left:50},
    width = 1100 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

var y = d3.scaleLinear().range([height, 0]);

var color = d3.scaleOrdinal(["#ffbb78","#FE9A2E","#aec7e8","#1f77b4"]);

var xAxis = d3.axisBottom()
    .scale(x0);

var yAxis = d3.axisLeft()
    .scale(y);
    //.tickFormat(d3.format(".2s"));

dataset = Object.entries(data);

var svg = this_svg.append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var options = d3.keys(dataset[0]);

dataset.forEach(function(d) {
    console.log(d);
    d.valores = options.map(function() { return {year:d[0], val: d[1]}; })[0];
});

x0.domain(dataset.map(function(d) { return d.valores.year; }));
//x1.domain(options).rangeRound([0, x0.bandwidth()]);
//y.domain([d3.min(dataset, function(d) { return d.valores.val; }),d3.max(dataset, function(d) { return d.valores.val; })]);
y.domain(d3.extent(dataset,function(d){return d.valores.val;}));

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
    .attr("class", "rect");

bar.selectAll("line")
    .data(function(d) {console.log(d); return d.valores; })
    .enter().append("line")
    .attr("x", function(d) { return x0(d.year); })
    .attr("y", function(d) { return y(Math.max(0, d.value)); })
    .attr("value", function(d){return d.year;})
    .attr("transform", function(d) { if (d.value < 0) {return "translate(0,47)";} })
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
   .data(dataset);
}