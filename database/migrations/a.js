
exports.up = function(knex) {
	return knex
	 .schema 
 
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
		 staffsTable.string( 'firstname', 100 ).nullable();
		 staffsTable.string( 'lastname', 100 ).nullable();
		 staffsTable.string( 'email', 100 ).notNullable(); 
		 staffsTable.string('phone_number',  50).nullable();  
		 staffsTable.integer('branch_id').unsigned().nullable();      
		 staffsTable.text( 'acl' ).nullable();  
		 staffsTable.string( 'address', 200 ).nullable();
		 staffsTable.text( 'signature', 100 ).nullable();
		 staffsTable.string( 'emergency_contact', 100 ).nullable();
		 staffsTable.string( 'emergency_phone', 30 ).nullable();
		 staffsTable.string('created_at',  50).notNullable();
		 staffsTable.string('updated_at',  50).nullable(); 
		 staffsTable.string( 'staffId', 50 ).nullable(); 
		 staffsTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Active');  
		 staffsTable.enu('can_login', ['Yes', 'No']).defaultTo('No');  
		 staffsTable.enu('signed', ['Yes', 'No']).defaultTo('No');  
		 staffsTable.string('onboarded', 10).defaultTo('No');  
		 staffsTable.text("pre_contract").nullable();
		 staffsTable.text("general").nullable();
		 staffsTable.text("student").nullable();
		 staffsTable.text("para_professional").nullable();
		 staffsTable.text("professional").nullable();
		 staffsTable.text("marketing").nullable();
		 staffsTable.text("management_executive").nullable();
		 staffsTable.text("post_contract").nullable();
		 staffsTable.foreign('branch_id').references('id').inTable('branches')
		 .onDelete('CASCADE') .onUpdate('CASCADE');
	 }) 
 
   .createTable( 'logins', function( loginTable ) {  
		 loginTable.increments();
		 loginTable.integer('staff_id').unsigned().nullable(); 
		 loginTable.string( 'email', 100 ).notNullable(); 
		 loginTable.string( 'password', 250 ).notNullable(); 
		 loginTable.text( 'token' ).nullable(); 
		 loginTable.string('updated_at',  50).nullable(); 
		 loginTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Active'); 
		 loginTable.foreign('staff_id').references('id').inTable('staffs')
		 .onDelete('CASCADE') .onUpdate('CASCADE'); 
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
	 return knex
	 .schema
	 .dropTableIfExists("company");
 };
 