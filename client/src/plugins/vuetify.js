import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        //standard content
        primary: "#212121",
        primaryLight2: "#515159",
        primaryLight4: "#363640",
        primaryLight3: "#494956",
        primaryLight1: "#7d7d92",
        secondary: "#CF0000",
        secondaryDark: "#950000",
        white: "#ffffff",
        background: "#121212",
        textFade: "#BDBDBD",

        //custom content
        green: "#2ab71b",

        popupBackground: "#707070",

        tileBackground: "#121212",

        header: "#0c0c0c",
        body: "#e5e5e5",
        action: "#707070",



        buttonColor: "#950000",
        buttonSuccess: "#2ab71b",

        accent: "#9c27b0",
        error: "#673ab7",
        warning: "#2196f3",
        info: "#03a9f4",
        success: "#00bcd4",
      },
    },
    options: {
      customProperties: true,
    },
  },
  icons: {
    iconfont: "md",
  },
});
