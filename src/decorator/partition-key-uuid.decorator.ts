import { initOrUpdateProperty } from './property.decorator'

export function PartitionKeyUUID(): PropertyDecorator {
  return function(target: Object, propertyKey: string) {
    initOrUpdateProperty({ key: { type: 'HASH', uuid: true } }, target, propertyKey)
  }
}