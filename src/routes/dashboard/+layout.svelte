<script>
    import { AppBar } from '@skeletonlabs/skeleton';
    import logo from '$lib/logo.jpeg';
	import close from '$lib/close.png';
	import partidos from '$lib/partidos.png';
</script>
<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
        <img src={logo} class="w-10" alt="logo"/>
    </svelte:fragment>
	<svelte:fragment slot="trail">
		<div class="flex flex-row">
			<a href=" /dashboard">
				<img src={partidos} class="w-10" alt="partidos"/>	
			</a>
			<a href=" /">
				<img src={close} class="w-10 ml-5" alt="close"/>
			</a>
		</div>
	</svelte:fragment>
</AppBar>

<slot />