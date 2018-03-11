import { Injectable } from '@angular/core';

@Injectable()
export class FileUtil {

  constructor() {}

  isCSVFile(file) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr, tokenDelimeter) {
    let headers = csvRecordsArr[0].split(tokenDelimeter);
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  validateHeaders(origHeaders, fileHeaaders) {
    if (origHeaders.length !== fileHeaaders.length) {
      return false;
    }

    let fileHeaderMatchFlag = true;
    for (let j = 0; j < origHeaders.length; j++) {
      if (origHeaders[j] !== fileHeaaders[j]) {
        fileHeaderMatchFlag = false;
        break;
      }
    }
    return fileHeaderMatchFlag;
  }

 
}