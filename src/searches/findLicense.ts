import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/license.json'

interface InputData {
  id: string
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const res = await z.request({
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/licenses/${encodeURIComponent(bundle.inputData.id)}`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
    },
  })

  res.throwForStatus()

  return [res.json]
}

export default {
  key: 'license',
  noun: 'License',
  display: {
    label: 'Find License',
    description: 'Finds an existing license by its license key or Keygen ID.',
  },
  operation: {
    inputFields: [
      {
        required: true,
        key: 'id',
        label: 'License',
        dynamic: 'licenses.id.name',
      },
    ],
    perform,
    sample,
  },
}
