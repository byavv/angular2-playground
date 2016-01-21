import {HomeComponent} from '../components/pages/home/home.component';
import {RouteDefinition} from 'angular2/router';

export const Routes = {
  home: {
    path: '/',
    as: 'Home',
    component: HomeComponent,
    link: ['/Home']
  }  
};

export const APP_ROUTES: RouteDefinition[] =
    Object.keys(Routes).map((name) => Routes[name]);