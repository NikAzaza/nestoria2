import { Routes } from '@angular/router';
import { FilterPageComponent } from 'app/body/filter-page/filter-page.component';
import { MainPageComponent } from 'app/body/main-page/main-page.component';
import { RequestOptions } from 'app/interfaces/request-options.interface';

export const appRoutes: Routes = [
  { path: '', component:  MainPageComponent},
  { path: ':country/search/:place', component: FilterPageComponent},
  { path: '**', redirectTo: 'main' }
];
