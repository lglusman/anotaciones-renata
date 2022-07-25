<script>
  import CompAnotacion from './CompAnotacion.svelte'
  export let anotaciones = {}
  export let showcategorias = true
</script>

{#if anotaciones}
  {#each anotaciones as anotacion, index}
    <div class="row">
      <div class="col-12 gy-2">
        <CompAnotacion {showcategorias} id={anotacion.id} anotacion={anotacion.data} showtitles={index === 0} />
      </div>
    </div>
  {/each}
{/if}
