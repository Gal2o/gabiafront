<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ notices.title }}</span>
        </v-card-title>
        <v-form>
          <v-spacer />
          <v-card-subtitle align="left">
            <v-icon large>
              mdi-clock-check-outline
            </v-icon>
            {{ notices.createdDate }}
          </v-card-subtitle>
          <v-spacer />
          <v-card-text
            align="center"
            v-html="notices.content"
          />
          <v-spacer />
          <v-card-actions>
            <v-spacer />
            <v-btn
              v-if="this.$store.state.role.includes('ADMIN') === true"
              color="primary"
              @click="updatedialog=true"
            >
              수정하기
            </v-btn>
            <v-btn
              v-if="this.$store.state.role.includes('ADMIN') === true"
              color="error"
              @click="deletedialog=true"
            >
              삭제하기
            </v-btn>
            <v-btn
              color="black"
              @click="dialog = false"
            >
              닫기
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="updatedialog"
      persistent
      max-width="600px"
      max-height="800px"
    >
      <v-card>
        <v-card-title>
          <span
            v-if="notices.isImportant == true"
            class="headline"
            required
          >
            공지사항 수정하기
          </span>
          <span
            v-if="notices.isImportant == false"
            class="headline"
            required
          >
            이용안내 수정하기
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
              @click="update(notices.id)"
            >
              수정하기
            </v-btn>
            <v-btn
              color="black"
              @click="updatedialog=false"
            >
              닫기
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deletedialog"
      persistent
      max-width="400px"
    >
      <v-card>
        <v-card-title class="headline">
          글을 삭제하시겠습니까
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red darken-3"
            text
            @click="remove(notices.id)"
          >
            삭제하기
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deletedialog = false"
          >
            돌아가기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import { getAuthFromCookie } from '@/util/cookies'
  export default {
    props: {
      value: Boolean,
      notices: Object,
    },
    data: () => ({
      form: false,
      updatedialog: false,
      deletedialog: false,
      title: '',
      textbox: '',
      isImportant: false,
      rules: {
        title: v => !!v || '제목을 입력하세요!',
        textbox: v => !!v || '내용을 입력하세요!',
      },
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
    watch: {
      updatedialog: function (val) {
        if (!val) {
          this.$refs.form.reset()
        }
      },
    },
    methods: {
      async update (data) {
        try {
          await this.$axios.put(`${this.$SERVER_URL}/notice-service/notices/${data}`, {
            id: data,
            title: this.title,
            content: this.textbox,
            isImportant: this.isImportant,
          }, {
            headers: {
              Token: getAuthFromCookie()
            },
          })
          location.reload()
        } catch (error) {
          console.log(error.message)
        }
      },
      async remove (data) {
        try {
          await this.$axios.delete(`${this.$SERVER_URL}/notice-service/notices/${data}`, {
            headers: {
              Token: getAuthFromCookie()
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
