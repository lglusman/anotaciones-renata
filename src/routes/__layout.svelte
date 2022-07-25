<script>
  import { page } from '$app/stores'
  import { user } from '../stores/users'
  import { anotaciones } from '../stores/anotaciones'
  import { logout } from '../firebase'
  import icon from '../assets/favicon.png'
  $: categorias =
    ($anotaciones &&
      $anotaciones
        .map((x) => x.data.categoria.toUpperCase())
        .filter((v, i, a) => a.indexOf(v.trim()) === i)
        .sort()) ||
    []
</script>

<nav class="navbar navbar-expand-lg bg-white text-black">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
      <img
        src={icon}
        alt="logo"
        class="rounded-circle"
        width="32"
        height="32"
      />
    </a>
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
              class="nav-link btn btn-outline-dark link-info"
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
        <ul class="navbar-nav ml-auto navbar-right-top gap-2">
          <li>
            <span class="nav-link">
            {$user.displayName}
          </span>
          </li>
          <li>
            <a class="nav-link" href="/" on:click={() => logout()}
              >Logout</a
            >
          </li>
          <li>
            <img
              src={$user.photoURL}
              alt="mdo"
              class="rounded-circle"
              width="32"
              height="32"
            />
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
            class="nav-link link-info"
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
