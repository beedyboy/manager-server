exports.up = function (knex) {
  return knex.schema
 
 
    .table("staffs", function (onboardTable) { 
      onboardTable.string('onboarded', 10).defaultTo('No');  
       onboardTable.text("pre_contract").nullable();
       onboardTable.text("general").nullable();
       onboardTable.text("student").nullable();
       onboardTable.text("para_professional").nullable();
       onboardTable.text("professional").nullable();
       onboardTable.text("marketing").nullable();
       onboardTable.text("management_executive").nullable();
       onboardTable.text("post_contract").nullable();
		
    })

    
};

exports.down = function (knex) {};
