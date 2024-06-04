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

			<div class="flex flex-row items-center justify-between mt-1 w-full mb-10">	
				<div class="flex items-center justify-between">
					<h2 class="h2 m-2 font-bold">{nombreLocal}</h2>
				</div>
				<div class="flex items-end m-5 text-3xl font-bold">
					{teams.puntos_local}
				</div>
			</div>

			<div class="flex flex-row mb-10">
				<div class="flex text-2xl ml-2 mr-2 font-bold">
					Faltas:
				</div>
				<div class="flex text-2xl p-0.5 rounded-xl border border-white">
					20
				</div>
			</div>

			<div class="flex flex-row mb-10">
				<div class="flex text-2xl ml-2 mr-2 font-bold">
					Posesion de balon:
				</div>
				<div class="flex text-2xl  p-0.5 rounded-xl border border-white">
					20
				</div>
			</div>

			
			<!---
				Nombre del equipo, puntos,
			-->
			
				
			<h3 class="h3 w-full font-bold">JUGADORES</h3>
				
			
			<hr class="mt-5 mb-5"/>
			<div class="ml-1 mr-1">
				<select id="local" class="select" on:change={HandleSelectValue}>
					<option value="1">Option 1</option>
					<option value="2">Option 2</option>
					<option value="3">Option 3</option>
					<option value="4">Option 4</option>
					<option value="5">Option 5</option>
				</select>
			</div>
			
		</div>

		

		<div class="h-full bg-secondary-700 m-4 rounded-xl">

			<div class="flex flex-row items-center justify-between mt-1 w-full mb-10">	
				<div class="flex items-start m-5 text-3xl font-bold">
					{teams.puntos_visitante}
				</div>
				<div class="flex items-center justify-between">
					<h2 class="h2 m-2 font-bold">{nombreVisitante}</h2>
				</div>
				
			</div>

			<div class="flex flex-row mb-10">
				<div class="flex text-2xl ml-2 mr-2 font-bold">
					Faltas:
				</div>
				<div class="flex text-2xl p-0.5 rounded-xl border border-white">
					20
				</div>
			</div>

			<div class="flex flex-row mb-10">
				<div class="flex text-2xl ml-2 mr-2 font-bold">
					Posesion de balon:
				</div>
				<div class="flex text-2xl  p-0.5 rounded-xl border border-white">
					20
				</div>
			</div>

			<hr class="bg-white"/>
			<!---
				Nombre del equipo, puntos,
			-->
			<div class="max-w-sm rounded overflow-hidden mt-10">
				<div class="flex flex-row px-15 py-15 text-2xl mb-3 ml-2 font-bold items-center justify-center w-full">
						<h3 class="h3 flex flex-row">JUGADORES</h3>
				</div>
			</div>
			<div class="ml-1 mr-1">
				<select id="local" class="select" on:change={HandleSelectValue}>
					<option value="1">Option 1</option>
					<option value="2">Option 2</option>
					<option value="3">Option 3</option>
					<option value="4">Option 4</option>
					<option value="5">Option 5</option>
				</select>
			</div>
			
		</div>

		
		
	
	</div>

</section>
<section class="footer">

</section>