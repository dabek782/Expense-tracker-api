import axios from "axios"

// Variables to store expense ID and authentication token
let expenseId = ""
let token = ""

// Main function to test all API endpoints
const testApi = async ()=>{
    try {
    const url = "http://localhost:5000/api/v1"
    
    // Test user registration endpoint
    console.log("testing register endpoint")
    const testRegister = await axios.post(`${url}/auth/register`, {
        name : "user1",
        email : "default1@mail.com",
        password : "password123456"
    })
    console.log(testRegister.data)
    
    // Test user login endpoint
    const testLogin = await axios.post(`${url}/auth/login`, {
        email :"default1@mail.com",
        password: "password123456"
    })

    // Store authentication token from login response
    token = testLogin.data.token
    console.log(token)
    console.log(userID)
    console.log(testLogin.data)
    
    // Test expense creation endpoint
    const testCreate = await axios.post(`${url}/expense/create`, {
        userID : userID,
        "name": "electricity_bill",
        "cost": 125.30,
        "type": "Utilities",
        "description": "Monthly electricity payment",
        "date": "2025-10-28T00:00:00.000Z"
    },
    {
        headers: { authorization: `Bearer ${token}` } 
    })
    console.log(testCreate.data)
    
    // Store created expense ID for subsequent tests
    expenseId = testCreate.data.expense._id
    
    // Test get all expenses endpoint
    const testGetAll = await axios.get(`${url}/expense/getAll`,
    {
        headers: { authorization: `Bearer ${token}` } 
    })
    console.log(testGetAll.data)
    
    // Test get expense by ID endpoint
    const testGetById = await axios.get(`${url}/expense/getExpensesID/${expenseId}`, 
    {
       headers: { authorization: `Bearer ${token}` } 
    })
    console.log(testGetById.data)
    
    // Test update expense endpoint
    const testUpdate = await axios.patch(`${url}/expense/update/${expenseId}`,{
        "name": "gas_station",
        "cost": 55.00,
        "type": "Transport",
        "description": "Fuel for car"
    },
    {
       headers: { authorization: `Bearer ${token}` } 
    })
    console.log(testUpdate.data)
    
    // Test delete expense endpoint
    const testDelete = await axios.delete(`${url}/expense/delete/${expenseId}`,
    {
        headers: { authorization: `Bearer ${token}` } 
    })
    console.log("expense succesully delted")
    console.log("All tests completed succesfully")
     
    } catch (error) {
        // Log any errors that occur during testing
        console.error("test failed", error.message)
    }
}

// Execute the test suite
testApi()