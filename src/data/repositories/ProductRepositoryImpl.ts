import { Product } from '../../core/entities/Product';
import { ProductRepository } from '../../domain/ProductRepository';
import { HttpResponseFormat } from '../../core/entities/responseFormat';
import { AxiosInstance } from 'axios';

export class ProductRepositoryImpl implements ProductRepository {
	private readonly apiUrl = `${import.meta.env.VITE_API_URL}/product`;

	constructor(private httpClient: AxiosInstance) {}

	async createProduct(product: Product): Promise<HttpResponseFormat> {
		const response = await this.httpClient.post(this.apiUrl, product);
		return new HttpResponseFormat(response.data.data, response.data.message, response.data.code);
	};

	async getProducts(): Promise<HttpResponseFormat> {
		const response = await this.httpClient.get(this.apiUrl);
		return new HttpResponseFormat(response.data.data, response.data.message, response.data.code);
	}
}
