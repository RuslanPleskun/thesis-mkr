const Expense = require('../models/expenseModel');

exports.getAllExpenses = async (req, res) => {
    try {
        await Expense.find({ user: req.user._id }).exec((error, result) => {
            if (error) {
                res.status(404).json({ errorMessage: 'No Expenses found' })
            } else {
                res.status(200).json(result);
            }
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.getExpenseById = async (req, res) => {
    try {
        await Expense.findOne({ _id: req.params.id }).exec((error, result) => {
            if (error) {
                res.status(404).json({ errorMessage: 'No Expense found' })
            } else {
                res.status(200).json(result);
            }
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({ _id: req.params.id });
        if (expense) {
            expense.account = req.body.account;
            expense.amount = req.body.amount;
            expense.currency = req.body.currency;
            expense.category = req.body.category;
            expense.labels = req.body.labels;
            expense.date = req.body.date;
            expense.time = req.body.time;
            expense.payer = req.body.payer;
            expense.note = req.body.note;
            expense.paymentType = req.body.paymentType;
            expense.paymentStatus = req.body.paymentStatus;
            expense.type = req.body.type;
            const saveExpense = await expense.save();
            if (saveExpense) {
                return res.status(200).json({ successMessage: 'Expense updated.' });
            } else {
                return res.status(400).json({ errorMessage: 'error in expense update' });
            }
        }
        else {
            res.status(404).json({ errorMessage: 'No expense found' });
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.createExpense = async (req, res) => {
    try {
        const findIt = await Expense.findOne({ category: req.body.category });
        let color;
        if (findIt) {
            color = findIt?.color;
        }
        else {
            color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        }
        const expense = new Expense({
            color,
            account: req.body.account,
            amount: req.body.amount,
            currency: req.body.currency,
            category: req.body.category,
            labels: req.body.labels,
            date: req.body.date,
            time: req.body.time,
            payer: req.body.payer,
            note: req.body.note,
            paymentType: req.body.paymentType,
            paymentStatus: req.body.paymentStatus,
            type: req.body.type,
            user: req.user._id
        });
        const saveExpense = await expense.save();
        if (saveExpense) {
            return res.status(200).json({ successMessage: 'Expense added.' });
        } else {
            return res.status(400).json({ errorMessage: 'error in expense creation' });
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findOne({ _id: req.params.id, user: req.user._id }).exec((error, result) => {
            if (error) {
                res.status(404).json({ errorMessage: 'No Expense found' })
            } else {
                result.remove();
                res.status(200).json({ successMessage: 'Expense deleted.' });
            }
        })
    } catch (error) {
        res.status(400).send(error)
    }
}