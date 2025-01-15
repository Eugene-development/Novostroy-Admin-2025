<script>
	import { Category } from '../UI';
	import { enhance } from '$app/forms';

	let { data } = $props();
	// $inspect('data', data);
</script>

<!-- <Category /> -->

<main class="h-full flex-1 overflow-y-auto">
	{#if data.isCategory}
		<Category data={data.req.category} />
	{:else}
		<p>12345</p>
	{/if}
</main>


<!-- TEST -->
<form method="POST" action="?/ddd" use:enhance>
	<label>
		Email
		<input name="email" type="email">
	</label>
	<label>
		Password
		<input name="password" type="password">
	</label>
	<button>Log in</button>
</form>

