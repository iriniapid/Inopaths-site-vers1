$(document).ready(function(){

  var my_ip="http://192.168.4.49:8002";
	var posting ;
  var output;
  var sl_init_values=JSON.parse(localStorage.getItem("load_sc_data"));
  var parameters=sl_init_values;
  console.log(parameters);

	$('.nav-side-menu ul.menu-content li').on('click', function(){
	   $(this).toggleClass('active').siblings().removeClass('active').collapse('hide'); 
	});

		$('.final_level').on('click', function(){
		$('.final_level').removeClass('active'); 
	    $(this).addClass('active');
	});
  
    $('li.collapsed').on("click",function(){
     var div=$(this).attr('rel');
     $("#"+div).show().siblings("div").hide();
     $('.final_level').removeClass('active');
  });
   
     $("li").on("click",function(){
    var div=$(this).attr("rel");
  if (div == "Policy_Targs" || div == "demand_rel"|| div == "supply_rel" ){
    if ( $(this).hasClass("active")){ console.log("active accordion exists!");}
    else{ $("#consept").show();}
    }
  });

  $('li.final_level').on('click', function(){
    var target = $("a",this).attr('rel');
    $("#"+target).show().siblings("div").hide();
    var input=$("#"+target).find('input[type=range]');
    var tag = input.attr("id").slice(2);
    console.log(tag);
    var rel=input.attr('rel');
    var name=input.attr('name');
    var v=sl_init_values[tag];
    
    if (sl_init_values[tag]!=null){
      rel="submited";
      input.value=v;
      $("#"+name).html('value : '+ v +'%');
    }
    if (rel!="submited"){
      input.value=0;
      $("#"+name).html('value : 0%'); 
    }
    output=input.value;
    console.log(output);
  });

  $(window).on("load", function(){
    var slider = $(".slider");
    slider.change(function(){
      val_map={"0":0,"8":27,"8.75":27,"16":30,"17.5":30,"24":33,"26.25":33,"32":35,"35":35,"40":40};
      view =$(this).attr('name');
      if($(this).attr('id')=="slsvg_overall-esavings" || $(this).attr('id')=='slsvg_overall-RES'){
       $("#"+view).html (" value : " + val_map[this.value] + "%");
      }
      else{
        $("#"+view).html (" value : " + this.value + "%");
      }
    });
  });

    
    $(window).on("load",function(){
      var slider=$(".slider");
      slider.change(function(){
        val_map={"0":0,"8":27,"8.75":27,"16":30,"17.5":30,"24":33,"26.25":33,"32":35,"35":35,"40":40};
        if($(this).attr('id')=="slsvg_overall-esavings" || $(this).attr('id')=='slsvg_overall-RES'){
          output=val_map[this.value];
        }
        else{
          output= this.value;
          console.log(output);
        }
        output=String(output);   
      });
    });

 /* $(".formoid").on("click","input.btn-info",function(e){
    var select= $(this).attr('rel');
    if(output==null){
      output=sl_init_values[select];
      parameters[select]=output;
      console.log(select,output);
      output=null;
    }
    $("#sl"+select).attr("rel","submited");
    sl_init_values[select]=null;
    console.log(parameters);
    return false;
  });
*/

   $(".formoid").on("click","input.btn-info",function(e){
    console.log("saved output "+output)
    var select= $(this).attr('rel');
    parameters[select]=output;
    $("#sl"+select).attr("rel","submited");
    console.log(parameters);
    return false;
  });
  
  var user = localStorage.getItem('username');
  console.log("again "+user);
  $(".run").on("click",function(){
    console.log(parameters);
    data=JSON.stringify(parameters);
    localStorage.setItem("SliderData",data);
    $.get( my_ip+"/run_scenarios", {username:user,data:data}).done(function(data){
    console.log(data);
    if(data=="error"){
      d3.select("#error").style("display","block");
    }
    else{
      localStorage.setItem("PieChartData",data);
      window.location="RunScenario_logedin.html";
    }
    });
  });
  
});
