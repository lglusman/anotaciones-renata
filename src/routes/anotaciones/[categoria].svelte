<script>
  import { onMount } from 'svelte'
  import { user } from '../../stores/users'
  import { goto } from '$app/navigation'
  import ListaAnotaciones from '../../components/ListaAnotaciones.svelte'
  import { page } from '$app/stores'

  let showcategorias = false
  onMount(() => {
    if (!$user) {
      goto('/', { replace: true })
    }
  })

  $: categoria = $page.params.categoria
  import { anotaciones } from '../../stores/anotaciones'

  $: lista =
    $anotaciones &&
    $anotaciones.filter(
      (x) =>
        x.data.categoria.trim().toUpperCase() === categoria.trim().toUpperCase()
    )
</script>

<div class="my-3">
  <div class="col-12 d-flex gap-2 justify-content-center">
  <span>
    <h2>{categoria}</h2> 
  </span>
  <span>
    <button class="btn btn-sm btn-info" on:click={() => showcategorias = !showcategorias}>
      editar categorias
    </button>
  </span>
</div>
</div>
<ListaAnotaciones anotaciones={lista} {showcategorias} />


<style>
  span {
    display: inline-block;
    justify-content: space-between;
  }
</style>