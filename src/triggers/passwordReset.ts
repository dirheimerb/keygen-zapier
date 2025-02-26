import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/reset.json'

async function performSubscribe(z: ZObject, bundle: Bundle) {
  const res = await z.request({
    method: 'POST',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/webhook-endpoints`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    json: {
      data: {
        type: 'webhook-endpoints',
        attributes: {
          url: bundle.targetUrl,
          subscriptions: [
            'user.password-reset',
          ],
        },
      },
    },
  })

  res.throwForStatus()

  return res.json.data
}

async function performUnsubscribe(z: ZObject, bundle: Bundle) {
  const res = await z.request({
    method: 'DELETE',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/webhook-endpoints/${bundle.subscribeData!.id}`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
    },
  })

  res.throwForStatus()

  return null
}

async function performList(z: ZObject, bundle: Bundle) {
  const res = await z.request({
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/users`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
    },
  })

  res.throwForStatus()

  return res.json.data.map((data: unknown) => ({ data, meta: sample.meta }))
}

async function perform(z: ZObject, bundle: Bundle) {
  if (bundle.cleanedRequest.data.attributes.event !== 'user.password-reset') {
    throw new Error('Invalid event')
  }

  return [bundle.cleanedRequest.data.attributes.payload]
}

export default {
  key: 'passwordReset',
  noun: 'Reset',
  display: {
    label: 'Password Reset',
    description: 'Triggers when a user requests a password reset.',
  },
  operation: {
    type: 'hook',
    performSubscribe,
    performUnsubscribe,
    performList,
    perform,
    sample,
  },
}
