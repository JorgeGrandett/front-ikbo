export class GetInventoryStatus {
	private idInventory: number;
	private idProduct: number;
    private productName: string;
    private productBarcode: string;
	private batch: string;
	private amount: number;
	private expirationDate: Date;
	private status: string;


	constructor(idInventory: number, idProduct: number, productName: string, productBarcode: string, batch: string, amount: number, expirationDate: Date, status: string) {
		this.idInventory = idInventory;
		this.idProduct = idProduct;
        this.productName = productName;
        this.productBarcode = productBarcode;
		this.batch = batch;
		this.amount = amount;
		this.expirationDate = expirationDate;
		this.status = status;
	}
}