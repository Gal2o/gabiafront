<template>
  <v-container
    id="alerts"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <v-card
          class="mx-auto"
          max-width="600"
        >
          <v-img
            class="white--text align-end"
            aspect-ratio="0.8"
            :src="bookDetails.thumbnail"
          />
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          class="mx-auto"
          max-width="1200"
        >
          <v-card-title>{{ bookDetails.title }}</v-card-title>
          <br/>
          <v-card-text>
            <div>저자</div>
            <div class="display-1 text--primary">
              - {{ bookDetails.author }}
            </div>
            <br/>
            <div>평점</div>
            <br/>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                v-model="bookDetails.avgReviewRating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              />
              <a class="grey--text ml-4 text-decoration-underline" @click="getReviewModal(bookDetails.id)">
                {{ bookDetails.avgReviewRating }} ({{ bookDetails.reviewCount }})
              </a>
              <Review-List
                v-model="dialog"
                :item="bookDetails.id"
              />
            </v-row>
            <br/><br/>
            <div>대출여부</div>
            <div v-if="bookDetails.rent === true">
              <div class="display-1 text--primary">
                - 대여중 ({{ bookDetails.identifier }}) 연장횟수 ({{ bookDetails.extensionCount }})
              </div>
              <div class="display-1 text--primary">
                - {{ bookDetails.rentExpiredDate }} 까지
              </div>
              <div v-if="bookDetails.identifier === userId">
                <v-btn
                  depressed
                  color="primary"
                  @click="returnBook(bookDetails.id)"
                >
                  반납하기
                </v-btn>
                <v-btn
                  depressed
                  color="primary"
                  @click="extensionBook(bookDetails.id)"
                  >
                  연장하기
                </v-btn>
              </div>
            </div>
            <div v-else>
              <div class="display-1 text--primary">
                - 대여가능
              </div>
              <v-btn
                depressed
                color="primary"
                @click="rentBook(bookDetails.id)"
              >
                대여하기
              </v-btn>
            </div>
            <br/>
            <div>도서위치</div>
            <div>
              {{ bookDetails.location }}
            </div>
            <br/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-card
          class="mx-auto"
          max-width="2000"
        >
          <v-card-text>
            <div>intro</div>
            <p class="display-1 text--primary">
              {{ bookDetails.intro }}
            </p>
            <div class="text--primary">

            </div>
            <div>content</div>
            <p class="display-1 text--primary">
              {{ bookDetails.content }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { UNAUTHORIZED, onUnauthorized } from "@/api/index"
import { getUserIdFromCookie } from "@/util/cookies";
import ReviewList from "@/views/dashboard/tables/ReviewList";

export default {
  components: {
    'Review-List': ReviewList,
  },
  data() {
    return {
      bookDetails: {},
      reviews: [],
      bookId: Number,
      userId: "",
      dialog: false,
    }
  },
  created() {
    this.bookId = this.$route.query.id
    this.fetchBookDetails(this.bookId)
    this.userId = getUserIdFromCookie()
  },
  methods: {
    async fetchBookDetails(bookId) {
     try {
       await this.$axios.get(`${this.$SERVER_URL}/book-service/books/${bookId}`)
       .then((res) => {
         this.bookDetails = res.data
       })
     } catch (error) {
       if(error.response.status === UNAUTHORIZED) {
         onUnauthorized()
         return
       }
       alert(error.response.data.message)
     }
    },
    async rentBook(bookId) {
      try {
        await this.$axios.put(`${this.$SERVER_URL}/book-service/books/${bookId}/rent`, null, {
          headers: {
            Token: this.$Token
          }
        })
        location.reload()
      } catch (error) {
        if(error.response.status === UNAUTHORIZED) {
          onUnauthorized()
          return
        }
        alert(error.response.data.message)
      }
    },
    async returnBook(bookId) {
      try {
        await this.$axios.put(`${this.$SERVER_URL}/book-service/books/${bookId}/rent/${this.bookDetails.rentId}/return`, null, {
          headers: {
            Token: this.$Token
          }
        })
        location.reload()
      } catch (error) {
        if(error.response.status === UNAUTHORIZED) {
          onUnauthorized()
          return
        }
        alert(error.response.data.message)
      }
    },
    async extensionBook(bookId) {
      try {
        await this.$axios.put(`${this.$SERVER_URL}/book-service/books/${bookId}/rent/${this.bookDetails.rentId}/extension`, null, {
          headers: {
            Token: this.$Token
          }
        })
        location.reload()
      } catch (error) {
        if(error.response.status === UNAUTHORIZED) {
          onUnauthorized()
          return
        }
        alert(error.response.data.message)
      }
    },
    getReviewModal (bookId) {
      this.dialog = true
      this.bookId = bookId
    },
  }
}

</script>
