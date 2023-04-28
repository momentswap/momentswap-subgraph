import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  CancelAccount,
  CancelLikeMoment,
  CreateAccount,
  CreateComment,
  CreateMoment,
  CreateSubSpaceDomain,
  Initialized,
  LikeMoment,
  OwnershipTransferred,
  RemoveComment,
  RemoveMoment,
  RentSpace,
  ReturnSpace,
  SetBeneficiary,
  SetMintFee,
  SetSubSpaceDomainLimit,
  UpdateAvatarURI,
  UpdateExpireSeconds,
  UpdateRentedSpaceDomainName
} from "../generated/Account/Account"

export function createApprovalEvent(
  owner: Address,
  operator: Address,
  spaceId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "spaceId",
      ethereum.Value.fromUnsignedBigInt(spaceId)
    )
  )

  return approvalEvent
}

export function createCancelAccountEvent(accountId: BigInt): CancelAccount {
  let cancelAccountEvent = changetype<CancelAccount>(newMockEvent())

  cancelAccountEvent.parameters = new Array()

  cancelAccountEvent.parameters.push(
    new ethereum.EventParam(
      "accountId",
      ethereum.Value.fromUnsignedBigInt(accountId)
    )
  )

  return cancelAccountEvent
}

export function createCancelLikeMomentEvent(
  accountId: BigInt,
  momentId: BigInt
): CancelLikeMoment {
  let cancelLikeMomentEvent = changetype<CancelLikeMoment>(newMockEvent())

  cancelLikeMomentEvent.parameters = new Array()

  cancelLikeMomentEvent.parameters.push(
    new ethereum.EventParam(
      "accountId",
      ethereum.Value.fromUnsignedBigInt(accountId)
    )
  )
  cancelLikeMomentEvent.parameters.push(
    new ethereum.EventParam(
      "momentId",
      ethereum.Value.fromUnsignedBigInt(momentId)
    )
  )

  return cancelLikeMomentEvent
}

export function createCreateAccountEvent(
  accountId: BigInt,
  primarySpaceId: BigInt,
  primaryDomainName: string,
  avatarURI: string,
  wallet: Address
): CreateAccount {
  let createAccountEvent = changetype<CreateAccount>(newMockEvent())

  createAccountEvent.parameters = new Array()

  createAccountEvent.parameters.push(
    new ethereum.EventParam(
      "accountId",
      ethereum.Value.fromUnsignedBigInt(accountId)
    )
  )
  createAccountEvent.parameters.push(
    new ethereum.EventParam(
      "primarySpaceId",
      ethereum.Value.fromUnsignedBigInt(primarySpaceId)
    )
  )
  createAccountEvent.parameters.push(
    new ethereum.EventParam(
      "primaryDomainName",
      ethereum.Value.fromString(primaryDomainName)
    )
  )
  createAccountEvent.parameters.push(
    new ethereum.EventParam("avatarURI", ethereum.Value.fromString(avatarURI))
  )
  createAccountEvent.parameters.push(
    new ethereum.EventParam("wallet", ethereum.Value.fromAddress(wallet))
  )

  return createAccountEvent
}

export function createCreateCommentEvent(
  accountId: BigInt,
  momentId: BigInt,
  commentId: BigInt,
  commentText: string
): CreateComment {
  let createCommentEvent = changetype<CreateComment>(newMockEvent())

  createCommentEvent.parameters = new Array()

  createCommentEvent.parameters.push(
    new ethereum.EventParam(
      "accountId",
      ethereum.Value.fromUnsignedBigInt(accountId)
    )
  )
  createCommentEvent.parameters.push(
    new ethereum.EventParam(
      "momentId",
      ethereum.Value.fromUnsignedBigInt(momentId)
    )
  )
  createCommentEvent.parameters.push(
    new ethereum.EventParam(
      "commentId",
      ethereum.Value.fromUnsignedBigInt(commentId)
    )
  )
  createCommentEvent.parameters.push(
    new ethereum.EventParam(
      "commentText",
      ethereum.Value.fromString(commentText)
    )
  )

  return createCommentEvent
}

