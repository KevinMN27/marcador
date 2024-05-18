<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import { supabase } from '../../lib/supabaseConnection.js';
    import { onMount } from 'svelte';

	let equipos = [];
    let loading = true;
    let errorMessage = '';

    async function loadEquipoData() {
        try {
            let { data, error } = await supabase
                .from('Partidos')
                .select('*');
				console.table(data);

            if (error) {
                console.error('Error fetching data:', error);
                errorMessage = "Error cargando los datos";
                return;
            }

            if (data.length > 0) {
                equipos = data.map(partido => ({
                    local: partido.equipo_local_id,
                    visitante: partido.equipo_visitante_id
                }));
            } else {
                errorMessage = "No hay partidos disponibles";
            }
        } catch (err) {
            console.error('Error inesperado:', err);
            errorMessage = "Error inesperado";
        } finally {
            loading = false;
        }
    }

loadEquipoData();
</script>
<section class="h-screen flex flex-col justify-center items-center bg-surface">
	<div class="flex flex-row m-4">
		<div class="max-w-sm rounded overflow-hidden shadow-lg">
			<div class="px-6 py-4">
				<div id="equipo" class="font-bold text-xl mb-2">Equipo1 vs Equipo 2</div>
				<p class="text-white-700 text-base">No tengo idea de como mostrar los datos del fetch aca >:(</p>	
			</div>
			<div class="px-6 pt-4 pb-2">
				<span
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
					>Ver detalles</span>
			</div>
		</div>

		<div class="max-w-sm rounded overflow-hidden shadow-lg">
			<div class="px-6 py-4">
				<div class="font-bold text-xl mb-2">Equipo1 vs Equipo 2</div>
				<p class="text-gray-700 text-base">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
					Maiores et perferendis eaque, exercitationem praesentium nihil.
				</p>
			</div>
			<div class="px-6 pt-4 pb-2">
				<span
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
					>Ver detalles</span
				>
			</div>
		</div>

		<div class="max-w-sm rounded overflow-hidden shadow-lg">
			<div class="px-6 py-4">
				<div class="font-bold text-xl mb-2">Equipo1 vs Equipo 2</div>
				<p class="text-gray-700 text-base">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
					Maiores et perferendis eaque, exercitationem praesentium nihil.
				</p>
			</div>
			<div class="px-6 pt-4 pb-2">
				<span
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
					>Ver detalles</span
				>
			</div>
		</div>

		<div class="max-w-sm rounded overflow-hidden shadow-lg">
			<div class="px-6 py-4">
				<div class="font-bold text-xl mb-2">Equipo1 vs Equipo 2</div>
				<p class="text-gray-700 text-base">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
					Maiores et perferendis eaque, exercitationem praesentium nihil.
				</p>
			</div>
			<div class="px-6 pt-4 pb-2">
				<span
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
					>Ver detalles</span
				>
			</div>
		</div>
	</div>

	<div class="flex flex-row m-4">
		<div class="max-w-sm rounded overflow-hidden shadow-lg">
			<div class="px-6 py-4">
				<div class="font-bold text-xl mb-2">Equipo1 vs Equipo 2</div>
				<p class="text-gray-700 text-base">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
					Maiores et perferendis eaque, exercitationem praesentium nihil.
				</p>
			</div>
			<div class="px-6 pt-4 pb-2">
				<span
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
					>Ver detalles</span
				>
			</div>
		</div>

		<div class="max-w-sm rounded overflow-hidden shadow-lg">
			<div class="px-6 py-4">
				<div class="font-bold text-xl mb-2">Equipo1 vs Equipo 2</div>
				<p class="text-gray-700 text-base">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
					Maiores et perferendis eaque, exercitationem praesentium nihil.
				</p>
			</div>
			<div class="px-6 pt-4 pb-2">
				<span
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
					>Ver detalles</span
				>
			</div>
		</div>

		<div class="max-w-sm rounded overflow-hidden shadow-lg">
			<div class="px-6 py-4">
				<div class="font-bold text-xl mb-2">Equipo1 vs Equipo 2</div>
				<p class="text-gray-700 text-base">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
					Maiores et perferendis eaque, exercitationem praesentium nihil.
				</p>
			</div>
			<div class="px-6 pt-4 pb-2">
				<span
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
					>Ver detalles</span
				>
			</div>
		</div>

		<div class="max-w-sm rounded overflow-hidden shadow-lg">
			<div class="px-6 py-4">
				<div class="font-bold text-xl mb-2">Equipo1 vs Equipo 2</div>
				<p class="text-gray-700 text-base">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
					Maiores et perferendis eaque, exercitationem praesentium nihil.
				</p>
			</div>
			<div class="px-6 pt-4 pb-2">
				<span
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
					>Ver detalles</span
				>
			</div>
		</div>
	</div>
</section>
