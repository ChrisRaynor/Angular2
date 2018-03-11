import { TestBed } from '@angular/core/testing';


import { FileUtil } from './csvload.utils';


import { CSVLoadComponent } from './csvload.component';



describe('CVS Load Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSVLoadComponent],
      providers: [FileUtil]
    });
  });


  it('should extract CSV data for a single row', () => {
    const fixture = TestBed.createComponent(CSVLoadComponent);

    let csvRecordsArray = ['David,Rudd,60050,9%,01 March - 31 March'];
    let headerLength = 5;


    let dataRecords = [];

    dataRecords = fixture.componentInstance.getDataRecordsArray(csvRecordsArray, headerLength);

    //console.log('dataRecords', dataRecords);

    expect(dataRecords[0][0]).toEqual('David Rudd'); // first and last name
    expect(dataRecords[0][1]).toEqual('01 March - 31 March'); // Payment period.
    expect(dataRecords[0][2]).toEqual(5004); // Gross Income.
    expect(dataRecords[0][3]).toEqual(922); // Income Tax.
    expect(dataRecords[0][4]).toEqual(4082); // Net Income.  
    expect(dataRecords[0][5]).toEqual(450); // Super Contribution.  
  });




  it('should extract CSV data for multiple rows', () => {
    const fixture = TestBed.createComponent(CSVLoadComponent);

    let csvRecordsArray = ['David,Rudd,60050,9%,01 March - 31 March', 'Ryan,Chen,120000,10%,01 March - 31 March'];
    let headerLength = 5;


    let dataRecords = [];

    dataRecords = fixture.componentInstance.getDataRecordsArray(csvRecordsArray, headerLength);

    //console.log('dataRecords', dataRecords);

    // First row.
    expect(dataRecords[0][0]).toEqual('David Rudd'); // first and last name
    expect(dataRecords[0][1]).toEqual('01 March - 31 March'); // Payment period.
    expect(dataRecords[0][2]).toEqual(5004); // Gross Income.
    expect(dataRecords[0][3]).toEqual(922); // Income Tax.
    expect(dataRecords[0][4]).toEqual(4082); // Net Income.  
    expect(dataRecords[0][5]).toEqual(450); // Super Contribution.

    // Second row.
    expect(dataRecords[1][0]).toEqual('Ryan Chen'); // first and last name
    expect(dataRecords[1][1]).toEqual('01 March - 31 March'); // Payment period.
    expect(dataRecords[1][2]).toEqual(10000); // Gross Income.
    expect(dataRecords[1][3]).toEqual(2669); // Income Tax.
    expect(dataRecords[1][4]).toEqual(7331); // Net Income.  
    expect(dataRecords[1][5]).toEqual(1000); // Super Contribution.      
      
  });

});