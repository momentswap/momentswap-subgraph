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
  MomentLikeRecord,
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
  let account = Account.load(accountId.toString())
  if (account) {
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
  let entity = MomentLikeRecord.load(accountId.toString().concat("-").concat(momentId.toString()))
  if (entity) {
    entity.account = null
    entity.moment = null
    entity.save()
  }
}

export function handleCreateAccount(event: CreateAccountEvent): void {
  let entity = new CreateAccount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.accountId = event.params.accountId
  entity.primarySpaceId = event.params.primarySpaceId
  entity.primaryDomainName = event.params.primaryDomainName,
  entity.avatarURI = event.params.avatarURI
  entity.wallet = event.params.wallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()

  createAccountFunc(
    event.params.accountId,
    event.params.primarySpaceId,
    event.params.primaryDomainName,
    event.params.avatarURI,
    event.params.wallet
  )
}

function createAccountFunc(accountId: BigInt, primarySpaceId: BigInt, primaryDomainName: string, avatarURI: string, wallet: Address): void {
  let account = new Account(accountId.toString())
  account.address = wallet
  account.avatarURI = avatarURI
  account.save()

  let space = new SpaceDomain(primarySpaceId.toString())
  space.domainName = primaryDomainName
  space.primarySpaceDomain = null
  space.expireSeconds = new BigInt(0)
  space.creator = accountId.toString()
  space.save()
}

export function handleCreateComment(event: CreateCommentEvent): void {
  let entity = new CreateComment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.commentId = event.params.commentId
  entity.accountId = event.params.accountId
  entity.momentId = event.params.momentId
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
  let comment = new Comment(commentId.toString())
  comment.account = accountId.toString()
  comment.moment = momentId.toString()
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
  let moment = new Moment(momentId.toString())
  moment.account = accountId.toString()
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
  let space = new SpaceDomain(subSpaceId.toString())
  space.creator = accountId.toString()
  space.domainName = subDomainName
  space.primarySpaceDomain = primarySpaceId.toString()
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

  entity.account = event.params.accountId.toString()
  entity.moment = event.params.momentId.toString()

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  momentLikeRecordFunc( event.params.accountId,  event.params.momentId)
}

function momentLikeRecordFunc(accountId: BigInt, momentId: BigInt): void {
  let entity = MomentLikeRecord.load(accountId.toString().concat("-").concat(momentId.toString()))
  if (entity == null) {
    entity = new MomentLikeRecord(
      accountId.toString().concat("-").concat(momentId.toString())
    )
  }

  entity.account =  accountId.toString()
  entity.moment = momentId.toString()
  entity.save()
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
  removeCommentFunc(event.params.commentId)
}

function removeCommentFunc(commentId: BigInt): void {
  let comment = Comment.load(commentId.toString())
  if (comment) {
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
  removeMomentFunc(event.params.momentId)
}

function removeMomentFunc(momentId: BigInt): void {
  let moment = Moment.load(momentId.toString())
  if (moment) {
    moment.account = ""
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
  let space = SpaceDomain.load(spaceId.toString())
  if (space) {
    space.user = userId.toString()
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
  returnSpaceFunc(event.params.spaceId)
}

function returnSpaceFunc(spaceId: BigInt): void {
  let space = SpaceDomain.load(spaceId.toString())
  if (space) {
    space.user = null
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
  let account = Account.load(accountId.toString())
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
  let space = SpaceDomain.load(spaceId.toString())
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
  let space = SpaceDomain.load(spaceId.toString())
  if (space) {
    space.domainName = domainName
    space.save()
  }
}