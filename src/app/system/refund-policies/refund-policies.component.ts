import { Component } from '@angular/core';

@Component({
  selector: 'app-refund-policies',
  templateUrl: './refund-policies.component.html',
  styleUrl: './refund-policies.component.css'
})
export class RefundPoliciesComponent {
  constructor() { }

  ngOnInit() {
    this.scrollToTop()  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
