
exports.up = function(knex) {
    return knex
    .schema
    
    .alterTable('staffs', function(t) {  
        t.string( 'staffId', 50 ).nullable(); 
    })
    
     
    .createTable( 'marketing', function( marketTable ) {  
        marketTable.increments();
        marketTable.string( 'url_link', 100 ).notNullable();       
        marketTable.text( 'description' ).nullable();  
        marketTable.string('created_at',  50).notNullable();
        marketTable.string('updated_at',  50).nullable();  
    }) 
  
    
    
  };
  
  exports.down = function(knex) {
    
  };
  