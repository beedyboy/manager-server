
exports.up = function(knex) {
    return knex
    .schema
    
    .alterTable('staffs', function(t) { 
        t.string( 'address', 100 ).nullable();
        t.string( 'emergency_contact', 50 ).nullable();
        t.string( 'emergency_phone', 30 ).nullable();
    })
    
    
    .alterTable('assets', function(t) {  
      t.string('company_name', 100).nullable();  
      t.string('start_date', 30).nullable();  
      t.string('end_date', 30).nullable();  
    })
  
  .raw(`
    ALTER TABLE "assets" DROP  CONSTRAINT "assets_condition_check";
    ALTER TABLE "assets" ADD  CONSTRAINT "assets_condition_check" CHECK (condition IN ('New'::text, 'Leased'::text, 'Used'::text));
  `)
    
    
  };
  
  exports.down = function(knex) {
    
  };
  