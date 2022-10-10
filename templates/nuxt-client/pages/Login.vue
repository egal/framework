<template>
  <div></div>
</template>

<script>
// eslint-disable-next-line import/named
import { EgalAuthConstructor } from '@egalteam/framework'
export default {
  name: 'LoginPage',
  data() {
    return {
      authModel: null,
    }
  },
  mounted() {
    const authInfo = {
      modelName: 'User',
      url: 'url',
      connectionType: 'axios',
    }
    this.authModel = new EgalAuthConstructor(authInfo)
  },
  methods: {
    /**
     * Ниже приведены примеры регистрации, аутентификации и
     * авторизации пользователя в микросервисе
     */
    userRegistration() {
      const userData = { email: 'user email', password: 'user password' }
      this.authModel
        .registerNewUser(userData)
        .then(() => {})
        .catch(() => {})
    },
    userAuth() {
      const userData = { email: 'user email', password: 'user password' }
      this.authModel
        .authUser(userData)
        .then(() => {})
        .catch(() => {})
    },
    loginToService(token, serviceName) {
      const loginData = { service_name: serviceName, token }
      this.authModel
        .loginToService(loginData)
        .then(() => {
          /**
           * в ответ придет токен авторизации в микросервисе
           * для того чтобы Egal мог его использовать, нужно
           * сохранить его в cookie под именем микросервиса, для которого
           * получен токен
           */
        })
        .catch(() => {})
    },
  },
}
</script>

<style scoped></style>
