const { Employee } = require('../models/index')

const createEmployee = async (req, res) => {
    const employee = new Employee(req.body)
    try {
        await employee.save()
        res.status(201).send(employee)

    } catch (e) {
        res.status(500).send()
    }
}

const readAllEmployees = async (req, res) => {
    try {
        // Eigentlich suche mit EmployerID aber da middleware
        const employees = await Employee.find({})

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

    try {
        const employee = await Employee.findById(_id)

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
    try {
        const employee = await Employee.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if(!employee) {
            return res.status(404).send()
        }
        res.send(employee)
    } catch (e) {
        res.status(400).send()
    }
}

const deleteEmployee = async (req, res) => {
    const _id = req.params.id

    try {
        const employee = await Employee.findByIdAndDelete(_id)

        if(!employee) {
            return res.status(404).send()
        }
        res.send(employee)
    } catch (e) {
        res.status(400).send()
    }
}

module.exports =  {
    createEmployee,
    readAllEmployees,
    readEmployee,
    updateEmployee,
    deleteEmployee
}