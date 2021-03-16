<template>
  <v-app>
    <v-container fluid>
      <v-row no-gutters>
        <v-col
          cols="7"
          class="main-part d-none d-md-none d-lg-flex"
        >
          <v-carousel
            cycle
            :show-arrows="false"
            hide-delimiters
          >
            <v-carousel-item
              v-for="(pic,p) in pics"
              :key="p"
              :src="pic.src"
            />
          </v-carousel>
        </v-col>
        <v-col
          cols="12"
          lg="5"
          class="login-part d-flex align-center justify-center"
        >
          <v-row
            no-gutters
            class="align-start"
          >
            <v-col
              cols="12"
              class="login-part d-flex align-center justify-center flex-column"
            >
              <div class="login-wrapper pt-md-4 pt-0">
                <v-tabs grow>
                  <v-tabs-slider />
                  <v-tab :href="`#tab-login`">
                    로그인
                  </v-tab>
                  <v-tab :href="`#tab-newUser`">
                    회원가입
                  </v-tab>

                  <v-tab-item :value="'tab-login'">
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <v-col>
                            <p class="login-slogan text-h2 text-center font-weight-medium my-10">
                              로그인 후 이용하세요
                            </p>
                          </v-col>
                          <v-form
                            ref="loginform"
                            v-model="loginform"
                          >
                            <v-col>
                              <v-text-field
                                v-model="identifier"
                                :rules="idRule"
                                label="아이디"
                                required
                              />
                              <v-text-field
                                v-model="password"
                                :rules="passRule"
                                type="password"
                                label="비밀번호"
                                hint="6자리 이상 입력하세요."
                                required
                              />
                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                class="text-capitalize"
                                large
                                block
                                :disabled="!loginform"
                                color="primary"
                                @click="login"
                              >
                                로그인
                              </v-btn>
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>

                  <v-tab-item :value="'tab-newUser'">
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <v-col>
                            <p class="login-slogan text-h3 text-center font-weight-medium mt-10">
                              Welcome!
                            </p>
                            <p class="login-slogan text-h2 text-center font-weight-medium mb-10">
                              계정을 만드세요
                            </p>
                          </v-col>
                          <v-form
                            ref="joinform"
                            v-model="joinform"
                          >
                            <v-col>
                              <v-text-field
                                v-model="createIdentifier"
                                :rules="idRule"
                                label="아이디"
                                required
                              />
                              <v-text-field
                                v-model="createName"
                                :rules="nameRule"
                                label="이름"
                                required
                              />
                              <v-text-field
                                v-model="createEmail"
                                :rules="emailRule"
                                label="이메일"
                                required
                              />
                              <v-text-field
                                v-model="createPassword"
                                :rules="passRule"
                                type="password"
                                label="비밀번호"
                                hint="6자 이상 입력하세요."
                                required
                              />
                              <v-text-field
                                v-model="createPhone"
                                :rules="phoneRule"
                                label="전화번호"
                                required
                              />
                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                large
                                block
                                :disabled="!joinform"
                                color="primary"
                                @click="join"
                              >
                                가입하기
                              </v-btn>
                            </v-col>
                          </v-form>

                          <v-col
                            cols="12"
                            class="d-flex align-center my-4"
                          />
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>
                </v-tabs>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  import {
    saveAuthToCookie,
    saveRoleToCookie,
    saveUserIdToCookie,
    saveUserNumToCookie,
  } from '@/util/cookies'
  import { emailvalidate, phonevalidate } from '@/util/validation'

  export default {
    name: 'Login',
    data: () => ({
      identifier: '',
      password: '',
      logMessage: '',
      idRule: [
        v => !!v || 'ID를 입력하세요.',
      ],
      nameRule: [
        v => !!v || '이름을 입력하세요.',
      ],
      passRule: [
        v => !!v || '비밀번호를 입력하세요.',
        v => v.length >= 6 || '6자리 이상 입력하세요',
      ],
      emailRule: [
        v => !!v || '이메일을 입력하세요.',
        v => emailvalidate.test(v) || '올바른 이메일 형식이 아닙니다.',
      ],
      phoneRule: [
        v => phonevalidate.test(v) || '올바른 형식이 아닙니다.',
      ],
      createIdentifier: '',
      createName: '',
      createEmail: '',
      createPassword: '',
      createPhone: '',
      loginform: false,
      joinform: false,
      pics: [
        {
          src: 'https://cdn.pixabay.com/photo/2016/01/27/04/32/books-1163695_960_720.jpg',
        },
        {
          src: 'https://cdn.pixabay.com/photo/2015/12/08/01/04/bookshelf-1082309_960_720.jpg',
        },
        {
          src: 'https://cdn.pixabay.com/photo/2016/11/29/12/50/bookcase-1869616_960_720.jpg',
        },
        {
          src: 'https://cdn.pixabay.com/photo/2017/04/23/11/03/books-2253569_960_720.jpg',
        },
        {
          src: 'https://cdn.pixabay.com/photo/2017/08/26/20/19/library-2684238_960_720.jpg',
        },
      ],
    }),
    methods: {
      async login () {
        try {
          const { headers } = await this.$axios.post(`${this.$SERVER_URL}/auth-service/auth`, {
            identifier: this.identifier,
            password: this.password,
          })
          console.log('axios Post Success', headers)
          this.$store.commit('SET_ACCESS_TOKEN', headers.token)
          this.$store.commit('SET_USERID', this.identifier)
          this.$store.commit('SET_ROLE', headers.authority)
          this.$store.commit('SET_USERNUM', headers.id)
          saveAuthToCookie(headers.token)
          saveUserIdToCookie(this.identifier)
          saveRoleToCookie(headers.authority)
          saveUserNumToCookie(headers.id)
          this.$router.push('/')
        } catch (error) {
          alert('로그인 정보를 확인해주세요.')
        }
      },
      async join () {
        try {
          await this.$axios.post(`${this.$SERVER_URL}/user-service/users`, {
            identifier: this.createIdentifier,
            userName: this.createName,
            email: this.createEmail,
            password: this.createPassword,
            phone: this.createPhone.replace(/-/g, ''),
          })
          location.reload()
        } catch (error) {
          console.log(error.message)
        }
      },
    },
  }
</script>

<style src="@/sass/custom/Login.scss" lang="scss"/>
