const genderRadios = [{ label: "Male", value: "male" }, { label: "Female", value: "female" }]
const departments = ["Development", "Marketing", "Accounting", "HR"]
const initialValues = { name: "", email: "", phone: "", city: "", gender: "male", department: "", hireDate: new Date(), isPermanent: false }
const tableHeaders = ["Employee Name", "Email Address", "Mobile Number", "Department", "Actions"]

const testEmployees = [
    {
        id: 1, name: "John Stave", email: "john-stave-21@gmail.com", phone: "1-770-736-8031", city: "Gwenborough", gender: "male", department: "Development", hireDate: new Date(), isPermanent: false
    },
    {
        id: 2, name: "Leanne Graham", email: "Sincere@april.biz", phone: "010-692-6593", city: "Gwenborough", gender: "male", department: "Marketing", hireDate: new Date(), isPermanent: true
    },
    {
        id: 3, name: "Clementine Bauch", email: "Nathan@yesenia.net", phone: "1-463-123-4447", city: "McKenziehaven", gender: "female", department: "HR", hireDate: new Date(), isPermanent: false
    }]

const emplyoeesInfo = {
    genderRadios,
    departments,
    initialValues,
    tableHeaders,
    testEmployees
}

export default emplyoeesInfo