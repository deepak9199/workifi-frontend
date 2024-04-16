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
import { DashBoardComponent } from './system/client/dash-board/dash-board.component';
import { ManageProjectComponent } from './system/client/manage-project/manage-project.component';
import { CreateProjectComponent } from './system/client/create-project/create-project.component';
import { ClientFooterComponent } from './system/client/shared/client-footer/client-footer.component';
import { ClientNavComponent } from './system/client/shared/client-nav/client-nav.component';
import { ClientSideComponent } from './system/client/shared/client-side/client-side.component';
import { ProposalsComponent } from './system/client/proposals/proposals.component';
import { ProfileComponent } from './system/client/profile/profile.component';
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
    DashBoardComponent,
    ManageProjectComponent,
    CreateProjectComponent,
    ClientFooterComponent,
    ClientNavComponent,
    ClientSideComponent,
    ProposalsComponent,
    ProfileComponent,
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
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
