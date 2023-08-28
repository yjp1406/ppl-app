const db = require("../config/db");
const queries = require("../config/queries");

const checkDb = async (req, res) => {
  const dbInstance = await db.getInstance();
  try {
    const result = await dbInstance.query(queries.checkDbInstance());
    res.send({ data: result.rows });
  } catch (error) {
    res.status(400).send({ data: [] });
  } finally {
    dbInstance.release();
  }
};

module.exports = { checkDb };

