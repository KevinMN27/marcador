<script>
    import { AppBar } from '@skeletonlabs/skeleton';
    import logo from '$lib/logo.jpeg';
</script>
<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
        <img src={logo} class="w-10" alt="logo"/>
    </svelte:fragment>
	<svelte:fragment slot="trail">
		<div class="flex flex-row">
			<p class="mr-2">Hola</p>
			<h2>buenas noches</h2>
		</div>
	</svelte:fragment>
</AppBar>

<slot />