
exports.up = function(knex) {
    return knex
    .schema
         
     
    .createTable( 'leaves', function( leaveTypeTable ) {  
        leaveTypeTable.increments();
        leaveTypeTable.string( 'leave_type', 100 ).notNullable();       
        leaveTypeTable.string( 'allowed_days', 100 ).nullable();       
        leaveTypeTable.text( 'description' ).nullable();  
        leaveTypeTable.string('created_at',  50).notNullable();
        leaveTypeTable.string('updated_at',  50).nullable();  
    }) 

    .createTable( 'leave_applications', function( leaveTable ) {  
        leaveTable.increments(); 
		leaveTable.integer('staff_id').unsigned().nullable();  
		leaveTable.integer('leave_type_id').unsigned().nullable();  
        leaveTable.string( 'leave_start_date', 20 ).nullable();      
        leaveTable.string( 'leave_end_date', 20 ).nullable();     
        leaveTable.text( 'description' ).nullable();       
        leaveTable.text( 'admin_remark' ).nullable();   
		leaveTable.enu('status', ['Accepted', 'Pending', 'Rejected']).defaultTo('Pending');    
        leaveTable.string('created_at',  50).notNullable();
        leaveTable.string('updated_at',  50).nullable();  
		leaveTable.foreign('staff_id').references('id').inTable('staffs')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
		leaveTable.foreign('leave_type_id').references('id').inTable('leaves')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
    }) 
  
    
    
  };
  
  exports.down = function(knex) {
    
  };
  