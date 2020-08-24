
exports.up = function(knex) {
	return knex
	 .schema
 
	 .createTable( 'company', function( comTable ) {  
		 comTable.increments();
		 comTable.string( 'companyname', 30 ).nullable();
		 comTable.text( 'address' ).nullable(); 
		 comTable.string( 'email', 50 ).nullable(); 
		 comTable.string( 'phone', 50 ).nullable(); 
		 comTable.string('created_at',  50).notNullable();
		 comTable.string('updated_at',  50).nullable(); 
	 })
 
	.createTable( 'branches', function( branchTable ) {  
		 branchTable.increments();
		 branchTable.string( 'name', 30 ).nullable();
		 branchTable.text( 'address' ).nullable(); 
		 branchTable.string( 'email', 50 ).nullable(); 
		 branchTable.string( 'phone', 50 ).nullable(); 
		 branchTable.string('created_at',  50).notNullable();
		 branchTable.string('updated_at',  50).nullable();
		 branchTable.enu('status', ['Active', 'Pending', 'Deleted', 'Banned']).defaultTo('Active'); 
	 })
 
	 .createTable( 'departments', function( departmentTable ) {  
		 departmentTable.increments();
		 departmentTable.string( 'name', 30 ).nullable();
		 departmentTable.text( 'description' ).nullable(); 
		 departmentTable.string('created_at',  50).notNullable();
		 departmentTable.string('updated_at',  50).nullable();
		 departmentTable.enu('status', ['Active', 'Pending', 'Deleted', 'Banned']).defaultTo('Active');
		  
	 })
 
	 .createTable( 'categories', function( catTable ) {  
		 catTable.increments();
		 catTable.string( 'name', 30 ).nullable();
		 catTable.text( 'description' ).nullable(); 
		 catTable.string('created_at',  50).notNullable();
		 catTable.string('updated_at',  50).nullable();
		 catTable.enu('status', ['Active', 'Pending', 'Deleted', 'Banned']).defaultTo('Active');
		  
	 })
 
	  .createTable( 'staffs', function( staffsTable ) {  
		 staffsTable.increments();
		 staffsTable.string( 'firstname', 30 ).nullable();
		 staffsTable.string( 'lastname', 30 ).nullable();
		 staffsTable.string( 'email', 30 ).notNullable(); 
		 staffsTable.string('phone_number',  50).nullable();  
		 staffsTable.integer('branch_id').unsigned().nullable();      
		 staffsTable.text( 'acl' ).nullable();  
		 staffsTable.string('created_at',  50).notNullable();
		 staffsTable.string('updated_at',  50).nullable(); 
		 staffsTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Active');  
		 staffsTable.enu('can_login', ['Yes', 'No']).defaultTo('No');  
		 staffsTable.foreign('branch_id').references('id').inTable('branches')
		 .onDelete('CASCADE') .onUpdate('CASCADE');
	 }) 
 
   .createTable( 'logins', function( loginTable ) {  
		 loginTable.increments();
		 loginTable.integer('staff_id').unsigned().nullable(); 
		 loginTable.string( 'email', 30 ).notNullable(); 
		 loginTable.string( 'password', 250 ).notNullable(); 
		 loginTable.text( 'token' ).nullable(); 
		 loginTable.string('updated_at',  50).nullable(); 
		 loginTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Active'); 
		 loginTable.foreign('staff_id').references('id').inTable('staffs')
		 .onDelete('CASCADE') .onUpdate('CASCADE'); 
 }) 
 
 };
 
 exports.down = function(knex) {
	 return knex
	 .schema
	 .dropTableIfExists("company");
 };
 