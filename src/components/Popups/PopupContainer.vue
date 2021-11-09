<template>
  <div
    :class="`popup ${config.popupClass || ''}`"
    :style="style"
  >
    <v-card
      color="surface--el-8"
      elevation="8"
      height="100%"
      width="100%"
      class="d-flex flex-column"
    >
      <v-card-title
        class="js-headline"
      >
        {{ title }}
        <v-spacer />
        <v-btn
          small
          fab
          text
          @click="toFullScreen"
        >
          <v-icon
            small
            color="grey"
          >
            open_in_full
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-subtitle v-if="subTitle">
        {{ subTitle }}
      </v-card-subtitle>

      <v-card-text
        id="section-main"
      >
        <div
          class="slot-area mb-n4"
          :style="'max-height:' + renderAreaHeight + 'px'"
        >
          <slot />
        </div>
      </v-card-text>

      <v-spacer />
      <v-card-actions>
        <v-spacer />
        <slot name="actions" />
        <v-btn
          :depressed="true"
          text
          color="textFade"
          @click="onClosePopup"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import interact from "interactjs";
import {mapActions} from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    subTitle: {
      type: String,
      default: null,
    },
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      interaction: {},
      defaultHeight: 400,
      defaultWidth: 600,
      defaultMinHeight: 300,
      defaultMinWidth: 450,
    };
  },
  computed: {
    renderAreaHeight() {
      if (this.subTitle) {
        return this.interaction.height - 156;
      }else {
        return this.interaction.height - 120;
      }
    },
    style() {
      const config = Object.assign({}, this.config, this.interaction);
      return `
        top: ${config.top}px;
        left: ${config.left}px;
        display: block;
        width: ${config.width}px;
        height: ${config.height}px;
      `;
    },
    minWidth(){
      return this.config.minWidth || this.defaultMinWidth;
    },
    minHeight(){
      return this.config.minHeight || this.defaultMinHeight;
    },
    maxWidth(){
      return window.innerWidth - 76;
    },
    maxHeight(){
      return window.innerHeight - 96;
    },
    //Position Popup Center
    centerTop(){
      let popupHeight = this.config.height || this.defaultHeight;
      let clientHeight = window.innerHeight;

      return (clientHeight - popupHeight + 64) / 2;
    },
    centerLeft(){
      let popupWidth = this.config.width || this.defaultWidth;
      let clientWidth = window.innerWidth;

      return (clientWidth - popupWidth + 64) / 2;
    }
  },

  mounted() {
    this.interaction = {
      left: this.centerLeft,
      top: this.centerTop,
      width: this.defaultWidth,
      height: this.defaultHeight,
      ...this.config
    },
    interact(this.$el).resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },

      listeners: {
        move: (event) => {
          let { top, left, width, height } = this.interaction;

          left += event.deltaRect.left;
          top += event.deltaRect.top;

          width = event.rect.width;
          height = event.rect.height;

          this.interaction = {
            ...this.interaction,
            top,
            left,
            width,
            height,
          };
        },
      },
      modifiers: [
        // keep the edges inside the parent
        // interact.modifiers.restrictEdges({
        //   outer: "parent",
        // }),

        // minimum size
        interact.modifiers.restrictSize({
          min: { width: this.minWidth, height: this.minHeight },
        }),
      ],

      inertia: true,
    });
    interact(this.$el.querySelector(".js-headline")).draggable({
      inertia: true,
      autoScroll: true,
      listeners: {
        move: (event) => {
          const { top, left } = this.interaction;
          const { dx, dy } = event;
          const y = (top || this.centerTop) + (dy || 0);

          this.interaction = {
            ...this.interaction,
            top: y,
            left: (left || this.centerLeft) + (dx || 0),
          };
        },
      },
    });
  },

  methods: {
    ...mapActions("global", [
       "closePopup"
    ]),
    toFullScreen(){
      this.interaction.width = this.maxWidth;
      this.interaction.height = this.maxHeight;
      this.interaction.left = 10 + 56;
      this.interaction.top = 80;
    },
    emitEvent(type) {
      this.$emit('on-event', type);
    },
    toMinSize(){
    },
    onClosePopup() {
      try{
        this.closePopup(this.config.id);
      } catch (e) {
        console.error("Could not close popup. ", e);
      }
    }
  },

};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  display: none;
  z-index: 3;
  touch-action: none;
}
.slot-area{
  display: flex;
  overflow-y: scroll;
}
.debug {
  outline: red solid 1px;
}
</style>
