import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval as ApprovalEvent,
  CancelAccount as CancelAccountEvent,
  CancelLikeMoment as CancelLikeMomentEvent,
  CreateAccount as CreateAccountEvent,
  CreateComment as CreateCommentEvent,
  CreateMoment as CreateMomentEvent,
  CreateSubSpaceDomain as CreateSubSpaceDomainEvent,
  Initialized as InitializedEvent,
  LikeMoment as LikeMomentEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  RemoveComment as RemoveCommentEvent,
  RemoveMoment as RemoveMomentEvent,
  RentSpace as RentSpaceEvent,
  ReturnSpace as ReturnSpaceEvent,
  SetBeneficiary as SetBeneficiaryEvent,
  SetMintFee as SetMintFeeEvent,
  SetSubSpaceDomainLimit as SetSubSpaceDomainLimitEvent,
  UpdateAvatarURI as UpdateAvatarURIEvent,
  UpdateExpireSeconds as UpdateExpireSecondsEvent,
  UpdateRentedSpaceDomainName as UpdateRentedSpaceDomainNameEvent
} from "../generated/Account/Account"
import {
  Account,
  Approval,
  CancelAccount,
  CancelLikeMoment,
  Comment,
  CreateAccount,
  CreateComment,
  CreateMoment,
  CreateSubSpaceDomain,
  Initialized,
  LikeMoment,
  Moment,
  OwnershipTransferred,
  RemoveComment,
  RemoveMoment,
  RentSpace,
  ReturnSpace,
  SetBeneficiary,
  SetMintFee,
  SetSubSpaceDomainLimit,
  SpaceDomain,
  UpdateAvatarURI,
  UpdateExpireSeconds,
  UpdateRentedSpaceDomainName,
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.spaceId = event.params.spaceId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCancelAccount(event: CancelAccountEvent): void {
  let entity = new CancelAccount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.accountId = event.params.accountId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  cancelAccountFunc(event.params.accountId)
}

function cancelAccountFunc(accountId: BigInt): void {
  let account = Account.load(accountId.toHexString())
  if (account) {
    account.accountId = new BigInt(0)
    account.address = new Bytes(0)
    account.avatarURI = ""
    account.save()
  }
}

export function handleCancelLikeMoment(event: CancelLikeMomentEvent): void {
  let entity = new CancelLikeMoment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.accountId = event.params.accountId
  entity.momentId = event.params.momentId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  cancelLikeMomentFunc(event.params.accountId, event.params.momentId)
}

function cancelLikeMomentFunc(accountId: BigInt, momentId: BigInt): void {
  let moment = Moment.load(momentId.toHexString())
  if (moment) {
    const likedAccounts = moment.likedAccounts || []
    likedAccounts.splice(likedAccounts.indexOf(accountId.toHexString()), 1)
    moment.save()
  }
}

export function handleCreateAccount(event: CreateAccountEvent): void {
  let entity = new CreateAccount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.accountId = event.params.accountId
  entity.primarySpaceId = event.params.primarySpaceId
  entity.primaryDomainName = event.params.primaryDomainName.toHexString()
  entity.avatarURI = event.params.avatarURI
  entity.wallet = event.params.wallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  createAccountFunc(
    event.params.accountId,
    event.params.primarySpaceId,
    event.params.primaryDomainName.toHexString(),
    event.params.avatarURI,
    event.params.wallet
  )
}

function createAccountFunc(accountId: BigInt, primarySpaceId: BigInt, primaryDomainName: string, avatarURI: string, wallet: Address): void {
  let account = new Account(accountId.toHexString())
  account.address = wallet
  account.accountId = accountId
  account.avatarURI = avatarURI
  account.save()
  
  let space = new SpaceDomain(primarySpaceId.toHexString())
  space.spaceId = primarySpaceId
  space.domainName = primaryDomainName
  space.primarySpaceId = new BigInt(0)
  space.expireSeconds = new BigInt(0)
  space.account = accountId.toHexString()
  space.save()
}

export function handleCreateComment(event: CreateCommentEvent): void {
  let entity = new CreateComment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.accountId = event.params.accountId
  entity.momentId = event.params.momentId
  entity.commentId = event.params.commentId
  entity.commentText = event.params.commentText

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  createCommentFunc(
    event.params.accountId,
    event.params.momentId,
    event.params.commentId,
    event.params.commentText,
    event.block.timestamp
  )
}

function createCommentFunc(
  accountId: BigInt,
  momentId: BigInt,
  commentId: BigInt,
  commentText: string,
  timestamp: BigInt
): void {
  let comment = new Comment(commentId.toHexString())
  comment.commentId = commentId
  comment.account = accountId.toHexString()
  comment.moment = momentId.toHexString()
  comment.timestamp = timestamp
  comment.text = commentText
  comment.save()
}

export function handleCreateMoment(event: CreateMomentEvent): void {
  let entity = new CreateMoment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.accountId = event.params.accountId
  entity.momentId = event.params.momentId
  entity.metadataURI = event.params.metadataURI

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  createMomentFunc(
    event.params.accountId,
    event.params.momentId,
    event.params.metadataURI,
    event.block.timestamp
  )
}

function createMomentFunc(
  accountId: BigInt,
  momentId: BigInt,
  metadataURI: string,
  timestamp: BigInt
): void {
  let moment = new Moment(momentId.toHexString())
  moment.momentId = momentId
  moment.account = accountId.toHexString()
  moment.likedAccounts = []
  moment.timestamp = timestamp
  moment.metadataURI = metadataURI
  moment.save()
}

export function handleCreateSubSpaceDomain(
  event: CreateSubSpaceDomainEvent
): void {
  let entity = new CreateSubSpaceDomain(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.primarySpaceId = event.params.primarySpaceId
  entity.subSpaceId = event.params.subSpaceId
  entity.subDomainName = event.params.subDomainName
  entity.expireSeconds = event.params.expireSeconds

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  createSubSpaceDomainFunc(
    event.params.accountId,
    event.params.primarySpaceId,
    event.params.subSpaceId,
    event.params.subDomainName,
    event.params.expireSeconds
  )
}

function createSubSpaceDomainFunc(
  accountId: BigInt,
  primarySpaceId: BigInt,
  subSpaceId: BigInt,
  subDomainName: string,
  expireSeconds: BigInt
): void {
  let space = new SpaceDomain(subSpaceId.toHexString())
  space.account = accountId.toHexString()
  space.spaceId = subSpaceId
  space.domainName = subDomainName
  space.primarySpaceId = primarySpaceId
  space.expireSeconds = expireSeconds
  space.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLikeMoment(event: LikeMomentEvent): void {
  let entity = new LikeMoment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.accountId = event.params.accountId
  entity.momentId = event.params.momentId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  likeMomentFunc(event.params.accountId, event.params.momentId)
}

function likeMomentFunc(accountId: BigInt, momentId: BigInt): void {
  let moment = Moment.load(momentId.toHexString())
  if (moment) {
    moment.likedAccounts.push(accountId.toHexString())
    moment.save()
  }
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRemoveComment(event: RemoveCommentEvent): void {
  let entity = new RemoveComment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.accountId = event.params.accountId
  entity.commentId = event.params.commentId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  removeCommentFunc(event.params.accountId, event.params.commentId)
}

function removeCommentFunc(accountId: BigInt, commentId: BigInt): void {
  let comment = Comment.load(commentId.toHexString())
  if (comment) {
    comment.commentId = new BigInt(0)
    comment.moment = ""
    comment.account = ""
    comment.timestamp = new BigInt(0)
    comment.text = ""
    comment.save()
  }
}

export function handleRemoveMoment(event: RemoveMomentEvent): void {
  let entity = new RemoveMoment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.accountId = event.params.accountId
  entity.momentId = event.params.momentId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  removeMomentFunc(event.params.accountId, event.params.momentId)
}

function removeMomentFunc(accountId: BigInt, momentId: BigInt): void {
  let moment = Moment.load(momentId.toHexString())
  if (moment) {
    moment.momentId = new BigInt(0)
    moment.account = ""
    moment.likedAccounts = []
    moment.metadataURI = ""
    moment.timestamp = new BigInt(0)
    moment.save()
  }
}

export function handleRentSpace(event: RentSpaceEvent): void {
  let entity = new RentSpace(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userId = event.params.userId
  entity.spaceId = event.params.spaceId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  rentSpaceFunc(event.params.userId, event.params.spaceId)
}

function rentSpaceFunc(userId: BigInt, spaceId: BigInt): void {
  let space = SpaceDomain.load(spaceId.toHexString())
  if (space) {
    space.rentAccount = userId.toHexString()
    space.save()
  }
}

export function handleReturnSpace(event: ReturnSpaceEvent): void {
  let entity = new ReturnSpace(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userId = event.params.userId
  entity.spaceId = event.params.spaceId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  returnSpaceFunc(event.params.userId, event.params.spaceId)
}

function returnSpaceFunc(userId: BigInt, spaceId: BigInt): void {
  let space = SpaceDomain.load(spaceId.toHexString())
  if (space) {
    space.rentAccount = ""
    space.save()
  }
}

export function handleSetBeneficiary(event: SetBeneficiaryEvent): void {
  let entity = new SetBeneficiary(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beneficiary = event.params.beneficiary

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetMintFee(event: SetMintFeeEvent): void {
  let entity = new SetMintFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.mintFee = event.params.mintFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetSubSpaceDomainLimit(
  event: SetSubSpaceDomainLimitEvent
): void {
  let entity = new SetSubSpaceDomainLimit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.limit = event.params.limit

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdateAvatarURI(event: UpdateAvatarURIEvent): void {
  let entity = new UpdateAvatarURI(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.accountId = event.params.accountId
  entity.avatarURI = event.params.avatarURI

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  
  updateAvatarURIFunc(event.params.accountId, event.params.avatarURI)
}

function updateAvatarURIFunc(accountId: BigInt, avatarURI: string): void {
  let account = Account.load(accountId.toHexString())
  if (account) {
    account.avatarURI = avatarURI
    account.save()
  }
}

export function handleUpdateExpireSeconds(
  event: UpdateExpireSecondsEvent
): void {
  let entity = new UpdateExpireSeconds(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.spaceId = event.params.spaceId
  entity.expireSeconds = event.params.expireSeconds

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  updateExpireSecondsFunc(event.params.spaceId, event.params.expireSeconds)
}

function updateExpireSecondsFunc(spaceId: BigInt, expireSeconds: BigInt): void {
  let space = SpaceDomain.load(spaceId.toHexString())
  if (space) {
    space.expireSeconds = expireSeconds
    space.save()
  }
}

export function handleUpdateRentedSpaceDomainName(
  event: UpdateRentedSpaceDomainNameEvent
): void {
  let entity = new UpdateRentedSpaceDomainName(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.spaceId = event.params.spaceId
  entity.domainName = event.params.domainName

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  updateRentedSpaceDomainNameFunc(event.params.spaceId, event.params.domainName)
}

function updateRentedSpaceDomainNameFunc(spaceId: BigInt, domainName: string): void {
  let space = SpaceDomain.load(spaceId.toHexString())
  if (space) {
    space.domainName = domainName
    space.save()
  }
}