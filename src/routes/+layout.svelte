<script>
	import '../app.postcss';
	import Footer from '../components/Footer.svelte';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { initializeStores, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { Modal } from '@skeletonlabs/skeleton';

	initializeStores();
	
</script>
<Modal />



<slot />

<Footer/>
