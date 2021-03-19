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
        <thead>
          <tr>
            <th class="text-center">
              제목
            </th>
            <th class="text-center">
              등록일
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, n) in noticeList"
            :key="n"
            class="text-center"
            @click="goDetail(item)"
          >
            <td>{{ item.title }}</td>
            <td>{{ item.createdDate }}</td>
          </tr>
        </tbody>
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
        <thead>
          <tr>
            <th class="text-center">
              제목
            </th>
            <th class="text-center">
              등록일
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, n) in tutorialList"
            :key="n"
            class="text-center"
            @click="goDetail(item)"
          >
            <td>{{ item.title }}</td>
            <td>{{ item.createdDate }}</td>
          </tr>
        </tbody>
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
    }),
    created () {
      console.log(document.cookie)
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
