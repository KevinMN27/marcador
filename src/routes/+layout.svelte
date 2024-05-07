<script>
	import '../app.postcss';
	import Footer from '../components/Footer.svelte';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	import { AppBar } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	//Imports De Skeleton
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import { AutocompleteOption } from '@skeletonlabs/skeleton';

	let popupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	let inputPopupDemo = '';

	const flavorOptions = [
		{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
		{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
		{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
		{
			label: 'Neapolitan',
			value: 'neapolitan',
			keywords: 'mix, strawberry, chocolate, vanilla',
			meta: { healthy: false }
		},
		{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
		{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	];
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead"><i class="fa-solid fa-bars text-2xl"></i></svelte:fragment>
	<svelte:fragment slot="trail">
		<div class="flex flex-row">
			<p class="mr-2">Hola</p>
			<h2>buenas noches</h2>
		</div>
	</svelte:fragment>
</AppBar>

<slot />

<Footer/>
