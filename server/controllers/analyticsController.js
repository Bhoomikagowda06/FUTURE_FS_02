const Order = require("../models/Order");
const User = require("../models/User");


exports.getAnalytics = async(req,res)=>{

    try{

        const totalUsers = await User.countDocuments();


        const totalOrders = await Order.countDocuments();


        const orders = await Order.find();



        const revenue = orders.reduce(
            (sum,order)=> sum + order.amount,
            0
        );



        // USER GROWTH

        

        const users = [
    {
        name: "Customers",
        value: totalUsers
    },
    {
        name: "Orders",
        value: totalOrders
    }
];
        





        // SALES ANALYTICS (Monthly Orders)

        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];



        const sales = months.map((month,index)=>{


            const count = orders.filter(order=>{

                const orderMonth =
                new Date(order.createdAt).getMonth();


                return orderMonth === index;

            }).length;



            return {

                month,

                orders:count

            };


        });






        // REVENUE ANALYTICS

        const revenueData = months.map((month,index)=>{


            const monthlyRevenue = orders
            .filter(order=>{


                const orderMonth =
                new Date(order.createdAt).getMonth();


                return orderMonth === index;


            })
            .reduce(
                (sum,order)=>sum + order.amount,
                0
            );
            



            return {

                month,

                revenue:monthlyRevenue

            };


        });





        res.json({

            totalUsers,

            totalOrders,

            revenue,


            users,

            sales,

            revenueData

        });



    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};