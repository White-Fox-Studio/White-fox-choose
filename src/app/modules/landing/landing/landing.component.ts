import { Component } from '@angular/core';
import {Page, PAGES} from "../constants/pages";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  pages: Page[] = PAGES
}
