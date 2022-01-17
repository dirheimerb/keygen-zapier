import { version as platformVersion } from 'zapier-platform-core'
import authentication from './authentication'
import createLicense from './creates/createLicense'
import updateLicense from './creates/updateLicense'
import renewLicense from './creates/renewLicense'
import suspendLicense from './creates/suspendLicense'
import createToken from './creates/createToken'
import downloadRelease from './creates/downloadRelease'
import findLicense from './searches/findLicense'
import findRelease from './searches/findRelease'
import licenseCreated from './triggers/licenseCreated'
import licenseDeleted from './triggers/licenseDeleted'
import licenseExpired from './triggers/licenseExpired'
import licenseExpiring from './triggers/licenseExpiring'
import licenseRenewed from './triggers/licenseRenewed'
import machineActivated from './triggers/machineActivated'
import machineDeactivated from './triggers/machineDeactivated'
import releaseCreated from './triggers/releaseCreated'
import licenseList from './triggers/licenseList'
import policyList from './triggers/policyList'
import releaseList from './triggers/releaseList'

export default {
  version: require('../package.json').version,
  platformVersion,
  authentication,
  triggers: {
    [licenseCreated.key]: licenseCreated,
    [licenseDeleted.key]: licenseDeleted,
    [licenseExpired.key]: licenseExpired,
    [licenseExpiring.key]: licenseExpiring,
    [licenseRenewed.key]: licenseRenewed,
    [machineActivated.key]: machineActivated,
    [machineDeactivated.key]: machineDeactivated,
    [releaseCreated.key]: releaseCreated,
    [licenseList.key]: licenseList,
    [policyList.key]: policyList,
    [releaseList.key]: releaseList,
  },
  searches: {
    [findLicense.key]: findLicense,
    [findRelease.key]: findRelease,
  },
  creates: {
    [createLicense.key]: createLicense,
    [updateLicense.key]: updateLicense,
    [renewLicense.key]: renewLicense,
    [suspendLicense.key]: suspendLicense,
    [createToken.key]: createToken,
    [downloadRelease.key]: downloadRelease,
  },
}
