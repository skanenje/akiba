<script>
  export let data;

  let projects = data.projects;
  let donations = data.donations;
</script>

<h1>Admin Dashboard</h1>

<h2>Projects</h2>
<ul>
  {#each projects as project (project.id)}
    <li>{project.name}</li>
  {/each}
</ul>

<h2>Donations</h2>
<ul>
  {#each donations as donation (donation.id)}
    <li>{donation.amount}</li>
  {/each}
</ul>