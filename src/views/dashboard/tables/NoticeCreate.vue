<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    max-height="800px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        align="center"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>
          mdi-pencil-plus
        </v-icon>
        공지사항/이용안내 추가하기
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span
          class="headline"
          required
        >
          글쓰기
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
              <v-col
                cols="12"
                sm="4"
              >
                <v-checkbox
                  v-model="isImportant"
                  label="공지사항"
                  color="red darken-3"
                  hide-details
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            :disabled="!form"
            @click="noticeSave({title, textbox, isImportant})"
          >
            저장하기
          </v-btn>
          <v-btn
            color="black"
            @click="dialog=false"
          >
            닫기
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      form: false,
      title: '',
      textbox: '',
      isImportant: false,
      rules: {
        title: v => !!v || '제목을 입력하세요!',
        textbox: v => !!v || '내용을 입력하세요!',
      },
    }),
    watch: {
      dialog: function (val) {
        if (!val) {
          this.$refs.form.reset()
        }
      },
    },
    methods: {
      async noticeSave (data) {
        try {
          await this.$axios.post(`${this.$SERVER_URL}/notice-service/notices`, {
            title: data.title,
            content: data.textbox,
            isImportant: data.isImportant,
          }, {
            headers: {
              Token: this.$Token
            },
          })
          location.reload()
        } catch (error) {
          console.log(error.message)
        }
      },
    },
  }
</script>
