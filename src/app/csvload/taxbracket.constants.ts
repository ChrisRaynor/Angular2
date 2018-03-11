import { Injectable } from '@angular/core';

@Injectable()
export class TaxBrackets {
  
  static FY2018: Array<{rate: number, upperLimit: number}> = [
    {rate: 0, upperLimit: 18200},
    {rate: 0.19, upperLimit: 37000},
    {rate: 0.325, upperLimit: 87000},
    {rate: 0.37, upperLimit: 180000},
    {rate: 0.45, upperLimit: null}
  ];


}