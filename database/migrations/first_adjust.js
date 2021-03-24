exports.up = function (knex) {
    return knex.schema
  
    .table("leave_applications", function (t) {
        t.string("days", 20);
      })

      
  };
  
  exports.down = function (knex) {};
  