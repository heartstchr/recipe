/* eslint-disable */
import { Dialog } from 'quasar'

// ---  PROMPT DIALOG  ---------------------------------------------------------
export const PromptDialog = ({
    ok = 'Ok',
    title = 'TITLE',
    message = 'MESSAGE',
    type = 'text',
    model = '',
  } = {}) =>
  Dialog.create({
    ok,
    title,
    message,
    prompt: {
      model,
      type,
    },
  })

// ---  INFO  ------------------------------------------------------------------
export const InfoDialog = function({
  title = 'Warning',
  message = '',
  ok = 'Ok',
  okColor = 'primary',
} = {}) {
  return new Promise(resolve => {
    Dialog.create({
      title,
      message,
      buttons: [{
        label: ok,
        color: okColor,
        outline: true,
        handler: function(data) {
          resolve(true)
        }, //data => resolve(true),
      }, ],
    })
  })
}

// ---  CONFIRMATION  ----------------------------------------------------------
export const ConfirmDialog =
({
  title = 'Title',
  message = 'Are you sure?',
  ok = 'Yes',
  color = 'primary',
  cancel = true
} = {}) => Dialog.create({
  title,
  message,
  ok: {
    outline: true,
    color: 'positive',
    label: ok
  },
  color,
  cancel,
})

export const InputDialog = ({
  title = 'Title',
  message = 'Message',
  model = '',
  type = 'text',
  ok = 'Ok',
  color = 'primary',
  cancel = true
} = {}) => Dialog.create({
  title,
  message,
  ok: {
    outline: true,
    color: 'positive',
    label: ok
  },
  color,
  cancel,
  prompt: {
    model,
    type
  },
})
