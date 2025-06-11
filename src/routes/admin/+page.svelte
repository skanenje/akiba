<script>
  import AdminDashboard from '$lib/components/AdminDashboard.svelte';
  export let data;

  let projects = data.projects;
  let donations = data.donations;

  let stats = {
      totalDonations: donations.length,
      totalAmount: donations.reduce((sum, donation) => sum + donation.amount, 0),
      activeProjects: projects.filter(project => project.active).length
  };
</script>

<AdminDashboard {projects} {donations} {stats} />