import { Component } from '@angular/core';
import { AuthService } from '../../../shared/_service/auth.service';
import { Router } from '@angular/router';
import { users } from '../../../model/user';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../shared/_service/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loading: boolean = false

  constructor(private authService: AuthService,
    private router: Router,
    private toster: ToastrService,
    private sharedservice: SharedService) { }

  ngOnInit() {
    this.scrollToTop()  }

  register(email: string, password: string, name: string, contact: string): void {

    if (typeof this.sharedservice.getdata() != 'undefined' && this.sharedservice.getdata() != null && this.sharedservice.getdata() != '') {
      if (name === "" && contact === "") {
        this.toster.error("Enter Name And Contact")
      }
      else if (name === "") {
        this.toster.error("Enter Name")

      }
      else if (contact === "") {
        this.toster.error("Enter  Contact")
      }
      else {
        this.resitrationapi(email, password, name, contact)
      }
    }
    else {
      this.toster.error('Role not selected')
    }

  }
  // resgister auth suer
  private resitrationapi(email: string, password: string, name: string, contact: string) {
    // console.log(email, password)
    this.loading = true
    this.authService.registerWithEmailAndPassword(email, password)
      .subscribe(
        (userCredential) => {
          if (userCredential) {
            // Registration successful, handle success
            // console.log('Registration successful:', userCredential.user?.uid);
            // create user
            let user: users = {
              contact: contact,
              createdTime: userCredential.user?.metadata.creationTime || "",
              email: email,
              name: name,
              uid: userCredential.user?.uid || '',
              role: this.sharedservice.getdata() || ""
            }
            // add user after registration
            this.adduserapi(user)
          } else {
            // Registration failed, handle error
            this.toster.error('Registration failed.');
            this.loading = false
          }
        });
  }
  // add auther user
  adduserapi(data: users) {
    this.authService.addUsers(data)
      .subscribe({
        next: (docRef) => {
          console.log('Document added with ID: ', docRef.id);
          // You can perform further actions here if needed
          this.router.navigate(['/login']).then(() => {
            this.toster.success('Registration successful Now You Can Login')
          })
        },
        error: (error) => {
          console.error('Error adding document: ', error);
        },
        complete: () => {
          this.loading = false
        },
      });
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
