<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="350px"
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
      
          <v-card-actions>
            <v-btn
              color="primary"
              :disabled="!select.value"
              @click="bookRequest"
            >
              신청하기
            </v-btn>
            <v-select
              v-model="select"
              :items="dest"
              item-text="state"
              item-value="value"
              label="배치 장소를 고르세요"
              return-object
            />
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  //import { getUserNumFromCookie } from '@/util/cookies'
  export default {
    props: {
      value: Boolean,
      item: Array,
    },
    data: () => ({
      select: { state: '', value: ''},
      dest: [
        { state: '없음', value: ''},
        { state: '본사', value: 'HEAD'},
        { state: '서초IDC', value: 'SEOCHO'},
        { state: '가산IDC', value: 'GASAN'},
        { state: '가산W센터', value:'WCENTER'},
      ],
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
              bookName: this.item.title.replace(/(<([^>]+)>)/ig, ''),
              author: this.item.author,
              destination: this.select.value,
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
