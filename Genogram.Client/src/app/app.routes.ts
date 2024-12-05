import { Routes } from '@angular/router';
import { ChildDetailsComponent } from './portal/containers/child-details/child-details.component';
import { ChildListComponent } from './portal/containers/child-list/child-list.component';

export const routes: Routes = [
    {
        path: 'child-list',
        pathMatch: 'full',
        component: ChildListComponent
    },
    {
        path: 'child/:childId',
        pathMatch: 'full',
        component: ChildDetailsComponent,
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'child-list'
    },
];
