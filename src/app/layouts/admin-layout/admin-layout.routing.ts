import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {ActivitiesComponent} from "../../pages/activities/activities.component";
import {AuthGuardService} from "../../service/auth-guard.service";
import {AbbonamentiComponent} from "../../pages/abbonamenti/abbonamenti.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent  },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent,canActivate: [AuthGuardService]},
    { path: 'abbonamenti',    component: AbbonamentiComponent,canActivate: [AuthGuardService]},
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'activities',       component: ActivitiesComponent ,canActivate: [AuthGuardService]},
];
