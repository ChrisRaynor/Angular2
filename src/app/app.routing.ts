import { RouterModule, Routes } from '@angular/router';


import { AboutComponent } from './about/about.component';
import { CSVLoadComponent } from './csvload/csvload.component';

const routes: Routes = [
  { path: '', component: CSVLoadComponent },
  { path: 'about', component: AboutComponent},
];

export const routing = RouterModule.forRoot(routes);
