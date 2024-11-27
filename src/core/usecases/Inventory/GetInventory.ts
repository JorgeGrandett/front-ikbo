import { GetInventory } from '../../entities/GetInventory';
import { InventoryRepository } from '../../../domain/InventoryRepository';
import { alert } from '../../../core/utils/sweetAlerts';
import { HttpResponseFormat } from '../../entities/responseFormat';

export class GetInventoryUseCase {
	constructor(private inventoryRepository: InventoryRepository) { };

	async execute(): Promise<Array<GetInventory>> {
        try {
			const response: HttpResponseFormat = await this.inventoryRepository.getInventory();
			
			return response.getData();
		} catch (error: any) {
			alert('Error', error.response.data.message, 'error', 'Aceptar');
			return [];
		}
	};
}