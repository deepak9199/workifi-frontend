import { Component } from '@angular/core';

@Component({
  selector: 'app-kyc-policy',
  templateUrl: './kyc-policy.component.html',
  styleUrl: './kyc-policy.component.css'
})
export class KycPolicyComponent {
  ngOnInit() {
    this.scrollToTop()  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
