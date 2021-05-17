const initialValues = { fullName: "", emailAddress: "", phoneNumber: Number, village: "", sex: "male", department: "", isSeasoned: false, dateOfHiring: new Date() }

const sexRadios = [{ label: "Male", value: "male" }, { label: "Female", value: "female" }]

const departments = ["Development", "Marketing", "Investing", "Accounting", "Employing"]

const tblHeaders = ["Full Name", "Email", "Phone Number", "Department", "Actions"]

const testAdmins = [
    {
        id: 1, fullName: "John Stave", emailAddress: "john-stave-21@gmail.com", phoneNumber: "1-770-736-8031", village: "Gwenborough", sex: "male", department: "Accounting", dateOfHiring: new Date(), isSeasoned: false
    },
    {
        id: 2, fullName: "Leanne Graham", emailAddress: "Sincere@april.biz", phoneNumber: "010-692-6593", village: "Gwenborough", sex: "male", department: "Employing", dateOfHiring: new Date(), isSeasoned: true
    },
    {
        id: 3, fullName: "Clementine Bauch", emailAddress: "Nathan@yesenia.net", phoneNumber: "1-463-123-4447", village: "McKenziehaven", sex: "female", department: "Investing", dateOfHiring: new Date(), isSeasoned: false
    }]

const adminsInfo = {
    initialValues,
    sexRadios,
    departments,
    tblHeaders,
    testAdmins
}

export default adminsInfo