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
  
  var USa_dict = {P_Car:"Private transport of passengers cars and motors",I_ElecSp:"Specific Electricity",I_Steam:"Steam uses",
                  I_Heat:"Low Enthalpy Heat",I_ThProc:"Thermal Processing",I_ElProc:"Electric Processing",I_Furn:"Furnaces and Kilns",
                  I_Raw:"Raw Material",D_HeatCool:"Heating and Cooling",D_OthHeat:"Other heat uses",D_White:"White appliances",
                  D_Light:"Lighting",D_Black:"Black appliances",D_ElecServ:"Electric appliances services",D_Green:"Greenhouses and heat uses agriculture",
                  D_Motor:"Motors and pumping",P_Bus:"Public transport of passengers road",P_Met:"Public transport of passengers metro and tram",
                  P_Rai:"Public transport of passengers rail",P_Avi:"Public transport of passengers aviation",P_Nav:"Transport of passengers navigation",
                  F_Rai:"Freight transport rail",F_Tru:"Freight transport trucks",F_Nav:"Freight transport navigation",
                  F_OTR:"Freight other transport and pipeline",B_Nav:"Bunkers Navigation"
                  }

 var par_names={"vdriver-HOUa":"Income per Capita","vdriver-HWHa":"Income per Capita","vdriver-HBLa":"Number of Households","vdriver-HLHa":"Number of Households",
    "vdriver-SERa":"Services","vdriver-AGRa":"Agriculture","vdriver-PTRa":"Income per Capita","vdriver-FTRa":"GDP","vdriver-ISa":"Iron & Steel",
    "vdriver-NFa":"Non Ferrous","vdriver-CHa":"Chemicals","vdriver-BMa":"Building Materials","vdriver-PPa":"Paper & Pulp","vdriver-FDa":"Food, Drink & Tobacco",
    "vdriver-EGa":"Engineering","vdriver-OTa":"Textiles & Other Industries","vdriver-NEa":"GDP","vdriver-OTRa":"GDP","vdriver-BUNa":"GDP",
    vservices:"Useful energy demand",vuseful:"Useful energy demand with savings",
    vprocess:" Useful energy demand with savings per process",vprocess_fei:" Final energy intensity",venergy:"Final energy demand",
    vlosses:"Transmission and distribution losses in ktoe", CO2:"CO2 Emissions"}
  

  $('.nav-side-menu ul.menu-content li').on('click', function(){
      $(this).toggleClass('active').siblings().removeClass('active').collapse('hide'); 
  });

    $('.final_level').on('click', function(){
    $('.final_level').removeClass('active'); 
      $(this).addClass('active');
  });


  $("ul.menu-content li").on("click",function(){
    var div=$(this).attr("rel");
    $("#"+div).show().siblings("div").hide();
    var targ=$(this).attr("data-target");
    var li_actv = $(targ+ " li.active");
    var ul_expnd =$(li_actv).attr("data-target");
    $(ul_expnd).attr("class","sub-menu collapse").attr("aria-expanded","false").attr("style","height:0px;");
      if ($(li_actv).is($("li.final_level.active"))) {$(li_actv).attr("class","final_level");}
      else {$(li_actv).attr("class","collapsed").attr("aria-expanded","false");}     
  });

 $('li.final_level').on('click', function(){
    var target = $("a",this).attr('rel');
    $("#"+target).show().siblings("div").hide();
    console.log(target);
    try{
    if (target=="vlosses") {
      data=obj[target];
      d3.select("div.tb_data1").remove();
            var my_div = d3.select("#svg_"+target).append("div")
                                                  .attr("class","tb_data1");
      tabulate2(data,Object.keys(Object.values(data)[0]),Object.keys(data),par_names[target],".tb_data1");
      d3.select("#svg_"+target).select("svg.mysvg").remove();
            var svg = d3.select("#svg_"+target).append("svg")
                        .attr("width","100%")
                        .attr("height","100%")
                        .attr("class","mysvg");
            drawmultiline(data,svg,par_names[target]);
    }
    else {
         par_split=target.split("-");
        if(par_split[0]=="vdriver"){
          for (var i = 0; i<par_split.length-1; i++) {
            data=obj[par_split[i]][par_split[i+1]];
            d3.select("div.tb_data1").remove();
            var my_div = d3.select("#svg_"+target).append("div")
                                                  .attr("class","tb_data1");
            tabulate(data,Object.keys(data),Object.keys(data),par_names[target],".tb_data1");

            d3.select("#svg_"+target).select("svg.mysvg").remove();
            var svg = d3.select("#svg_"+target).append("svg")
                        .attr("width","100%")
                        .attr("height","100%")
                        .attr("class","mysvg");
            drawline(data,svg,par_names[target]);
          }
        }

        else if ( par_split[0]=="vservices" || par_split[0]=="vuseful"){
          for (var i = 0; i<par_split.length-1; i++) {
            data=obj[par_split[i]][par_split[i+1]];
            d3.select("div.tb_data1").remove();
            var my_div = d3.select("#svg_"+target).append("div")
                                                  .attr("class","tb_data1");
            tabulate(data,Object.keys(data),Object.keys(data),par_names[par_split[0]],".tb_data1");
            d3.select("#svg_"+target).select("svg.mysvg").remove();
            var svg = d3.select("#svg_"+target).append("svg")
                        .attr("width","100%")
                        .attr("height","100%")
                        .attr("class","mysvg");
            drawline(data,svg,par_names[par_split[0]]);
          }
        }
        else if(par_split[0]=="vprocess" || par_split[0]=="vprocess_fei"){

          for (var i = 0; i < par_split.length-1; i++) {
            data_temp=obj[par_split[i]][par_split[i+1]];
            console.log(data_temp);
            USa=Object.keys(data_temp);
            var myarray=["<h4 class='USa_title'>Processes</h4>"];
            for(i = 0; i < USa.length; i++) {
              myarray.push("<li class='USa_style' id="+target+"_"+USa[i]+" rel="+USa[i]+">"+ USa_dict[USa[i]]+"</li>");
              $('#svg_'+target).html("<div class=USa_list>"+myarray.join(" ")+"</div>");
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

              d3.select("#svg_"+target).select("svg.mysvg").remove();
              var svg = d3.select("#svg_"+target).append("svg")
                          .attr("width","100%")
                          .attr("height","100%")
                          .attr("class","mysvg");
              drawline(data,svg,par_names[par_split[0]]);
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
              d3.select("#svg_"+target).select("svg.mysvg").remove();
              var svg = d3.select("#svg_"+target).append("svg")
                          .attr("width","100%")
                          .attr("height","100%")
                          .attr("class","mysvg");
              drawline(data,svg,par_names[par_split[0]]);
            }); 
          }
        }

        else if(par_split[0]=="venergy" || par_split[0]=="CO2"){
          for (var i = 0; i < par_split.length-1; i++) {
            data_temp=obj[par_split[i]][par_split[i+1]];
            console.log(data_temp);
            USa=Object.keys(data_temp);
            var myarray=["<h4 class='USa_title'>Processes</h4>"];
            for(i = 0; i < USa.length; i++) {
              myarray.push("<li class='USa_style' id="+target+"_"+USa[i]+" rel="+USa[i]+">"+ USa_dict[USa[i]]+"</li>");
              $('#svg_'+target).html("<div class=USa_list>"+ myarray.join(" ") +"</div>");
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
              d3.select("#svg_"+target).select("svg.mysvg").remove();
              var svg = d3.select("#svg_"+target).append("svg")
                          .attr("width","100%")
                          .attr("height","100%")
                          .attr("class","mysvg");
              drawmultiline(data,svg,par_names[target]);

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
              d3.select("#svg_"+target).select("svg.mysvg").remove();
              var svg = d3.select("#svg_"+target).append("svg")
                          .attr("width","100%")
                          .attr("height","100%")
                          .attr("class","mysvg");
              drawmultiline(data,svg,par_names[target]);
            });
          }
        }
      }

    }
   

   catch(err){
      if (err=="TypeError: Cannot convert undefined or null to object") {
       $('#svg_'+target).html("<h4 class='USa_title'>No output data to display</h4>");
     }
     else {throw err;}
    }
          
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
                    .text(function (d) { 
                      return d.toFixed(3);
                    })
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
      .text(function (column) { return column; })
      .attr("id",function(d){
        return "th_"+d });


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
          order[0]=Object.values(data[d])[Object.values(data[d]).length-1];
          if(i!=Object.values(data[d]).length-1){
             order[i+1]=Object.values(data[d])[i];
          };     
        }
        console.log(order);
        return order;
      }) 
      .enter()
      .append('td')
      .text(function (d) {
        if (isNaN(d)) {
          if(d=="H2"){
            return "Hydrogen";
          } 
          else {
            return d;
          }
        } 
        else {
          return d.toFixed(3);  
        }  
      })
      .attr("id",function(d){
        return "td_"+d;
      });
    return table;
  }


