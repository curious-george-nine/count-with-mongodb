<script>
  async function fetchApi() {
    const res = await fetch("/api/", {
      method: "POST",
    });
    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      throw new Error(data);
    }
  }

  async function getCount() {
    const res = await fetch("/api/");
    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      return data;
    }
  }

  let promise = getCount();
</script>

<button
  on:click={() => {
    promise = getCount();
    fetchApi();
  }}
>
  click
  {#await promise}
    loading
  {:then data}
    {data[0].count}
  {/await}
</button>

<style>
  button {
    font-size: 3rem;
  }
</style>
