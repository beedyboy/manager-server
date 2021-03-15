exports.up = function (knex) {
  return knex.schema

   
    .alterTable("stocks", function (t) {
      t.float("quantity").notNullable().alter();
      t.float("price").notNullable().alter();
    })

    .alterTable("assets", function (t) {
      t.float("purchased_price").nullable().alter();
    })

    .alterTable("orders", function (t) {
      t.float("quantity").notNullable().alter();
      t.float("discount").nullable().alter();
      t.float("item_price").notNullable().alter();
      t.float("sold_price").notNullable().alter();
    })

    .raw(
      `
    ALTER TABLE "sales" DROP  CONSTRAINT "sales_status_check";
    ALTER TABLE "sales" ADD  CONSTRAINT "sales_status_check" CHECK (status IN ('PAID'::text, 'UNPAID'::text, 'CANCELLED'::text));
  `
    )

    .alterTable("sales", function (t) {
      t.float("total").notNullable().alter();
    });
};

exports.down = function (knex) {};
