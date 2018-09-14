var my_ip="http://192.168.4.49:8002";

$("#load").on("click",".btn-info",function(){
  var redirect=$("#load").attr("href");
  if (redirect=="#") { alert("You need to be logged in to load an existing scenario");}
});

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
  $.get( my_ip+"/start", {country:country,year:year,sc_type:type}).done(function(data){
      re_data=JSON.stringify(data);
      localStorage.setItem("InputParameterData",re_data);
      window.location="simulator_main.html";
    });
});

$("#sign-up").on("click","button.signupbtn",function(e){
    e.preventDefault();
    submitform();
    var name= $("#username").val();
    var pass= $("#password").val();
    var rep= $("#repeat_password").val();
    var email=$("#email").val();
    if (pass!=rep) {alert("Password repeat incorrect");}
    else {
      console.log(name,pass,email);
      if(submitform()){
        $.get( my_ip+"/signup", { username:name,password:pass,email:email }).done(function(data){
        console.log(data);
        if (data==false) { alert("Username or email is taken. Try another");}
        else {
          var name=data[0];
          localStorage.setItem("username",name);
          window.location="main_loged.html";
      }
    });
    }   
  }
});

$("#login").on("click","button.signupbtn",function(e){
    e.preventDefault();
    var name= $("#username1").val();
    var pass= $("#password1").val();
    console.log(name,pass);
    $.get( my_ip+"/login", { username:name,password:pass }).done(function(data){
    console.log(data);
    if (data==false) { alert("Username or password is not correct.");}
    else {
    var name=data[0];
    localStorage.setItem("username",name);
    window.location="main_loged.html?";
      }
  });    
});

$("#Forgot").on("click","button.signupbtn",function(e){
    e.preventDefault();
    var user= $("#usernameR").val();
    $.get( my_ip+"/retrieve_pass", { usrmail:user }).done(function(data){
    console.log(data);
    if (data==false) { alert(" Username or Email does not exist ");}
    else {
    alert("An email with your password has been send!")
    window.location="index.html?";
      }
  });    
});

var my_cookies= {};

function setCookie() {
  my_cookies["username"]=$("#username").val();
  my_cookies["password"]=$("#password").val();
  document.cookie="";
  var expiresAttrib = new Date(Date.now()+31556926*1000).toString();
  var cookieString = "";
  for (var key in myCookies)
  {
    cookieString = key+"="+myCookies[key]+";"+expiresAttrib+";";
    document.cookie = cookieString;
  }
}

function submitform() {
  var f = document.getElementsByTagName('form')[0];
  if(f.checkValidity()) {
    return true;
  } 
  else {
    if (document.getElementById('username').validationMessage) 
      {alert("Username : " + document.getElementById('username').validationMessage);}
    
    if (document.getElementById('email').validationMessage){
      alert("Email : " + document.getElementById('email').validationMessage);
    }
    
    if (document.getElementById('password').validationMessage) 
      {alert("Password : " + document.getElementById('password').validationMessage);}

    if (document.getElementById('repeat_password').validationMessage) 
      {alert("Repeat Password : " + document.getElementById('repeat_password').validationMessage);}

    return false;
  }
}
