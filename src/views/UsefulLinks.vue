<template>
  <v-row class="text-center">
    <v-col class="mb-4">
      <h1 class="display-2 font-weight-bold mb-3">
        We use Vue and Vuetify
      </h1>

      <p class="subheading font-weight-regular">
        For help and collaboration with other Vuetify developers,
        <br>please join their online
        <a
          href="https://community.vuetifyjs.com"
          target="_blank"
        >Discord Community</a>
      </p>
    </v-col>
    <v-col
      class="mb-5"
      cols="12"
    >
      <h2 class="headline font-weight-bold mb-3">
        We use Material Design which is why we use Vuetify
      </h2>

      <v-row justify="center">
        <a
          v-for="(eco, i) in materialDesign"
          :key="i"
          :href="eco.href"
          class="subheading mx-3"
          target="_blank"
        >
          {{ eco.text }}
        </a>
      </v-row>
    </v-col>
    <v-col
      class="mb-5"
      cols="12"
    >
      <h2 class="headline font-weight-bold mb-3">
        Learn more about Vuetify?
      </h2>

      <v-row justify="center">
        <a
          v-for="(next, i) in exploreVuetify"
          :key="i"
          :href="next.href"
          class="subheading mx-3"
          target="_blank"
        >
          {{ next.text }}
        </a>
      </v-row>
    </v-col>

    <v-col
      class="mb-5"
      cols="12"
    >
      <h2 class="headline font-weight-bold mb-3">
        Other Useful Vuetify Links
      </h2>

      <v-row justify="center">
        <a
          v-for="(link, i) in usefulLinks"
          :key="i"
          :href="link.href"
          class="subheading mx-3"
          target="_blank"
        >
          {{ link.text }}
        </a>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "UsefulLinks",

  data: () => ({
    materialDesign: [
      {
        text: "Material Design",
        href: "https://material.io/design/introduction",
      },
    ],
    usefulLinks: [
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify",
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs",
      },
      {
        text: "Medium Articles",
        href: "https://medium.com/vuetify",
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify",
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify",
      },
    ],
    exploreVuetify: [
      {
        text: "Vuetify Documentation",
        href: "https://vuetifyjs.com",
      },
      {
        text: "Getting started",
        href: "https://vuetifyjs.com/en/getting-started/wireframes/",
      },
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/cards/",
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions",
      },
    ],
  }),
};
</script>
