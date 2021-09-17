import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    light: true,
    themes: {
      dark: {
        //new theme
        primary: "#950000",
        secondary: "#212121",
        background: "#121212",
        surface: "#121212",
        error: "#CF6679",
        onPrimary: "#FFFFFF",
        'onPrimary--high': "#E0E0E0",
        'onPrimary--medium': "#A0A0A0",
        'onPrimary--disabled': "#6C6C6C",
        onBackground: "#FFFFFF",
        onSurface: "#FFFFFF",
        'onSurface--high': "#E0E0E0",
        'onSurface--medium': "#A0A0A0",
        'onSurface--disabled': "#6C6C6C",
        onError: "#000000",

        'surface--el-1':"#1E1E1E",
        'surface--el-2':"#232323",
        'surface--el-3':"#252525",
        'surface--el-4':"#272727",
        'surface--el-6':"#2C2C2C",
        'surface--el-8':"#2E2E2E",
        'surface--el-12':"#333333",
        'surface--el-16':"#363636",
        'surface--el-24':"#383838",
        //custom content
        green: "#2ab71b",

      },
      light: {
        primary: "#950000",
        secondary: "#212121",
        background: "#FFFFFF",
        surface: "#FFFFFF",
        error: "#B00020",
        onPrimary: "#FFFFFF",
        'onPrimary--high': "#E0E0E0",
        'onPrimary--medium': "#A0A0A0",
        'onPrimary--disabled': "#6C6C6C",
        onBackground: "#000000",
        onSurface: "#000000",
        'onSurface--high': "#000000",
        'onSurface--medium': "#000000",
        'onSurface--disabled': "#000000",
        onError: "#FFFFFF",

        'surface--el-1':"#FFFFFF",
        'surface--el-2':"#FFFFFF",
        'surface--el-3':"#FFFFFF",
        'surface--el-4':"#FFFFFF",
        'surface--el-6':"#FFFFFF",
        'surface--el-8':"#FFFFFF",
        'surface--el-9':"#FFFFFF",
        'surface--el-12':"#FFFFFF",
        'surface--el-16':"#FFFFFF",
        'surface--el-24':"#FFFFFF",
        //custom content
        green: "#2ab71b",
      }
    },
    options: {
      customProperties: true,
    },
  },
  icons: {
    iconfont: "md",
  },
});
