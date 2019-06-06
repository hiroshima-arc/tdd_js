const supertest = require('supertest');
const test = require('unit.js');
const app = require('../app.js');
const request = supertest(app);
const AWS = require("aws-sdk");
const AWSMock = require('aws-sdk-mock');

describe('Tests Hello', function() {
  const info = {
    name: "こんにちは世界"
  };

  describe('router', function() {
    before(() => {
      AWSMock.setSDKInstance(AWS);
      AWSMock.mock('DynamoDB', 'createTable', function (params, callback){
        callback(null, "successfully create table in database");
      });
      AWSMock.mock('DynamoDB', 'deleteTable', function (params, callback){
        callback(null, "successfully drop table in database");
      });
      AWSMock.mock('DynamoDB.DocumentClient', 'put', info);
      AWSMock.mock("DynamoDB.DocumentClient", "scan", function(params, callback) {
        callback(null, { Items: [info] });
      });
    });

    it('getメソッドであいさつをJSON形式で返す', function(done) {
      request.get('/api/hello').expect(200).end(function(err, result) {
        test.string(result.body.Output).contains('Hello');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
      });
    });

    it('postメソッドであいさつをJSON形式で返す', function(done) {
      request.post('/api/hello').expect(200).end(function(err, result) {
        test.string(result.body.Output).contains('Hello');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
      });
    });

    it('あいさつテーブルを作る', function (done) {
      request.post('/api/hello/create').expect(200).end(function (err, result) {
        test.string(result.body.Message).contains('あいさつテーブルを作成しました');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
      });
    });

    it('あいさつ内容を送信する', function (done) {
      request.post('/api/hello/save').send(info).expect(200).end(function (err, result) {
        test.string(result.body.Message).contains('あいさつを送信しました');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
      });
    });

    it('あいさつ内容を取得する', function (done) {
      request.get('/api/hello/all').expect(200).end(function(err, result) {
        test.string(result.body.Data.Items[0].name).contains('こんにちは世界');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
      });
    });

    it('あいさつテーブルを削除する', function (done) {
      request.post('/api/hello/drop').expect(200).end(function(err, result) {
        test.string(result.body.Message).contains('あいさつテーブルを削除しました');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
      });
    });
  });
});