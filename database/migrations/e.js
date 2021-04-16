
exports.up = function(knex) {
    return knex
    .schema
     .createTable( 'tokens', function( tokenTable ) {  
		 tokenTable.increments();
		 tokenTable.integer('staff_id').unsigned().nullable();     
		 tokenTable.text( 'token' ).nullable();  
		 tokenTable.string('created_at',  50).notNullable();
		 tokenTable.string('expires',  50).defaultTo(3600); 
	     tokenTable.foreign('staff_id').references('id').inTable('staffs')
		 .onDelete('CASCADE') .onUpdate('CASCADE'); 
     }) 
};

exports.down = function(knex) {
  
};
