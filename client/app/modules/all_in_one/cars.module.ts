import {FilterService} from "./filterController.service";
import {SearchParamsController} from "./searchParamsController.service";
import {PageController} from "./pageController.service";
 

export * from "./filterController.service"; 
export * from "./searchParamsController.service"; 
export * from "./pageController.service"; 

export var CARS_MODULE_PROVIDERS: Array<any> = [   
 FilterService, SearchParamsController, PageController
]; 