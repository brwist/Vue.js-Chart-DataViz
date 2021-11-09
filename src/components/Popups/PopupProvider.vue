<script>

export default {
  props: {
    config: {
      type: Object,
      required: true,
    },
  },

  render(createComponent) {
    if (!this.config.component) return null;
    return createComponent(
        this.config.component,
      {
        props: {
          config: this.config,
        },
        on: this.$listeners,
      },
      this.$slots.default,
    );
  },

};
</script>
