import { Component } from '@angular/core';
import { login } from '../../../model/login';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/_service/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  loading: boolean = false

  form_login: login = {
    email: '',
    password: ''
  }

  constructor(
    private toster: ToastrService,
    private authservice: AuthService
  ) {
    console.warn('forget pass loaded')
  }
  forgetpass() {
    this.loading = true
    this.authservice.sendPasswordResetEmail(this.form_login.email).subscribe({
      next: res => {
        console.log(res)
        this.toster.success("Password Rest link send to your email")
        this.loading = false
      },
      error: err => {
        console.error(err)
        this.loading = false
      }
    })
  }

}
