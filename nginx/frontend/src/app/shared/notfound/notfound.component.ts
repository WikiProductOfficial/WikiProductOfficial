import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss',
})
export class NotfoundComponent {
  errorCode!: string;
  errorMessage!: string;

  constructor(
    private router: Router,
    private location: Location,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.errorCode = this.errorService.getErrorCode() || '404';
    this.errorMessage =
      this.errorService.getErrorMessage() ||
      'Oops! it seems that you are trying to access a page that does not exist';
  }

  // Method to navigate to home
  goToHome() {
    this.router.navigate(['/']);
  }

  // Method to go back
  goBack() {
    this.location.back();
  }
}
