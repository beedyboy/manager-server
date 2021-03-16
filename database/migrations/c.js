
exports.up = function(knex) {
    return knex
    .schema

    .createTable( 'customers', function( customerTable ) {  
		customerTable.increments();    
		customerTable.string('fullname',  50).notNullable();  
		customerTable.string('phone',  15).nullable();  
		customerTable.string('email',  100).nullable();  
		customerTable.text('address').nullable();   
		customerTable.string('created_at',  50).nullable();
		customerTable.string('updated_at',  50).nullable(); 
		customerTable.enu('status', ['Active', 'Completed', 'Deleted']).defaultTo('Active');     
    })
    
    .createTable( 'orders', function( orderTable ) {  
		orderTable.increments();   
		orderTable.integer('stock_id').unsigned().nullable();  
		orderTable.string('order_no',  20).notNullable();  
		orderTable.float('quantity').notNullable();  
		orderTable.float('discount').nullable();  
		orderTable.float('item_price').notNullable();  
		orderTable.float('sold_price').notNullable(); 
		orderTable.string('order_date',  15).notNullable();
		orderTable.string('created_at',  50).nullable();
		orderTable.string('updated_at',  50).nullable(); 
		orderTable.foreign('stock_id').references('id').inTable('stocks')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
    })

    .createTable( 'sales', function( salesTable ) {  
        salesTable.increments();   
        salesTable.string('order_no', 20).notNullable();  
        salesTable.float( 'total' ).notNullable();         
        salesTable.integer('customer_id').unsigned().nullable(); 
        salesTable.string( 'fullname', 30 ).nullable();  
        salesTable.string( 'email', 20 ).nullable();    
        salesTable.string( 'phone', 15 ).nullable();  
	    	salesTable.string('sales_date',  15).notNullable();                  
        salesTable.enu('status', ['PAID', 'UNPAID', 'CANCELLED']).defaultTo('UNPAID');                  
        salesTable.enu('respondent', ['REGISTERED', 'UNREGISTERED']).defaultTo('UNREGISTERED');     
        salesTable.string('created_at',  50).nullable();
        salesTable.string('updated_at',  50).nullable();  
		salesTable.foreign('customer_id').references('id').inTable('customers')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
    })

    
    .createTable( 'tickets', function( ticketTable ) {  
        ticketTable.increments();
        ticketTable.string( 'title', 50 ).notNullable();
        ticketTable.text( 'description' ).notNullable(); 
        ticketTable.string( 'email', 100 ).nullable(); 
        ticketTable.integer('staff_id').unsigned().nullable(); 
        ticketTable.integer('assigned_to').unsigned().nullable(); 
		ticketTable.string('ticket_date',  15).notNullable();
        ticketTable.string('created_at',  50).notNullable();
        ticketTable.string('updated_at',  50).nullable(); 
        ticketTable.enu('requester', ['Staff', 'Customer']); 
        ticketTable.enu('category', ['Order', 'Asset']); 
        ticketTable.enu('priority', ['High', 'Low', 'Medium']).defaultTo('Low'); 
        ticketTable.enu('status', ['Pending', 'Active', 'InProgress', 'Closed']).defaultTo('Pending'); 
		ticketTable.foreign('staff_id').references('id').inTable('staffs')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
    })
    
    .createTable( 'conversations', function( resTable ) {  
		resTable.increments();   
		resTable.integer('ticket_id').unsigned().nullable();  
		resTable.text( 'description' ).nullable();        
		resTable.enu('respondent', ['Requester', 'TaskPerson']);     
		resTable.string('created_at',  50).nullable();
		resTable.string('updated_at',  50).nullable(); 
		resTable.foreign('ticket_id').references('id').inTable('tickets')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
})

};

exports.down = function(knex) {
  
};
 