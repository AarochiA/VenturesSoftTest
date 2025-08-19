import { Component } from '@angular/core';
import { ExploreInstCoupons } from '../../components/explore-inst-coupons/explore-inst-coupons';

@Component({
  selector: 'app-home.component',
  imports: [ExploreInstCoupons],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
