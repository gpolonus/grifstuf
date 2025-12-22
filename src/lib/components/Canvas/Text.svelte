<script>
	import { renderable } from './game.js';

	let {
		color = 'hsl(0, 0%, 100%)',
		align = 'center',
		baseline = 'middle',
		text = '',
		x = 0,
		y = 0,
		fontSize = 16,
		fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica',
		children
	} = $props();

	renderable(props => {
		const { context, width, height } = props;
		if (text) {
			context.fillStyle = color;
			context.font = `${fontSize}px ${fontFamily}`;
			context.textAlign = align;
			context.textBaseline = baseline;
			context.fillText(text, x, y);
		}
	});
</script>

<!-- The following allows this component to nest children -->
{@render children?.()}
