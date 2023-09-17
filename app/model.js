/*
 * It gets the pageId.html file and then puts the data into the app div
 * pageId - This is the id of the page that you want to change to.
 */
export function changePage(pageId) {
    /* Using the jQuery get method to get the pageId.html file and then it is using the jQuery html
    method to put the data into the app div. */
    $.get(`pages/${pageId}.html`, function(data) {
        // Replace the content of the #app div with the data from the HTML file.
        $("#app").html(data); 
        // Call the getInfo function to perform additional actions on the loaded page.
        getInfo(); 
        // connectToStorage(); 
    });
};

// This function retrieves user input from a form and processes it.
function getInfo() {
    // Attach a click event handler to the #submit button.
    $("#submit").on("click", (e) => { 
        // Prevent the default form submission behavior.
        e.preventDefault(); 
        
        // Retrieve values from various form input fields.
        let fn = $("#firstName").val();
        let ln = $("#lastName").val();
        let ag = $("#age").val();
        let pn = $("#phoneNumber").val();
        let em = $("#email").val();
        let cs = $("#classes").val();
        
        // Split the comma-separated classes into an array.
        let newArrClass = cs.split(",");
        let finalClassArray = [];

        // Create a user object with the retrieved data.
        let userObj = {
            fName: fn,
            lName: ln,
            age: ag,
            pNum: pn,
            email: em,
            classes: []
        }

        // Iterate through the classes and create objects for each class.
        $.each(newArrClass, (idx, newClass) => {
            let cl = {
                className: newClass.trim()
            }
            finalClassArray.push(cl);
        });

        // Assign the classes array to the user object.
        userObj.classes = finalClassArray;
        console.log(userObj)

        // Clear the input fields.
        $("#firstName").val("");
        $("#lastName").val("");
        $("#age").val("");
        $("#phoneNumber").val("");
        $("#email").val("");
        $("#classes").val("");

        // Call the addUser function to store the user object.
        addUser(userObj);
    });

    // Attach a click event handler to the #getName button to retrieve and display user data.
    $("#getName").on("click", (e) => {
        getUser();
    })
}

// This function adds a user object to local storage.
export function addUser(user) {
    let allUsers = JSON.parse(localStorage.getItem("Classes"));
    allUsers.push(user);
    localStorage.setItem("Classes", JSON.stringify(allUsers));
}

// This function retrieves user data from local storage and displays it on the page.
export function getUser() {
    // Clear existing content
    $(".home-content-displayinfo").empty(); 

    let allUsers = JSON.parse(localStorage.getItem("Classes")) || [];

    // Iterate through the user data and display it on the page.
    $.each(allUsers, (idx, user) => {
        $(".home-content-displayinfo").append(`
            <div class="user-info">
                <span>Name: ${user.fName} ${user.lName}</span>
                <span>Age: ${user.age}</span>
                <span>Phone Number: ${user.pNum}</span>
                <span>Email: ${user.email}</span>
                <span>Classes: ${user.classes.map(cls => cls.className).join(', ')}</span>
            </div>
        `);
    });
}

// This function checks if local storage is available and initializes it if not.
export function connectToStorage() {
    if (localStorage) {
        let classes = localStorage.getItem("Classes");
        if (classes === null) {
            localStorage.setItem("Classes", "[]"); // Initialize with an empty array
        }
    } else {
        console.log("no storage detected");
    }
}
