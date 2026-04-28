import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../services/catalog.service";
import {PreloaderService} from "../../../services/preloader/service/preloader.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  constructor(
    private catalogService: CatalogService,
    private preloaderService: PreloaderService,
  ) {}

  ngOnInit() {
    this.preloaderService.turnOn();
    this.catalogService.getCatalog()
      .subscribe(
        (v) => {
          this.preloaderService.turnOff();
          console.log(v);
        })
  }
}
