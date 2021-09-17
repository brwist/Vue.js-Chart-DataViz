<template>
  <Fragment>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
      disable-resize-watcher
      color="background"
    >
      <v-list nav dense>
        <template v-for="(tabGroup, j) in tabGroups">
          <v-subheader class="mt-3" :key="j + 'header'">{{
            tabGroup.group
          }}</v-subheader>
          <v-list-item-group :key="j + 'group'">
            <v-list-item
              v-for="(tab, i) in tabGroup.tabs"
              :key="`tab-${i}`"
              :href="tab.href"
              :title="tab.info"
            >
              <v-list-item-icon v-if="tab.icon">
                <v-icon>{{ tab.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ tab.label }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark color="secondary"  clipped-left clipped-right>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>
        {{ appName }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-img :src="appIcon" contain height="100%" width="82.5" />
      </div>
    </v-app-bar>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";

export default {
  name: "Header",
  components: {
    Fragment,
  },
  props: {
    appName: {
      type: String,
      default: () => "Vue App Template",
    },
    appIcon: {
      type: String,
      default: () => {
        return require("@/assets/logo.gif");
      },
    },
    tabs: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data: () => ({
    drawer: false,
  }),
  computed: {
    tabGroups() {
      const groups = {};

      for (let i = 0; i < this.tabs.length; i++) {
        const tab = this.tabs[i];

        if (groups[tab.displayGroup]) {
          groups[tab.displayGroup].push(tab);
        } else {
          groups[tab.displayGroup] = [tab];
        }
      }

      return Object.keys(groups).map((groupKey) => {
        return {
          group: groupKey,
          tabs: groups[groupKey].sort((a, b) => a.order - b.order),
        };
      });
    },
  },
};
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>
