const mongoose = require('mongoose');
const budgetModel = require('./models/budgetModel');
const UserModel = require('./models/userModel');
const expenseModel=require('./models/expenseModel');
const userData = { email: 'TekLoon', password:'password',displayName:'njkrdg' };
let user_id='';
describe('User Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save user successfully', async () => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        user_id=savedUser._id;
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
    });

    it('save budget successfully', async () => {
        const budgetData={title:'Youtube',related_value:55,Color: "#000000",userId:user_id};
        const budget=new budgetModel(budgetData);
        const savedBudget = await budget.save();
        expect(savedBudget._id).toBeDefined();
        expect(savedBudget.title).toBe(budgetData.title);
        
    });

    it('save expense successfully', async () => {
        const expenseData={title:'Youtube',month:'01',year:'2020',related_value:55,userId:user_id};
        const expense=new expenseModel(expenseData);
        const savedExpense = await expense.save();
        expect(savedExpense._id).toBeDefined();
        expect(savedExpense.title).toBe(expenseData.title);
    });
})