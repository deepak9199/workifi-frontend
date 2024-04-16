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
    RoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
