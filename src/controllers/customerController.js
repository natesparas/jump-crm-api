const CustomerModel = require('../models/customer')

const getCustomer = async (req, res) => {
    try {
        const data = await CustomerModel.find().sort({ name: 1 })
        if (!data) {
            return res.json({
                error: 'Data not found'
            })
        }

        const newCustomer = []
        data.map((item) => {
            newCustomer.push({
                id: item.id,
                name: item.name,
                address: item.address,
                contactno: item.contactno
            })
        })

        return res.json(newCustomer)
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

const createCustomer = async (req, res) => {
    try {
        const { name, address, contactno } = req.body

        // Check if name was entered
        if (!name) {
            return res.json({
                error: 'Name is required'
            })
        }

        const exist = await CustomerModel.findOne({
            name: name
        })

        if (exist) {
            return res.json({
                error: 'Name is already exist'
            })
        }

        const customer = await CustomerModel.create({
            name,
            address,
            contactno
        })

        return res.json(customer)
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

const updateCustomerById = async (req, res) => {
    try {
        const { id, name, address, contactno } = req.body

        // Check if name was entered
        if (!name) {
            return res.json({
                error: 'Name is required'
            })
        }

        const criteria = {
            _id: id
        }

        const newValue = {
            $set: {
                name,
                address,
                contactno
            }
        }

        const result = await CustomerModel.updateOne(criteria, newValue)

        if (result.modifiedCount === 0) {
            return res.json({
                error: 'No changes has been updated'
            })
        }

        return res.json(result)
    } catch (error) {
        if (error.code === 11000) {
            return res.json({
                error: 'Name already exists'
            })
        } else {
            return res.json({
                error: error
            })
        }
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const id = req.params.id

        const criteria = {
            _id: id
        }

        let result = await CustomerModel.deleteOne(criteria)

        if (result.deletedCount == 0) {
            return res.json({
                error: 'No data has been deleted'
            })
        }

        return res.json(result)
    } catch (error) {
        if (error.code === 11000) {
            return res.json({
                error: 'Name already exists'
            })
        } else {
            return res.json({
                error: error
            })
        }
    }
}

module.exports = {
    getCustomer,
    createCustomer,
    updateCustomerById,
    deleteCustomer
}
