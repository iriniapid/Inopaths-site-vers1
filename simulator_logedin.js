$(document).ready(function(){
  
  var my_ip="http://192.168.4.49:8002";
  var posting ;
  var parameters={};
  var country=localStorage.getItem("country");
  var user = localStorage.getItem('username');

  localStorage.setItem('load_sc_name',"Current Scenario");

  $('.nav-side-menu ul.menu-content li').on('click', function(){
    $(this).toggleClass('active').siblings().removeClass('active').collapse('hide'); 
  });

    $('li.final_level').on('click', function(){
    //$('.final_level').removeClass('active'); 
      $(this).addClass('active');
  });

  $('li.collapsed').on("click",function(){
    var div=$(this).attr('rel');
    $('.final_level').removeClass('active');
    $("#"+div).show().siblings("div").hide();
  });

    $("li").on("click",function(){
    var div=$(this).attr("rel");
    $("#"+div).show().siblings("div").hide();
    var targ=$(this).attr("data-target");
    var li_actv = $(targ+ " li.active");
    var ul_expnd =$(li_actv).attr("data-target");
    var li_actv_2nd=$(ul_expnd+ " li.active");
    var ul_expnd_2nd=$(li_actv_2nd).attr("data-target");
    var li_actv_3nd=$(ul_expnd_2nd+ " li.active");
    var ul_expnd_3nd=$(li_actv_3nd).attr("data-target");
    $(ul_expnd).attr("class","targets collapse").attr("aria-expanded","false").attr("style","height:0px;");
    $(li_actv).attr("class","collapsed").attr("aria-expanded","false");
    $(ul_expnd_2nd).attr("class","targets collapse").attr("aria-expanded","false").attr("style","height:0px;");
    $(li_actv_2nd).attr("class","collapsed").attr("aria-expanded","false");
    $(ul_expnd_3nd).attr("class","targets collapse").attr("aria-expanded","false").attr("style","height:0px;");
    $(li_actv_3nd).attr("class","collapsed").attr("aria-expanded","false");
  });
    
  
  $('li.final_level').on('click', function(){
    var target = $("a",this).attr('rel');
    $("#"+target).show().siblings("div").hide();
    var submit_btn=$("#"+target+" input[type=submit]");
    $(submit_btn).on("click",function(){
    var input=$("#"+target+" input[type=number]").map(function(){return $(this).attr("id")+ " : " + $(this).val();}).get();
    /*var multi=$("#"+target +" h4").map(function(){
        var obj={}; 
        obj[$(this).text()]=$("#multi input[type=number]").map(function(){return $(this).attr("id")+ " : " + $(this).val();}).get();
        return obj;      }).get();*/
    parameters[target]=input;
    });
  });


  $(".formoid").on("click","input.btn-info",function(e){
    var select= $(this).attr('rel');
    $("#sl"+select).attr("rel","submited");
    console.log(parameters);
    return false;
  });

  console.log("again "+user);
  
  $(".run").on("click",function(){
    console.log(parameters);
    data=JSON.stringify(parameters);
    localStorage.setItem("InputData",data);
    $.get( my_ip+"/run_scenarios", {username:user,data:data,country:country}).done(function(data){
    console.log(data);
    localStorage.setItem("PieChartData",data);
    window.location="RunScenario_logedin.html";
    });
  });
  
});