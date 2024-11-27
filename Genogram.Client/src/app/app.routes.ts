import { Routes } from '@angular/router';
import { ChildDetailsComponent } from './portal/containers/child-details/child-details.component';

export const routes: Routes = [

    {
        path:':childId',
        component:ChildDetailsComponent
    },
    {
        path:'',
        component:ChildDetailsComponent
    }
];
