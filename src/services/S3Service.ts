import { S3 } from 'aws-sdk';
import { AWSError } from 'aws-sdk/lib/error';
import { GetObjectOutput } from 'aws-sdk/clients/s3';

type S3Error = AWSError;
const AWS = require('aws-sdk');

class S3Service {
    private s3: S3;
  constructor() {
    this.s3 = new AWS.S3(); 
  }

  async getObject(params: S3.GetObjectRequest): Promise<GetObjectOutput> {
    try {
      const data: GetObjectOutput = await this.s3.getObject(params).promise();
      return data;
    } catch (error : any) {
      throw new Error('S3 getObject 실패: ' + error.message) as S3Error;
    }
  }

}

module.exports = S3Service;