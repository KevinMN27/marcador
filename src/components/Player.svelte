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
                    console.log(stats.puntos)
                    console.log(stats.tiros_libres_anotados)
                    console.log(stats.tiros_libres_fallados)
                    console.log(stats.faltas)
                    
                console.log(stats);
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try{
                let { data, error } = await supabase
                    .from('Jugadores')
                    .select('*')
                    .eq('id', IdJugador);
                    player = data;
                console.log(player);
                
            }
            catch(error){

            }
        }
        loadEquipoData();
    });

    

    /*
    NOMBRE DEL JUGADOR, DORSAL, POSICION, PUNTOS, FALTAS, TIROS ANOTADOS, TIROS FALLADOS 
    */

</script>
<div>
    <form>
        <div class="mb-12">
            <h3 class="text-3xl font-extrabold">Estadisticas del jugador</h3>
        </div>
        <div class="table-container">
            <!-- Native Table Element -->
            <table class="table table-hover">
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
                <tfoot>
                    <tr>
                        <th colspan="3">Calculated Total Weight</th>
                        
                    </tr>
                </tfoot>
            </table>
        </div>
    </form>
    
    
</div>