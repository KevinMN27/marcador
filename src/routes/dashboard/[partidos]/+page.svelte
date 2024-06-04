<script>
	import { page } from '$app/stores';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Player from '../../../components/Player.svelte';
	import { supabase } from '../../../lib/supabaseConnection.js';
	import { onMount } from 'svelte';

	const partidoID = $page.params.partidos
	let equipos = [];
	
	const equipoID = 0;
	const modalStore = getModalStore();
	let stats = [];
	let jugadores = [];
	let teams = [];
	let nombreLocal = "";
	let nombreVisitante = "";
	let jugadoresLocales = [];
	let jugadoresVisitantes = [];
	let nombresJugadoresLocales = [];
	let nombresJugadoresVisitantes = [];
	
	
	let valorPartido = Number(partidoID);

	
	onMount(() => {
		async function loadEquipoData() {
			try {
				//quiero hacer un query para recuperar de la tabla de estadisticas los jugadores que jugaron el partido apartir de  paritodID
				let { data, error } = await supabase
					.from('Stats')
					.select('*')
					.eq('partido_id', partidoID);
					stats = data;
					console.log(stats);

					//quiero guardar en el array jugadores, el id de todos los jugadores que jugadoron el partido cuyo partido_id es igual a la variable partidoID
					data.forEach(match => {
						
						if(match.partido_id === valorPartido){
							jugadores.push(match.jugador_id);
							
							
						}
						jugadores = jugadores.slice();
						equipos = equipos.slice();
					});

					console.log(jugadores);
					
			} catch (error) {
				console.error("Error fetching data:", error);
			}

			//fetching de id de equipo de cada jugador 
			try{
				let { data, error } = await supabase
					.from('Jugadores')
					.select('equipo_id')
					.in('id', jugadores);
					console.log(data);
					data.forEach(match => {
						equipos.push(match.equipo_id);
						equipos = equipos.slice();
					});
					console.log(equipos);
			}
			catch(error){
				console.error("Error fetching data:", error);
			}

			try{
				let { data, error } = await supabase
					.from('Partidos')
					.select('equipo_local_id, equipo_visitante_id, puntos_local, puntos_visitante')
					.eq('id', partidoID);
					teams = data[0];
					console.log(teams);
			}

			catch(error){
				console.error("Error fetching data:", error);
			}

			try{
				let { data, error } = await supabase
					.from('Equipos')
					.select('nombre')
					.eq('id', teams.equipo_local_id);
					nombreLocal = data[0].nombre;
					console.log(nombreLocal);
			}
			catch(error){
				console.error("Error fetching data:", error);
			}

			try{
				let { data, error } = await supabase
					.from('Equipos')
					.select('nombre')
					.eq('id', teams.equipo_visitante_id);
					nombreVisitante = data[0].nombre;
					console.log(nombreVisitante);
			}
			catch(error){
				console.error("Error fetching data:", error);
			}

			//Necesito separar a los jugadores de cada equipo a partir de los equipos que jugaron el partido dependiendo de 
			//equipo_local_id y equipo_visitante_id sin consultas a base de datos

			jugadores.forEach(match => {
				if(equipos.includes(teams.equipo_local_id)){
					jugadoresLocales.push(match);
				}
				else{
					jugadoresVisitantes.push(match);
				}
			});

			console.log(jugadoresLocales);
			console.log(jugadoresVisitantes);

			try{
				let { data, error } = await supabase
					.from('Jugadores')
					.select('nombre')
					.in('id', jugadoresLocales);
					nombresJugadoresLocales = data;
					console.log(nombresJugadoresLocales);
			}
			catch(error){
				console.error("Error fetching data:", error);
			}

			try{
				let { data, error } = await supabase
					.from('Jugadores')
					.select('nombre')
					.in('id', jugadoresVisitantes);
					nombresJugadoresVisitantes = data;
					console.log(nombresJugadoresVisitantes);
			}
			catch(error){
				console.error("Error fetching data:", error);
			}

			
			
		}
		loadEquipoData();
		
	});
	
	

	function ModalComponent(IdJugador){
		const c = {
			ref: Player,
			props: {IdJugador}
		};
		const modal = {
			type: 'component',
			component: c,
			title: 'Estadistica de jugador',
			body: 'Baboso no hace nada'
		};
		modalStore.trigger(modal);
	}

	
            
        
	function HandleSelectValue(){
		const SelectedValue = event.target.value;
		ModalComponent(SelectedValue);
	}

	
</script>

<section class="nav-bar">
    
</section>
<section class="datos h-screen">
	<div class="grid grid-cols-2 justify-center items-center">
		<div class="h-full bg-primary-700 m-4 rounded-xl">
			<div class="grid grid-cols-2 mt-3 w-full">
				
				<div class="text-right ml-50">
					<h2 class="w-1/2">{nombreLocal}</h2>
				</div>
				<div class="">
					<h2 class="w-auto text-right">{teams.puntos_local}</h2>
				</div>
				
			
			</div>
			<!---
				Nombre del equipo, puntos,
			-->
			<div class="max-w-sm rounded overflow-hidden">
				<div class="px-15 py-15 w-20  text-xl">
					JUGADORES
				</div>
			</div>
			<select id="local" class="select" on:change={HandleSelectValue}>
				<option value="1">Option 1</option>
				<option value="2">Option 2</option>
				<option value="3">Option 3</option>
				<option value="4">Option 4</option>
				<option value="5">Option 5</option>
			</select>
		</div>

		

		<div class="h-full bg-secondary-600 m-4 rounded-xl">
			<div class="flex items-center w-full">
				<h2 class="w-auto text-right">{teams.puntos_visitante}</h2>
				<div class="w-1/2 text-left">{nombreVisitante}</div>
			</div>
			<div class="max-w-sm rounded overflow-hidden shadow-lg">
				<div class=" px-15 py-15 text-xl">
					JUGADORES
				</div>
			</div>

			<select id="visitante" class="select" on:change={HandleSelectValue}>
				<option value="1">Option 1</option>
				<option value="2">Option 2</option>
				<option value="3">Option 3</option>
				<option value="4">Option 4</option>
				<option value="5">Option 5</option>
			</select>
		</div>

		
		
	
	</div>

</section>
<section class="footer">

</section>