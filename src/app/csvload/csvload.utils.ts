import { Injectable } from '@angular/core';
import { TaxBrackets } from './taxbracket.constants';


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

  calculateIncomeTax(annualSalary) {
    let salaryRemaining = annualSalary;
    let taxAccrued = 0;


    //console.log('annualSalary', annualSalary);


    for (let taxBracket of TaxBrackets.FY2018) {

      //console.log('taxBracket.upperLimit', taxBracket.upperLimit);

      let salaryAmountToTax = taxBracket.upperLimit ? Math.min(salaryRemaining, taxBracket.upperLimit - (annualSalary - salaryRemaining)) : salaryRemaining;

      //console.log('salaryAmountToTax', salaryAmountToTax);
      //console.log('taxBracket.rate', taxBracket.rate);


      taxAccrued += salaryAmountToTax * taxBracket.rate;
      //console.log('taxAccrued', taxAccrued);


      salaryRemaining -= salaryAmountToTax;
      //console.log('salaryRemaining', salaryRemaining);

      if (salaryRemaining <= 0) {
        break;
      }
    }

    return taxAccrued;
  }


  getDataRecordsArrayFromCSVFile(csvRecordsArray, headerLength, validateHeaderAndRecordLengthFlag, tokenDelimeter) {
    let dataArr = []

    for (let i = 0; i < csvRecordsArray.length; i++) {
      let data = csvRecordsArray[i].split(tokenDelimeter);

      if (validateHeaderAndRecordLengthFlag && data.length !== headerLength) {
        if (data === '') {
          alert('Extra blank line is present at line number ' + (i + 1) + ', please remove it.');
          return null;
        } else {
          alert('Record at line number ' + i + ' contains ' + data.length +
            ' tokens, and is not matching with header length of :' + headerLength);
          return null;
        }
      }



      const annualSalary = Number.parseInt(data[2]);
      const superRate = Number.parseInt(data[3]) / 100;
      const monthlyGrossIncome = Math.floor(annualSalary / 12);




      const monthlyIncomeTax = Math.floor(this.calculateIncomeTax(annualSalary) / 12 + 0.5);


      const monthlyNetIncome = monthlyGrossIncome - monthlyIncomeTax;
      const monthlySuper = Math.floor(monthlyGrossIncome * superRate);


      let col = [];

      // first and last name
      col.push(data[0] + " " + data[1]);

      // Payment period.
      col.push(data[4]);

      // Gross Income.
      col.push(monthlyGrossIncome);

      // Income Tax.
      col.push(monthlyIncomeTax);

      // Net Income.
      col.push(monthlyNetIncome);

      // Super Contribution.
      col.push(monthlySuper);


      dataArr.push(col);
    }
    return dataArr;
  }

}