<template>
  <v-container
    id="notice"
    fluid
    tag="section"
  >
    <Notice-Add-Form
      v-if="this.$store.state.role.includes('ADMIN') === true"
    />

    <div class="py-3" />

    <base-material-card
      color="warning"
      icon="mdi-clipboard-text"
      title="공지사항"
      class="px-5 py-3"
    >
      <v-simple-table>
        <v-data-table
          :headers="noticeHead"
          :items="noticeList"
          :footer-props="{
            'items-per-page-options': [5]
          }"
          class="elevation-1"
          @click:row="goDetail"
        />
      </v-simple-table>
    </base-material-card>

    <div class="py-3" />
    <!-- --------------------------------------------여기는 이용방법  -->

    <base-material-card
      color="error"
      icon="mdi-clipboard-plus"
      title="이용안내"
      class="px-5 py-3"
    >
      <v-simple-table>
        <v-data-table
          :headers="tutorialHead"
          :items="tutorialList"
          :footer-props="{
            'items-per-page-options': [5]
          }"
          class="elevation-1"
          @click:row="goDetail"
        />
      </v-simple-table>
    </base-material-card>
    
    <Notice-Detail
      v-model="dialog"
      :notices="notices"
    />
  </v-container>
</template>

<script>
  import NoticeAddForm from '@/views/dashboard/tables/NoticeCreate.vue'
  import NoticeDetail from '@/views/dashboard/tables/NoticeDetail.vue'
  import { getAuthFromCookie } from '@/util/cookies'
  export default {
    components: {
      'Notice-Add-Form': NoticeAddForm,
      'Notice-Detail': NoticeDetail,
    },
    data: () => ({
      noticeList: [],
      tutorialList: [],
      dialog: false,
      notices: [],
      noticeHead: [
        { text: '제목', value: 'title', align: 'center', width: '500'},
        { text: '등록일', value: 'createdDate', align: 'center' }
      ],
      tutorialHead: [
        { text: '제목', value: 'title', align: 'center', width: '500'},
        { text: '등록일', value: 'createdDate', align: 'center' }
      ],
    }),
    created () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        try {
          const { data } = await this.$axios.get(`${this.$SERVER_URL}/notice-service/notices`, {
            headers: {
              Token: getAuthFromCookie()
            },
          })
          this.noticeList = data.filter(v => v.isImportant)
          this.tutorialList = data.filter(v => !v.isImportant)
        } catch (error) {
          alert(error.message)
        }
      },
      goDetail (item) {
        this.dialog = true
        this.notices = item
      },
    },
  }
</script>
