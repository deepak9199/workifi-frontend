import { Component } from '@angular/core';
import { TokenStorageService } from '../../shared/_service/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loading: boolean = false


}
