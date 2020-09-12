
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('company').del()
    .then(function () {
      return knex('company').insert([
        {id: 1, email:'health@gmail.com', phone: '0703985785', appname: 'Inventory', companyname: 'Health care', address: 'Different colored laptop',  created_at:'8/22/2020 9:41:11 PM', updated_at: '8/22/2020, 9:41:12 PM'} 
      ]);
    })
      // Inserts seed entries
    //   return knex('products').insert([
    //     {id: 1, cat_id: 1, branch_id: 7, product_name: 'Rainbow', description: 'Different colored laptop', images: 'http://res.cloudinary.com/daiea1zqu/image/upload/v1598128870/cskrzkvqkiteebefee4j.jpg', status: 'Active', created_at:'8/22/2020 9:41:11 PM', updated_at: '8/22/2020, 9:41:12 PM'},
    //     {id: 2, cat_id: 3, branch_id: 7, product_name: 'Staff Bus', description: '16 seaters', images: 'http://res.cloudinary.com/daiea1zqu/image/upload/v1598128870/wpzjdleilgcpm8rnacwz.jpg', status: 'Active', created_at:'8/25/2020 9:55:39 PM', updated_at: '8/25/2020, 9:55:40 PM'},
    //     {id: 3, cat_id: 3, branch_id: 7, product_name: 'Vike man', description: 'Bicycle with carrier', images: 'http://res.cloudinary.com/daiea1zqu/image/upload/v1598128870/rtw1g0ixcajdpjjxx2xs.jpg', status: 'Active', created_at:'8/25/2020, 9:57:56 PM', updated_at: '8/25/2020, 9:57:56 PM'},
    //   ]);
    // })

    // return knex('stocks').del()
    // .then(function () {
    //   return knex('stocks').insert([
    //     {id: 1,	product_id: 1, stock_name: '4Gb Ram', quantity: 9, price: 5000,	expiry: '',	status: 'Active',	created_at: '8/23/2020, 9:45:28 PM',	updated_at: '9/3/2020, 5:47:56 AM'},
    //     {id: 2,	product_id: 1, stock_name: '32Gb Ram', quantity: 5, price: 12000,	expiry: '',	status: 'Active',	created_at: '8/23/2020, 9:57:04 PM',	updated_at: '9/3/2020, 5:47:49 AM'},
    //     {id: 3,	product_id: 3, stock_name: 'Three Leg', quantity: 5, price: 9000,	expiry: '',	status: 'Active',	created_at: '8/26/2020, 2:32:34 PM',	updated_at: '9/3/2020, 6:01:33 AM'},
    //   ])
    // })
};
    