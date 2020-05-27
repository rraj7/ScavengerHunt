<template>
  <div>
    <p class="display-2 text--primary">{{ name }}</p>
    <p class="headline">{{ summary }}</p>
    <p class="text--primary">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: ["name", "summary", "description"]
};
</script>
