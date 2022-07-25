<script>
  import { onMount } from 'svelte'
  import { user } from '../../stores/users'
  import { goto } from '$app/navigation'
  import ListaAnotaciones from '../../components/ListaAnotaciones.svelte'
  import { page } from '$app/stores'

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

<h2>{categoria}</h2>
<ListaAnotaciones anotaciones={lista} showcategorias={false} />
