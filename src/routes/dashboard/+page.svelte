<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import { supabase } from '../../lib/supabaseConnection.js';
	import { onMount } from 'svelte';

	let loading = true;
	let errorMessage = '';
	let teams = [];

	onMount(() => {
		async function loadEquipoData() {
			try {
				let { data, error } = await supabase
					.from('Partidos')
					.select('equipo_local_id, equipo_visitante_id');
				console.log(data);
				teams = data;

				if (error) {
					errorMessage = 'Error cargando los datos';
					return;
				}
			} catch (err) {
				console.error('Error inesperado:', err);
				errorMessage = 'Error inesperado';
			}
		}
		loadEquipoData();
	});
</script>

<section class="h-screen flex flex-col justify-center items-center bg-surface">
	<!-- Tarjeta -->
	{#each teams as team}
		<div class="flex flex-row m-4">
			<div class="max-w-sm rounded overflow-hidden shadow-lg">
				<div class="px-6 py-4">
					<div id="equipo" class="font-bold text-xl mb-2">
						Equipo {team.equipo_local_id} vs Equipo {team.equipo_visitante_id}
					</div>

					<p class="text-white-700 text-base">
						No tengo idea de como mostrar los datos del fetch aca >:(
					</p>

					<div class="px-6 pt-4 pb-2">
						<span
							class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
							>Ver detalles</span
						>
					</div>
				</div>
			</div>
		</div>
	{/each}
</section>
