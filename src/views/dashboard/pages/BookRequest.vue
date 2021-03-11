<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
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
  </v-container>
</template>

<script>
  import debounce from 'debounce'
  export default {
    data: () => ({
      items: [],
      isLoading: false,
      modal: null,
      search: null,
      resultbooks: [],
    }),
    computed: {
      entity () {
        return this.items.map(item => {
          const title = item.title.replace(/(<([^>]+)>)/ig, '')
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
          const { data } = await this.$axios.get(`http://localhost:8008/request-list/${value}`)
          self.total = data.total
          self.items = data.items
          self.isLoading = false
        } catch (error) {
          console.log(error.message)
        }
      },
      async find () {
        if (this.modal && this.search) { // 선택해서 Enter 눌렀을 때
          this.resultbooks = this.modal
        } else { // 그냥 검색어 Enter 눌렀을 때
          const { data } = await this.$axios.get(`http://localhost:8008/request-list/${this.search}`)
          console.log(data)
        }
      },
    },
  }
</script>
