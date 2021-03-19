<template>
  <v-container
    id="alerts"
    fluid
    tag="section"
  >
    <v-row>
      <v-spacer />
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="find"
          label="책을 검색하세요."
          prepend-icon="mdi-book-search"
          @keyup.enter="findBook(1)"
        />
      
      </v-col>
      <v-spacer />
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="3"
        v-for="b in books" :key="b.id"
      >
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-img
            :src="`${ b.thumbnail }`"
          ></v-img>
          <v-card-title>{{ b.title }}</v-card-title>
          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                v-model=b.avgReviewRating
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">
                {{ b.avgReviewRating }} ({{ b.reviewCount }})
              </div>

              <div class="my-4 subtitle-1" v-if="b.rent === true">
                대출중 ({{ b.identifier }})
              </div>
              <div class="my-4 subtitle-1" v-else>
                대출가능
              </div>

            </v-row>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>
          <v-btn @click="getDetails(b.id)">상세보기</v-btn>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-pagination
        v-model="pagination.page"
        :length="pagination.totalPage"
        :total-visible="7"
        @input="onPageChange"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
  import router from "@/router";
  import { getAuthFromCookie } from '@/util/cookies'
  export default {
    data() {
      return {
        books: [],
        rendData: [],
        pagination: {},
        find: '',
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        try {
          await this.$axios.get(`${this.$SERVER_URL}/book-service/books`, {
            headers: {
              Token: getAuthFromCookie()
            },
          })
          .then((res) => {
            this.books = res.data.responseDtoList
            this.pagination = res.data.pageResponseData
          })
        } catch (error) {
          alert(error.response.data.message)
        }
      },
      async onPageChange(newPage) {
        if (this.find.length === 0) {
          try {
            await this.$axios.get(`${this.$SERVER_URL}/book-service/books?page=` + newPage)
            .then((res) => {
              this.books = res.data.responseDtoList
              this.pagination = res.data.pageResponseData
            })
          } catch (error) {
            alert(error.response.data.message)
          }
        }
        else {
          this.findBook(newPage)
        }
      },
      getDetails(val) {
        router.push({ path: '/BookDetails', query: { id: val }})
      },
      async findBook(val) {
        try {
          const { data } = await this.$axios.get(`${this.$SERVER_URL}/book-service/books/search`, {
            headers : {
              Token: getAuthFromCookie()
            },
            params: {
              keyword: this.find.replace(/^\s+|\s+$/g, ''),
              page: val
            }
          })
          this.books = data.responseDtoList
          this.pagination = data.pageResponseData
        } catch (error) {
          alert(error.message)
        }
      }
    }
  }

</script>
