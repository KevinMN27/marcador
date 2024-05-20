<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import { supabase } from '../../lib/supabaseConnection.js';
	import { onMount } from 'svelte';

	let loading = true;
	let errorMessage = '';
	let teams = [];
	let name = [];
	let matchs = []
	
	onMount(() => {
		async function loadEquipoData() {
			try {
				let { data, error } = await supabase
					.from('Partidos')
					.select('equipo_local_id, equipo_visitante_id');
				
				teams = data;
					
					let { data: data_equipos, error: error_local } = await supabase
						.from('Equipos')
						.select('id,nombre')
									
					data.forEach(match => {
						const names = [];

						const equipoLocal = data_equipos.find(equipo => equipo.id === match.equipo_local_id);
						if (equipoLocal) names.push(equipoLocal.nombre);

						const equipoVisitante = data_equipos.find(equipo => equipo.id === match.equipo_visitante_id);
						if (equipoVisitante) names.push(equipoVisitante.nombre);

						matchs.push(names);
						matchs = matchs.slice();
					});
					
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
	{#each matchs as match}
		<div class="flex flex-row m-4">
			<div class="max-w-sm rounded overflow-hidden shadow-lg">
				<div class="px-6 py-4">
					<div id="equipo" class="font-bold text-xl mb-2">
						{match[0]} vs {match[1]}
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
