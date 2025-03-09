import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/_service/auth.service';
import { SharedService } from '../../../shared/_service/shared.service';
import { TokenStorageService } from '../../../shared/_service/token-storage.service';
import { Router } from '@angular/router';
import { CollectionService } from '../../../shared/_service/collection.service';
import { users } from '../../../model/user';
import { login } from '../../../model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading: boolean = false
  form_login: login = {
    email: '',
    password: ''
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private toster: ToastrService,
    private tokenstorage: TokenStorageService,
    private sharedService: SharedService,
    private dataservice: CollectionService
  ) { }

  ngOnInit() {
    this.scrollToTop()
  }

  // login function
  signIn() {
    // console.log(this.form_login)
    this.loginauthapi(this.form_login)
  }
  // login api
  private loginauthapi(login: login) {
    // console.log(login)
    this.loading = true
    this.authService.login(login.email, login.password).subscribe({
      next: (data) => {
        // console.log(data)
        if (data && data.token) {
          this.loading = false;
          this.tokenstorage.saveUser(data);
          this.tokenstorage.saveToken(data.token);

          // Route based on user role
          const user = this.tokenstorage.getUser();
          if (user && user.role) {
            this.route(user.role);
            this.toster.success("Login Successfully");
          } else {
            console.error("User or user role is null or undefined.");
          }
        } else {
          // Handle the case when data or data.token is null
          console.error("Data or token is null.");
          this.loading = false;
        }

      },
      error: (error) => {
        console.error('Error signing in:', error);
        this.toster.error('Error signing in')
        this.loading = false
      }
    });
  }

  private trigertrefreshnavbar() {
    this.sharedService.triggerFunction();
  }
  route(role: string) {
    switch (role) {
      case 'client': {
        this.router.navigate(['/client/home']).then(() => {
          this.trigertrefreshnavbar()
        });
        break;
      }
      case 'freelancer': {
        this.router.navigate(['/freelancer/projectlist']).then(() => {
          this.trigertrefreshnavbar()
        });
        break
      }
      default: {
        this.router.navigate(['/'])
        console.log('role not found')
      }

    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
