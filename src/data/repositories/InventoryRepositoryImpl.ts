import { Inventory } from '../../core/entities/Inventory';
import { InventoryRepository } from '../../domain/InventoryRepository';
import { HttpResponseFormat } from '../../core/entities/responseFormat';
import { AxiosInstance } from 'axios';

export class InventoryRepositoryImpl implements InventoryRepository {
	private readonly apiUrl = `${import.meta.env.VITE_API_URL}/inventory`;

	constructor(private httpClient: AxiosInstance) {}

	async manageInventory(inventory: Inventory): Promise<HttpResponseFormat> {
		const response = await this.httpClient.post(`${this.apiUrl}/manage`, inventory);
		return new HttpResponseFormat(response.data.data, response.data.message, response.data.code);
	};
  	async getInventory(): Promise<HttpResponseFormat> {
		const response = await this.httpClient.get(this.apiUrl);
		return new HttpResponseFormat(response.data.data, response.data.message, response.data.code);
	};
  	async getInventoryStatus(): Promise<HttpResponseFormat> {
		const response = await this.httpClient.get(`${this.apiUrl}/status`);
		return new HttpResponseFormat(response.data.data, response.data.message, response.data.code);
	};

}
