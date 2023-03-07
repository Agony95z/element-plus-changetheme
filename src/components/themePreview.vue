<template>
  <el-drawer
    v-model="isShow"
    title="主题设置"
    append-to-body
    :size="400"
    :before-close="handleBeforeClose"
  >
    <div class="drawer-container">
      <el-divider>主题</el-divider>
      <div class="theme-mode">
        <el-switch
          v-model="mode"
          active-text="夜间模式"
          inactive-text="日间模式"
        ></el-switch>
      </div>

      <el-divider>系统主题</el-divider>
      <div class="checkbox-row">
        <div
          class="checkbox-item"
          v-for="(item, index) in systemThemeList"
          :key="index"
          :class="{ active: item === systemThemeColor }"
          :style="{ backgroundColor: item }"
          @click="changeSetting(item, 'system')"
        ></div>
        <el-color-picker
          v-model="systemThemeColor"
          @active-change="changeSetting($event, 'system')"
        ></el-color-picker>
      </div>

      <el-divider>顶栏主题</el-divider>
      <div class="checkbox-row">
        <div
          class="checkbox-item"
          v-for="(item, index) in headerThemeList"
          :key="index"
          :class="{ active: item === headerColor }"
          :style="{ backgroundColor: item }"
          @click="changeSetting(item, 'header')"
        ></div>
        <el-color-picker
          v-model="headerColor"
          @active-change="changeSetting($event, 'header')"
        ></el-color-picker>
      </div>

      <el-divider>菜单主题</el-divider>
      <div class="checkbox-row">
        <div
          class="checkbox-item"
          v-for="(item, index) in menuThemeList"
          :key="index"
          :class="{ active: item === menuColor }"
          :style="{ backgroundColor: item }"
          @click="changeSetting(item, 'menu')"
        ></div>
        <el-color-picker
          v-model="menuColor"
          @active-change="changeSetting($event, 'menu')"
        ></el-color-picker>
      </div>
    </div>
    <el-button type="primary" @click="handleClose">保存</el-button>
  </el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, onMounted, watch, computed } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { mixColor } from "./themepreview";
