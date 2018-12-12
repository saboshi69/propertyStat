document.querySelector("#updateUser").addEventListener("click", async(e)=>{
    e.preventDefault();
    console.log ("clicked")
    let username = document.querySelector("#username").value
    let email = document.querySelector("#email").value
    let phone = document.querySelector("#phone").value
    let gender = document.querySelector("#gender").value
    let salary = document.querySelector("#salary").value
    let district_current = document.querySelector("#district_current").value;
    let arr = {
        username:String(username),
        email:String(email),
        phone:String(phone),
        gender:String(gender),
        salary:String(salary),
        district_current:String(district_current)
    }
    console.log (arr)
    let ans = await axios.post("/updateuser", arr);
    console.log (ans)
    if (ans.data == "duplicated"){
        document.querySelector("#errMsgUpdate").innerHTML = "Username/Email/Phone duplicated with existing user"
    } else if (ans.data == "err"){
        document.querySelector("#errMsgUpdate").innerHTML = "Server error. Please try again later"
    } else if (ans.data == "updated"){
        document.querySelector("#errMsgUpdate").innerHTML = "update success"
    }
})