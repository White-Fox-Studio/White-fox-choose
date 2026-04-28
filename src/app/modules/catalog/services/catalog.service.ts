import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Catalog, CatalogCategory, CatalogPackage, CatalogResponse} from "../models/catalog.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  getCatalog():Observable<Catalog> {
    return this.http.get<CatalogResponse>(`/api/catalog`)
      .pipe(
        map((response): Catalog => {
          const categories: CatalogCategory[] = response.categories.map((category) => {
            let products = [];
            if (category.id === 34) {
              products = response.packages;
              products.sort((a,b) => a.sort_order - b.sort_order)
            } else {
              products = response.products.filter((product) => product.category_id === category.id)
              products.sort((a,b) => a.sort_product - b.sort_product)
              products.forEach((product) => {
                product.variants.sort((a,b) => a.sort_product - b.sort_product)
              })
            }

            return {
              ...category,
              products
            }
          })

          categories.sort((a,b) => a.sort_order - b.sort_order)

          return categories
        })
      )
  }

}
