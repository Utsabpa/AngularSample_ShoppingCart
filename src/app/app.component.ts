import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shoppingcart';

  public windowHight: number = window.innerHeight;
  ngOnInit() {
    let c:any=this;
    window.onresize = function ():any {
      c.windowHight = window.innerHeight;
    };
  }


}
