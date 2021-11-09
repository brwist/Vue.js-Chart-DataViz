<template>
    <v-card
        class="px-4 py-2"
        elevation="2"
        width="1000"
        height="100%"
        outlined
        tile
    >
      <v-skeleton-loader
          type="heading"
          class="my-8"
      />
      <v-skeleton-loader
          type="paragraph"
      />

        <v-spacer/>
        <v-skeleton-loader
            type="table-tbody"
            max-width="900"
            max-height="400"
            class="mb-8"
        />

    </v-card>
  </template>

  <script>
    export default {
      name: "PopupSkeletonLoader"
    }
  </script>

  <style scoped>

  </style>

