import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TokenStorageService } from "../_service/token-storage.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private token: TokenStorageService,
    private toster: ToastrService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.ValidatorChecker(this.token.getToken()) && this.ValidatorChecker(this.token.getUser())) {
      const roles = next.data['role'] as Array<string>;
      // console.log(roles)
      if (roles) {
        const match = this.token.getUser().role[0]
        // console.log(match + ' ' + roles)
        if (match == roles) {
          return true;
        } else {
          // tslint:disable-next-line: quotemark

          this.router.navigate(['/']).then(() => {
            this.toster.error("unauthorise routing session logout");
          });
          this.logout()
          return false;
        }
      } else {
        return true;
      }
    }
    this.router.navigate(['/']).then(() => {
      this.toster.error("unauthorise routing");
    });;
    return false;
  }

  logout() {
    this.router.navigate(['/logout'])
  }
  private ValidatorChecker(data: any) {
    if (typeof data === "undefined" || data === null || data === '') {
      return false
    }
    else {
      return true
    }
  }
}

