<script>
  export let value = 0;
  export let max = 100;
  export let height = 8;
  export let color = 'var(--color-primary)';
</script>

<div class="progress-bar-container" style="height: {height}px;">
  <div
    class="progress-bar-fill"
    style="width: {value}%; height: 100%; background-color: {color};"
  ></div>
</div>

<style>
  .progress-bar-container {
    width: 100%;
    background-color: var(--color-grey-200);
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-bar-fill {
    transition: width 0.3s ease;
  }
</style>
