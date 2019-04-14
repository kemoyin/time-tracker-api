const { Employee } = require('../models/index')

const createEmployee = async (req, res) => {
    const employerId = req.user._id

    const employee = new Employee({
        ...req.body,
        employerId
    })
    try {
        await employee.save()
        res.status(201).send(employee)

    } catch (e) {
        res.status(500).send()
    }
}

const readAllEmployees = async (req, res) => {
    const employerId = req.user._id
    try {
        const employees = await Employee.find({employerId})

        if(!employees) {
            return res.status(404).send()
        }
        res.send(employees)
    } catch (e) {
        res.status(500).send()
    }
}

const readEmployee = async (req, res) => {
    const _id = req.params.id
    const employerId = req.user._id
    try {
        const employee = await Employee.find({_id, employerId})

        if(!employee) {
            res.status(404).send()
        }
        res.send(employee)
    } catch (e) {
        res.status(500).send()
    }
}

const updateEmployee = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ['employeeNumber', 'name', 'plannedHours', 'actualHours', 'isActive']
    const isAllowed = updates.every((update) => allowed.includes(update))

    if(!isAllowed) {
        return res.status(400).send()
    }

    const _id = req.params.id
    const employerId = req.user._id
    try {
        const employee = await Employee.findOneAndUpdate({_id, employerId}, req.body, {new: true, runValidators: true})
        if(!employee) {
            return res.status(404).send()
        }
        res.send(employee)
    } catch (e) {
        res.status(500).send()
    }
}

const deleteEmployee = async (req, res) => {
    const _id = req.params.id
    const employerId = req.user._id
    try {
        const employee = await Employee.findOneAndDelete({_id, employerId})

        if(!employee) {
            return res.status(404).send()
        }
        res.status(204).send(employee)
    } catch (e) {
        res.status(500).send()
    }
}

module.exports =  {
    createEmployee,
    readAllEmployees,
    readEmployee,
    updateEmployee,
    deleteEmployee
}