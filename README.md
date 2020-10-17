# @Symbol-it/nuxtjs-notification-module

> Notification module for nuxtjs

## Features

    - Notification store
    
## Installation

Npm

``npm i @symbol-it/nuxtjs-notification-module --save``

Declare the module in ``./nuxt.config.js``

```
  modules: [
    ...
    '@symbol-it/nuxtjs-notification-module'
    ...
  ],
```

    
## Methods

Client side use `this.$notification.<method>`

Server side use `$notification.<method>`

| Methods        | Description |
| ------------- |-------------:|
| addNotification(type, message) | Push notification in store |
| addSuccess(message) | Push success notification in store | 
| addError(message) | Push error notification in store | 
| addInfo(message) | Push info notification in store | 
| addWarning(message) | Push warning notification in store | 
| resetNotification() | Clear notification in store | 
| getType() | Retrieve default types notification | 

## Implementations

- Create your vue notification component

```
<template>
  <v-alert :type="type">
    {{ message }}
  </v-alert>
</template>

<script>

export default {
  name: 'Notification',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: () => 'info',
      validator (value) {
        return [
          'success',
          'warning',
          'info',
          'error'
        ].includes(value)
      }
    }
  }
}
</script>
```

- Add your component in your layout

```
<template>
  <v-app>
    <v-main>
      <v-container>
        <notification v-if="notification" :type="notification.type" :message="notification.message" />
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Notification from '../components/notification/Notification.vue'

export default {
  components: {
    Notification,
  },
  computed: {
    notification () {
      return this.$notification.getNotification()
    }
  },
  watch: {
    '$route' (to, from) {
      this.$notification.resetNotification()
    }
  }
}
</script>
```

- Push notification

```
<template>
   <form-login @submit="login" />
</template>
<script>
import FormLogin from '../components/form/FormLogin.vue'
export default {
  components: {
    FormLogin
  },
  methods: {
    async login (form) {
      try {
        await this.$strapi.login({ identifier: form.email, password: form.password })
        await this.$router.push({ path: '/dashboard' })
      } catch (e) {
        this.$notification.addError('my error')
      }
    },
  },
}
</script>

```
