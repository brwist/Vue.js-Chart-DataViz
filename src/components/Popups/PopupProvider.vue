<script>
import {mapState} from "vuex";

export default {
  props: {
    config: {
      type: Object,
      required: true,
    },
  },

  data() {
    return{
      portfolios: [],
      branches: [],
    };
  },

  computed: {
    ...mapState("resources/portfolios", [
      "selectedPortfolios"
    ]),
    ...mapState("resources/branches", [
      "selectedBranches"
    ]),
  },

  mounted() {
    this.portfolios = this.selectedPortfolios.slice();
    this.branches = this.selectedBranches.slice();
  },

  render(createComponent) {
    if (!this.config.component) return null;
    return createComponent(
        this.config.component,
      {
        props: {
          config: this.config,
          selectedPortfolios: this.portfolios,
          selectedBranches: this.branches,
        },
        on: this.$listeners,
      },
      this.$slots.default,
    );
  },

};
</script>
