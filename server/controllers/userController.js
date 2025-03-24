import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Razorpay from 'razorpay';
import transacationModel from "../models/transactionModel.js";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET
});

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" }); // ✅ Fixed "success" typo
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // ✅ Fixed req.body reference

    if (!email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" }); // ✅ Clearer error message
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" }); // ✅ Fixed "success" typo
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const userCredits = async (req,res)=>{
    try{
        const {userId} = req.body
        const user = await userModel.findById(userId)
        res.json({success:true,credits:user.creditBalance,user:{name:user.name}})
    }
    catch(error){
        console.log(error.message)
        res.json({success:false,message:ErrorEvent.message})
    }
}

// const paymentRazorpay = async(req,res)=>{
//   try{
//     const {userId,planId} = req.body
//     const userData = await userModel.findById(userId)
//     if(!userId || !planId){
//       return res.json({success:false,message:'Missing Details'})
//     }
//     let credits,plan,amount,date
//     switch (planId)
//     {
//       case 'Basic':
//         plan='Basic'
//         credits = 100
//         amount = 10
//         break;

//         case 'Advance':
//           plan='Advance'
//           credits = 500
//           amount = 50
//           break;

//           case 'Business':
//             plan='Business'
//             credits = 5000
//             amount = 250
//             break;
//             default:
//               return res.json({success:false,message:'plan not found'});
//     }
//     date = Date.now();
//     const transactionData={
//       userId,plan,amount,credits,date
//     }
//     const newTransaction = await transacationModel.create(transactionData)

//     const options = {
//       amount:amount *100,
//       currency:process.env.CURRENCY,
//       receipt:newTransaction_id,
//     }
//     await razorpayInstance.orders.create(SchemaTypeOptions,(error,order)=>{
//       if(error){
//         console.log(error);
//         return res.json({success:false,message:error})
//       }
//       res.json({sucess:true,order})
//     })
//   }catch(error){
//     console.log(error)
//     res.json({success:false,message:error.message})
//   }
// }
// const paymentRazorpay = async (req, res) => {
//   try {
//     const { userId, planId } = req.body;
    
//     if (!userId || !planId) {
//       return res.json({ success: false, message: "Missing Details" });
//     }

//     const userData = await userModel.findById(userId);
//     if (!userData) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     let credits, plan, amount;
//     switch (planId) {
//       case "Basic":
//         plan = "Basic";
//         credits = 100;
//         amount = 10;
//         break;
//       case "Advance":
//         plan = "Advance";
//         credits = 500;
//         amount = 50;
//         break;
//       case "Business":
//         plan = "Business";
//         credits = 5000;
//         amount = 250;
//         break;
//       default:
//         return res.json({ success: false, message: "Plan not found" });
//     }

//     const transactionData = {
//       userId,
//       plan,
//       amount,
//       credits,
//       date: Date.now(),
//     };

//     // ✅ Create new transaction in DB
//     const newTransaction = await transacationModel.create(transactionData);

//     // ✅ Use newTransaction._id instead of newTransaction_id
//     const options = {
//       amount: amount * 100,
//       currency: process.env.CURRENCY,
//       receipt: newTransaction._id.toString(), // Convert to string
//     };

//     // ✅ Call Razorpay API with correct syntax
//     razorpayInstance.orders.create(options, (error, order) => {
//       if (error) {
//         console.log(error);
//         return res.json({ success: false, message: error.message });
//       }
//       res.json({ success: true, order });
//     });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// const paymentRazorpay = async (req, res) => {
//   try {
//     const { userId, planId } = req.body;
    
//     console.log("Received Plan ID:", planId); // ✅ Debugging log

//     if (!userId || !planId) {
//       return res.status(400).json({ success: false, message: "Missing Details" });
//     }

//     const userData = await userModel.findById(userId);
//     if (!userData) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     let credits, plan, amount;
//     switch (planId.toLowerCase()) { // ✅ Convert to lowercase for consistency
//       case "basic":
//         plan = "Basic";
//         credits = 100;
//         amount = 10;
//         break;
//       case "advanced":
//         plan = "Advance";
//         credits = 500;
//         amount = 50;
//         break;
//       case "business":
//         plan = "Business";
//         credits = 5000;
//         amount = 250;
//         break;
//       default:
//         console.log("Plan ID not found:", planId);
//         return res.status(400).json({ success: false, message: "Plan not found" });
//     }

//     const transactionData = {
//       userId,
//       plan,
//       amount,
//       credits,
//       date: Date.now(),
//     };

//     const newTransaction = await transacationModel.create(transactionData);

//     const options = {
//       amount: amount * 100,
//       currency: process.env.CURRENCY,
//       receipt: newTransaction._id.toString(),
//     };

//     razorpayInstance.orders.create(options, (error, order) => {
//       if (error) {
//         console.error("Razorpay error:", error);
//         return res.status(500).json({ success: false, message: "Payment gateway error" });
//       }
//       res.json({ success: true, order });
//     });

//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    
    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing Details" });
    }

    let credits, plan, amount;
    switch (planId.toLowerCase()) {
      case "basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;
      case "business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.json({ success: false, message: "Plan not found" });
    }

    const newTransaction = await transacationModel.create({
      userId, plan, amount, credits, date: Date.now()
    });

    const options = {
      amount: amount * 100, // Convert to paisa (smallest currency unit)
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id.toString()
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }
      res.json({ success: true, order });
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req,res)=>{
  try{
    const {razorpay_order_id} = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status === 'paid'){
      const transactionData = await transacationModel.findById(orderInfo.receipt)
      if(transactionData.payment){
        return res.json({success:false,message:'Payment Failed'})
      }
      const userData = await userModel.findById(transactionData.userId)
      const creditBalance = userData.creditBalance + transactionData.credits
      await userModel.findByIdAndUpdate(userData.id,{creditBalance})
      await transacationModel.findByIdAndUpdate(transactionData._id,{payment:true})
      res.json({success:false,message:"Credits Added"})
    }else{
      res.json({success:false,message:"Payment Failed"})
    }
  }
  catch(error)
  {
    console.log(error);
    res.json({success:false,message:error.message});
  }
}



export { registerUser, loginUser ,userCredits,paymentRazorpay,verifyRazorpay};