function drawline(data,this_svg,target_name){
var margin = {top: 40, right: 40, bottom: 20, left:50},
    width = 900 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(1);

var y = d3.scaleLinear().range([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.val); });

var color = d3.scaleOrdinal(["#ffbb78","#FE9A2E","#aec7e8","#1f77b4"]);

var xAxis = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y);
//    .tickFormat(d3.format(".4s"));

dataset = Object.entries(data);

var options = d3.keys(dataset[0]);

dataset.forEach(function(d) {
    d.valores = options.map(function() { return {year:d[0], val: d[1]}; })[0];
});


var svg = this_svg.append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                  .data(dataset);

x.domain(dataset.map(function(d) { return d.valores.year; }));
//x1.domain(options).rangeRound([0, x0.bandwidth()]);
y.domain([d3.min(dataset, function(d) { return 0.9*d.valores.val; }),d3.max(dataset, function(d) { return 1.1*d.valores.val; })]);

var y_line = svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class","y axis")
    .attr("transform", "rotate(-90)")
    .attr("y",5)
    .attr("dy", ".5em")
    .style("text-anchor", "start");


svg.append("g")
    .attr("class", "y axis")
    .append("text")
    .attr("y",-15)
    .style("text-anchor", "end")
    .text("(units)");


var x_line = svg.append("g")
   .attr("class", "x axis")
   .attr("transform","translate(0,"+height+")") 
   .call(xAxis) 
   .selectAll("text")
   .style("text-anchor","start");

