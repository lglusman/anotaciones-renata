<script>
  import { tick } from 'svelte'
  import AutoComplete from "simple-svelte-autocomplete"
  import { anotaciones } from '../stores/anotaciones'

  import { saveAnotacion } from '../firebase'
  export let id = 0
  export let showtitles = false
  export let showcategorias = true
  export let anotacion = {
    descripcion: '',
    fechaprevisto: '',
    fecharealizado: '',
    categoria: '',
  }

  $: categorias =
    ($anotaciones &&
      $anotaciones
        .map((x) => x.data.categoria.toUpperCase())
        .filter((v, i, a) => a.indexOf(v.trim()) === i)
        .sort()) ||
    []

  const actualizarAnotacion = () => {
    if (id) {
      guardaranotacion()
    }
  }
  const guardaranotacion = async () => {
    try {
      await saveAnotacion(
        id,
        anotacion.descripcion.trim(),
        anotacion.categoria.trim(),
        anotacion.fechaprevisto.trim(),
        anotacion.fecharealizado.trim()
      )
      await tick()
      if (id === 0) {
        anotacion = {
          descripcion: '',
          fechaprevisto: '',
          fecharealizado: '',
          categoria: '',
        }
      }
    } catch (error) {}
  }
</script>

<form on:submit|preventDefault={guardaranotacion}>
  <div
    class="row gx-2 align-items-end {anotacion.fecharealizado
      ? 'bg-finalizado'
      : 'bg-pendiente'} py-1"
  >
    <div class="col-12 {showcategorias ? 'col-md-6' : 'col-md-8'} ">
      {#if showtitles}
        <label class="form-label" for="descripcion">Descripción</label>
      {/if}
      <label class="form-label d-md-none" for="descripcion"
        >Descripción</label
      >
      <div class="control">
        <input
          bind:value={anotacion.descripcion}
          on:change={actualizarAnotacion}
          class="form-control"
          type="text"
          placeholder="Descripción"
          name="descripcion"
          required
        />
      </div>
    </div>
    {#if showcategorias}
      <div class="col-12 col-md-2">
        {#if showtitles}
          <label class="form-label" for="categoria">Categoria</label>
          {:else}
          <label class="form-label d-md-none" for="categoria"
          >Categoria</label
          >
          {/if}
        <div class="control1">
          <!-- <input
            on:change={actualizarAnotacion}
            bind:value={anotacion.categoria}
            class="form-control"
            type="text"
            placeholder="Categoria"
            name="categoria"
            required
          /> -->
          <AutoComplete required onChange={actualizarAnotacion} inputClassName ="rounded" noResultsText="" items={categorias} bind:selectedItem={anotacion.categoria} />
        </div>

        
      </div>
    {/if}
    <div class="col-6 col-md-1">
      {#if showtitles}
        <label class="form-label" for="fechaprevisto">Fecha Previsto</label>
          {:else}
          <label class="form-label d-md-none" for="fechaprevisto"
        >Fecha Previsto</label
        >
        {/if}
      <div class="control">
        <input
          on:change={actualizarAnotacion}
          bind:value={anotacion.fechaprevisto}
          class="form-control"
          type="date"
          placeholder="Fecha Previsto"
          name="fechaprevisto"
        />
      </div>
    </div>
    <div class="col-6 col-md-1">
      {#if showtitles}
        <label class="form-label" for="fecharealizado">Fecha Realizado</label>
          {:else}
          <label class="form-label d-md-none" for="fecharealizado"
        >Fecha Realizado</label
        >
        {/if}
      <div class="control">
        <input
          on:change={actualizarAnotacion}
          bind:value={anotacion.fecharealizado}
          class="form-control"
          type="date"
          placeholder="Fecha Previsto"
          name="fecharealizado"
        />
      </div>
    </div>
    {#if id === 0}
      <div class="col-12 col-md-2">
        <div class="control">
          <button class="btn btn-success" type="submit">Aceptar</button>
        </div>
      </div>
    {/if}
  </div>
</form>

<style>
  .bg-finalizado {
    background-color: #008F43 
  }
     
  .bg-pendiente {
    background-color: #BB0A21
  }
  .control1 {
    margin-bottom: 2px;
  }
</style>
