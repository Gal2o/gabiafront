<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="400px"
    >
      <v-card>
        <v-img
          aspect-ratio="0.8"
          :src="item.image"
        />
          <v-card-title align="center">
            {{ item.title }}
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
            <v-card-text align="center">
              <div>
                {{ item.link }}
              </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card-title>{{ item.author }}//{{ item.publisher }}</v-card-title>
      </v-card>
    
      <v-card-actions>
        <v-btn
          block
          color="primary"
          @click="bookRequest"
        >
          신청하기
        </v-btn>
      </v-card-actions>
    </v-dialog>
  </v-row>
</template>

<script>
  //import { getUserNumFromCookie } from '@/util/cookies'
  export default {
    props: {
      value: Boolean,
      item: Object,
    },
    data: () => ({

    }),
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
    methods: {
      async bookRequest() {
        try {
          await this.$axios.post('http://localhost:8008/request-list', {
              userId: 1,
              bookId: 1,
              bookName: this.item.title,
              author: this.item.author,
              destination: "Headquarter",
              url: this.item.link,
              status: "REQUESTED",
          })
          if (confirm('도서를 신청하시겠습니까?')) location.reload()
        } catch (error) {
            console.log(error.message)
        }
      },
    },
  }
</script>
