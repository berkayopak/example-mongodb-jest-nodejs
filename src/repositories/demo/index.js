const {client} = require('../../providers/mongodb');
const config = require('../../config');

const collectionName = 'records';

exports.demoPost = async function (startDate, endDate, minCount, maxCount) {
  const dbName = config.mongoDb.dbName;
  const collection = client.db(dbName).collection(collectionName);

  const documents = await collection
    .aggregate([
      {
        $unset: ["_id"]
      },
      {
        $project: {
          key: 1,
          createdAt: 1,
          totalCount: {$sum: "$counts"}
        }
      },
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lt: new Date(endDate)
          },
          totalCount: {
            $gte: minCount,
            $lt: maxCount
          }
        }
      }
    ]).toArray();

  return documents;
};
