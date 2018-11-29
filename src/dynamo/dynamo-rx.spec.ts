// tslint:disable:no-empty
// tslint:disable:no-unnecessary-callback-wrapper

import { Config, Credentials, DynamoDB } from 'aws-sdk'
import { EMPTY, Observable } from 'rxjs'
import { DEFAULT_SESSION_VALIDITY_ENSURER } from './default-session-validity-ensurer.const'
import { DynamoRx } from './dynamo-rx'
import { SessionValidityEnsurer } from './session-validity-ensurer.type'

describe('dynamo rx', () => {
  
  describe('should call the validity ensurer before each call and return an observable', () => {
    let dynamoRx: DynamoRx
    let spyValidityEnsurer: SessionValidityEnsurer

    beforeEach(() => {
      spyValidityEnsurer = jasmine.createSpy().and.returnValue(EMPTY)
      dynamoRx = new DynamoRx(spyValidityEnsurer)
    })

    it('putItem', () => {
      expect(dynamoRx.putItem(<any>null) instanceof Observable).toBeTruthy()
      expect(spyValidityEnsurer).toHaveBeenCalled()
    })
    it('getItem', () => {
      expect(dynamoRx.getItem(<any>null) instanceof Observable).toBeTruthy()
      expect(spyValidityEnsurer).toHaveBeenCalled()
    })
    it('updateItem', () => {
      expect(dynamoRx.updateItem(<any>null) instanceof Observable).toBeTruthy()
      expect(spyValidityEnsurer).toHaveBeenCalled()
    })
    it('deleteItem', () => {
      expect(dynamoRx.deleteItem(<any>null) instanceof Observable).toBeTruthy()
      expect(spyValidityEnsurer).toHaveBeenCalled()
    })
    it('batchWriteItem', () => {
      expect(dynamoRx.batchWriteItem(<any>null) instanceof Observable).toBeTruthy()
      expect(spyValidityEnsurer).toHaveBeenCalled()
    })
    it('batchGetItems', () => {
      expect(dynamoRx.batchGetItems(<any>null) instanceof Observable).toBeTruthy()
      expect(spyValidityEnsurer).toHaveBeenCalled()
    })
    it('scan', () => {
      expect(dynamoRx.scan(<any>null) instanceof Observable).toBeTruthy()
      expect(spyValidityEnsurer).toHaveBeenCalled()
    })
    it('query', () => {
      const params: DynamoDB.QueryInput = {
        TableName: 'tableName',
      }
      expect(dynamoRx.query({ ...params, KeyConditionExpression: 'blub' }) instanceof Observable).toBeTruthy()
      expect(spyValidityEnsurer).toHaveBeenCalled()
      expect(() => dynamoRx.query(params)).toThrow()
    })
    it('makeRequest', () => {
      expect(dynamoRx.makeRequest(<any>null) instanceof Observable).toBeTruthy()
      expect(spyValidityEnsurer).toHaveBeenCalled()
    })
  })

  it('should call makeRequest with the given params', async () => {
    const dynamoRx = new DynamoRx(DEFAULT_SESSION_VALIDITY_ENSURER)
    const makeRequest = jasmine.createSpy().and.returnValue({ promise: () => Promise.resolve(null) })
    Object.assign(dynamoRx, { dynamoDb: { makeRequest } })

    await dynamoRx.makeRequest(<any>{ ok: true }).toPromise()
    expect(makeRequest).toHaveBeenCalled()
    expect(makeRequest.calls.mostRecent().args[0]).toEqual({ ok: true })
  })

  it('should update the credentials', () => {
    const dynamoRx = new DynamoRx(DEFAULT_SESSION_VALIDITY_ENSURER)
    const credentials = new Credentials({ secretAccessKey: '', sessionToken: '', accessKeyId: '' })
    dynamoRx.updateAwsConfigCredentials(new Config({ credentials }))
    expect(dynamoRx.dynamoDb.config.credentials).toBe(credentials)
  })

  xit('should use the given aws region', () => {})

})
