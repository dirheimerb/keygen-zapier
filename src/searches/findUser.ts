import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/user.json'

interface InputData {
  id: string
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const res = await z.request({
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/users/${encodeURIComponent(bundle.inputData.id)}`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
    },
  })

  res.throwForStatus()

  return [res.json]
}

export default {
  key: 'user',
  noun: 'User',
  display: {
    label: 'Find User',
    description: 'Finds an existing user by their email address or Keygen ID.',
  },
  operation: {
    inputFields: [
      {
        required: true,
        key: 'id',
        label: 'User',
        dynamic: 'users.id.name',
      },
    ],
    perform,
    sample,
  },
}
