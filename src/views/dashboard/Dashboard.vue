<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        lg="12"
      >
        <v-carousel
          hide-delimiters
        >
          <v-carousel-item
            v-for="last in latest"
            :key="last"
          >
            <v-row>
                <v-card
                  class="mx-auto"
                  max-width="344"
                >
                  <v-img
                    :src="last.src"
                  ></v-img>
                  <v-card-title> 책 제목 </v-card-title>
                  <v-card-subtitle>
                    <v-rating
                        :value="3.1"
                        color="amber"
                        dense
                        readonly
                        size="13"
                      ></v-rating>

                      <div class="white--text ml-4">
                        3.1 (413)
                      </div>
                  </v-card-subtitle>
                </v-card>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>

       <v-col
        cols="12"
        lg="12"
      >
        <v-carousel
          hide-delimiters
        >
          <v-carousel-item
            v-for="r in review"
            :key="r"
          >
            <v-row>
                <v-card
                  class="mx-auto"
                  max-width="344"
                >
                  <v-img
                    :src="r.src"
                  ></v-img>
                  <v-card-title> 책 제목 </v-card-title>
                  <v-card-subtitle>
                    <v-rating
                        :value="4.1"
                        color="amber"
                        dense
                        readonly
                        size="13"
                      ></v-rating>

                      <div class="white--text ml-4">
                        4.1 (200)
                      </div>
                  </v-card-subtitle>
                </v-card>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        latest: [
          {
            src: 'http://image.yes24.com/goods/91433923/L',
          },
          {
            src: 'http://image.yes24.com/goods/74269921/L',
          },
          {
            src: 'http://image.yes24.com/goods/4333686/L',
          },
          {
            src: 'http://image.yes24.com/goods/91084402/L',
          },
          {
            src: 'http://image.yes24.com/goods/90452827/L',
          },
          {
            src: 'http://image.yes24.com/goods/92363588/L',
          },
          {
            src: 'http://image.yes24.com/goods/91302724/L',
          },
          {
            src: 'http://image.yes24.com/goods/67883315/L',
          },
        ],
        review: [
          {
            src: 'http://image.yes24.com/goods/93765519/L',
          },
          {
            src: 'http://image.yes24.com/goods/78233628/L',
          },
          {
            src: 'http://image.yes24.com/goods/91213376/L',
          },
          {
            src: 'http://image.yes24.com/goods/96360166/L',
          },
          {
            src: 'http://image.yes24.com/goods/19040233/L',
          },
          {
            src: 'http://image.yes24.com/goods/78233628/L',
          },
          {
            src: 'http://image.yes24.com/goods/90003539/L',
          },
          {
            src: 'http://image.yes24.com/goods/72274740/L',
          },
        ],
      }
    },
  }
</script>
