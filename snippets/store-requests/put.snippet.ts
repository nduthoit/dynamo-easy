import { DynamoStore } from '@shiftcoders/dynamo-easy'
import { Person } from '../models'

const objectToPut: Person = {
  id: 'vogelsw',
  name: 'Werner Hans Peter Vogels',
  yearOfBirth: 1958,
}

new DynamoStore(Person)
  .put(objectToPut)
  .ifNotExists()
  .exec()
  .then(() => console.log('done'))
