import { Component } from '@angular/core';
import { UnlockFullPower } from '../../components/unlock-full-power/unlock-full-power';
import { LinkYourCard } from '../../components/link-your-card/link-your-card';
import { FeaturedInstCoupons } from '../../components/featured-inst-coupons/featured-inst-coupons';

@Component({
  selector: 'app-home.component',
  imports: [UnlockFullPower, LinkYourCard, FeaturedInstCoupons],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
