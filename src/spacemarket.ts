import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  List as ListEvent,
  Rent as RentEvent,
  Revoke as RevokeEvent,
  Update as UpdateEvent,
  WithdrawRent as WithdrawRentEvent,
} from "../generated/SpaceMarket/SpaceMarket"
import {
  Item,
  List,
  Rent,
  Revoke,
  Update,
  WithdrawRent,
} from "../generated/schema"

export function handleList(event: ListEvent): void {
  let entity = new List(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.seller = event.params.seller
  entity.accountContract = event.params.accountContract
  entity.spaceId = event.params.spaceId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  listFunc(event.params.seller, event.params.accountContract, event.params.spaceId, event.params.price)
}

export function handleRent(event: RentEvent): void {
  let entity = new Rent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.buyer = event.params.buyer
  entity.accountContract = event.params.accountContract
  entity.spaceId = event.params.spaceId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  rentFunc(event.params.buyer, event.params.accountContract, event.params.spaceId, event.params.price)
}

export function handleRevoke(event: RevokeEvent): void {
    let entity = new Revoke(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.seller = event.params.seller
    entity.accountContract = event.params.accountContract
    entity.spaceId = event.params.spaceId
  
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
  
    entity.save()
    revokeFunc(event.params.seller, event.params.accountContract, event.params.spaceId)
  }

export function handleUpdate(event: UpdateEvent): void {
  let entity = new Update(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.seller = event.params.seller
  entity.accountContract = event.params.accountContract
  entity.spaceId = event.params.spaceId
  entity.expireSeconds = event.params.expireSeconds
  entity.newPrice = event.params.newPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  updateFunc(event.params.seller, event.params.accountContract, event.params.spaceId, event.params.expireSeconds, event.params.newPrice)
}

export function handleWithdrawRent(event: WithdrawRentEvent): void {
  let entity = new WithdrawRent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

function listFunc(seller: Address, accountContract: Address, spaceId: BigInt, price: BigInt): void {
    let item = new Item(spaceId.toHexString())
    item.spaceId = spaceId
    item.seller = seller
    item.accountContract = accountContract
    item.price = price
    item.save()
}

function rentFunc(buyer: Address, accountContract: Address, spaceId: BigInt, price: BigInt): void {
    let item = Item.load(spaceId.toHexString())
    if (item) {
        item.spaceId = new BigInt(0)
        item.seller = new Bytes(0)
        item.accountContract = new Bytes(0)
        item.price = new BigInt(0)
        item.save()
    }
}

function revokeFunc(seller: Address, accountContract: Address, spaceId: BigInt): void {
    let item = Item.load(spaceId.toHexString())
    if (item) {
        item.spaceId = new BigInt(0)
        item.seller = new Bytes(0)
        item.accountContract = new Bytes(0)
        item.price = new BigInt(0)
        item.id = ""
        item.save()
    }
}

function updateFunc(seller: Address, accountContract: Address, spaceId: BigInt, expireSeconds: BigInt, newPrice: BigInt): void {
    let item = Item.load(spaceId.toHexString())
    if (item) {
        item.price = newPrice
        item.save()
    }
}

