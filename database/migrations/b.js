
exports.up = function(knex) {
  
 return knex
    .schema
  
	.createTable( 'company', function( comTable ) {  
		 comTable.increments();
		 comTable.string( 'companyname', 100 ).nullable();
		 comTable.text( 'address' ).nullable(); 
		 comTable.string( 'email', 100 ).nullable(); 
		 comTable.string( 'phone', 50 ).nullable(); 
		 comTable.string( 'appname', 50 ).nullable(); 
		 comTable.string( 'logo', 100 ).nullable();
		 comTable.string('created_at',  50).notNullable();
		 comTable.string('updated_at',  50).nullable(); 
	 })
	 
.createTable( 'products', function( productTable ) {  
		productTable.increments();  
		productTable.integer('cat_id').unsigned().nullable(); 
		productTable.integer('branch_id').unsigned().nullable(); 
		productTable.string( 'product_name', 30 ).nullable();   
		productTable.text( 'description' ).nullable();     
		productTable.text( 'images' ).nullable();   
		productTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Active');    
		productTable.string('created_at',  50).nullable();
		productTable.string('updated_at',  50).nullable();
		productTable.foreign('cat_id').references('id').inTable('categories')
		.onDelete('CASCADE') .onUpdate('CASCADE');
		productTable.foreign('branch_id').references('id').inTable('branches')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
})
.createTable( 'stocks', function( stockTable ) {  
		stockTable.increments();   
		stockTable.integer('product_id').unsigned().nullable();  
		stockTable.string( 'stock_name', 30 ).nullable();     
		stockTable.float( 'quantity' ).notNullable();       
		stockTable.float( 'price' ).notNullable();     
		stockTable.string( 'expiry', 50 ).nullable();     
		stockTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Active');    
		stockTable.string('created_at',  50).nullable();
		stockTable.string('updated_at',  50).nullable(); 
		stockTable.foreign('product_id').references('id').inTable('products')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
})

.createTable( 'subcategory', function( subCatTable ) {  
		subCatTable.increments();   
		subCatTable.integer('cat_id').unsigned().nullable();  
		subCatTable.string( 'sub_name', 30 ).nullable();     
		subCatTable.text( 'description' ).nullable();    
		subCatTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Active');    
		subCatTable.string('created_at',  50).nullable();
		subCatTable.string('updated_at',  50).nullable(); 
		subCatTable.foreign('cat_id').references('id').inTable('categories')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
})

.createTable( 'assets', function( assetTable ) {  
		assetTable.increments();   
		assetTable.integer('sub_id').unsigned().nullable();  
		assetTable.string( 'title', 30 ).nullable();     
		assetTable.float( 'purchased_price' ).nullable();         
		assetTable.string( 'serial', 30 ).nullable();         
		assetTable.string('company_name', 100).nullable();  
		assetTable.string('start_date', 30).nullable();  
		assetTable.string('end_date', 30).nullable();  
		assetTable.text( 'description' ).nullable();    
		assetTable.enu('status', ['Active', 'Pending', 'Deleted', 'Maintenance', 'Sold']).defaultTo('Active');   
		assetTable.string('purchased_date',  50).nullable();
		assetTable.string('date_sold',  50).nullable();
		assetTable.string('created_at',  50).nullable();
		assetTable.string('updated_at',  50).nullable(); 
		assetTable.enu('condition', ['New', 'Leased', 'Used']).defaultTo('New');
		assetTable.foreign('sub_id').references('id').inTable('subcategory')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
})


 
.createTable( 'allocations', function( allocateTable ) {  
		allocateTable.increments();  
		allocateTable.integer('asset_id').unsigned().nullable(); 
		allocateTable.integer('staff_id').unsigned().nullable();    
		allocateTable.integer('dept_id').unsigned().nullable();  
		allocateTable.string( 'quantity', 30 ).nullable();    
		allocateTable.text( 'note' ).nullable();  
		allocateTable.enu('type', ['Individual', 'Departmental', 'Others']).defaultTo('Individual');    
		allocateTable.enu('status', ['Active', 'Returned', 'Deleted']).defaultTo('Active');    
		allocateTable.string('created_at',  50).nullable();
		allocateTable.string('updated_at',  50).nullable(); 
		allocateTable.foreign('asset_id').references('id').inTable('assets')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
		allocateTable.foreign('staff_id').references('id').inTable('staffs')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
		allocateTable.foreign('dept_id').references('id').inTable('departments')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
})

.createTable( 'maintenance', function( maintTable ) {  
		maintTable.increments();   
		maintTable.integer('asset_id').unsigned().nullable();  
		maintTable.string( 'maintenance_date', 30 ).nullable();     
		maintTable.string( 'cost', 30 ).nullable();         
		maintTable.text( 'description' ).nullable();     
		maintTable.enu('status', ['Active', 'Completed', 'Deleted']).defaultTo('Active');     
		maintTable.string('created_at',  50).nullable();
		maintTable.string('updated_at',  50).nullable(); 
		maintTable.foreign('asset_id').references('id').inTable('assets')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
})

};
exports.down = function(knex) {
  
};
