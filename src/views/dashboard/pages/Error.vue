<template>
  <v-app>
    <v-container
      fluid
      class="error-page"
    >
      <v-row class="logo-wrapper" />
      <v-row class="d-flex justify-center">
        <v-col cols="12">
          <div class="card">
            <span class="error-logo"> 404 </span>
            <p class="error-text">
              해당 페이지를 찾을 수 없습니다.
            </p>
            <p class="error-subtext">
              올바른 경로로 접속해주세요.
            </p>
            <v-btn
              class="text-capitalize"
              dark
              x-large
              :color="$primary"
              to="/Login"
            >
              돌아가기
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  export default {
    name: 'Error',
  }
</script>

<style src="@/sass/custom/Error.scss" lang="scss"/>
