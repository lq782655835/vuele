<template>
    <div id="app" class="container">
        <nav>
            <ul>
                <li v-for="route in routes" :key="route.name">
                    <router-link :to="route.path">{{route.name}}</router-link>
                </li>
            </ul>
        </nav>
        <router-view></router-view>
    </div>
</template>
<script>
import routes from './routes';

export default {
  data() {
    return {
      routes,
    };
  },
};
</script>

<style scoped>
nav { margin-bottom: 40px; }
ul { display: flex; flex-wrap: wrap; }
li { display: inline-block; font-size: 14px; }
li + li { border-left: solid 1px #bbb; padding-left: 10px; margin-left: 10px; }
.container { padding: 10px 40px; }
.v-link-active { color: #bbb; }
</style>
