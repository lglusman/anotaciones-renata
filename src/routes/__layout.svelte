<script>
  import { page } from '$app/stores'
  import { user } from '../stores/users'
  import { anotaciones } from '../stores/anotaciones'
  import { logout } from '../firebase'

  $: categorias =
    ($anotaciones &&
      $anotaciones
        .map((x) => x.data.categoria.toUpperCase())
        .filter((v, i, a) => a.indexOf(v.trim()) === i)
        .sort()) ||
    []
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">anotaciones-renatita </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="nav me-auto mb-2 mb-lg-0 ">
        {#if $user}
          <li class="nav-item">
            <a
              class="nav-link"
              class:active={$page.url.pathname.includes('anotaciones')}
              aria-current="page"
              href="/anotaciones">Nueva Anotacion</a
            >
          </li>
        {:else}
          <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
        {/if}
      </ul>

      {#if $user}
        <ul class="navbar-nav ml-auto navbar-right-top">
          <li>
            {$user.displayName}
          </li>
          <li>
            <div class="flex-shrink-0 dropdown mx-3">
              <a
                href="."
                class="d-block link-dark text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <img
                  src={$user.photoURL}
                  alt="mdo"
                  class="rounded-circle"
                  width="32"
                  height="32"
                />
              </a>
              <ul
                class="dropdown-menu text-small shadow"
                style="position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 34px);"
                data-popper-placement="bottom-end"
              >
                <li>
                  <a class="dropdown-item" href="/" on:click={() => logout()}
                    >Logout</a
                  >
                </li>
              </ul>
            </div>
          </li>
        </ul>
      {/if}
    </div>
  </div>
</nav>
{#if categorias}
  <div class="row">
    <ul class="nav nav-tabs justify-content-center">
      {#each categorias as categoria}
        <li class="nav-item">
          <a
            class="nav-link"
            class:active={$page.params.categoria === categoria}
            aria-current="page"
            href="/anotaciones/{categoria}">{categoria}</a
          >
        </li>
      {/each}
    </ul>
  </div>
{/if}
<div class="container-fluid">
  <slot />
</div>
