
// ------
//
// function getMAPReportIDs()
//
// this function goes through all PDF files in the designated Google folder and extracts the student ID from the end of the filename.
// It is intended to work with NWEA MAP student growth reports, which when exported as individual PDF files for each student, have
// a file name in the following pattern: "SSS_LLLLNNNN_XXX.pdf" Where XXX is the student number.
// The function will write the results onto a new sheet, with a link and the ID of the doc next to the student ID.
//
// ------
function getMAPReportIDs() {
  var sourceFolderID = '1XWvdKbXDBpOq-nUCnoNNMVfmnba_ob9T';
  var studentIdLength = 6;
  
  var mySs = SpreadsheetApp.getActive();
  var mySourceFolder = DriveApp.getFolderById(sourceFolderID);
   var files = mySourceFolder.getFilesByType(MimeType.PDF);

   var fileList = [["Student ID", "Doc ID", "Filename"]];
   while (files.hasNext()) {
   var file = files.next();
   var myName = file.getName();
   var StudentId = myName.substr(myName.length - (4+studentIdLength), studentIdLength);
   fileList.push([StudentId, file.getId(), file.getName()]);
   }
   mySs.insertSheet().getRange(1,1,fileList.length, fileList[0].length).setValues(fileList)
}

function copyTheseReports(){
var mySs = SpreadsheetApp.getActiveSheet();
  var myData = mySs.getDataRange().getValues();
  var output = [];
  var mySourceFolder = DriveApp.getFolderById('1XWvdKbXDBpOq-nUCnoNNMVfmnba_ob9T');
  var myOutputFolder = DriveApp.getFolderById('1R4oRf2oVYqxU5TM_WTjb4rCBzSGvoy3D');
  
   var files = mySourceFolder.getFilesByType(MimeType.PDF);
    Logger.log(files.hasNext());
   var fileList = {};
   while (files.hasNext()) {
   var file = files.next();
   var myName = file.getName();
   Logger.log(myName);
   var StudentId = myName.substr(myName.length - 10,6);
   Logger.log(StudentId);
   fileList[StudentId] = file.getId();
   }
  
  for(var r=1; r < myData.length; r++){
    output.push([fileList[myData[r][0]]]);
    myOutputFolder.addFile(DriveApp.getFileById(fileList[myData[r][0]]));
  }
  mySs.getRange(2,2,output.length,output[0].length).setValues(output);
}
