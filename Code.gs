var thisUser = Session.getActiveUser().getEmail();
var masterListURL = "https://docs.google.com/spreadsheets/d/1KOICEHaqu3AI5PQ9yQZn7jJYjJ5qVDD_E7thPg3JE1s/edit";
var masterSheetName = "Sheet 1";
var myDefaultLink = "http://www.google.com";
var appTitle = "Your Links";

function setDefaults() {
  var mySs = SpreadsheetApp.openByUrl(masterListURL);
  var mySettings = mySs.getSheetByName("Settings").getDataRange().getValues();
  myDefaultLink = mySettings[1][1]; // get default link from settings sheet
  masterSheetName = mySettings[2][1]; // get sheet name from settings sheet
 // appTitle = (typeof mySettings[3][1] !== 'undefined' && mySettings[3][1] > 0) ? mySettings[3][1] : appTitle;
  
}

// doGet() - Serves the HTML landing page.
function doGet() {
  var myDoc = 'landing';  
  return HtmlService.createTemplateFromFile(myDoc).evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

// ----
// getMyLinks() - Called by the landing.html file on load.
//                This goes through the spreadsheet and seeks any rows that contain the logged-in user's email in column 1 and 2.
//                It returns an array containing the link and the title to the link.
// ----
function getMyLinks(){
  setDefaults();
  var mySs = SpreadsheetApp.openByUrl(masterListURL).getSheetByName(masterSheetName);
  var myData = mySs.getDataRange().getValues(); //Get the data in the spreadsheet
  var found = false;
  var myLink = []; //create a blank array to save all found data.
  for (var i=1; i < myData.length; i++){ //for each row
    if ((myData[i][0] == thisUser)||(myData[i][1] == thisUser)){ //if the logged in user email matches col 1 or col 2
      myLink.push([myData[i][2], myData[i][3]]); //add the link and title to the array
      found = true; //indicates that we found a link
    }
  }
  if (!found) myLink.push([myDefaultLink, "Sorry, no links found for this user "+ thisUser]); //Provide a message in form of link if no links found.
  return myLink;
}

