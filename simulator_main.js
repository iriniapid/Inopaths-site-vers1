$(document).ready(function(){
  
  var my_ip="http://192.168.4.49:8002";
  var posting ;
  var output ;
  var senario_saved=false;
  var comp_data=false;
  var compare_scs=false;
  var run_scenario = localStorage.getItem('InputParameterData');
  var obj=$.parseJSON(run_scenario);
  console.log(obj);
  var par_split;
  var data;
  var data_temp;
  var USa;
  var parameters={};
  var country=localStorage.getItem("country");
  var year=localStorage.getItem("year");
  
  var USa_dict = {P_Car:"Private transport of passengers cars and motors",I_ElecSp:"Specific Electricity",I_Steam:"Steam uses",
                  I_Heat:"Low Enthalpy Heat",I_ThProc:"Thermal Processing",I_ElProc:"Electric Processing",I_Furn:"Furnaces and Kilns",
                  I_Raw:"Raw Material",D_HeatCool:"Heating and Cooling",D_OthHeat:"Other heat uses",D_White:"White appliances",
                  D_Light:"Lighting",D_Black:"Black appliances",D_ElecServ:"Electric appliances services",D_Green:"Greenhouses and heat uses agriculture",
                  D_Motor:"Motors and pumping",P_Bus:"Public transport of passengers road",P_Met:"Public transport of passengers metro and tram",
                  P_Rai:"Public transport of passengers rail",P_Avi:"Public transport of passengers aviation",P_Nav:"Transport of passengers navigation",
                  F_Rai:"Freight transport rail",F_Tru:"Freight transport trucks",F_Nav:"Freight transport navigation",
                  F_OTR:"Freight other transport and pipeline",B_Nav:"Bunkers Navigation"
                  }

 var par_names={"Macro_pa-Income_per_Capita":"Income per Capita","Macro_pa-Number_of_Households":"Number of Households",
    "Macro_pa-Services":"Services","Macro_pa-Agriculture":"Agriculture","Macro_pa-GDP":"GDP","Macro_pa-Iron_and_steel":"Iron & Steel",
    "Macro_pa-Non_Ferrous":"Non Ferrous","Macro_pa-Chemicals":"Chemicals","Macro_pa-Building_Materials":"Building Materials",
    "Macro_pa-Paper_and_Pulp":"Paper & Pulp","Macro_pa-Food_Drink_and_Tobacco":"Food, Drink & Tobacco","Macro_pa-Engineering":"Engineering",
    "Macro_pa-Textiles_and_Other_Industries":"Textiles & Other Industries","Macro_pa-NEa":"GDP","Macro_pa-OTRa":"GDP","Macro_pa-BUNa":"GDP",
    Services_el:"Useful energy demand",Useful_serv:"Useful energy demand with savings",
    Process_UEI:" Useful energy demand with savings per process",Process_FEI:" Final energy intensity",Energy_Sh:"Final energy demand",
    LOS_rate:"Transmission and distribution losses in ktoe", CO2:"CO2 Emissions"}
  

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
    if (target=="LOS_rate") {
      data=obj[target];
      d3.select("div.tb_data1").remove(); 
      var my_div = d3.select("#svg_"+target).append("div")
                                                  .attr("class","tb_data1");
      tabulate2(data,Object.keys(Object.values(data)[0]),Object.keys(data),par_names[target],".tb_data1");

      d3.select("div.submit_par_vals").remove();
      d3.select("#svg_"+target).append("div")
                               .attr("class","submit_par_vals")
                               .html('<form class="formoid2" title="" method="get" ><input type="submit" class="btn-info" id="submitButton"  name="submitButton" value="Submit Values" rel="'+target+'"></form>');    

      var submit_btn=$("#"+target+" input[type=submit]");
      var submit_btn_id=$(submit_btn).attr("rel");
      console.log(submit_btn_id);
      $(submit_btn).on("click",function(){
        console.log("sumbit me!!!!");
        var input=$("#svg_"+target+" input[type=number]").map(function(){return $(this).attr("id")+ " : " + $(this).val();}).get();
        parameters[submit_btn_id]=input;
        console.log(parameters);
        return false;
      });
    }
    else {
         par_split=target.split("-");
        if(par_split[0]=="Macro_pa"){
          for (var i = 0; i<par_split.length-1; i++) {
            data=obj[par_split[i]][par_split[i+1]];
            d3.select("div.tb_data1").remove();
            var my_div = d3.select("#svg_"+target).append("div")
                                                  .attr("class","tb_data1");
            tabulate(data,Object.keys(data),Object.keys(data),par_names[target],".tb_data1");

            d3.select("div.submit_par_vals").remove();
            d3.select("#svg_"+target).append("div")
                                     .attr("class","submit_par_vals")
                                     .html('<form class="formoid2" title="" method="get" ><input type="submit" class="btn-info" id="submitButton"  name="submitButton" value="Submit Values" rel="'+target+'"></form>');

            var submit_btn=$("#"+target+" input[type=submit]");
            var submit_btn_id=$(submit_btn).attr("rel");
            console.log(submit_btn_id);
            $(submit_btn).on("click",function(){
              console.log("sumbit me!!!!");
              var input=$("#svg_"+target+" input[type=number]").map(function(){return $(this).attr("id")+ " : " + $(this).val();}).get();
              parameters[submit_btn_id]=input;
              console.log(parameters);
              return false;
            });
          }
        }

        else if ( par_split[0]=="Services_el" || par_split[0]=="Useful_serv"){
          for (var i = 0; i<par_split.length-1; i++) {
            data=obj[par_split[i]][par_split[i+1]];
            d3.select("div.tb_data1").remove();
            var my_div = d3.select("#svg_"+target).append("div")
                                                  .attr("class","tb_data1");
            tabulate(data,Object.keys(data),Object.keys(data),par_names[par_split[0]],".tb_data1");

            d3.select("div.submit_par_vals").remove();
            d3.select("#svg_"+target).append("div")
                                     .attr("class","submit_par_vals")
                                     .html('<form class="formoid2" title="" method="get" ><input type="submit" class="btn-info" id="submitButton"  name="submitButton" value="Submit Values" rel="'+target+'"></form>');

            var submit_btn=$("#"+target+" input[type=submit]");
            var submit_btn_id=$(submit_btn).attr("rel");
            console.log(submit_btn_id);
            $(submit_btn).on("click",function(){
              console.log("sumbit me!!!!");
              var input=$("#svg_"+target+" input[type=number]").map(function(){return $(this).attr("id")+ " : " + $(this).val();}).get();
              parameters[submit_btn_id]=input;
              console.log(parameters);
              return false;
            });

          }
        }
        else if(par_split[0]=="Process_UEI" || par_split[0]=="Process_FEI"){

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

              d3.select("div.submit_par_vals").remove();
              d3.select("#svg_"+target).append("div")
                                       .attr("class","submit_par_vals")
                                       .html('<form class="formoid" title="" method="get" ><input type="submit" class="btn-info" id="submitButton"  name="submitButton" value="Submit Values" rel="'+target+'-'+ key+'"></form>');

              var submit_btn=$("#"+target+" input[type=submit]");
              var submit_btn_id=$(submit_btn).attr("rel");
              console.log(submit_btn_id);
              $(submit_btn).on("click",function(){
                console.log("sumbit me!!!!");
                var input=$("#svg_"+target+" input[type=number]").map(function(){return $(this).attr("id")+ " : " + $(this).val();}).get();
                parameters[submit_btn_id]=input;
                console.log(parameters);
                return false;
              });

            $('.USa_style').on("click", function(){
              $('.USa_style').removeClass('active'); 
              $(this).addClass('active');
              var key=$(this).attr("rel");
              console.log(key);
              data=data_temp[key];
              d3.select("div.tb_data2").remove();
              var my_div = d3.select("#svg_"+target).append("div")
                                                  .attr("class","tb_data2");
              tabulate(data,Object.keys(data),Object.keys(data),par_names[par_split[0]],".tb_data2")

              d3.select("div.submit_par_vals").remove();
              d3.select("#svg_"+target).append("div")
                                       .attr("class","submit_par_vals")
                                       .html('<form class="formoid" title="" method="get" ><input type="submit" class="btn-info" id="submitButton"  name="submitButton" value="Submit Values" rel="'+target+'-'+key+'"></form>');

              var submit_btn=$("#"+target+" input[type=submit]");
              var submit_btn_id=$(submit_btn).attr("rel");
              console.log(submit_btn_id);
              $(submit_btn).on("click",function(){
                console.log("sumbit me!!!!");
                var input=$("#svg_"+target+" input[type=number]").map(function(){return $(this).attr("id")+ " : " + $(this).val();}).get();
                parameters[submit_btn_id]=input;
                return false;
              });            

            }); 
          }
        }

        else if(par_split[0]=="Energy_Sh" || par_split[0]=="CO2"){
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
              console.log(Object.keys(data));
              d3.select("div.tb_data2").remove();
              var my_div = d3.select("#svg_"+target).append("div")
                                                  .attr("class","tb_data2");
              tabulate2(data,Object.keys(Object.values(data)[0]),Object.keys(data),par_names[par_split[0]],".tb_data2");

              d3.select("div.submit_par_vals").remove();
              d3.select("#svg_"+target).append("div")
                                       .attr("class","submit_par_vals")
                                       .html('<form class="formoid" title="" method="get" ><input type="submit" class="btn-info" id="submitButton"  name="submitButton" value="Submit Values" rel="'+target+'-'+key+'"></form>');
              
              var submit_btn=$("#"+target+" input[type=submit]");
              var submit_btn_id=$(submit_btn).attr("rel");
              console.log(submit_btn_id);
              $(submit_btn).on("click",function(){
                console.log("sumbit me!!!!");
                var input=$("#svg_"+target+" input[type=number]").map(function(){return $(this).attr("id")+ " : " + $(this).val();}).get();
                parameters[submit_btn_id]=input;
                console.log(parameters);
                return false;
              });

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

              d3.select("div.submit_par_vals").remove();
              d3.select("#svg_"+target).append("div")
                                       .attr("class","submit_par_vals")
                                       .html('<form class="formoid" title="" method="get" ><input type="submit" class="btn-info" id="submitButton"  name="submitButton" value="Submit Values" rel="'+target+'-'+key+'"></form>');
            
              var submit_btn=$("#"+target+" input[type=submit]");
              var submit_btn_id=$(submit_btn).attr("rel");
              console.log(submit_btn_id);
              $(submit_btn).on("click",function(){
                console.log("sumbit me!!!!");
                var input=$("#svg_"+target+" input[type=number]").map(function(){return $(this).attr("id")+ " : " + $(this).val();}).get();
                parameters[submit_btn_id]=input;
                console.log(parameters);
                return false;
              });
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
  

  $(".run").on("click",function(){
    console.log(parameters);
    data=JSON.stringify(parameters);
    localStorage.setItem("InputData",data);
    $('#wait').show();
    $.post( my_ip+"/run_scenarios", {data:data,country:country,year:year}).done(function(data){
      re_data=JSON.stringify(data);
      console.log(re_data);
      localStorage.setItem("PieChartData",re_data);
      $('#wait').hide();
      window.location="RunScenario_main.html";
    });
    return false;
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
                    .html(function (d,i) {
                      if (headers[i]=="2005" || headers[i]=="2010" || headers[i]=="2015") {
                        return '<input type="number" class="tbchart_readonly" id="'+headers[i]+'" value="'+d.toFixed(5)+'" readonly >';
                      }
                      else {
                        return '<input type="number" class="tbchart" id="'+headers[i]+'" value="'+d.toFixed(5)+'">';
                      }   
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
  console.log(headers);
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
  var fuel_key=[];
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
    .html(function (d,i){
      if(i==0){
        fuel_key.push(d)
      }  
      if (isNaN(d)) {
        if(d=="H2"){
          return "Hydrogen";
        } 
        else {
          return d;
        }
      }
      else {
        if(headers[i]=="2005" || headers[i]=="2010" || headers[i]=="2015"){
          return '<input type="number" class="tbchart_readonly" id="'+fuel_key[fuel_key.length-1]+"-"+headers[i]+'" value="'+d.toFixed(5)+'" readonly >';            
        }
        else{
          return '<input type="number" class="tbchart" id="'+fuel_key[fuel_key.length-1]+"-"+headers[i]+'" value="'+d.toFixed(5)+'">';
        }
          
      }
      fuel_key=[];   
    })
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


