import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ResultsPageComponent } from './components/results-page/results-page.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { WishlistPageComponent } from './components/wishlist-page/wishlist-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'results', component: ResultsPageComponent },
  { path: 'details/:id', component: DetailsPageComponent },
  { path: 'wishlist', component: WishlistPageComponent },
  // { path: '**', component: NotfoundComponent },
];
