<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <div>Header</div>
        <el-button type="primary" @click="handleClick">换肤</el-button>
      </el-header>
      <el-container>
        <el-aside class="aside" width="200px">
          <CNavMenu />
        </el-aside>
        <el-main>
          <moduleDemo />
          <GThemePreview
            @closeDrawer="closeDrawer"
            :size="400"
            :drawer = drawer
            :systemThemeColor = systemThemeColor
            :headerColor = headerColor
            :menuColor="menuColor"
            :systemThemeList = systemThemeList
            :menuThemeList = menuThemeList
            :headerThemeList = headerThemeList
          ></GThemePreview>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import GThemePreview from "./themePreview.vue";
import moduleDemo from "./stylePreview/index.vue";
import CNavMenu from '@/components/stylePreview/CNavMenu.vue';
import { ref } from "vue";
const drawer = ref(false)
const systemThemeList = ref([
  "#0960BD",
  "#0084F4",
  "#009688",
  "#536DF3",
  "#FF5C93",
  "#EE4F12",
  "#0096C7",
  "#9C27B0",
  "#FF9800",
])
const headerThemeList = ref([
  "#FFFFFF",
  "#151515",
  "#009688",
  "#5172DC",
  "#409EFF",
  "#E74C3C",
  "#24292E",
  "#394664",
  "#001529",
  "#383F45",
])
const menuThemeList = ref([
  "#001529",
  "#212121",
  "#273352",
  "#FFFFFF",
  "#191B24",
  "#191A23",
  "#304156",
  "#28333E",
  "#344058",
  "#383F45",
])
const systemThemeColor = ref("#ee12ab")
const headerColor = ref("#60435d")
const menuColor = ref("#001529")
const handleClick = () => {
  drawer.value = !drawer.value;
}
const closeDrawer = () => {
  drawer.value = false
}
</script>

<style scoped lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    align-items:center;
    background-color: var(--el-header-bg-color);
  }
  :deep(.el-aside) {
    background-color: var(--el-menu-bg-color);
  }
</style>