svg.append("g")
   .attr("class", "x axis")
   .attr("transform","translate("+width+","+height+")")
   .append("text")
   .attr("x",10)
   .attr("y",10)
   .style("text-anchor", "start")
   .text("( Year )");

var line_dat = []

dataset.forEach(function(d) {
    line_dat.push(d.valores);
  });


var data_line = svg.append("path")
      .data([line_dat])
      .attr("class", "line")
      .style("stroke",color)
      .attr("d", line);

var legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 30 + ")"; });

legend.append("rect")
    .attr("x", width + 18)
    .attr("width", 18)
    .attr("height", 2.5)
    .style("fill", color);



if (target_name.length>25) {
  result = target_name.replace(/.{25}\S*\s+/g, "$&@").split(/\s+@/)
  legend.append("text")
    .attr("x", width +50)
    .attr("y", -2)
    .attr("dy", ".8em")
    .attr("dx",".2em")
    .style("text-anchor", "start")
    .text(result[0]);
  legend.append("text")
    .attr("x", width +50)
    .attr("y", 16)
    .attr("dy", ".8em")
    .attr("dx",".2em")
    .style("text-anchor", "start")
    .html(result[1]);  
}
else {
  legend.append("text")
    .attr("x", width +50)
    .attr("y", 0)
    .attr("dy", ".8em")
    .attr("dx",".2em")
    .style("text-anchor", "start")
    .text(target_name);
}
 
}

function drawmultiline(data,this_svg,target_name){
var margin = {top: 40, right: 40, bottom: 20, left:50},
    width = 900 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(1);

var y = d3.scaleLinear().range([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.val); })
    .defined(function (d) { return d.val != null; });

var color = d3.scaleOrdinal(["#A2EA39","#4C7155","#FE9A2E","#7CB48A","#3E39EA","#84C5CB","#DECF36","#DE7936","#B2AC74","#7CACB4","#39EAAF","#BF8C5A","#A384CB"]);

var xAxis = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y);
//    .tickFormat(d3.format(".4s"));

dataset = d3.entries(data);


var options = d3.keys(dataset[0].value);

options.pop();


dataset.forEach(function(d) {
  options.forEach(function(o){
    if (isNaN(o)){

  }
  else {
    d.valores = options.map(function(i) {
     return {year:i,val:d["value"][i]} 
   });
  }
  });     
});



var svg = this_svg.append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                  .data(dataset);

x.domain(options);
var val_ex=[];

dataset.forEach(function(d){
  options.forEach(function(y){
        val_ex.push(d.value[y]);
      });
}); 
y.domain([d3.min(val_ex,function(d){ return 0.9*d; }),d3.max(val_ex,function(d){ return 1.1*d; })]);

var y_line = svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class","y axis")
    .attr("transform", "rotate(-90)")
    .attr("y",5)
    .attr("dy", ".5em")
    .style("text-anchor", "start");


svg.append("g")
    .attr("class", "y axis")
    .append("text")
    .attr("y",-15)
    .style("text-anchor", "end")
    .text("(units)");


var x_line = svg.append("g")
   .attr("class", "x axis")
   .attr("transform","translate(0,"+height+")") 
   .call(xAxis) 
   .selectAll("text")
   .style("text-anchor","start");

svg.append("g")
   .attr("class", "x axis")
   .attr("transform","translate("+width+","+height+")")
   .append("text")
   .attr("x",10)
   .attr("y",10)
   .style("text-anchor", "start")
   .text("( Year )");

var line_dat = []

dataset.forEach(function(d) {
  if (d!=null) {
    if(d.key!="Total"){
      line_dat.push(d.valores);
    }   
  }   
  });


line_dat.forEach(function(d){
  var val_sum=0;
  if(d!=null){
    for (var j = 0; j < d.length; j++) {
      val_sum+=d[j].val;
    }
  }
  if (val_sum==0) {
    for (var i = 0; i < d.length; i++) {
      d[i].val=null;
    }
  }
});

console.log(line_dat);

var data_line = svg.selectAll("path")
      .data(line_dat,function(d,i){
        return d;
      })
      .enter()
      .append("path")
      .attr("class", "line")
      .style("stroke",function(d,i){ return color(i);
      })
      .attr("d", line);

var legend = svg.selectAll(".legend")
    .data(line_dat,function(d){
      return d;
    })
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(30," + i * 22 + ")"; });

legend.append("rect")
    .attr("x", width + 18)
    .attr("width", 18)
    .attr("height", 2.5)
    .style("fill",function(d,i){ return color(i)});

legend.append("text")
    .attr("x", width +38)
    .attr("y", -2)
    .attr("dy", ".8em")
    .style("text-anchor", "start")
    .text(function(d,i) { return dataset[i].key; });  
}

