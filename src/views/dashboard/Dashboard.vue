<template>
  <v-container
    id="dashboard"
    tag="section"
  >
    <v-divider class="mx-4" />
    <v-row>
      <v-spacer />
      <v-col cols="2">
        <v-select
          v-model="select"
          :items="items"
          item-text="state"
          item-value="value"
          return-object
          @input="fetchData"
        />
      </v-col>
      <v-spacer />
      <v-col
        cols="12"
        lg="12"
      >
        <carousel-3d
          ref="firstpage"
          autoplay
          autoplayHoverPause
          display="7"
          border="2"
          space="300"
          height="460"
          :count="bookList.length"
        >
          <slide
            v-for="(slide, i) in bookList"
            :index="i"
            :key="i"
          >
            <v-hover>
              <template v-slot="{ index, isCurrent, leftIndex, rightIndex, hover }">
                <v-img
                  :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }"
                  :data-index="index"
                  :src="slide.thumbnail"
                >
                  <v-fade-transition>
                    <v-overlay
                      v-if="hover"
                      absolute
                      color="#6E6E6E"
                    >
                      <v-card-text v-if="select.value === 'latest'">
                        추가 된 날: {{slide.createdDate}}
                      </v-card-text>
                      <v-card-text v-else>
                        리뷰 수: {{slide.reviewCount}}
                      </v-card-text>
                      <v-btn
                        color="warning"
                        @click="getDetails(slide.id)"
                        block
                      >
                        책 상세보기
                      </v-btn>
                    </v-overlay>
                  </v-fade-transition>
                </v-img>
              </template>
            </v-hover>
          </slide>
        </carousel-3d>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
  import { Carousel3d, Slide } from 'vue-carousel-3d'
  import { getAuthFromCookie } from '@/util/cookies'
  export default {
    name: 'DashboardDashboard',
    components: {
      Carousel3d,
      Slide,
    },
    created () {
      this.fetchData ()
    },
    updated () {
      this.$refs.firstpage.goSlide(this.$refs.firstpage.currentIndex)
    },
    data () {
      return {
        bookList: [],
        select: { state: '최근 추가된 순' , value: 'latest' },
        items: [
          { state: '최근 추가된 순' , value: 'latest' },
          { state: '리뷰 가장 많은 순', value: 'many-reviews' },
        ],
      }
    },
    methods: {
      async fetchData () {
        try {
          const { data } = await this.$axios.get(`${this.$SERVER_URL}/book-service/books/${this.select.value}`, {
            headers: {
              Token: getAuthFromCookie()
            },
          })
          this.bookList = data
        } catch (error) {
          alert(error.message)
        }
      },
      getDetails (val) {
        this.$router.push({ name: 'BookDetails', query: { id: val }})
      },
    },
  }
</script>
