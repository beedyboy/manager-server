
exports.up = function(knex) {
  return knex.schema.createTable( 'branches', table => {  
    table.increments('id');
    table.string( 'name', 30 ).nullable();
    table.text( 'address' ).nullable(); 
    table.string( 'email', 50 ).nullable().unique(); 
    table.string( 'phone', 50 ).nullable(); 
    table.enu('status', ['Active', 'Pending', 'Deleted', 'Banned']).defaultTo('Active'); 
    table.timestamps(true, true);
});
};

exports.down = function(knex) {
  return knex.schema.dropTable('branches');
};
