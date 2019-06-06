const supertest = require('supertest');
const test = require('unit.js');
const app = require('../app.js');
const request = supertest(app);
const AWS = require("aws-sdk");
const AWSMock = require('aws-sdk-mock');

describe('Tests Survey', function() {
  const info = {
    name: "広島フロントエンド勉強会 Vol.XX",
    gender: "男",
    job: "会社員",
    impression: "良い",
    trigger: "SNS 口コミ",
    nextevent: "テスト駆動開発から始めるXXX",
    message: "お疲れちゃんです"
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

    it('アンケートテーブルを作る', function (done) {
      request.post('/api/survey/create').expect(200).end(function (err, result) {
        test.string(result.body.Message).contains('アンケートテーブルを作成しました');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
      });
    });

    it('アンケート内容を送信する', function (done) {
      request.post('/api/survey/save').send(info).expect(200).end(function (err, result) {
        test.string(result.body.Message).contains('アンケートを送信しました');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
      });
    });

    it('アンケート内容を取得する', function (done) {
      request.get('/api/survey/all').expect(200).end(function(err, result) {
        test.string(result.body.Data.Items[0].name).contains('広島フロントエンド勉強会 Vol.XX');
        test.string(result.body.Data.Items[0].gender).contains('男');
        test.string(result.body.Data.Items[0].job).contains('会社員');
        test.string(result.body.Data.Items[0].impression).contains('良い');
        test.string(result.body.Data.Items[0].nextevent).contains('テスト駆動開発から始めるXXX');
        test.string(result.body.Data.Items[0].message).contains('お疲れちゃんです');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
      });
    });

    it('アンケートテーブルを削除する', function (done) {
      request.post('/api/survey/drop').expect(200).end(function(err, result) {
        test.string(result.body.Message).contains('アンケートテーブルを削除しました');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
      });
    });
  });
});