<template>
    <div class="nav-item">
        <router-link :to="link.path"><span>{{link.icon}}</span>{{link.title}}</router-link>
    </div>
</template>

<script>
export default {
  name: 'NavbarItem',
  props: ['link']
}
</script>

<style>

</style>
