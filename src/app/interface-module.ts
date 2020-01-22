export interface InterfaceModule {
}

// export interface productsModule {
//     productid: number;
//     productname: string;
//     productdesc: string;
//     price: number;
//     isimported: boolean;
//     istaxexcemption: boolean;
//   }

//   export interface productCartModule {
//     productid: number;
//     productname: string;
//     productdesc: string;
//     price: number;
//     isimported: boolean;
//     istaxexcemption: boolean;
//     noofitems:number;
//   }
  export interface productCartCheckoutModule {
    productid: number;
    productname: string;
    productdesc: string;
    price: number;
    isimported: boolean;
    istaxexcemption: boolean;
    noofitems:number;
    salestax:number;
    importduty:number;
  }
