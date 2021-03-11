<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <!-- 바 : 색깔 바꾸는 부분 (store.js) -->
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-divider class="mb-1" />

    <v-list
      expand
      nav
    >
      <v-list-item>
        <!-- 바 : 로고, 제목 부분 -->
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
        >
          <v-img
            src="@/assets/gabia.png"
            max-height="40"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="text-h3"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <div />
      <!-- 바 : 탭들 - 메인화면, 내정보, 공지사항 ... -->
      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>
      <div />
    </v-list>

    <template v-slot:append>
      <base-item
        :item="{
          title: $t('로그아웃'),
          icon: 'mdi-logout-variant',
          to: '/logout'
        }"
        @click.native="logout"
      />
    </template>
  </v-navigation-drawer>
</template>

<script>
  // 바 : 탭 누르면 그 페이지로 이동
  import {
    mapState,
  } from 'vuex'
  import { deleteCookie } from '@/util/cookies'
  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          icon: 'mdi-home',
          title: '메인화면',
          to: '/',
        },
        {
          icon: 'mdi-account',
          title: '내 정보',
          to: '/pages/user',
        },
        {
          title: '공지사항',
          icon: 'mdi-alarm-light',
          to: '/pages/notice',
        },
        {
          title: '도서목록',
          icon: 'mdi-book-open-variant',
          to: '/pages/BookList',
        },
        {
          title: '도서신청',
          icon: 'mdi-cart-plus',
          to: '/pages/BookRequest',
        },
      ],
    }),

    computed: {
      ...mapState(['barColor']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },
      profile () {
        return {
          title: this.$t('g혜의 숲'),
        }
      },
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
      logout () {
        this.$store.commit('CLEAR_USERID')
        this.$store.commit('CLEAR_ACCESS_TOKEN')
        this.$store.commit('CLEAR_ROLE')
        this.$store.commit('CLEAR_USERNUM')
        deleteCookie('auth')
        deleteCookie('userId')
        deleteCookie('role')
        deleteCookie('userNum')
        this.$router.push('/login')
      },
    },
  }
</script>
