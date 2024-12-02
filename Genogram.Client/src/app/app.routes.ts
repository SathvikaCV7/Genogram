import { Routes } from '@angular/router';
import { ChildDetailsComponent } from './portal/containers/child-details/child-details.component';
import { ChildListComponent } from './portal/containers/child-list/child-list.component';
import { RelationshipTableComponent } from './portal/containers/relationship-table/relationship-table.component';

export const routes: Routes = [
    {
        path:'child-list',
        pathMatch:'full',
        component:ChildListComponent
    }
    ,
    {
        path:'',
        pathMatch:'full',
        component:ChildDetailsComponent
    },
    {
        path: 'child/:id',  // ':id' is a dynamic route parameter
        component: ChildDetailsComponent,  // Your child details component
    },
  
];
