export class Product {
    private idProduct: number;
    private name: string;
    private barcode: string;

    constructor(idProduct:number, name:string, barcode:string) {
      this.idProduct = idProduct;
      this.name = name;
      this.barcode = barcode;
    }
  }