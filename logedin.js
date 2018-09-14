 var username = localStorage.getItem('username');
 var my_ip="http://192.168.4.49:8002";

$('#log-sign').html('<li><a href="main_loged.html"><i class="fa fa-user" aria-hidden="true"></i> ' + username +'</a></li> <li><a href="index.html">Logout</a></li>');
localStorage.setItem('username',username);

$("#start").on("click",function(){
	d3.select("#id04").style("display","block");
});

$("button.start").on("click",function(){
  var country = $("#country").val();
  var year=$("#year").val();
  var type=$("#type").val();
  localStorage.setItem("country",country);
  localStorage.setItem("year",year);
  localStorage.setItem("sc_type",type);
  window.location="simulator_logedin.html";
});

$("#load").on("click",function(){
	d3.select("#id01").style("display","block");
	 $.get(my_ip+"/load_scenarios", {username:username}).done(function(data){
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
		$.get(my_ip+"/scenario",{username:username,sc_name:name}).done(function(data){
			localStorage.setItem("load_sc_data",JSON.stringify(data));
			localStorage.setItem("load_sc_name",name);
			window.location="simulator_load.html";
		});
	});
});



