<!-- TYPESCRIPT -->
<script lang="ts">
import { onMounted, ref } from "vue";
import { alert } from "../core/utils/sweetAlerts";
import { GetInventoryUseCase } from "../core/usecases/Inventory/GetInventory";
import { inventoryRepository } from "../infrastructure/HttpClient";

export default {
	name: "ListInventory",
	emits: ["close"],
	setup(_, { emit }) {

		const getInventoryUseCase: GetInventoryUseCase = new GetInventoryUseCase(inventoryRepository);

		const inventoryList = ref<Array<any>>([]);

		onMounted(async () => {
			inventoryList.value = await getInventoryUseCase.execute();
            if(inventoryList.value.length === 0) alert('Inventario vacío', 'No hay registros en el inventario', 'info', 'Aceptar')
		});

		const back = ():void => {
			emit("close");
		}

		return {
			back,
			inventoryList
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
			<h1>Listar inventario</h1>
		</div>
		<main>
			
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
