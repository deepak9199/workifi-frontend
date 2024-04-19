import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './system/home/home.component';
import { LoginComponent } from './system/auth/login/login.component';
import { LogoutComponent } from './system/auth/logout/logout.component';
import { DefaultComponent } from './shared/default/default.component';
import { NavComponent } from './shared/nav/nav.component';
import { SideComponent } from './shared/side/side.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CoreModule } from './core/core.module';
import { RegisterComponent } from './system/auth/register/register.component';
import { RoleComponent } from './system/auth/role/role.component';
// firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { firebaseConfig } from './shared/_baseurl/firebaseconfig';

// form animantion
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// toser
import { ToastrModule } from 'ngx-toastr';
import { ManageProjectComponent } from './system/client/manage-project/manage-project.component';
import { CreateProjectComponent } from './system/client/create-project/create-project.component';
import { ProposalsComponent } from './system/client/proposals/proposals.component';
import { ProfileComponent } from './system/profile/profile.component';
import { FreelancerProjectListComponent } from './system/freelancer/freelancer-project-list/freelancer-project-list.component';
import { FreelancerSubmitProposalComponent } from './system/freelancer/freelancer-submit-proposal/freelancer-submit-proposal.component';
import { AuthGuard } from './shared/_guards/guard';
import { FreelancerListComponent } from './system/client/freelancer-list/freelancer-list.component';
import { ProposalToFreelancerComponent } from './system/client/proposal-to-freelancer/proposal-to-freelancer.component';
import { ClientHomeComponent } from './system/client/client-home/client-home.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    DefaultComponent,
    NavComponent,
    SideComponent,
    LoadingComponent,
    FooterComponent,
    RegisterComponent,
    RoleComponent,
    ManageProjectComponent,
    CreateProjectComponent,
    ProposalsComponent,
    FreelancerProjectListComponent,
    FreelancerSubmitProposalComponent,
    FreelancerListComponent,
    ProposalToFreelancerComponent,
    ProfileComponent,
    ClientHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
