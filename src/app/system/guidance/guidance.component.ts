import { Component } from '@angular/core';

@Component({
  selector: 'app-guidance',
  templateUrl: './guidance.component.html',
  styleUrl: './guidance.component.css'
})
export class GuidanceComponent {
  constructor() { }

  ngOnInit() {
    this.scrollToTop()  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