interface IColorOptions {
  drawer: boolean;
  systemThemeColor: string;
  systemThemeList: string[];
  size: any;
  headerColor?: string;
  headerThemeList?: string[];
  menuColor?: string;
  menuThemeList?: string[];
}
interface ITheme {
  system?: string;
  header?: string;
  menu?: string;
  [propName: string]: any;
}
interface IOptions {
  val: string;
  type: string;
}
const Emits = defineEmits(["closeDrawer"]);
const propsData = withDefaults(defineProps<IColorOptions>(), {
  drawer: false,
  size: 400 || '25%',
  systemThemeColor: "#ee12ab",
  headerColor: "#60435D",
  menuColor: "#001529",
  systemThemeList: () => [
    "#0960BD",
    "#0084F4",
    "#009688",
    "#536DF3",
    "#FF5C93",
    "#EE4F12",
    "#0096C7",
    "#9C27B0",
    "#FF9800",
  ],
  headerThemeList: () => [
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
  ],
  menuThemeList: () => [
    '#001529',
    '#212121',
    '#273352',
    '#FFFFFF',
    '#191B24',
    '#191A23',
    '#304156',
    '#28333E',
    '#344058',
    '#383F45'
  ]
});
const handleClose = () => {
  Emits("closeDrawer");
};
const handleBeforeClose = () => {
  Emits("closeDrawer");
};
const reactiveVal = reactive({
  mode: useDark(),
  systemThemeColor: "",
  systemThemeList: ([] as unknown) as string[],
  size: 0,
  menuColor: "",
  menuThemeList: ([] as unknown) as string[],
  headerColor: "",
  headerThemeList: ([] as unknown) as string[],
});
// 获取主题
const getThemes = (): ITheme => {
  let result = localStorage.getItem("THEMES");
  result = result ? JSON.parse(result) : {};
  return (result as unknown) as ITheme;
};
const setThemes = (val: ITheme) => {
  localStorage.setItem("THEMES", JSON.stringify(val));
};
// 设置主题并缓存
const cacheThemes = (options: IOptions) => {
  const { val, type } = options;
  let theme = getThemes();
  theme[type] = val;
  setThemes(theme);
};
// 设置主题色
const changeColor = (options: IOptions) => {
  const { val, type } = options;
  const node = document.documentElement;
  if (type === "system") {
    reactiveVal.systemThemeColor = val; // 默认色替换
    const pre = "--el-color-primary"; // 前缀
    const mixWhite = "#ffffff"; // 源码中的$color-white也是白色
    const mixBlack = "#000000";
    node.style.setProperty(pre, val); // 直接为根标签设置内联样式覆盖--:root选择器的样式
    for (let i = 0; i < 10; i++) {
      if (i === 1 || i === 4 || i === 6) {
        // 2,3,5,7,8,9对应渐变色
      } else {
        node.style.setProperty(
          `${pre}-${i === 2 ? "dark" : "light"}-${i}`,
          mixColor(val, i === 2 ? mixBlack : mixWhite, i * 0.1)
        );
      }
    }
  } else if (type === "header") {
    reactiveVal.headerColor = val;
    node.style.setProperty("--el-header-bg-color", val);
  } else if (type === "menu") {
    reactiveVal.menuColor = val;
    node.style.setProperty("--el-menu-bg-color", val);
  }
};
// fn
const changeSetting = (val: string, type: string) => {
  const params = {
    val,
    type,
  };
  changeColor(params);
  // 本地化
  cacheThemes(params);
};
let {
  mode,
  systemThemeList,
  systemThemeColor,
  headerColor,
  headerThemeList,
  menuColor,
  menuThemeList,
  size,
} = toRefs(reactiveVal);
onMounted(() => {
  // 主题
  systemThemeColor.value = propsData.systemThemeColor;
  systemThemeList.value = propsData.systemThemeList;
  // header
  headerColor.value = propsData.headerColor;
  headerThemeList.value = propsData.headerThemeList;
  // menu
  menuColor.value = propsData.menuColor;
  menuThemeList.value = propsData.menuThemeList;

  size.value = propsData.size;
  let themeCache = getThemes();
  // 有缓存走缓存
  if (Object.keys(themeCache).length) {
    // 主题
    if (themeCache['system']) {
      const opt = {
        type: 'system',
        val: themeCache['system']
      };
      changeColor(opt);
    }
    // header
    if (themeCache['header']) {
      const opt = {
        type: 'header',
        val: themeCache['header']
      };
      changeColor(opt);
    }
    // menu
    if (themeCache['menu']) {
      const opt = {
        type: 'menu',
        val: themeCache['menu']
      };
      changeColor(opt);
    }
  } else {
    // 走默认值
    changeColor({type: 'system', val: systemThemeColor.value});
    changeColor({type: 'header', val: headerColor.value});
    changeColor({type: 'menu', val: menuColor.value});
  }
})
const isShow = ref(false);
watch(() => propsData.drawer, (newVal) => {
  isShow.value = newVal;
})
// 监听默认色改变存入缓存
watch(() => propsData.systemThemeColor, (newVal) => {
  setThemes({
    type: 'system',
    val: newVal
  })
})
watch(() => propsData.headerColor, (newVal) => {
  setThemes({
    type: 'header',
    val: newVal
  })
})
watch(() => propsData.menuColor, (newVal) => {
  setThemes({
    type: 'menu',
    val: newVal
  })
})
</script>

<style scoped lang="scss">
.drawer-container {
  overflow-y: auto;
  height: calc(100% - 65px);
}
.checkbox-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.checkbox-item {
  width: 20px;
  height: 20px;
  border-color: val(--el-color-primary);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  &.active::before {
    content: "1";
    font-size: 14px;
    color: #fff;
    position: absolute;
    width: 100%;
    text-align: center;
  }
}
.draw-save {
  width: 100%;
  height: 32px;
  color: #fff;
  background-color: val(--el-color-primary);
}
:deep(.el-color-picker) {
  display: flex;
}
:deep(.el-color-picker__trigger) {
  border: none;
  &:hover {
    border: none;
  }
  &:hover:not(.is-disabled) {
    border: none;
  }
}
</style>
