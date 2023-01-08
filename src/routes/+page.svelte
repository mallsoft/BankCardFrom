<script>
	import CardForm from '$lib/form/CardForm.svelte';

	let json = '';

	function handleFormSubmit({ detail: { formData } }) {
		json = JSON.stringify(Object.fromEntries(formData), null, 2);
	}
</script>

{#key json}
	<CardForm on:formSubmit={handleFormSubmit} />
{/key}

{#if json}
	<pre>
		{json}
	</pre>
{/if}
