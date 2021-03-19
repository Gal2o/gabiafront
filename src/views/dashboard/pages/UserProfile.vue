<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              개인 정보 수정
            </div>

            <div class="subtitle-1 font-weight-light">
              개인 정보를 수정하세요.
            </div>
          </template>

          <v-form
            ref="form"
            v-model="form"
          >
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="updateEmail"
                    :rules="emailRule"
                    label="E-mail"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="updateName"
                    :rules="nameRule"
                    label="이름"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="updatePassword"
                    :rules="passRule"
                    label="비밀번호"
                    type="password"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="updatePhone"
                    :rules="phoneRule"
                    label="전화번호"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mx-2"
                    :disabled="!form"
                    @click="update"
                  >
                    수정하기
                  </v-btn>
                  <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="400"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="error"
                        class="mx-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        회원 탈퇴하기
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline">
                        탈퇴하시겠습니까?
                      </v-card-title>
                      <v-card-text
                        align="center"
                      >
                        한번 지운 데이터는 복구되지 않습니다.
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="green darken-1"
                          text
                          @click="dialog = false"
                        >
                          돌아가기
                        </v-btn>
                        <v-btn
                          color="red darken-3"
                          text
                          @click="remove()"
                        >
                          탈퇴하기
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { getUserNumFromCookie, deleteCookie, getAuthFromCookie } from '@/util/cookies'
  import { emailvalidate, phonevalidate } from '@/util/validation'

  export default {
    data: () => ({
      updateEmail: '',
      updateName: '',
      updatePassword: '',
      updatePhone: '',
      emailRule: [
        v => !!v || '이메일을 입력하세요.',
        v => emailvalidate.test(v) || '올바른 이메일 형식이 아닙니다.',
      ],
      passRule: [
        v => !!v || '비밀번호를 입력하세요.',
        v => v.length >= 6 || '6자리 이상 입력하세요',
      ],
      phoneRule: [
        v => phonevalidate.test(v) || '올바른 형식이 아닙니다.',
      ],
      nameRule: [
        v => !!v || '이름을 입력하세요.',
      ],
      dialog: false,
      form: false,
    }),
    created () {
      // cookie에 id 가져와서 유저 정보 카드에 바인딩
      // 개인정보 수정란에 vaule 바인딩 and rules적용하기
    },
    methods: {
      async update () {
        try {
          this.$axios.put(`${this.$SERVER_URL}/user-service/users/${getUserNumFromCookie()}`, {
            userName: this.updateName,
            email: this.updateEmail,
            password: this.updatePassword,
            phone: this.updatePhone.replace(/-/g, ''),
          }, {
            headers: {
              Token: getAuthFromCookie()
            },
          })
        } catch (error) {
          console.log(error.message)
        }
      },
      async remove () {
        try {
          await this.$axios.delete(`${this.$SERVER_URL}/user-service/users/${getUserNumFromCookie()}`, {
            headers: {
              Token: getAuthFromCookie()
            },
          })
          this.$store.commit('CLEAR_USERID')
          this.$store.commit('CLEAR_ACCESS_TOKEN')
          this.$store.commit('CLEAR_ROLE')
          this.$store.commit('CLEAR_USERNUM')
          deleteCookie('auth')
          deleteCookie('userId')
          deleteCookie('role')
          deleteCookie('userNum')
          this.$router.push('/login')
        } catch (error) {
          console.log(error.message)
        }
      },
    },
  }
</script>
