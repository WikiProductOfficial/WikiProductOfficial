import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Footer } from 'primeng/api';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {
  errorMessage = 'Oops! it seems that you are trying to access a page that does not exist';
}
