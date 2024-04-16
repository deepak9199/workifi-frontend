import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/_service/auth.service';
import { SharedService } from '../../../shared/_service/shared.service';
import { TokenStorageService } from '../../../shared/_service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading: boolean = false

  constructor(
    private authService: AuthService, private router: Router,
    private toster: ToastrService,
    private tokenstorage: TokenStorageService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  // login function
  signIn(email: string, password: string) {
    if (email === "" && password === "") {
      this.toster.error("Email && Password is empty")
    }
    else if (email === "") {
      this.toster.error("Email is empty")
    }
    else if (password === "") {
      this.toster.error("Password is empty")
    }
    else {
      // console.log(email, password)
      this.loginauthapi(email, password)
    }

  }
  // login api
  private loginauthapi(email: string, password: string) {
    this.loading = true
    this.authService.signInWithEmailAndPassword(email, password).subscribe(
      response => {
        if (response) {
          // console.log('User Credential:', response.userCredential);
          // console.log('User token:', response.token);
          // console.log('User ID:', response.uid);
          // Redirect to dashboard or perform other actions
          this.loading = false
          this.router.navigate(['/']).then(() => {
            this.toster.success("Login SuccessFully")
            this.tokenstorage.saveUser((response))
            this.tokenstorage.saveToken(response.token)
            this.trigertrefreshnavbar()
          });
        } else {
          // Handle null response, possibly display an error message
          this.toster.error('Authentication failed')
          this.loading = false
        }
      },
      error => {
        console.error('Error signing in:', error);
        this.toster.error('Error signing in')
        this.loading = false
      }
    );
  }

  private trigertrefreshnavbar() {
    this.sharedService.triggerFunction();
  }
}
