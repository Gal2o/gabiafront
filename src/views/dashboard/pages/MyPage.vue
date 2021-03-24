<template>
  <v-col
    align="center"
  >
    <v-sheet
      tile
      class="d-flex"
    >
      <v-spacer />
      <v-btn
        x-small
        text
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
        이전 달
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        small
        text
        class="ma-2"
        @click="setToday"
      >
        Today
      </v-btn>
      <v-btn
        x-small
        text
        class="ma-2"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
        다음 달
      </v-btn>
      <v-spacer />
    </v-sheet>
    <v-sheet 
      height="600"
      width="1100"
      color="grey darken-2"
    >
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="events.color"
        dark
        color="white"
        @click:event="showEvent"
      />
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-toolbar
          color="primary"
          dense
          height="30"
          dark
        >
          <v-btn 
            @click="getDetails(selectedEvent.index)"
            x-small
            text
          >
            상세 페이지 가기
            <v-icon right> mdi-message-arrow-right </v-icon>
          </v-btn>
        </v-toolbar>
      </v-menu>
    </v-sheet>
    <div class="py-3" />
    <v-row>
      <v-spacer />
      <v-col
        cols="11"
      >
        <v-expansion-panels v-model="rentPanel">
          <v-expansion-panel @click="expandrent(1)">
            <v-expansion-panel-header color="yellow">
              나의 대출이력 
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-data-table
                  :headers="rentHead"
                  :items="rentHistory"
                  dark
                  class="elevation-1"
                  hide-default-footer
                />
                <v-pagination
                  v-model="rpagination.page"
                  :length="rpagination.totalPage"
                  circle
                  color="yellow"
                  dark
                  @input="expandrent"
                />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels v-model="alertPanel">
          <v-expansion-panel @click="expandalert(1)">
            <v-expansion-panel-header color="yellow">
              나의 알림내역
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-data-table
                  :headers="alertHead"
                  :items="alertHistory"
                  dark
                  class="elevation-1"
                  hide-default-footer
                />
                <v-pagination
                  v-model="apagination.page"
                  :length="apagination.totalPage"
                  circle
                  color="yellow"
                  dark
                  @input="expandalert"
                />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-spacer />
    </v-row>
  </v-col>
</template>

<script>
  import { getAuthFromCookie } from '@/util/cookies'
  export default {
    data: () => ({
      type: 'month',
      mode: 'stack',
      weekday: [1, 2, 3, 4, 5, 6, 0],
      value: '',
      events: [],
      colors: 'error',
      names: 'rent',
      rentList: [],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      rentHead: [
        { text: '제목', value: 'bookTitle', align: 'start', filterable: false, },
        { text: '저자', value: 'bookAuthor'},
        { text: '반납일', value: 'rentExpiredDate'},
        { text: '반납여부', value: 'rentStatus'}
      ],
      alertHead: [
        { text: '제목', value: 'title', align: 'start', filterable: false, },
        { text: '이메일', value: 'email', },
        { text: '날짜', value: 'createdDate', },
        { text: '유형', value: 'alertType', },
      ],
      rentPanel: '',
      alertPanel: '',
      rentHistory: [],
      alertHistory: [],
      rpagination: {},
      apagination: {},
    }),
    created () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        try {
          const { data } = await this.$axios.get(`${this.$SERVER_URL}/book-service/rent-all`, {
            headers: {
              Token: getAuthFromCookie()
            },
        })
          this.rentList = data.filter(v => v.rentStatus === 'RENT')
          const events = []

          for (let i = 0; i < this.rentList.length; i++) {
            const date = new Date(this.rentList[i].rentExpiredDate)
            events.push({
              index: this.rentList[i].bookId,
              name: this.rentList[i].bookTitle,
              start: date,
              end: date,
              color: this.colors,
            })
          }
          this.events = events
        } catch (error) {
            console.log(error.message)
        }
      },
      async expandrent(val) {
        if (!this.rentPanel) {
          try {
            const { data } = await this.$axios.get(`${this.$SERVER_URL}/book-service/rent?page=` + val, {
              headers: {
                Token: getAuthFromCookie()
              },
            })
            this.rentHistory = data.responseDtoList
            this.rpagination = data.pageResponseData
            this.rentHistory.rentStatus = this.rentHistory.filter(v => v.rentStatus === 'RENT'
              ? v.rentStatus = '대여중' : v.rentStatus === 'RETURN'
              ? v.rentStatus = '대여가능' : v.rentStatus = '연체중')
          } catch (error) {
            console.log(error.message)
          }
        }
      },
      async expandalert(val) {
        if (!this.alertPanel) {
          try {
            const { data } = await this.$axios.get(`${this.$SERVER_URL}/alert-service/alerts?page=` + val, {
              headers: {
                Token: getAuthFromCookie()
              }
            })
            this.alertHistory = data.responseDtoList
            this.apagination = data.pageResponseData
            this.alertHistory.alertType = this.alertHistory.filter(v => v.alertType === 'REQUESTED'
              ? v.alertType = '도서 신청완료' : v.alertType === 'DISPLAY_COMPLETED'
              ? v.alertType = '도서 구매완료' : v.alertType === 'RENT'
              ? v.alertType = '도서 대여' : v.alertType === 'RETURN_ONE_DAY_BEFORE'
              ? v.alertType = '도서 반납 하루 전' : v.alertType = '도서 반납')
          } catch (error) {
            console.log(error.message)
          }
        }
      },
      setToday () {
        this.value = ''
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }
        nativeEvent.stopPropagation()
      },
      getDetails (val) {
        this.$router.push({ name: 'BookDetails', query: { id: val }})
      },
    },
  }
</script>