Hooks.once("ready", async () => {
    if (!game.user.isGM) {
        return;
    }
/*
    This macro will create the dialog shown after foundry vtt has loaded and is ready. The macro also loads text from modules/weather-reports/wrVersionUpdate.html so I can update the .html file after updating the module instead of updating the macro.
*/

//next we will create the changes to the CSS
var styles =`
    <style> 
        .box {
            outline-color: white;
            outline-width: 3px;
            outline-style: groove;
            background-color: #78eaf8;
            color: #333659;
            border: 5px solid black;
            padding: 10px;
            overflow-y: scroll;
            height:400px;>
        }
        .H3 {
            font-family: 'Modesto Condensed';
            font-size: 50px;
            text-align: center;
            color: black;
            -webkit-text-fill-color: white;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: black;
        }
        .H9 {
            font-family: 'Modesto Condensed';
            font-size: 30px;
            text-align: center;
            color: #000033;
        }
        .versionNum {
            font-size: 10px;
            font-style: italic;
            text-align: center;
        }
         .exitWarning {
            font-size: 10px;
            font-style: italic;
        }
        .dismiss {
            font-family: 'Modesto Condensed';
            font-size: 20px;
            background-color: #99ff99;
        }
        .hide {
            font-family: 'Modesto Condensed';
            font-size: 20px;
        }
        button.dialog-button.Dismiss {
            background-color: #99ff99;
            border: 2px groove;
        }
        button.dialog-button.Hide {
            background-color: #ff9999;
            border: 2px groove;
        }
    </style>`;

    
const changes = await renderTemplate("modules/weather-reports/scripts/wrVersionUpdate.html");

//This is the main div above the buttons, it also inserts(data-include) the external html
var divs =`
    <div class="box">
    <center><img src="modules/weather-reports/img/weather-reports-logo.webp" style="width:200px;height:200px;"></center>
    <h1 class="H3">Weather Reports</h3>
    <div id="div1">${changes}</div>
    </div>`;

//this is the warning above the buttons
var dismissOrHide =`<center><p class="exitWarning">You can dismiss this message or hide it until the next update.</p></center>`;

//This next JQuery section will not load with this script for some reason, but will load when run as a macro....
/*$(document).ready(function(){
      $("#div1").load("modules/weather-reports/scripts/wrVersionUpdate.html", function(responseTxt, statusTxt, xhr){
    if(statusTxt == "success")
      console.log("External content loaded successfully!");
    if(statusTxt == "error")
      console.log("Error: " + xhr.status + ": " + xhr.statusText);
  });
});*/

//Lets check to see if we should be hidden, and cancel the loading if we are hidden.
const changelogIsHidden = game.settings.get("weather-reports", "isHidden");
//we can use: "if (changelogIsHidden == true) {" or:
	if (changelogIsHidden) {
	return;
	}

//this creates the dialog
new Dialog({
  title: "Weather Reports Readme",
  content: styles + divs + dismissOrHide,
  buttons: {
    Dismiss: {
      label: "Dismiss",
      icon: '<i class="fa-regular fa-thumbs-up"></i>',
      callback: () => {}
    },
    Readme: {
      label: "View Readme",
      icon: '<i class="fas fa-book"></i>',
      callback: () => {
        ui.notifications.info("Opening Readme!");
        Hotbar.toggleDocumentSheet("Compendium.weather-reports.weather-journals.BrF4Vm7rU7YtPlRk")
        }
    },
    Hide: {
      label: "Hide until next update",
      icon: '<i class="fa-solid fa-ban"></i>',
      callback: () => game.settings.set("weather-reports", "isHidden", true)
    }
  },
    default: 'Dismiss',
}).render(true)
});
