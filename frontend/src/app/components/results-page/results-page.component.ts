import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.scss',
})
export class ResultsPageComponent implements OnInit {
  query!: string;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.query = this.route.snapshot.queryParamMap.get('q') || '';
  }
}
