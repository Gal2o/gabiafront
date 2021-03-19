<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      persistent
      :retain-focus="false"
      width="1000"
    >
      <v-card
        class="mx-auto my-12"
        max-width="1000"
        max-height="1500"
      >
        <v-card-title>리뷰 리스트</v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                제목
              </th>
              <th class="text-left">
                아이디
              </th>
              <th class="text-left">
                평점
              </th>
              <th class="text-left">
                작성날짜
              </th>
              <th class="text-left">
                수정날짜
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="item in reviews"
              :key="item.name"
              @click="getReviewDetails(item.id)"
            >
              <td>{{ item.title }}</td>
              <td>{{ item.identifier }}</td>
              <td>
                <v-rating
                  color="amber"
                  hover
                  length="5"
                  readonly
                  size="15"
                  v-model=item.rating
                ></v-rating>
              </td>
              <td>{{ item.createdDate }}</td>
              <td>{{ item.modifiedDate }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div class="text-center">
          <v-pagination
            v-model="pagination.page"
            :length="pagination.totalPage"
            :total-visible="7"
            @input="fetchReviewsWithPage"
          ></v-pagination>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="createdialog = true"
          >
            리뷰추가
          </v-btn>
          <v-btn
            color="primary"
            text
            @click.stop="dialog = false"
          >
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="createdialog"
      persistent
      max-width="600px"
      max-height="800px"
    >
      <v-card>
        <v-card-title>
          <span
            class="headline"
          >
            리뷰 추가하기
          </span>
        </v-card-title>
        <v-form
          ref="form"
          v-model="form"
        >
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="title"
                    label="제목을 입력하세요."
                    :rules="[rules.title]"
                    required
                  />
                </v-col>
                <v-col cols="12">
                  <v-rating
                    color="amber"
                    hover
                    length="5"
                    size="15"
                    v-model="rating"
                  ></v-rating>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="textbox"
                    label="내용을 입력하세요."
                    :rules="[rules.textbox]"
                    clearable
                    clear-icon="mdi-close"
                    required
                    background-color="amber lighten-4"
                    auto-grow
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              :disabled="!form || !rating"
              @click="createReview"
            >
              추가하기
            </v-btn>
            <v-btn
              color="black"
              @click="createdialog = false"
            >
              닫기
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="detailsdialog"
      persistent
      max-width="600px"
      max-height="800px"
    >
      <v-card>
        <v-card-title>
          <span
            class="headline"
          >
            리뷰 상세조회
          </span>
        </v-card-title>
        <v-form
          ref="form"
          v-model="form"
          disabled
        >
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <div>제목</div>
                  <v-text-field
                    v-model="reviewDetails.title"
                    readonly
                  />
                </v-col>
                <v-col cols="12">
                  <div>작성날짜</div>
                  <v-text-field
                    v-model="reviewDetails.createdDate"
                    readonly
                  />
                </v-col>
                <v-col cols="12">
                  <div>평점</div>
                  <v-rating
                    color="amber"
                    hover
                    length="5"
                    size="15"
                    v-model="reviewDetails.rating"
                    readonly
                  ></v-rating>
                </v-col>
                <v-col cols="12">
                  <div>내용</div>
                  <v-textarea
                    v-model="reviewDetails.content"
                    readonly
                    background-color="amber lighten-4"
                    auto-grow
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="black"
              @click="detailsdialog = false"
            >
              닫기
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {onUnauthorized, UNAUTHORIZED} from "@/api";
import { getAuthFromCookie } from '@/util/cookies'
export default {
  props: {
    value: Boolean,
  },
  data () {
    return {
      bookId: Number,
      reviews: [],
      reviewDetails: {},
      pagination: {},
      createdialog: false,
      detailsdialog: false,
      title: '',
      textbox: '',
      rating: 0,
      form: false,
      rules: {
        title: v => !!v || '제목을 입력하세요!',
        textbox: v => !!v || '내용을 입력하세요!',
      },
    }
  },
  created() {
    this.bookId = this.$route.query.id
    this.fetchReviewsOfBook()
  },
  computed: {
    dialog: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      },
    },
  },
  watch: {
    createdialog: function (val) {
      if (!val) {
        this.$refs.form.reset()
      }
    },
  },
  methods: {
    async fetchReviewsOfBook() {
      try {
        await this.$axios.get(`${this.$SERVER_URL}/review-service/books/${this.bookId}/reviews`, {
          headers: {
            Token: getAuthFromCookie()
          },
        })
          .then((res) => {
            this.reviews = res.data.responseDtoList
            this.pagination = res.data.pageResponseData
          }).catch((err) => {
            console.log('Reviews Get Failed!', err)
          })
      } catch (error) {
        alert(error.response.data.message)
      }
    },
    async fetchReviewsWithPage(newPage) {
      try {
        await this.$axios.get(`${this.$SERVER_URL}/review-service/books/${this.bookId}/reviews?page=` + newPage, {
          headers: {
            Token: getAuthFromCookie()
          },
        })
        .then((res) => {
          this.reviews = res.data.responseDtoList
          this.pagination = res.data.pageResponseData
        })
      } catch (error) {
        alert(error.response.data.message)
      }
    },
    async createReview() {
      try {
        await this.$axios.post(`${this.$SERVER_URL}/review-service/books/${this.bookId}/reviews`, {
           title: this.title,
           rating: this.rating,
           content: this.textbox,
         }, { 
           headers: {
            Token: getAuthFromCookie()
          },
        })
        alert("리뷰가 추가되었습니다.")
        await this.fetchReviewsWithPage(1)
        this.createdialog = false
      } catch (error) {
        if(error.response.status === UNAUTHORIZED) {
          onUnauthorized()
          return
        }
        alert(error.response.data.message)
      }
    },
    async getReviewDetails(reviewId) {
      try {
        this.detailsdialog = true;
        await this.$axios.get(`${this.$SERVER_URL}/review-service/books/reviews/` + reviewId, {
          headers: {
            Token: getAuthFromCookie()
          },
        })
        .then((res) => {
          this.reviewDetails = res.data
        })
      } catch (error) {
        alert(error.response.data.message)
      }
    }
  }
}

</script>

