import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../system/home/home.component';
import { LoginComponent } from '../system/auth/login/login.component';
import { RegisterComponent } from '../system/auth/register/register.component';
import { RoleComponent } from '../system/auth/role/role.component';
import { DashBoardComponent } from '../system/client/dash-board/dash-board.component';
import { ManageProjectComponent } from '../system/client/manage-project/manage-project.component';
import { CreateProjectComponent } from '../system/client/create-project/create-project.component';
import { ProfileComponent } from '../system/client/profile/profile.component';
import { ProposalsComponent } from '../system/client/proposals/proposals.component';
import { LogoutComponent } from '../system/auth/logout/logout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'role', component: RoleComponent },
  { path: 'client/dashboard', component: DashBoardComponent },
  { path: 'client/manageproject', component: ManageProjectComponent },
  { path: 'client/createproject', component: CreateProjectComponent },
  { path: 'client/profile', component: ProfileComponent },
  { path: 'client/proposals', component: ProposalsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
