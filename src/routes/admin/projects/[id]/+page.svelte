<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let project = {
    name: '',
    description: '',
    category: '',
    amount: 0,
    active: true
  };
  let loading = false;
  let error = '';
  let id = $page.params.id;

  async function fetchProject() {
    loading = true;
    try {
      const response = await fetch(`/api/projects/${id}`);
      if (response.ok) {
        project = await response.json();
      } else {
        error = 'Failed to fetch project';
      }
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  async function updateProject() {
    loading = true;
    error = '';
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      });
      if (response.ok) {
        goto('/admin/projects');
      } else {
        error = 'Failed to update project';
      }
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchProject();
  });
</script>

<h1>Edit Project</h1>

{#if error}
  <p style="color: red;">{error}</p>
{/if}

<div class="form">
  <label for="name">Name:</label>
  <input type="text" id="name" bind:value={project.name} />

  <label for="description">Description:</label>
  <textarea id="description" bind:value={project.description}></textarea>

  <label for="category">Category:</label>
  <input type="text" id="category" bind:value={project.category} />

  <label for="amount">Amount:</label>
  <input type="number" id="amount" bind:value={project.amount} />

  <label for="active">Active:</label>
  <input type="checkbox" id="active" bind:checked={project.active} />

  <button on:click={updateProject} disabled={loading}>
    {#if loading}
      Updating...
    {:else}
      Update Project
    {/if}
  </button>
</div>

<style>
  .form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin-bottom: 20px;
  }

  .form label {
    margin-top: 10px;
  }

  .form input,
  .form textarea {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>