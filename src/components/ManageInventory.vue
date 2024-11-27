<!-- TYPESCRIPT -->
<script lang="ts">
import { onMounted, Ref, ref } from "vue";
import { validateFormat } from "../core/utils/validateFormat";
import { alert } from "../core/utils/sweetAlerts";
import { GetProducts } from "../core/usecases/Product/GetProducts";
import { Inventory } from "../core/entities/Inventory";
import { ManageInventory } from "../core/usecases/Inventory/ManageInventory";
import { GetInventoryUseCase } from "../core/usecases/Inventory/GetInventory";
import {
	inventoryRepository,
	productRepository,
} from "../infrastructure/HttpClient";

export default {
	name: "ManageInventory",
	emits: ["close"],
	setup(_, { emit }) {
		const getProductsUseCase: GetProducts = new GetProducts(productRepository);
		const manageInventoryUseCase: ManageInventory = new ManageInventory(
			inventoryRepository
		);
		const getInventoryUseCase: GetInventoryUseCase = new GetInventoryUseCase(inventoryRepository);

		const productsList = ref<Array<any>>([]);
		const inventoryList = ref<Array<any>>([]);

		const selectedProductId: Ref<number> = ref<number>(0);
		const batchNumber: Ref<string> = ref<string>("");
		const quantity: Ref<number> = ref<number>(1);
		const expDate: Ref<string> = ref<string>("");

		const selectedInventoryId = ref<number>(0);
		const amountToChange = ref<number>(1);

		onMounted(async () => {
			productsList.value = await getProductsUseCase.execute();
			inventoryList.value = await getInventoryUseCase.execute();
		});

		const createInventoryRecord = async () => {
			if (
				!selectedProductId.value ||
				!validateFormat(
					batchNumber.value,
					new RegExp(/^[a-zA-Z0-9\-\/]{1,50}$/)
				) ||
				quantity.value <= 0 ||
				!expDate.value
			) {
				alert(
					"Error",
					"Por favor, complete todos los campos correctamente.",
					"warning",
					"Aceptar"
				);
				return;
			}

			const newInventory = new Inventory(
				0,
				selectedProductId.value,
				batchNumber.value,
				quantity.value,
				new Date(expDate.value),
				"create"
			);

			if (await manageInventoryUseCase.execute(newInventory)) resetForm();
		};

		const updateInventory = async (operation: 'add' | 'subtract'): Promise<void> => {
			if (!selectedInventoryId.value || amountToChange.value <= 0) {
				alert('"Error",','Por favor, seleccione un inventario y una cantidad válida.', 'warning', 'Aceptar');
				return;
			}

			const inventory = inventoryList.value.find(i => i.idInventory === selectedInventoryId.value);

			const updateInventory = new Inventory(
				selectedInventoryId.value,
				inventory.idProduct,
				inventory.batch,
				amountToChange.value,
				null,
				operation
			);

			if (await manageInventoryUseCase.execute(updateInventory)) resetForm();
		}

		const resetForm = ():void => {
			selectedProductId.value = 0;
			batchNumber.value = "";
			quantity.value = 1;
			expDate.value = "";
			selectedInventoryId.value = 0;
			amountToChange.value = 1;
		};

		const currentDate = (): string => {
			return new Date().toISOString().split("T")[0];
		}

		const back = ():void => {
			emit("close");
		}

		return {
			back,
			productsList,
			selectedProductId,
			batchNumber,
			quantity,
			expDate,
			currentDate,
			createInventoryRecord,
			inventoryList,
			selectedInventoryId,
			amountToChange,
			updateInventory
		};
	},
};
</script>

<!-- HTML -->
<template>
	<div class="main-frame">
		<div class="tittle-container">
			<div>
				<button v-on:click="back">Volver</button>
			</div>
			<h1>Administrar inventario</h1>
		</div>
		<main>
			<section class="new-inventory">
				<h2>Crear Nuevo Registro de Inventario</h2>

				<div>
					<label for="productsList">Seleccionar Producto:</label>
					<select v-model="selectedProductId">
						<option value="0" disabled>Seleccionar Producto</option>
						<option v-for="product in productsList" :key="product.idProduct" :value="product.idProduct">
							{{ product.barcode + " | " + product.name }}
						</option>
					</select>
				</div>
				<div>
					<label for="batch">Número de Lote:</label>
					<input v-model="batchNumber" type="text" placeholder="Número de lote" />
				</div>
				<div>
					<label for="quantity">Cantidad:</label>
					<input v-model.number="quantity" type="number" min="1" placeholder="Cantidad" />
				</div>
				<div>
					<label for="expiry-date">Fecha de Vencimiento:</label>
					<input v-model="expDate" type="date" v-bind:min="currentDate()" />
				</div>

				<button @click="createInventoryRecord">Crear Registro</button>
			</section>

			<section class="manage-inventory">
				<h2>Gestionar Inventario</h2>

				<div>
					<label for="inventory">Seleccionar Inventario:</label>
					<select v-model="selectedInventoryId">
						<option value="0" disabled>Seleccionar Inventario</option>
						<option v-for="inventory in inventoryList" :key="inventory.idInventory" :value="inventory.idInventory">
							{{ inventory.productName }} - Lote: {{ inventory.batch }}
						</option>
					</select>
				</div>

				<div>
					<label for="amount">Cantidad a Añadir o Restar:</label>
					<input v-model.number="amountToChange" type="number" min="1" />
				</div>

				<button @click="updateInventory('add')">Añadir</button>
				<button @click="updateInventory('subtract')">Sustraer</button>
			</section>
		</main>
	</div>
</template>

vueinit
<!-- CSS -->
<style scoped>
.tittle-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1em;
}

.tittle-container div {
	width: 20%;
}

.tittle-container h1 {
	width: 60%;
	display: flex;
	justify-content: center;
	margin-right: 20%;
}

.back-button {
	cursor: pointer;
	color: blue;
	text-decoration: underline;
}
</style>
