
exports.up = function(knex) {
  
 return knex
    .schema

// .createTable( 'products', function( productTable ) {  
// 		productTable.increments();  
// 		productTable.integer('cat_id').unsigned().nullable(); 
// 		productTable.string( 'product_name', 30 ).nullable();      
// 		productTable.string( 'quantity', 30 ).nullable();      
// 		productTable.string( 'price', 30 ).nullable();      
// 		productTable.text( 'description' ).nullable();  
// 		productTable.text( 'images' ).nullable();  
// 		productTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Pending');    
// 		productTable.string('created_at',  50).nullable();
// 		productTable.string('updated_at',  5).nullable();
// 		productTable.foreign('cat_id').references('id').inTable('categories')
// 		.onDelete('CASCADE') .onUpdate('CASCADE');
// })

// .createTable( 'allocations', function( allocateTable ) {  
// 		allocateTable.increments();  
// 		allocateTable.integer('product_id').unsigned().nullable(); 
// 		allocateTable.integer('staff_id').unsigned().nullable();    
// 		allocateTable.integer('dept_id').unsigned().nullable(); 
// 		allocateTable.integer('branch_id').unsigned().nullable(); 
// 		allocateTable.string( 'quantity', 30 ).nullable();    
// 		allocateTable.text( 'note' ).nullable();  
// 		allocateTable.enu('type', ['Individual', 'Departmental', 'Others']).defaultTo('Individual');    
// 		allocateTable.enu('status', ['Active', 'Returned', 'Deleted']).defaultTo('Active');    
// 		allocateTable.string('created_at',  50).nullable();
// 		allocateTable.string('updated_at',  50).nullable(); 
// 		allocateTable.foreign('product_id').references('id').inTable('products')
// 		.onDelete('CASCADE') .onUpdate('CASCADE'); 
// 		allocateTable.foreign('staff_id').references('id').inTable('staffs')
// 		.onDelete('CASCADE') .onUpdate('CASCADE'); 
// 		allocateTable.foreign('dept_id').references('id').inTable('departments')
// 		.onDelete('CASCADE') .onUpdate('CASCADE'); 
// 		allocateTable.foreign('branch_id').references('id').inTable('branches')
// 		.onDelete('CASCADE') .onUpdate('CASCADE'); 
// })
// };


// .createTable( 'assets', function( assetTable ) {  
// 		assetTable.increments();  
// 		assetTable.integer('cat_id').unsigned().nullable(); 
// 		assetTable.string( 'asset_name', 30 ).nullable();      
// 		assetTable.string( 'quantity', 30 ).nullable();      
// 		assetTable.string( 'price', 30 ).nullable();      
// 		assetTable.text( 'description' ).nullable();     
// 		assetTable.text( 'description' ).nullable(); 
// 		assetTable.text( 'images' ).nullable();  
// 		assetTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Pending');    
// 		assetTable.string('created_at',  50).nullable();
// 		assetTable.string('updated_at',  5).nullable();
// 		assetTable.foreign('cat_id').references('id').inTable('categories')
// 		.onDelete('CASCADE') .onUpdate('CASCADE');
// })
};
exports.down = function(knex) {
  
};
