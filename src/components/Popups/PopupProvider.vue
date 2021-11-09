<script>
import {mapState} from "vuex";

export default {
  props: {
    config: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState("resources/portfolios", [
      "selectedPortfolios"
    ]),
    ...mapState("resources/branches", [
      "selectedBranches"
    ]),
  },

  data() {
    return{
      portfolios: [],
      branches: [],
    }
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
