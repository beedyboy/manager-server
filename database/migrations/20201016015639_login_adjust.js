exports.up = function (knex) {
    return knex.schema
  
    .alterTable("customers", function (t) {
        t.string("fullname", 50).notNullable().alter();
        t.string("email", 100).notNullable().alter();
      })

      .alterTable("company", function (t) {
        t.string("companyname", 100).nullable().alter();
        t.string("email", 100).nullable().alter();
      })

      .alterTable("tickets", function (t) {
        t.string("email", 100).nullable().alter();
      })
  
      .alterTable("logins", function (t) {
        t.string("email", 100).nullable().alter();
      })

        .alterTable("staffs", function (t) {
        t.string("firstname", 100).nullable().alter();
        t.string("lastname", 100).nullable().alter();
        t.string("address", 200).nullable().alter();
        t.string("emergency_contact", 200).nullable().alter();
      });
  };
  
  exports.down = function (knex) {};
  