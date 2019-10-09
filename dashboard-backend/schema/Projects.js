cube(`Projects`, {
  sql: `SELECT * FROM projects`,

  measures: {
    count: {
      sql: `id`,
      type: `count`
    }
  },

  dimensions: {
    name: {
      sql: `title`,
      type: `string`
    }
  }
});
