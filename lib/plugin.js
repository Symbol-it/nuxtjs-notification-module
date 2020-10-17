import Vue from 'vue'

export const Type = {
  error: 'error',
  info: 'info',
  warning: 'warning',
  success: 'success'
}

class Notification {

  constructor (ctx) {
    this.state = Vue.observable({ notification: null })
  }

  getType() {
    return Type;
  }

  getNotification () {
    return this.state.notification
  }

  setNotification (notification) {
    Vue.set(this.state, 'notification', notification)
  }

  resetNotification () {
    this.setNotification(null)
  }

  addNotification (type, message) {
    this.setNotification({
      type, message
    })
  }

  addSuccess (message) {
    this.addNotification(Type.success, message)
  }

  addError (message) {
    this.addNotification(Type.error, message)
  }

  addWarning (message) {
    this.addNotification(Type.warning, message)
  }

  addInfo (message) {
    this.addNotification(Type.info, message)
  }
}

export default function (ctx, inject) {
  const notification = new Notification(ctx)

  if (process.server) {
    ctx.beforeNuxtRender(({ nuxtState }) => {
      nuxtState.notification = notification.state
    })
  }

  const { nuxtState = {} } = ctx || {}
  if (process.client && nuxtState.notification) {
    notification.state = Vue.observable(nuxtState.notification)
  }

  inject('notification', notification)
  ctx.$notification = notification
}
