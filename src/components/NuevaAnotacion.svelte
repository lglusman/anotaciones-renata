<script>
  import { tick } from 'svelte'

  import { saveAnotacion } from '../firebase'
  let descripcion = ''
  let categoria = ''
  let fechaprevisto = ''
  let fecharealizado = ''
  const guardaranotacion = async () => {
    try {
      await saveAnotacion(
        0,
        descripcion.trim(),
        categoria.trim(),
        fechaprevisto.trim(),
        fecharealizado.trim()
      )
      await tick()
      descripcion = ''
      categoria = ''
      fechaprevisto = ''
      fecharealizado = ''
    } catch (error) {}
  }
</script>

<form on:submit|preventDefault={guardaranotacion}>
  <div class="d-flex gap-2 justify-content-center align-items-end">
    <div class="col-6">
      <label class="form-label" for="descripcion">Descripción</label>
      <div class="control">
        <input
          bind:value={descripcion}
          class="form-control"
          type="text"
          placeholder="Descripción"
          name="descripcion"
          required
        />
      </div>
    </div>
    <div class="col-2">
      <label class="form-label" for="categoria">Categoria</label>
      <div class="control">
        <input
          bind:value={categoria}
          class="form-control"
          type="text"
          placeholder="Categoria"
          name="categoria"
          required
        />
      </div>
    </div>
    <div class="col-1">
      <label class="form-label" for="fechaprevisto">Fecha Previsto</label>
      <div class="control">
        <input
          bind:value={fechaprevisto}
          class="form-control"
          type="date"
          placeholder="Fecha Previsto"
          name="fechaprevisto"
          required
        />
      </div>
    </div>
    <div class="col-1">
      <label class="form-label" for="fecharealizado">Fecha Realizado</label>
      <div class="control">
        <input
          bind:value={fecharealizado}
          class="form-control"
          type="date"
          placeholder="Fecha Previsto"
          name="fecharealizado"
          required
        />
      </div>
    </div>
    <div class="col-2">
      <div class="control">
        <button class="btn btn-primary" type="submit">Aceptar</button>
      </div>
    </div>
  </div>
</form>
