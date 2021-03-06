var log_id = "#log";

var lastdate;

function log(string){
  $(log_id).append(string);
}

function setLog(data){
  $(log_id).html(data);
}

function getLog(){
  return $(log_id).html();
}

function getLogLastDate(){
  var data = getLog();

  if(data === null || data === "") return null;

  var lines = data.split("<br>");
  var date;

  for(var i = 0; i < lines.length; i++){
    var line = lines[i].replace("<b>", "");
    line = line.replace("</b>", "");

    var datevals = line.split("/");

    if(datevals.length === 3)
      date = parseInt(datevals[0]) + "/" + parseInt(datevals[1]) + "/" + parseInt(datevals[2]);
  }

  return date;
}

function logAction(action){
  //output is: "<br><br> MM/DD/YYYY <br> [action] at HH:MM AM/PM"
  var d = new date();
  var date = (d.getmonth()+1) + "/" + d.getdate() + "/" + (d.getyear()+1900);

  var new_ld = getLogLastDate(); 
  if(new_ld !== null)
    lastdate = new_ld;

  if(date !== lastdate){
    log("<br><br><b>"+
      (d.getMonth()+1) + "/" +d.getDate()+"/"+(d.getYear()+1900)+
      "</b>");
    lastdate = date;
  }

  //time will not work in IE 10 or lower

  {hour: "numeric", minute:"numeric", hour12:true});

log("<br>" + time + " - " + action);
}

function logError(msg){
  log("<br>[ERROR] " + msg);
}

function logLocation(status, address){
  if(status === "OK"){
     
    log(": " + address);
  } else {
    log(": unknown location");
    logError(status);
  }
}

function undoLog(){
  var log = getLog();

  var lines = log.split("<br>");

  if(lines.length > 0){
    var i = 1;
    var ll = lines[lines.length-i];

    //remove lines until you find an action or run out
    while(ll.indexOf("AM -") === -1 &&
      ll.indexOf("PM -") === -1 &&
      i > lines.length){
      setLog(log.substring(0, log.lastIndexOf("<br>")));

      i++;
      ll = lines[lines.length-i];
    }

    setLog(log.substring(0, log.lastIndexOf("<br>")));
  }
}
