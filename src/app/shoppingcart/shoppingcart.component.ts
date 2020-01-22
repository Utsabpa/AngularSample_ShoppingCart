import { Component, OnInit } from '@angular/core';
import { productCartCheckoutModule } from './../interface-module';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  private displayedColumns: string[];
  private dataSource: productCartCheckoutModule[];
  private isCheckOut: boolean = false;
  private checkoutSummary: Array<{ value: number, text: string }> = [];

  constructor(private httpService: HttpClient) { }

  ngOnInit() {
    this.loadProducts();
  }
  clkCheckout() {

    let selectedProduct = this.dataSource.filter(w => w.noofitems && w.noofitems > 0);
    if (selectedProduct.length > 0) {
      this.displayedColumns = ['productid', 'productname', 'price', 'isimported', 'istaxexcemption', 'quantity', 'totalprice'];
      let salestax: number = 0;
      let totalPrice: number = 0;
      this.checkoutSummary = [];
      let c = this;
      selectedProduct.forEach(function (val) {
        if (val.noofitems > 0) {
          val.salestax = !val.istaxexcemption ? Math.round(((val.price / 100) * 10 * val.noofitems) / 0.05) * 0.05 : val.salestax;
          val.importduty = val.isimported ? Math.round(((val.price / 100) * 5 * val.noofitems) / 0.05) * 0.05 : val.importduty;
          c.checkoutSummary.push({ text: val.noofitems + " " + val.productdesc, value: (val.noofitems * val.price) + val.salestax + val.importduty });
          salestax = salestax + val.salestax + val.importduty;
          totalPrice = totalPrice + (val.noofitems * val.price) + val.salestax + val.importduty;
        }
      });
      this.checkoutSummary.push({ text: "Sales Taxes", value: salestax });
      this.checkoutSummary.push({ text: "Total", value: totalPrice });
      this.isCheckOut = true;
    } else {
    }
  };
  clkClear() {
    this.checkoutSummary = [];
    this.isCheckOut = false;

    this.loadProducts();
  }
  loadProducts() {
    this.displayedColumns = ['productid', 'productname', 'price', 'isimported', 'istaxexcemption', 'addproduct', 'noofitems'];
    this.httpService.get('./assets/products.json').subscribe(
      data => {
        this.dataSource = data as productCartCheckoutModule[];
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
}
