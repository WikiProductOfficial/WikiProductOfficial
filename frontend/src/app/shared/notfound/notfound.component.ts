import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss',
})
export class NotfoundComponent {
  constructor(private router: Router, private location: Location) {}
  @Input() errorCode: string = '404';
  @Input() errorMessage: string =
    'Oops! it seems that you are trying to access a page that does not exist';

  goToHome() {
    this.router.navigate(['/']);
  }
  goBack() {
    this.location.back();
  }
}
