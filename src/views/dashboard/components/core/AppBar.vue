<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >
    <!-- 헤더 : 바 on/off -->
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="drawer">
        mdi-menu-left-outline
      </v-icon>

      <v-icon v-else>
        mdi-menu-right-outline
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.meta.name"
    />

    <v-spacer />
    <div class="mx-3" />

    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/"
    >
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <!-- 헤더 : components/core/settings 여기서 불러오기 -->
    <v-btn
      id="settings"
      class="ml-2"
      min-width="0"
      text
    >
      <v-icon>mdi-cog</v-icon>
    </v-btn>

    <!-- <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-badge
            color="red"
            overlap
            bordered
          >
            <template v-slot:badge>
              <span>{{ notifications.length }}</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list two-line>
        <v-list-item-group
          v-model="selected"
          active-class="pink--text"
          multiple
        >
          <template v-for="(item, index) in notifications">
            <v-list-item :key="item.title">
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-title v-text="item"></v-list-item-title>

                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="item"
                  ></v-list-item-subtitle>

                  <v-list-item-subtitle v-text="item"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text v-text="item"></v-list-item-action-text>

                  <v-icon
                    v-if="!active"
                    color="grey lighten-1"
                  >
                    mdi-star-outline
                  </v-icon>

                  <v-icon
                    v-else
                    color="yellow darken-3"
                  >
                    mdi-star
                  </v-icon>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-divider
              v-if="index < notifications.length - 1"
              :key="index"
            ></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-menu> -->

    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/MyPage"
    >
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
  // Components
  // Utilities
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    created () {
    },
    data: () => ({
      // notifications: [],
      // selected: [2],
    }),
    computed: {
      ...mapState(['drawer']),
    },
    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
    },
  }
</script>
