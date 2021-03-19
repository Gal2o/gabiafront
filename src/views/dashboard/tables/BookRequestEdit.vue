<template>
  <v-dialog
    v-model="dialog"
    max-width="1200px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        align="center"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>
          mdi-pencil-plus
        </v-icon>
        도서 신청 관리하기
      </v-btn>
    </template>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-center">
            제목
          </th>
          <th class="text-center">
            저자
          </th>
          <th class="text-center">
            목적지
          </th>
          <th class="text-center">
            등록일
          </th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, n) in requestList"
          :key="n"
          class="text-center"
        >
          <td>{{ item.bookName }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.destination }}</td>
          <td>{{ item.createdDate }}</td>
          <td>
            <v-btn
              color="blue darken-1"
              small
              @click="confirm(item.id)"
            >
              구매완료
            </v-btn>
          </td>
          <td>
            <v-btn
              color="error"
              small
              @click="cancel(item.id)"
            >
              신청취소
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-dialog>
</template>

<script>
  import { getAuthFromCookie } from '@/util/cookies'
  export default {
    data: () => ({
      dialog: false,
      requestList: [],
    }),
    created () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        try {
          const { data } = await this.$axios.get(`${this.$SERVER_URL}/book-request-service/request-list/`, {
            headers: {
              Token: getAuthFromCookie()
            },
          })
          this.requestList = data.filter(v => !v.deleted && v.status === 'REQUESTED')
        } catch (error) {
          alert(error.message)
        }
      },
      async confirm (value) {
        if (confirm('도서를 배치하겠습니까?')) {
          try {
            await this.$axios.put(`${this.$SERVER_URL}/book-request-service/request-list/${value}/confirm`, null, {
              headers: {
                Token: getAuthFromCookie()
              },
            })
            
          } catch (error) {
            console.log(error.message)
          }
          location.reload()
        }
      },
      async cancel (value) {
        if (confirm('신청을 취소하시겠습니까?')) {
          try {
            await this.$axios.delete(`${this.$SERVER_URL}/book-request-service/request-list/${value}/cancel`, {
              headers: {
                Token: getAuthFromCookie()
              },
            })
          } catch (error) {
            console.log(error.message)
          }
          location.reload()
        }
      },
    },
  }
</script>
