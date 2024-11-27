import { GetInventoryStatus } from '../../entities/GetInventoryStatus';
import { InventoryRepository } from '../../../domain/InventoryRepository';
import { alert } from '../../../core/utils/sweetAlerts';
import { HttpResponseFormat } from '../../entities/responseFormat';

export class GetInventoryStatusUseCase {
	constructor(private inventoryRepository: InventoryRepository) { };

	async execute(): Promise<Array<GetInventoryStatus>> {
        try {
			const response: HttpResponseFormat = await this.inventoryRepository.getInventoryStatus();
			
			return response.getData();
		} catch (error: any) {
			alert('Error', error.response.data.message, 'error', 'Aceptar');
			return [];
		}
	};
}