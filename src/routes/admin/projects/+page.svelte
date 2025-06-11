<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let projects = [];
  let newProject = {
    name: '',
    description: '',
    category: '',
    amount: 0,
    active: true
  };
  let loading = false;
  let error = '';

  async function fetchProjects() {
    loading = true;
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        projects = await response.json();
      } else {
        error = 'Failed to fetch projects';
      }
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  async function createProject() {
    loading = true;
    error = '';
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProject)
      });
      if (response.ok) {
        // Refresh projects list
        await fetchProjects();
        // Clear the form
        newProject = {
          name: '',
          description: '',
          category: '',
          amount: 0,
          active: true
        };
      } else {
        error = 'Failed to create project';
      }
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  async function editProject(id) {
      goto(`/admin/projects/${id}`);
  }

  async function deleteProject(id) {
    loading = true;
    error = '';
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Refresh projects list
        await fetchProjects();
      } else {
        error = 'Failed to delete project';
      }
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchProjects();
  });
</script>

<h1>Projects Management</h1>

{#if error}
  <p style="color: red;">{error}</p>
{/if}

<h2>Add New Project</h2>
<div class="form">
  <label for="name">Name:</label>
  <input type="text" id="name" bind:value={newProject.name} />

  <label for="description">Description:</label>
  <textarea id="description" bind:value={newProject.description}></textarea>

  <label for="category">Category:</label>
  <input type="text" id="category" bind:value={newProject.category} />

  <label for="amount">Amount:</label>
  <input type="number" id="amount" bind:value={newProject.amount} />

  <label for="active">Active:</label>
  <input type="checkbox" id="active" bind:checked={newProject.active} />

  <button on:click={createProject} disabled={loading}>
    {#if loading}
      Creating...
    {:else}
      Create Project
    {/if}
  </button>
</div>

<h2>Projects List</h2>
{#if loading}
  <p>Loading projects...</p>
{:else}
  {#each projects as project (project.id)}
    <div class="project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>Category: {project.category}</p>
      <p>Amount: {project.amount}</p>
      <p>Active: {project.active ? 'Yes' : 'No'}</p>
      <button on:click={() => editProject(project.id)}>Edit</button>
      <button on:click={() => deleteProject(project.id)}>Delete</button>
    </div>
  {/each}
{/if}

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

  .project-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
</style>