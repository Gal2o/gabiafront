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
          <Notice-Detail
            v-model="dialog"
            :item="item"
          />
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
          <Notice-Detail
            v-model="dialog"
            :item="item"
          />
        </tbody>
      </v-simple-table>
    </base-material-card>
  </v-container>
</template>

<script>
  import NoticeAddForm from '@/views/dashboard/tables/NoticeCreate.vue'
  import NoticeDetail from '@/views/dashboard/tables/NoticeDetail.vue'
  export default {
    components: {
      'Notice-Add-Form': NoticeAddForm,
      'Notice-Detail': NoticeDetail,
    },
    data: () => ({
      noticeList: [],
      tutorialList: [],
      dialog: false,
      item: Object,
    }),
    created () {
      this.$axios.get(`${this.$SERVER_URL}/notice-service/notices`, {
        headers: {
          Token: this.$Token
        },
      }).then((res) => {
          console.log('Notice Get Success!', res)
          this.noticeList = res.data.filter(v => v.isImportant)
          this.tutorialList = res.data.filter(v => !v.isImportant)
        }).catch((err) => {
          console.log('Notice Get Failed!', err)
        })
    },
    methods: {
      goDetail (item) {
        this.dialog = true
        this.item = item
      },
    },
  }
</script>
