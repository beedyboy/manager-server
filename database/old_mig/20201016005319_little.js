exports.up = function (knex) {
    return knex.schema
  
    .alterTable("customers", function (t) {
        t.string("fullname", 50).notNullable().alter();
        t.string("email", 100).notNullable().alter();
      })
  
      .alterTable("staffs", function (t) {
        t.string("email", 100).nullable().alter();
      });
  };
  
  exports.down = function (knex) {};
  