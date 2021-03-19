<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <Book-Request-Edit
      v-if="this.$store.state.role.includes('ADMIN') === true"
    />

    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <v-card-text>
          <v-autocomplete
            v-model="modal"
            :items="entity"
            :loading="isLoading"
            :search-input.sync="search"
            clearable
            label="신청할 도서를 찾아보세요."
            color="secondary"
            hide-selected
            item-text="title"
            item-value="title"
            placeholder="검색어를 입력하세요."
            prepend-icon="mdi-book-open-page-variant"
            return-object
            @keyup.enter="find"
          />
        </v-card-text>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(item, n) in bookList"
        :key="n"
        cols="12"
        md="3"
      >
        <v-card
          class="mx-auto"
          @click="goBookDetail(item)"
        >
          <v-img
            :src="`${ item.image }`"
          />
          <v-card-text
            align="center"
            v-html="item.title.replace(/(<([^>]+)>)/ig, '')"
          />
        </v-card>
      </v-col>
      <Book-Request-Detail
        v-model="dialog"
        :item="books"
      />
    </v-row>
    <div class="text-center">
      <v-pagination
        v-if="pagetotal > 0"
        v-model="pagecurrent"
        :length="pagetotal"
        :total-visible="10"
        @input="pageChange"
      />
    </div>
  </v-container>
</template>

<script>
  import debounce from 'debounce'
  import BookRequestDetail from '@/views/dashboard/tables/BookRequestDetail.vue'
  import BookRequestEdit from '@/views/dashboard/tables/BookRequestEdit.vue'
  import { getAuthFromCookie } from '@/util/cookies'
  export default {
    components: {
      'Book-Request-Detail': BookRequestDetail,
      'Book-Request-Edit': BookRequestEdit,
    },
    data: () => ({
      items: [],
      isLoading: false,
      modal: null,
      search: null,
      bookList: [],
      dialog: false,
      books: [],
      pagecurrent: 1,
      pagetotal: '',
      pagetitle: '',
    }),
    computed: {
      entity () {
        return this.items.map(item => {
          const title = item.title.length > 40
            ? item.title.slice(0, 40).replace(/(<([^>]+)>)/ig, '') + '...' : item.title.replace(/(<([^>]+)>)/ig, '')
          return Object.assign({}, item, { title })
        })
      },
    },
    watch: {
      search (value) {
        if (!value || value.replace(/^\s+|\s+$/g, '') === '') return

        debounce(this.makeSearch, 400)(value, this)
      },
    },
    methods: {
      async makeSearch (value, self) {
        if (!value) {
          self.items = []
          self.modal = null
        }

        if (self.isLoading) return

        self.isLoading = true

        try {
          const { data } = await this.$axios.get(`${this.$SERVER_URL}/book-request-service/request-list/${value}`, {
            headers: {
              Token: getAuthFromCookie()
            },
            params: {
              page: 1,
            },
          })
          self.items = data.items
          self.isLoading = false
        } catch (error) {
          console.log(error.message)
        }
      },
      async find () { // 처음 선택해서 Enter 눌렀을 때
        if (this.search === null) {
          this.search = ''
        }

        const { data } = await this.$axios.get(`${this.$SERVER_URL}/book-request-service/request-list/${this.search}`, {
          headers: {
            Token: getAuthFromCookie()
          },
          params: { 
            page: 1 
          },
        })

        this.bookList = data.items
        this.pagecurrent = data.start
        data.total > 1000 ? this.pagetotal = Math.ceil(1000 / 12) : this.pagetotal = Math.ceil(data.total / 12)
        this.pagetitle = this.search
      },
      async pageChange (value) {
        if (this.pagetitle === null) {
          this.pagetitle = ''
        }

        const start = value === 1 ? 1 : (value - 1) * 12

        const { data } = await this.$axios.get(`${this.$SERVER_URL}/book-request-service/request-list/${this.pagetitle}`, {
          headers: {
            Token: getAuthFromCookie()
          },
          params: {
            page: start
          },
        })

        this.bookList = data.items
        this.pagecurrent = value
      },
      goBookDetail (item) {
        this.dialog = true
        this.books = item
      },
    },
  }
</script>
