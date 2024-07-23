import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  slides = [
    { image: 'assets/image1.jpg' },
    { image: 'assets/image2.jpg' },
    { image: 'assets/image3.jpg' }
  ];
}