export function createCreateMomentEvent(
  accountId: BigInt,
  momentId: BigInt,
  metadataURI: string
): CreateMoment {
  let createMomentEvent = changetype<CreateMoment>(newMockEvent())

  createMomentEvent.parameters = new Array()

  createMomentEvent.parameters.push(
    new ethereum.EventParam(
      "accountId",
      ethereum.Value.fromUnsignedBigInt(accountId)
    )
  )
  createMomentEvent.parameters.push(
    new ethereum.EventParam(
      "momentId",
      ethereum.Value.fromUnsignedBigInt(momentId)
    )
  )
  createMomentEvent.parameters.push(
    new ethereum.EventParam(
      "metadataURI",
      ethereum.Value.fromString(metadataURI)
    )
  )

  return createMomentEvent
}

export function createCreateSubSpaceDomainEvent(
  primarySpaceId: BigInt,
  subSpaceId: BigInt,
  subDomainName: string,
  expireSeconds: BigInt
): CreateSubSpaceDomain {
  let createSubSpaceDomainEvent = changetype<CreateSubSpaceDomain>(
    newMockEvent()
  )

  createSubSpaceDomainEvent.parameters = new Array()

  createSubSpaceDomainEvent.parameters.push(
    new ethereum.EventParam(
      "primarySpaceId",
      ethereum.Value.fromUnsignedBigInt(primarySpaceId)
    )
  )
  createSubSpaceDomainEvent.parameters.push(
    new ethereum.EventParam(
      "subSpaceId",
      ethereum.Value.fromUnsignedBigInt(subSpaceId)
    )
  )
  createSubSpaceDomainEvent.parameters.push(
    new ethereum.EventParam(
      "subDomainName",
      ethereum.Value.fromString(subDomainName)
    )
  )
  createSubSpaceDomainEvent.parameters.push(
    new ethereum.EventParam(
      "expireSeconds",
      ethereum.Value.fromUnsignedBigInt(expireSeconds)
    )
  )

  return createSubSpaceDomainEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createLikeMomentEvent(
  accountId: BigInt,
  momentId: BigInt
): LikeMoment {
  let likeMomentEvent = changetype<LikeMoment>(newMockEvent())

  likeMomentEvent.parameters = new Array()

  likeMomentEvent.parameters.push(
    new ethereum.EventParam(
      "accountId",
      ethereum.Value.fromUnsignedBigInt(accountId)
    )
  )
  likeMomentEvent.parameters.push(
    new ethereum.EventParam(
      "momentId",
      ethereum.Value.fromUnsignedBigInt(momentId)
    )
  )

  return likeMomentEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRemoveCommentEvent(
  accountId: BigInt,
  commentId: BigInt
): RemoveComment {
  let removeCommentEvent = changetype<RemoveComment>(newMockEvent())

  removeCommentEvent.parameters = new Array()

  removeCommentEvent.parameters.push(
    new ethereum.EventParam(
      "accountId",
      ethereum.Value.fromUnsignedBigInt(accountId)
    )
  )
  removeCommentEvent.parameters.push(
    new ethereum.EventParam(
      "commentId",
      ethereum.Value.fromUnsignedBigInt(commentId)
    )
  )

  return removeCommentEvent
}

export function createRemoveMomentEvent(
  accountId: BigInt,
  momentId: BigInt
): RemoveMoment {
  let removeMomentEvent = changetype<RemoveMoment>(newMockEvent())

  removeMomentEvent.parameters = new Array()

  removeMomentEvent.parameters.push(
    new ethereum.EventParam(
      "accountId",
      ethereum.Value.fromUnsignedBigInt(accountId)
    )
  )
  removeMomentEvent.parameters.push(
    new ethereum.EventParam(
      "momentId",
      ethereum.Value.fromUnsignedBigInt(momentId)
    )
  )

  return removeMomentEvent
}

export function createRentSpaceEvent(
  userId: BigInt,
  spaceId: BigInt
): RentSpace {
  let rentSpaceEvent = changetype<RentSpace>(newMockEvent())

  rentSpaceEvent.parameters = new Array()

  rentSpaceEvent.parameters.push(
    new ethereum.EventParam("userId", ethereum.Value.fromUnsignedBigInt(userId))
  )
  rentSpaceEvent.parameters.push(
    new ethereum.EventParam(
      "spaceId",
      ethereum.Value.fromUnsignedBigInt(spaceId)
    )
  )

  return rentSpaceEvent
}

export function createReturnSpaceEvent(
  userId: BigInt,
  spaceId: BigInt
): ReturnSpace {
  let returnSpaceEvent = changetype<ReturnSpace>(newMockEvent())

  returnSpaceEvent.parameters = new Array()

  returnSpaceEvent.parameters.push(
    new ethereum.EventParam("userId", ethereum.Value.fromUnsignedBigInt(userId))
  )
  returnSpaceEvent.parameters.push(
    new ethereum.EventParam(
      "spaceId",
      ethereum.Value.fromUnsignedBigInt(spaceId)
    )
  )

  return returnSpaceEvent
}

export function createSetBeneficiaryEvent(
  beneficiary: Address
): SetBeneficiary {
  let setBeneficiaryEvent = changetype<SetBeneficiary>(newMockEvent())

  setBeneficiaryEvent.parameters = new Array()

  setBeneficiaryEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )

  return setBeneficiaryEvent
}

export function createSetMintFeeEvent(mintFee: BigInt): SetMintFee {
  let setMintFeeEvent = changetype<SetMintFee>(newMockEvent())

  setMintFeeEvent.parameters = new Array()

  setMintFeeEvent.parameters.push(
    new ethereum.EventParam(
      "mintFee",
      ethereum.Value.fromUnsignedBigInt(mintFee)
    )
  )

  return setMintFeeEvent
}

export function createSetSubSpaceDomainLimitEvent(
  limit: BigInt
): SetSubSpaceDomainLimit {
  let setSubSpaceDomainLimitEvent = changetype<SetSubSpaceDomainLimit>(
    newMockEvent()
  )

  setSubSpaceDomainLimitEvent.parameters = new Array()

  setSubSpaceDomainLimitEvent.parameters.push(
    new ethereum.EventParam("limit", ethereum.Value.fromUnsignedBigInt(limit))
  )

  return setSubSpaceDomainLimitEvent
}

export function createUpdateAvatarURIEvent(
  accountId: BigInt,
  avatarURI: string
): UpdateAvatarURI {
  let updateAvatarUriEvent = changetype<UpdateAvatarURI>(newMockEvent())

  updateAvatarUriEvent.parameters = new Array()

  updateAvatarUriEvent.parameters.push(
    new ethereum.EventParam(
      "accountId",
      ethereum.Value.fromUnsignedBigInt(accountId)
    )
  )
  updateAvatarUriEvent.parameters.push(
    new ethereum.EventParam("avatarURI", ethereum.Value.fromString(avatarURI))
  )

  return updateAvatarUriEvent
}

export function createUpdateExpireSecondsEvent(
  spaceId: BigInt,
  expireSeconds: BigInt
): UpdateExpireSeconds {
  let updateExpireSecondsEvent = changetype<UpdateExpireSeconds>(newMockEvent())

  updateExpireSecondsEvent.parameters = new Array()

  updateExpireSecondsEvent.parameters.push(
    new ethereum.EventParam(
      "spaceId",
      ethereum.Value.fromUnsignedBigInt(spaceId)
    )
  )
  updateExpireSecondsEvent.parameters.push(
    new ethereum.EventParam(
      "expireSeconds",
      ethereum.Value.fromUnsignedBigInt(expireSeconds)
    )
  )

  return updateExpireSecondsEvent
}

export function createUpdateRentedSpaceDomainNameEvent(
  spaceId: BigInt,
  domainName: string
): UpdateRentedSpaceDomainName {
  let updateRentedSpaceDomainNameEvent = changetype<
    UpdateRentedSpaceDomainName
  >(newMockEvent())

  updateRentedSpaceDomainNameEvent.parameters = new Array()

  updateRentedSpaceDomainNameEvent.parameters.push(
    new ethereum.EventParam(
      "spaceId",
      ethereum.Value.fromUnsignedBigInt(spaceId)
    )
  )
  updateRentedSpaceDomainNameEvent.parameters.push(
    new ethereum.EventParam("domainName", ethereum.Value.fromString(domainName))
  )

  return updateRentedSpaceDomainNameEvent
}
