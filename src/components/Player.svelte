<script>
	import { getModalStore } from "@skeletonlabs/skeleton";
    import { supabase } from '../lib/supabaseConnection.js';
	import { onMount } from 'svelte';

    export let IdJugador;
    let stats = [];
    let player = [];
    
    const modalStore = getModalStore();

    onMount(() => {
        async function loadEquipoData() {
            
            try {
                let { data, error } = await supabase
                    .from('Stats')
                    .select('*')
                    .eq('jugador_id', IdJugador);
                    stats = data[0];
                    
                    
                console.log(stats);
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try{
                let { data, error } = await supabase
                    .from('Jugadores')
                    .select('*')
                    .eq('id', IdJugador);
                    player = data[0];
                console.log(player);
                
            }
            catch(error){

            }
        }
        loadEquipoData();
    });

</script>
<div class="bg-black rounded-lg p-3">
    <form>
        <div class="mb-12">
            <h3 class="text-3xl font-extrabold mb-5">Estadisticas del jugador</h3>
            <h4 class="ml-2">Nombre</h4>
            <input class="input placeholder-white w-22 mt-2 mb-4" type="text" placeholder="{player.nombre}" disabled>

            <div class="flex items-center mt-3">
                <div class="flex items-center space-x-2 mr-10">
                    <h4 class="ml-2">Dorsal</h4>
                    <input class="input placeholder-white w-20" type="text" placeholder="{player.dorsal}" disabled>
                </div>
                <div class="flex items-center space-x-2 ">
                    <h4>Posicion</h4>
                    <input class="input placeholder-white w-20" type="text" placeholder="{player.posicion}" disabled>
                </div>
            </div>
            
        </div>
        <div class="table-container ">
            <!-- Native Table Element -->
            <table class="table table-hover w-fit m-4">
                <thead>
                    <tr>
                        <th>Puntos <br>anotados</th>
                        <th>Tiros libres <br>anotados</th>
                        <th>Tiros libres <br>fallados</th>
                        <th>Faltas</th>
                    </tr>
                </thead>
                <tbody>    
                        <tr>
                            <td>{stats.puntos}</td>
                            <td>{stats.tiros_libres_anotados}</td>
                            <td>{stats.tiros_libres_fallados}</td>
                            <td>{stats.faltas}</td>
                        </tr>     
                </tbody> 
            </table>
        </div>
    </form>
</div>