function doDate()
{
    var str = "";

    var days = new Array("Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă");
    var months = new Array("Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie");

    var now = new Date();

    str += "Acum este: " + days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + " " + ( "0" + now.getHours()).slice(-2) +":" + ( "0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
    document.getElementById("todaysDate").innerHTML = str;
}

setInterval(doDate, 1000);

window.onload = function getTodayDate()
{
    var MyDate = new Date();
    var MyDateString;
 
    var i;

    //for Weekdays
    if ( !( (MyDate.getDay() == 0) || (MyDate.getDay == 6)) ) { //0=Sunday, 6=Saturday
        //document.getElementById("today"+i+"Date").innerHTML = MyDateString;
        //console.log("Entering WEEKDAYS");
        var time2033=20*60 + 33;
        var timeNow = MyDate.getHours()*60 + MyDate.getMinutes();

        if ( timeNow <= time2033) { //if IPTV task has not been executed yet
            //PRINT last day
            for( i=0; i<5; i++){
                //current day
                MyDate = new Date();
                MyDate.setDate(MyDate.getDate()-(i+1)); //i+1
            
                MyDateString = ('0' + MyDate.getDate()).slice(-2) + '.'
                         + ('0' + (MyDate.getMonth()+1)).slice(-2) + '.'
                         + MyDate.getFullYear();
                document.getElementById("today"+i+"DateP").innerHTML = MyDateString; //Protv
                document.getElementById("today"+i+"DateA1").innerHTML = MyDateString; //Antena1
                         
                }
        }
        else
        {   //the weather has been recorded, you can show from now
            for( i=0; i<5; i++){
                //current day
                MyDate = new Date();
                MyDate.setDate(MyDate.getDate()-i); 
            
                MyDateString = ('0' + MyDate.getDate()).slice(-2) + '.'
                         + ('0' + (MyDate.getMonth()+1)).slice(-2) + '.'
                         + MyDate.getFullYear();
                document.getElementById("today"+i+"DateP").innerHTML = MyDateString; //Protv
                document.getElementById("today"+i+"DateA1").innerHTML = MyDateString; //Antena1
                }
        }
    }
    else //for Weekends
    {
        var time2003=20*60 + 3;
        var timeNow = MyDate.getHours()*60 + MyDate.getMinutes();

        //console.log("Entering WEEKEND");
        if (timeNow <= time2003){//( (MyDate.getHours() <= 20) || ( MyDate.getHours() >= 20 && MyDate.getMinutes() >= 3) ){ //if IPTV task has not been executed yet
            //PRINT last day
           // console.log("in IF");
            for( i=0; i<5; i++){
                //current day
                MyDate = new Date();
                MyDate.setDate(MyDate.getDate()-(i+1)); //i+1
            
                MyDateString = ('0' + MyDate.getDate()).slice(-2) + '.'
                         + ('0' + (MyDate.getMonth()+1)).slice(-2) + '.'
                         + MyDate.getFullYear();
                document.getElementById("today"+i+"DateP").innerHTML = MyDateString; //Protv
                document.getElementById("today"+i+"DateA1").innerHTML = MyDateString; //Antena1
                
                }
        }
        else
        {   //the weather has been recorded, you can show from now
            //console.log( MyDate.getHours() + " : " + MyDate.getMinutes())
            //console.log("in ELSE");
            for( i=0; i<5; i++){
                
                //current day
                MyDate = new Date();
                MyDate.setDate(MyDate.getDate()-i);
            
                MyDateString = ('0' + MyDate.getDate()).slice(-2) + '.'
                         + ('0' + (MyDate.getMonth()+1)).slice(-2) + '.'
                         + MyDate.getFullYear();
                //console.log("today"+i+"Date");
                document.getElementById("today"+i+"DateP").innerHTML = MyDateString; //Protv
                document.getElementById("today"+i+"DateA1").innerHTML = MyDateString; //Antena1
                
                }
        }
    }


}

//setInterval(getTodayDate, 1000);
//getTodayDate();

var prev_handler = window.onload;
window.onload = function () {
    if (prev_handler) {
        prev_handler();
    }
    var i;
    for( i=1; i<=5; i++){
        var myVideo = document.getElementById('protv'+i);
        myVideo.addEventListener('click', fullScreenFunction, false);
        //myVideo.addEventListener('dblclick', doubleClickFullScreen, false);
        myVideo = document.getElementById('antena1'+i);
        myVideo.addEventListener('click', fullScreenFunction, false);
    }

    //antena 1 to be added
    /*for( i=1; i<=5; i++){
        var myVideo = document.getElementById('antena1'+i);
        myVideo.addEventListener('click', fullScreenFunction, false);
    }*/
};

/*
function doubleClickFullScreen()
{
    if (isFullScreen())
    {
        if(this.paused)
        {
            this.pause();
        }
        if( !(this.paused))
        {
            this.play();
        }
    }
}
*/


function fullScreenFunction() {
    if (this.paused)  //if video is not started/paused 
    {
        if (!(isFullScreen())) //if video is not full screen ---> put full screen and play
        {
            console.log("VIDEO IS PAUSED AND IS FULL SCREEN");
            if (this.requestFullscreen) {
                this.requestFullscreen();
            }
            else if (this.msRequestFullscreen) {
                this.msRequestFullscreen();
            }
            else if (this.mozRequestFullScreen) {
                this.mozRequestFullScreen();
            }
            else if (this.webkitRequestFullScreen) {
                this.webkitRequestFullScreen();
            }
            console.log("VIDEO IS PAUSED AND IS NOT FULL SCREEN");
            this.play();
        }
        /*
        else // if video is on pause and in full screen ---> play
        {
            this.play();
        }*/

    }
    else //if (!(this.paused)) //if video is playing
    {
        if (!(isFullScreen())) //is playing and its not fullscreen --> leave on full screen and pause
        {
            console.log("VIDEO PLAYS AND IS NOT FULL SCREEN");
            if (this.requestFullscreen) {
                this.requestFullscreen();
            }
            else if (this.msRequestFullscreen) {
                this.msRequestFullscreen();
            }
            else if (this.mozRequestFullScreen) {
                this.mozRequestFullScreen();
            }
            else if (this.webkitRequestFullScreen) {
                this.webkitRequestFullScreen();
            }
            this.play();
        }
        else
        {
            console.log("VIDEO PLAYS AND IS FULL SCREEN");
            this.play();
        }
         //is playing and is already fullscreen --> pause
        
    }
    /*else{ //if video was playing and you clicked once
        this.pause();
    }*/
}

function isFullScreen() {
    if (document.fullscreenElement && document.fullscreenElement.nodeName == 'VIDEO') {
        return true;
    }
    return false;
}

/*
function isFullScreen()
{
    
    //if( window.innerHeight == screen.height) {
    if( document.fullscreenElement )
        return true;
    else
        return false;
    
}
*/