export class Inventory {
	private idInventory: number;
	private idProduct: number;
	private batch: string;
	private amount: number;
	private expirationDate: Date | null;
	private operation: 'create' | 'add' | 'subtract';


	constructor(idInventory: number, idProduct: number, batch: string, amount: number, expirationDate: Date | null, operation: 'create' | 'add' | 'subtract') {
		this.idInventory = idInventory;
		this.idProduct = idProduct;
		this.batch = batch;
		this.amount = amount;
		this.expirationDate = expirationDate;
		this.operation = operation;
	}
}