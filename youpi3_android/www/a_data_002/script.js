$(document).ready(function()
{var AudioArr=new Array('mp3','aac','m4a','ogg','wma');
var Complete=new Array();
var Control=new Array();
var Dls=new Array();var f=1;
var Formats=new Array();
var Forms=1;
var Hashes=new Array();
var ID='';
var Index='';
var URL=document.URL.split('/');
var Position=410;
var Time=new Array();
var Videos=new Array();
var VideoArr=new Array('mp4','3gp','avi','flv','mpg','wmv');
var Validate='';
var Wp=false;
var WpCheck=false;
var WpUrl='';

/*if(0<$('#c1 .dl_button').attr('href').length&&0<$('body').attr('id').length){Wp=true;}*/
/*$('#c1 .checkbox').click(function(){if($(this).is(':checked')){$('#c1 .dl_button').attr('href',WpUrl);}
  else{$('#c1 .dl_button').attr('href',Dls[0]);}});*/

$('#languages').mouseover(function(){$(this).css('overflow','visible')});
$('#languages').mouseout(function(){$(this).css('overflow','hidden');});
$(document).on('click','.url',function(){$(this).select();});
function GetID(Element){ID=$(Element).closest('div[id^="c"]').attr('id');
                        Index=parseInt(ID.substr(1))-1;}
  
$(document).on('click','.time a',function(){
    GetID(this);if(!Control[Index]){
	   switch($(this).parent().attr('class'))
	      {case'step_1':
		        $('#'+ID+' .step_1').hide();
				$('#'+ID+' .step_2').show();
				Time[Index]=1;
		    break;
			
		   case'step_2':
		        $('#'+ID+' .step_2').hide();
				$('#'+ID+' .step_1').show();
				Time[Index]=0;
		   break;}}
	return false;});
	
function HideFormats(Element){ 
       GetID(Element);
	   $('#'+ID+' .audio').slideUp('fast');
	   $('#'+ID+' .video').slideUp('fast');
}

$(document).on('mouseenter','.audio_active, .video_active',function(){
       GetID(this);
	   if(!Control[Index]){
	         switch($(this).attr('class')){
			     case'audio_active':
				     $('#'+ID+' .video').slideUp('fast');
					 $('#'+ID+' .audio').slideDown('fast');
				 break;
				 case'video_active':
				     $('#'+ID+' .audio').slideUp('fast');
					 $('#'+ID+' .video').slideDown('fast');
			     break;
}}});
					
$(document).on('mouseenter','.box, .downloader', function(){
     HideFormats(this);});
	 
$(document).on('mouseleave','.converter',function(){
     HideFormats(this);});
	 
$(document).on('click','.formats a',function(){
     switch($(this).parent().parent().attr('class')){
	      case'audio':
		     GetID(this);
			 $('#'+ID+' .video_active').css('background-color','#2e2e2e').html('Video');
			 $('#'+ID+' .audio_active').css('background-color','#f8b30d').html($(this).html());
		  break;
		  
		  case'video':
		      GetID(this);
			  $('#'+ID+' .audio_active').css('background-color','#2e2e2e').html('Audio');
			  $('#'+ID+' .video_active').css('background-color','#f8b30d').html($(this).html());
		   break;}
		   
$('#'+ID+' .format').val($(this).html().substr(1));return false;});
function SlideDownBoxes(c,k){if(k<1){k=1;}
     else{k=(k*2)-1;}$.each($('#converters > div'),function(Div)
	 {if(k<Div){$('#converters > div:eq('+Div+')').animate({'top':'+=95px'},1000);}});}
	 
function SlideUpBoxes(c,k,w){if(k<1){k=1;}else{k=(k*2)-1;}$.each($('#converters > div'),
     function(Div){if(k<Div){
	    if(w){$('#converters > div:eq('+Div+')').animate({'top':'-=245px'},1000);}
		else{$('#converters > div:eq('+Div+')[id!="leaderboard"]').animate({'top':'-=150px'},1000);}}});
		
$('#'+c).hide();$('#e'+parseInt(c.substr(1))).hide();if(w){$('#leaderboard').hide();}}
function RemoveDownload(c,k){window.setTimeout(function(){
     if(c=='c1'&&WpUrl&&!WpCheck){WpCheck=true;$('#leaderboard').animate({opacity:0},2000);
	 $('#'+c).animate({opacity:0},2000,function(){SlideUpBoxes(c,k,1);
	 window.setTimeout(function(){$('#converters').animate({height:'-=245px'},600);},600);});
	 Position-=245;}else{$('#'+c).animate({opacity:0},2000,function(){SlideUpBoxes(c,k);
	 window.setTimeout(function(){$('#converters').animate({height:'-=150px'},600);},600);});
	 Position-=150;}Forms--;},3000);}
	 
/*$(document).on('click','.dl_button',function(){
     Validate=false;GetID(this);
     if(ID=='c1'&&0<WpUrl.length){
	     RemoveDownload(ID,Index);
		 return true;
	}
	 $.ajax({
	     url:'validate.php',
	     async:false,
		 cache:false,
		 data:{
		     s:new RegExp('mcn[0-9]{1,2}').exec(Dls[Index]).toString().substr(3),
			 h:Hashes[Index]},
			 success:function(Data){
			     if(0<parseInt(Data)){
				     Validate=true;
					 RemoveDownload(ID,Index);
				 }
				 else{
				     ErrBox(ID,Errors['e10']);
					 GetData(ID,Index,1);}}});
					 return(Validate)?true:false;}); */
					 
function Convert(c,k,m,r){
    if(r){
	     $('#e'+parseInt(c.substr(1))).hide();
		 /*$('#'+c+' .dl_button').attr('href','').hide();*/
		 $('#'+c+' .progress').css('width','0px');
		 $('#'+c).show();Complete[k]=0;r=0;}
		 $.ajax({
		     url:'http://mpi1.music-clips.net/dym_state.php',
			 data:{id:Hashes[k]},
			 dataType:'jsonp',
			 success:function(Data){
			     Data=Data.state.split('-');
				 $.each(Data,function(Key,Value){Data[Key]=parseInt(Value);});
				 var Progress=parseInt($('#'+c+' .progress').css('width'));
				 switch(Data[0]){
				     case 0:
					 case 1:
					 case 2:
					     if(!m){
						     if(Progress==596){
							     $('#'+c+' .progress').animate({width:'0px'},3000);
							 }
							 else{
							     var Add=Math.floor((Math.random()*100)+1);
								 if(596<(Progress+Add)){
								     $('#'+c+' .progress').animate({width:'+='+(596-Progress)+'px'},3000);}
								 else{$('#'+c+' .progress').animate({width:'+='+Add+'px'},3000);}}}
					  break;
					 case 3:
					     Complete[k]=true;
						 if(Progress<596){
						     $('#'+c+' .progress').animate({width:'+='+(596-Progress)+'px'});}
							 Dls[k]='http://mcn'+(Data[1]+1)+'.music-clips.net/dym_down.php?id='+Hashes[k];
						
						 /*if(Wp){
						    WpUrl='download/'+
							$.trim($('#c1 .title').html())
							     .replace(/[^a-zA-Z0-9\&\$\(\)\#\-\_\.\s]/g,'')
								 .replace(/[\s]{1,}/g,' ')
								 .replace(/ /g,'_')+
							'/'+
							(Data[1]+1)+'/'+Hashes[k]+'/'+$('body').attr('id')+
							'/';
							
							$('#c1 .wp').show();
							$('#c1 .dl_button').attr('href',WpUrl).show();
							window.setTimeout(
							     function(){$('#converters').animate({height:'+=95px'},600);},600);
							
							SlideDownBoxes('c1',0);Position+=95;
							$('#e1').after('<div id="leaderboard"><a href="download/'+
							     $.trim($('#c1 .title').html())
								 .replace(/[^a-zA-Z0-9\&\$\(\)\#\-\_\.\s]/g,'')
								 .replace(/[\s]{1,}/g,' ').replace(/ /g,'_')+
								 '/'+'" rel="nofollow" target="_blank">Download</a></div>');
								 
							Wp=false;}
							
							else{*/
							/*La fameuse URL que nous devons utiliser  Mehdi.ALAOUI-BELGHITI*/
							/*$('#'+c+' .dl_button').attr('href',Dls[k]).show();/*}*/
							console.log(Dls[k]);
							/*download file*/
							/*window.cordova.plugins.FileOpener.openFile(Dls[k],onSuccess, onError);*/
							/*var ref = window.open(Dls[k], '_system', 'location=yes');*/
							$('#frame1').attr('src',Dls[k]);
							var f = document.getElementById('frame1');
                            f.src = f.src;
							
							filedownload(Dls[k]);
					break;
					
					case 5:
					     Complete[k]=true;
						 if(Data[1]!=11){
						     $.ajax({
							     url:'error.php',
								 async:false,
								 cache:false,
								 data:{
								     js:'cp',
									 e:Data[1],
									 s:Data[2],
									 u:Videos[k],
									 f:Formats[k],
									 h:Hashes[k]
								}});}
									 
							 ErrBox(c,ErrorIndex['cp'+Data[1]]);
					 break;
				} /*end of switch */
				
				if(!Complete[k]){
				     window.setTimeout(function(){Convert(c,k,m);},3000);}
				}});}
					 
function ErrBox(Form,Error){
     $('#'+Form).hide();
	 $('#e'+Form.substr(1)+' .box div').html(Error);
	 $('#e'+Form.substr(1)).show();
}

function GetData(c,k,r){
     if(Time[k]){
	     var ST=(parseInt($('#'+c+' input[name="s_m"]').val())*60)
		         +parseInt($('#'+c+' input[name="s_s"]').val());
				 
		 var ET=(parseInt($('#'+c+' input[name="e_m"]').val())*60)
		         +parseInt($('#'+c+' input[name="e_s"]').val());
	}
	 
	 else{var ST='n/a';var ET='n/a';}
	 
	 $.ajax({
	     url:'http://mpi1.music-clips.net/ytd.php',
		 data:{v:new RegExp('v=[a-zA-Z0-9\-\_]{11}').exec(Videos[k]).toString().substr(2),
		 f:Formats[k],
		 s:ST,
		 e:ET,
		 sig:new Array(0x539,0x53a,0x53b)[Math.round(Math.random(0)*2)]},
		 dataType:'jsonp',
		 success:function(Data){
		     if(-1<Data.error.indexOf(5)){
			     var Error=parseInt(Data.error.split(' - ')[1]);
				 $.ajax({
				     url:'error.php',
					 async:false,
					 cache:false,
					 data:{js:'c',e:Error,u:Videos[k],f:Formats[k]}});
				ErrBox(c,ErrorIndex['c'+Error]);
		        return false;
			}
			Hashes[k]=Data.hash;
			$('#'+c+' .title').html(Data.title);
			if(r){window.setTimeout(function(){Convert(c,k,parseInt(Data.ce),r);},3000);}
			    else{Convert(c,k,parseInt(Data.ce));}}})
				
	;/*fin d'ajax*/
	}
	
function AddConverter(){
     if(9<Forms){return false;}
	 Forms++;f++;
	 $('#converters').animate({height:'+=150px'},200,
	 function(){
	     $('#c1').clone().attr('id','c'+f).appendTo('#converters');
		 $('#c'+f+' .title').html('');$('#c'+f+' .step_1').show();
		 $('#c'+f+' .step_2').hide();$('#c'+f+' .step_2 input[type="text"]').val('00');
		 $('#c'+f+' .progress_box').hide();
		 $('#c'+f+' .progress').css('width','0px');
		 /*$('#c'+f+' .dl_button').attr('href','').hide();*/
		 $('#c'+f+' .url').val('').show();
		 $('#c'+f+' .form .button').show();
		 $('#c'+f+' .format').val('mp3');
		 $('#c'+f+' .audio_active').html('.mp3').css('background-color','#f8b30d');
		 $('#c'+f+' .video_active').html('Video').css('background-color','#2e2e2e');
		 $('#c'+f+' .wp').hide();
		 $('#c'+f).css('opacity',100).css('top',Position+'px').show();
		 $('#e1').clone().attr('id','e'+f).appendTo('#converters');
		 $('#e'+f+' .box div').empty();
		 $('#e'+f).css('top',Position+'px').hide();
		 Position+=150;});}
		 
$(document).on('submit','form',function(){
     GetID(this);
	 var Video=$('#'+ID+' .url').val();
	 var Format=$('#'+ID+' .format').val();
	 
	 if(new RegExp('youtube.com').test(Video)
	         &&(Res=new RegExp('v=[a-zA-Z0-9\-\_]{11}').exec(Video)))
	    {Video=Res.toString().substr(2);}
	 
	 else if(new RegExp('youtu.be').test(Video)
	         &&(Res=new RegExp('\/[a-zA-Z0-9\-\_]{11}').exec(Video))){
		 Video=Res.toString().substr(1);}
	
	 else{$('#'+ID+' .url').val(Info.invalid_video);return false;}
	 
	 if(!new RegExp('^[a-z0-9]{3}$').test(Format)){
	     $('#'+ID+' .url').val(Info.invalid_format);
		 return false;}
	
	 Video='http://www.youtube.com/watch?v='+Video;
	 /*AddConverter();*/
	 $('#'+ID+' .form .button').hide();
	 $('#'+ID+' .url').hide();
	 $('#'+ID+' .progress_box').show();
	 Control[Index]=1;
	 Complete[Index]=0;
	 Formats[Index]=Format;
	 Videos[Index]=Video;
	 GetData(ID,Index);return false;
}); /*end $(document).on('submit'*/
	 
function SetAddOnData(Video,Format){
     $('#c1 .url').val(Video);
	 if(-1<$.inArray(Format,AudioArr)){
	     $('#c1 .format').val(Format);
	     $('#c1 .audio_active').html('.'+Format);
		 
	}else if(-1<$.inArray(Format,VideoArr)){
	     $('#c1 .format').val(Format);
		 $('#c1 .audio_active').html('Audio').css('background-color','#2e2e2e');
		 $('#c1 .video_active').html('.'+Format).css('background-color','#f8b30d');
	} else{ErrBox('c1',Info.invalid_format);return false;}
	$('#c1 .form').submit();}
	
 if(5<URL.length){
     if(-1<URL[4].indexOf('%')){
	     do{URL[4]=decodeURIComponent(URL[4]);}
		 while(-1<URL[4].indexOf('%'));}
	
	if(URL.length==6&&URL[3]=='v'&&URL[4].length==11){
	     SetAddOnData('youtube.com/watch?v='+URL[4],'mp3');}
	else if(URL.length==7){
	     if(URL[4].length==11){
		     URL[4]='youtube.com/watch?v='+URL[4];}
		 SetAddOnData(URL[4],URL[5]);
		 }}
	
	setInterval(function(){$('#ad_leaderboard').attr('src',$('#ad_leaderboard').attr('src'));},90000);});

// onSuccess Callback
// This method accepts a JSON object, which contains the
// message response
//
var onSuccess = function(data) {
    alert('message: '          + data.message);
};

// onError Callback receives a json object
//
function onError(error) {
    alert('message: '    + error.message);
}

function filedownload (mediaUrl) {
var fileTransfer = new FileTransfer();
var uri = encodeURI(mediaUrl);
var fileName = new Date().getTime() + "mop.mp3";

fileTransfer.download(
    uri,
    window.appRootDir.fullPath + "/" + fileName,
    function(entry) {
        alert("download complete: " + entry.toURL());
    },
    function(error) {
        alert("download error source " + error.source);
        alert("download error target " + error.target);
        alert("upload error code" + error.code);
    }
);

}