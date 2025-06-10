<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import DonationForm from '$lib/components/DonationForm.svelte';

  export let data;

  let project = data.project;
  let projectId = $page.params.projectId;

  onMount(() => {
    if (!project) {
      // Fetch project details if not available in data
      fetch(`/api/projects/${projectId}`)
        .then(response => response.json())
        .then(data => {
          project = data;
        })
        .catch(error => {
          console.error('Error fetching project details:', error);
        });
    }
  });
</script>

{#if project}
  <h1>Donate to {project.name}</h1>
  <p>{project.description}</p>

  <DonationForm projectId={projectId} />
{:else}
  <p>Loading project details...</p>
{/if}