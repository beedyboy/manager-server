
exports.up = function(knex) {
  
 return knex
    .schema
  
.createTable( 'products', function( productTable ) {  
		productTable.increments();  
		productTable.integer('cat_id').unsigned().nullable(); 
		productTable.integer('branch_id').unsigned().nullable(); 
		productTable.string( 'product_name', 30 ).nullable();   
		productTable.text( 'description' ).nullable();     
		productTable.text( 'images' ).nullable();   
		productTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Pending');    
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
		stockTable.string( 'quantity', 30 ).nullable();     
		stockTable.string( 'weight', 30 ).nullable();        
		stockTable.string( 'price', 30 ).nullable();     
		stockTable.string( 'expiry', 50 ).nullable();     
		stockTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Pending');    
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
		subCatTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Pending');    
		subCatTable.string('created_at',  50).nullable();
		subCatTable.string('updated_at',  50).nullable(); 
		subCatTable.foreign('cat_id').references('id').inTable('categories')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
})

.createTable( 'assets', function( assetTable ) {  
		assetTable.increments();   
		assetTable.integer('sub_id').unsigned().nullable();  
		assetTable.string( 'title', 30 ).nullable();     
		assetTable.string( 'purchased_price', 30 ).nullable();         
		assetTable.text( 'description' ).nullable();    
		assetTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Pending');    
		assetTable.enu('condition', ['New', 'Used', 'Maintenance', 'Leased']).defaultTo('New');    
		assetTable.string('date_acquired',  50).nullable();
		assetTable.string('date_sold',  50).nullable();
		assetTable.string('created_at',  50).nullable();
		assetTable.string('updated_at',  50).nullable(); 
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
		allocateTable.foreign('branch_id').references('id').inTable('branches')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
})

.createTable( 'maintenance', function( assetTable ) {  
		assetTable.increments();   
		assetTable.integer('asset_id').unsigned().nullable();  
		assetTable.string( 'maintenance_date', 30 ).nullable();     
		assetTable.string( 'cost', 30 ).nullable();         
		assetTable.text( 'description' ).nullable();    
		assetTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Pending');    
		assetTable.enu('condition', ['New', 'Used', 'Maintenance', 'Leased']).defaultTo('New');    
		assetTable.string('created_at',  50).nullable();
		assetTable.string('updated_at',  50).nullable(); 
		assetTable.foreign('asset_id').references('id').inTable('assets')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
})

};
exports.down = function(knex) {
  
};
