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
      height="450"
      width="900"
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
  </v-col>
</template>

<script>
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
    }),
    created () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        try {
          const { data } = await this.$axios.get(`${this.$SERVER_URL}/book-service/rent-all`, {
            headers: {
              Token: this.$Token
            },
        })
          this.rentList = data.filter(v => v.rentStatus === 'RENT')

          const events = []

          for (let i = 0; i < this.rentList.length; i++) {
            const date = new Date(this.rentList[i].rentExpiredDate)
            // const tmp = new Date(date)
            // const startDate = new Date(tmp.setDate(tmp.getDate() - 30))

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