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
					.select('*');
				
					teams = data;
					console.log(teams);

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

<section class="h-screen flex flex-row justify-center items-center bg-surface">
	<!-- Tarjeta -->
	{#each matchs as match, index}
	<a href="/dashboard/{index+1}">
		<div class=" card card-hover flex flex-row m-4 ">
			
			<div class="max-w-sm rounded overflow-hidden shadow-lg">
				<div class="px-6 py-4  text-center">
					<div id="equipo" class="font-bold text-xl mb-4">
						{match[0]} vs {match[1]}
					</div>
					<!-- Mostrar los puntos de cada equipo -->
					<p class="text-white-700 text-xl">
						{teams[index].puntos_local} - {teams[index].puntos_visitante}
					</p>

					<div class="flex flex-row justify-between">
						<p class="text-white-700 text-m mt-4">
							{teams[index].fecha}  
						</p>
	
						<p class="text-white-700 text-m mt-4">
							{teams[index].lugar}
						</p>
					</div>

						

					
				</div>
			</div>
		</div>
	</a>
		
	{/each}
</section>
