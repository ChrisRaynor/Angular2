import { Component, OnInit, ViewChild } from "@angular/core";
import { FileUtil } from './csvload.utils';
import { Constants } from './csvload.constants';
 
@Component({
  template: require('./csvload.component.html')
})

export class CSVLoadComponent implements OnInit {

  @ViewChild('fileImportInput')
  fileImportInput: any;

  csvRecords = [];

  constructor(private _fileUtil: FileUtil
  ) { }

  ngOnInit() { }

  // METHOD CALLED WHEN CSV FILE IS IMPORTED
  fileChangeListener($event): void {

    let target = $event.target || $event.srcElement;
    let files = target.files; 

    if(Constants.validateHeaderAndRecordLengthFlag){
      if(!this._fileUtil.isCSVFile(files[0])){
        alert("Please import valid .csv file.");
        this.resetFile();
      }
    }

    let input = $event.target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = () => {
      let csvData = reader.result;
      let csvRecordsArray = csvData.split(/\r\n|\n/);

      let headerLength = -1;
      if(Constants.isHeaderPresentFlag){
        let headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, Constants.tokenDelimeter);
        headerLength = headersRow.length; 
      }
      
      
      //console.log('headerLength', headerLength);
      //console.log('csvRecordsArray', csvRecordsArray);
      
      this.csvRecords = this.getDataRecordsArray(csvRecordsArray, headerLength);
      
      //console.log('csvRecords',this.csvRecords);
      
      
      if(this.csvRecords == null){
        //If control reached here it means csv file contains error, reset file.
        this.resetFile()
      }    
    }

    reader.onerror = function () {
      alert('Unable to read ' + input.files[0]);
    };
  };

  resetFile(){
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
  }
 
  
 getDataRecordsArray(csvRecordsArray, headerLength) {
   return this._fileUtil.getDataRecordsArrayFromCSVFile(csvRecordsArray, 
          headerLength, Constants.validateHeaderAndRecordLengthFlag, Constants.tokenDelimeter);
 }

}