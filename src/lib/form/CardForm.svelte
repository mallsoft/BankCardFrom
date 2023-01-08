<script>
	import Card from './Card.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let formElement;
	let validFormat = false;
	let focusing = '';
	let name,
		number,
		month,
		year,
		ccv,
		cardType = 'someCardType?';

	function isInThePast(yy, mm) {
		const now = new Date(new Date().toISOString('en').slice(0, 7)); // only want YYYY-MM
		const check = new Date(`20${yy}-${mm}`); // assuming not (year 2100 or more :)

		return check < now;
	}
</script>

<article>
	<!-- 🔵 All fields are required -->
	<form
		bind:this={formElement}
		on:submit|preventDefault={() => {
			dispatch('formSubmit', {
				formData: new FormData(formElement)
			});
		}}
		on:input={() => {
			validFormat = formElement.checkValidity();
		}}
		on:focusin={({ target }) => (focusing = target.name)}
		on:focusout={() => (focusing = '')}
		autocomplete="off"
	>
		<!-- 🔵 Card Holder name should only be letters with at least 5 characters -->
		<label>
			<span>Card Holder Name (5+ characters)</span>
			<input
				required
				placeholder="Firstname Lastname"
				type="text"
				name="name"
				minlength="5"
				maxlength="999"
				pattern={String.raw`.{5,999}`}
				bind:value={name}
			/>
		</label>

		<!-- 🔵 Card Number should be 16 digits and only containing numbers -->
		<label>
			<span>Card Number (16 numbers)</span>
			<input
				required
				placeholder="#### #### #### ####"
				type="text"
				name="number"
				minlength="16"
				maxlength="16"
				pattern={String.raw`\d{16}`}
				bind:value={number}
			/>
		</label>

		<!-- 🔵 Expiration date should be a valid non expired month and year -->
		<div>
			<fieldset>
				<legend>Expiration date</legend>
				<label>
					<span>Month</span>
					<input
						required
						placeholder="MM"
						type="text"
						name="month"
						minlength="2"
						maxlength="2"
						pattern={String.raw`0[0-9]|1[0-2]`}
						bind:value={month}
					/>
				</label>
				<label>
					<span>Year</span>
					<input
						required
						placeholder="YY"
						type="text"
						name="year"
						minlength="2"
						maxlength="2"
						pattern={String.raw`[0-9][0-9]`}
						bind:value={year}
					/>
				</label>
			</fieldset>
			{#if year?.length + month?.length === 4 && isInThePast(year, month)}
				<span>Card date expired 🤔</span>
			{/if}
		</div>

		<!-- 🔵 CCV code should only be 3 digits and only containing numbers -->
		<label>
			<span>CCV Code (3 numbers)</span>
			<input
				required
				placeholder="###"
				type="text"
				name="ccv"
				minlength="3"
				maxlength="3"
				pattern={String.raw`\d{3}`}
				bind:value={ccv}
			/>
		</label>

		<input required type="hidden" name="cardtype" bind:value={cardType} />

		<input type="submit" disabled={!validFormat || isInThePast(year, month)} />
	</form>

	<div>
		<Card {focusing} {name} {number} {month} {year} {ccv} />
	</div>
</article>

<style lang="scss">
	article {
		display: flex;
		flex-flow: row wrap;
		gap: 30px;
		padding: 10px;

		& > div {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	label {
		display: flex;
		flex-direction: column;
		& > span {
			font-size: 0.6em;
		}
	}

	input {
		border: 1px solid gray;
		border-radius: 4px;
		padding: 5px 10px;

		width: 100%;
		position: relative;

		&::placeholder {
			opacity: 0.3;
		}

		&:not([type='submit']):valid {
			border-color: #00db00;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		max-width: 250px;
		gap: 1em;
		font-size: 20px;

		& fieldset {
			width: 100%;
			display: flex;
			gap: 1em;
			padding: 0;
			margin: 0;
			border: none;

			legend {
				font-size: 0.7em;
				padding: 0;
				margin-bottom: 5px;
			}
		}
	}
</style>
