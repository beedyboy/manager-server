
exports.up = function(knex) {
  
    return knex
    .schema
     .createTable( 'directors', function( directorTable ) {  
		 directorTable.increments();
		 directorTable.string( 'firstname', 30 ).notNullable();
		 directorTable.string( 'lastname', 30 ).notNullable();
		 directorTable.string( 'position', 30 ).notNullable();     
         directorTable.text( 'images' ).nullable();   
		 directorTable.string('date_joined',  50).nullable();         
		 directorTable.text( 'story' ).nullable();  
		 directorTable.string('created_at',  50).notNullable();
		 directorTable.string('updated_at',  50).nullable(); 
		 directorTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Active');   
     }) 
     
     .createTable( 'documents', function( docTable ) {  
		 docTable.increments();
		 docTable.string( 'title', 30 ).nullable(); 
		 docTable.string( 'doc_type', 30 ).nullable();         
		 docTable.text( 'description' ).nullable();  
		 docTable.string('created_at',  50).notNullable();
		 docTable.string('updated_at',  50).nullable(); 
		 docTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Active');   
	 }) 
     .createTable( 'leaves', function( leaveTable ) {  
		leaveTable.increments();   
		leaveTable.integer('staff_id').unsigned().nullable(); 
		leaveTable.string( 'start_date', 30 ).notNullable();    
		leaveTable.string( 'end_date', 30 ).nullable();    
		leaveTable.text( 'note' ).nullable();      
		leaveTable.integer('checked_by').unsigned().nullable();   
		leaveTable.enu('status', ['Active', 'Returned', 'Pending', 'Declined']).defaultTo('Pending');    
		leaveTable.string('created_at',  50).nullable();
		leaveTable.string('updated_at',  50).nullable();  
		leaveTable.foreign('staff_id').references('id').inTable('staffs')
		.onDelete('CASCADE') .onUpdate('CASCADE');  
		leaveTable.foreign('checked_by').references('id').inTable('staffs')
		.onDelete('CASCADE') .onUpdate('CASCADE');  
})
};

exports.down = function(knex) {
  
};
