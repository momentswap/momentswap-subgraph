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
  SpaceDomain,
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

  let item = new Item(
    event.params.accountContract.toHexString().concat("-").concat(event.params.spaceId.toString())
  )
  item.seller = event.params.seller
  item.accountContract = event.params.accountContract
  item.spaceDoamin = event.params.spaceId.toString()
  item.price = event.params.price
  item.status = "LISTED"
  item.save()
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

  let item = Item.load(
    event.params.accountContract.toHexString().concat("-").concat(event.params.spaceId.toString())
    )
  if (item) {
      item.status = "RENTED"
      item.save()
  }
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

    let item = Item.load(
      event.params.accountContract.toHexString().concat("-").concat(event.params.spaceId.toString())
    )
    if (item) {
        item.status = "CANCELED"
        item.save()
    }
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

  let item = Item.load(
    event.params.accountContract.toHexString().concat("-").concat(event.params.spaceId.toString())
  )
  if (item == null) { return }
  item.price = event.params.newPrice
  item.save()

  let spaceDomain = SpaceDomain.load(item.spaceDoamin.toString())
  if (spaceDomain == null) { return }
  spaceDomain.expireSeconds = event.params.expireSeconds
  spaceDomain.save()
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