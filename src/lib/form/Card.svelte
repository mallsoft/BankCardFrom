<script>
	export let name = '#'.repeat(6);
	export let number = '#'.repeat(16);
	export let ccv = '###';
	export let month = '##';
	export let year = '##';
	export let focusing = ''; // name, cardnumber, ccv, expirymonth, expiryyear;

	$: flip = ['ccv'].includes(focusing);
</script>

<section class="card" class:flip>
	<section class="front">
		<div class="chip" aria-hidden="true" />
		<p class="number" class:focused={focusing === 'number'}>
			<span>
				{(number ? `${number}` : '').padEnd(16, '_').replace(/(.{4})/g, '$1 ')}
			</span>
		</p>
		<p class="expiry" class:focused={['month', 'year'].includes(focusing)}>
			<span>
				VALID<br />
				THRU
			</span>
			<time datetime="20{year}-{month}">
				<span class:focused={focusing === 'month'}>{month}</span>
				/
				<span class:focused={focusing === 'year'}>{year}</span>
			</time>
		</p>
		<p class="name" class:focused={focusing === 'name'}>
			<span>
				{name}
			</span>
		</p>
	</section>
	<section class="back">
		<div class="magnetstrip" aria-hidden="true" />

		<div class="stuff">
			<p class="name">
				<span>
					{name}
				</span>
			</p>
			<p class="ccv" class:focused={focusing === 'ccv'}>
				<span>
					{ccv}
				</span>
			</p>
		</div>
	</section>
</section>

<style lang="scss">
	p {
		margin: 0;
		padding: 5px 10px;

		&.focused {
			background-color: hsla(200, 100%, 50%, 0.3);
			span.focused {
				background-color: hsla(200, 100%, 50%, 0.3);
			}
		}
	}

	.card {
		user-select: none;
		position: relative;

		aspect-ratio: 85.6 / 53.98;
		height: 250px;
		font-size: 20px;

		transform-origin: center;
		transition: transform 0.5s, filter 0.5s;
		transform-style: preserve-3d;

		&.flip {
			transform: perspective(800px) rotateY(-180deg);
		}
	}

	.front,
	.back {
		box-sizing: border-box;

		height: 100%;
		width: 100%;

		position: absolute;
		top: 0;
		left: 0;

		padding: 20px 0;
		border-radius: 16px;

		backface-visibility: hidden;

		border: 4px solid hsl(0, 0%, 20%);
	}

	.front {
		background: linear-gradient(-30deg, hsl(180, 50%, 30%), hsl(200, 50%, 10%));
		color: white;

		display: flex;
		flex-direction: column;
		justify-content: end;

		& > * {
			margin: 0 35px;
		}

		.expiry {
			display: flex;
			gap: 10px;
		}

		.expiry > span {
			opacity: 0.7;
			font-size: 50%;
		}

		.name {
			text-transform: uppercase;
		}

		.chip {
			background: linear-gradient(-30deg, #6d6d4f, #8f834a);
			border-radius: 8px;
			height: 2em;
			width: 2.5em;
			margin-bottom: 10px;
		}
	}

	.back {
		background: linear-gradient(-30deg, hsl(180, 20%, 30%), hsl(200, 20%, 10%));
		color: white;

		transform: rotateY(180deg);

		display: flex;
		flex-direction: column;
		justify-content: end;

		.magnetstrip {
			background: linear-gradient(-30deg, #353535, #1c1c1c);
			height: 42px;
			margin-top: 16px;
			margin-bottom: auto;
		}

		.stuff {
			margin: 0 35px;
			margin-bottom: 20px;
			display: flex;
			gap: 2em;
			align-items: center;

			.name {
				opacity: 0.8;
			}
		}
	}
</style>
