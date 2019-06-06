var express = require('express');
var router = express.Router();

router.post("/create", async function (req, res) {
  let message;

  try {
    const data = await service.createTable();
    console.log(
      "Create table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
    message = "アンケートテーブルを作成しました";
  } catch (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
    message = "アンケートテーブルを作成できませんでした";
  }

  res.send({
    Message: message
  });
});

router.post("/drop", async function (req, res) {
  let message;

  try {
    const data = await service.dropTable();
    console.log(
      "Drop table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
    message = "アンケートテーブルを削除しました";
  } catch (err) {
    console.error(
      "Unable to drop table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
    message = "アンケートテーブルを削除できませんでした";
  }

  res.send({
    Message: message
  });
});

router.post("/save", async function (req, res) {
  let message;

  try {
    const info = params(req);
    const data = await service.saveInfo(info);
    console.log(
      "Save table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
    message = "アンケートを送信しました";
  } catch (err) {
    console.error(
      "Unable to save table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
    message = "アンケートを送信できませんでした";
  }

  res.send({
    Message: message
  });
});

router.get('/all', async (req, res) => {
  let data = {Items: []};
  try {
    data = await service.getAllContact();
  } catch (err) {
    console.error("Unable to get. Error JSON:", JSON.stringify(err, null, 2));
    data = 'アンケート一覧を取得できませんでした';
  }
  res.send({
    Data: data
  });
});

const params = req => {
  return {
    name: req.body.name,
    gender: req.body.gender,
    job: req.body.job,
    impression: req.body.impression,
    trigger: req.body.trigger,
    nextevent: req.body.nextevent,
    message: req.body.message
  };
};

module.exports = router;

const name = "Survey";
const v4 = require("uuid/v4");

const model = {
  schema: {
    TableName: name,
    KeySchema: [
      {AttributeName: "id", KeyType: "HASH"},
      {AttributeName: "name", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
      {AttributeName: "id", AttributeType: "S"},
      {AttributeName: "name", AttributeType: "S"}
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  },

  create: info => {
    return {
      TableName: name,
      Item: {
        id: v4(),
        name: info.name,
        gender: info.gender,
        job: info.job,
        impression: info.impression,
        trigger: info.trigger,
        nextevent: info.nextevent,
        message: info.message
      }
    }
  },
};

const service = {
  createTable: async () => {
    await repository.create(model);
  },

  dropTable: async () => {
    await repository.drop(model);
  },

  saveInfo: async info => {
    return await repository.save(model,info);
  },

  getAllContact: async () => {
    return await repository.selectAll({TableName: model.schema.TableName});
  }
};

const config = require("../appConfigDynamodb");

const repository = {
  create: async function (model) {
    const AWS = config.configAws();
    const dynamodb = new AWS.DynamoDB();
    console.log("Creating a table...");
    return await dynamodb.createTable(model.schema).promise();
  },

  drop: async function (model) {
    const AWS = config.configAws();
    const dynamodb = new AWS.DynamoDB();
    console.log("Dropping a table...");
    return await dynamodb
      .deleteTable({TableName: model.schema.TableName})
      .promise();
  },

  save: async function (model, info) {
    const AWS = config.configAws();
    const dynamodbClient = new AWS.DynamoDB.DocumentClient();
    const params = model.create(info);
    console.log("Adding a new item...");
    return await dynamodbClient.put(params).promise();
  },

  selectAll: async function (params) {
    const AWS = config.configAws();
    const dynamodbClient = new AWS.DynamoDB.DocumentClient();
    console.log("Scanning table.");
    let data;
    data = await dynamodbClient.scan(params).promise();
    // continue scanning if we have more movies, because
    // scan can retrieve a maximum of 1MB of data
    if (typeof data.LastEvaluatedKey != "undefined") {
      console.log("Scanning for more...");
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      data = await dynamodbClient.scan(params).promise();
    }
    return data;
  }
};