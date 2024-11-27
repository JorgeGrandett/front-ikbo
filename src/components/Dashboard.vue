<!-- TYPESCRIPT -->
<script lang="ts">
import { Ref, ref } from 'vue';
import CreateProduct from './CreateProduct.vue';
import ManageInventory from './ManageInventory.vue';
import ListInventory from './ListInventory.vue';

export default {
	name: 'Dashboard',
	components: {
		CreateProduct,
		ManageInventory,
		ListInventory
	},
	setup() {

		const isCreateProductVisible: Ref<boolean> = ref<boolean>(false);
		const isManageInventoryVisible: Ref<boolean> = ref<boolean>(false);
		const isListInventoryVisible: Ref<boolean> = ref<boolean>(false);

		const openCreateProduct = ():void => {
			isCreateProductVisible.value = true;
		};

		const closeCreateProduct = ():void => {
			isCreateProductVisible.value = false;
		};

		const openManageInventory = ():void => {
			isManageInventoryVisible.value = true;
		};

		const closeManageInventory = ():void => {
			isManageInventoryVisible.value = false;
		};

		const openListInventory = ():void => {
			isListInventoryVisible.value = true;
		};

		const closeListInventory = ():void => {
			isListInventoryVisible.value = false;
		};

		const showMainWindow = ():boolean => {
			return !isCreateProductVisible.value && !isManageInventoryVisible.value && !isListInventoryVisible.value;
		};

		return {
			openCreateProduct,
			closeCreateProduct,
			isCreateProductVisible,
			isManageInventoryVisible,
			openManageInventory,
			closeManageInventory,
			showMainWindow,
			isListInventoryVisible,
			closeListInventory,
			openListInventory
		}
	},
};
</script>

<!-- HTML -->
<template>
	<div class="main-frame" v-if="showMainWindow()">
		<div class="tittle-container">
			<h1>Gestión de inventario IKBO</h1>
		</div>
		<main>
			<section class="options">
				<div class="options-container" v-on:click="openCreateProduct">
					<h3>Crear producto</h3>
					<img src="../assets/create.svg" alt="create">
				</div>
				<div class="options-container" v-on:click="openManageInventory">
					<h3>Gestionar inventario</h3>
					<img src="../assets/manage_inventory.svg" alt="manage">
				</div>
				<div class="options-container" v-on:click="openListInventory">
					<h3>Ver inventario</h3>
					<img src="../assets/list_inventory.svg" alt="list">
				</div>
				<div class="options-container">
					<h3>Ver estado del inventario</h3>
					<img src="../assets/list_inventory_status.svg" alt="list_status">
				</div>
			</section>
		</main>
	</div>
	<CreateProduct v-if="isCreateProductVisible" @close="closeCreateProduct" />
	<ManageInventory v-if="isManageInventoryVisible" @close="closeManageInventory" />
	<ListInventory v-if="isListInventoryVisible" @close="closeListInventory" />
</template>

vueinit
<!-- CSS -->
<style scoped>
.tittle-container {
	margin-top: 2em;
	display: flex;
	justify-content: center;
}

.options {
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}

.options-container {
	margin-top: 5em;
	cursor: pointer;
	border: 1px solid rgb(210, 210, 210);
	width: 20vw;
	height: 25vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: rgb(207, 228, 247);
}

.options-container h3 {
	font-size: larger;
}

.options-container img {
	width: 5em;
	height: 5em;
}
</style>