
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://ozcxexmhtvinzgdfasin.supabase.co', 'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96Y3hleG1odHZpbnpnZGZhc2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyOTY4NjAsImV4cCI6MjAzMDg3Mjg2MH0', {
    global: { fetch: fetch.bind(globalThis) }
})

async function LoadData(){

    
    try{
        const { data , error } = await supabase 
        .from('Partidos')
        .select('equipo_local_id', 'equipo_visitante_id')

        if (error){
            console.error('Error fetching data')
            return;
        }

        data.forEach(partido => {
            equipoLocalIds.push(partido.equipo_local_id);
            equipoVisitanteIds.push(partido.equipo_visitante_id);
        });

        // Aquí puedes hacer algo con las listas, por ejemplo, imprimir en consola
        console.log('IDs de equipos locales:', equipoLocalIds);
        console.log('IDs de equipos visitantes:', equipoVisitanteIds);
    }   
    catch(err){
        console.error('Error inesperado:',err)
    } 
}


// No olvides invocar la función para que se ejecute
LoadData();

