
exports.up = function(knex) {
    return knex
    .schema
    
    .alterTable('company', function(t) { 
        t.string( 'logo', 100 ).nullable();
        t.string( 'appname', 50 ).nullable(); 
    })
    
};

exports.down = function(knex) {
  
};
