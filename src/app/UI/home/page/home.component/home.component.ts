import { Component } from '@angular/core';
import { ExploreInstCoupons } from '../../components/explore-inst-coupons/explore-inst-coupons';
import { UnlockFullPower } from "../../components/unlock-full-power/unlock-full-power";

@Component({
  selector: 'app-home.component',
  imports: [ExploreInstCoupons, UnlockFullPower],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
