// IIFE -- Immediately Invoked Function Expression
// AKA -- Anonymous Self-Executing Function
(function()
{

    /**
     * This function uses AJAX to open a connection to the server and returns
     * the data payload to the callback function
     *
     * @param {string} method
     * @param {string} url
     * @param {function} callback
     */
    function AjaxRequest(method, url, callback)
    {
        // AJAX STEPS for and AJAX request
        // Step 1 - instantiate an XHR object
        let XHR = new XMLHttpRequest();

        // Step 2 - Add an event listener for ready state
        XHR.addEventListener("readystatechange", () =>
        {
            if(XHR.readyState === 4 && XHR.status === 200)
            {
                if(typeof callback === "function")
                {
                    callback(XHR.responseText);
                }
                else
                {
                    console.error("ERROR: callback not a function")
                }
            }
        });

        // Step 3 - Open a connection to the server
        XHR.open(method, url);

        // Step 4 - Send the request to the server
        XHR.send();

    }

    /**
     * This function loads the header.html content into the page
     *
     * @returns {void}
     */
    function LoadHeader()
    {

        // Use AJAX to lead the header content
        $.get("./views/components/header.html", function(html_data)
        {
            // Inject navbar into the header
            $("header").html(html_data);

            document.title = router.ActiveLink.substring(0, 1).toUpperCase() + router.ActiveLink.substring(1);

            console.log(router.ActiveLink);

            // Update active link in navbar
            $(`li>a:contains(${document.title})`).addClass("active"); 

            // Check if user is logged in
            CheckLogin();
        });
        

    }


    /**
     * 
     * 
     * @return {void}
     */
    function LoadContent()
    {
        // Alias for active link
        let pageName = router.ActiveLink;
        let callback = ActiveLinkCallBack();

        $.get(`./views/content/${pageName}.html`, function(html_data)
        {
            $("main").html(html_data);
            callback();
        });

    }
    
    /**
     *
     *@returns {void}
     */
    function LoadFooter()
    {

        $.get(`./views/components/footer.html`, function(html_data)
        {
            $("footer").html(html_data);
        });
    }

    function DisplayHomePage()
    {
        console.log("Home Page");

        // 1) Fattest Memory Footprint
        // Trying to create the about us button above with jQuery
        // jQuery way - get all elements with an id of AboutUsButton and for each element add a "click" event
        $("#AboutUsButton").on("click", function(){
            location.href = "/about";
        });

        // jQuery editing
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
        $("body").append(`<article class="container">
        <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>
        </article>`);



    }
    
    function DisplayProductsPage()
    {
        console.log("Products Page");
    }

    function DisplayServicesPage()
    {
        console.log("Services Page");
    }

    function DisplayAboutPage()
    {
        console.log("About Page");
    }


    /**
     * This function adds a Contact object to localStorage
     * 
     * @param {string} fullName 
     * @param {string} contactNumber 
     * @param {string} emailAddress 
     */
    function AddContact(fullName, contactNumber, emailAddress)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     * This function is used to validate the fields of the contact form
     * 
     * @param {string} fieldID
     * @param {RegExp} regular_expression
     * @param {string} error_message
     */
    function ValidateField(fieldID,regular_expression, error_message)
    {
        // Hide the alert message for invalid data
        let messageArea = $("#messageArea").hide()
        
        // Field Id sent
        $("#" + fieldID).on("blur", function()
        {
            // Declare value of full name
            let text_value = $(this).val();
            // tests if full name is valid
            if(!regular_expression.test(text_value))
            {
                $(this).trigger("focus").trigger("select");
                // Set alert box to danger mode
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else
            {
                // Does pass tast - resets the alert box
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function ContactFormValidation()
    {
        // Call the validation functions
        ValidateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/, "Please enter a valid Full Name.\n This must include at least a Capitalized First Name and Last Name.");
        ValidateField("contactNumber", /^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Please enter a valid Contact Number. Example: (416) 555-5555");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.");
        
    }

    function DisplayContactPage()
    {
        console.log("Contact Page");

        // Call validation function
        ContactFormValidation();

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        //$("#showContact").hide();

        sendButton.addEventListener("click", function(event)
        {
            // event.preventDefault(); // right now for testing only
            if(subscribeCheckbox.checked)
            {
                let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
                if(contact.serialize())
                {
                    let key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }

    function DisplayContactListPage()
    {


        if(localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList");

            let data = "";

            let keys = Object.keys(localStorage); // Returns a list of keys from local storage

            let index = 1;

            // for every key in the keys string array
            for(const key of keys)
            {
                let contactData = localStorage.getItem(key); // get localStorage data value 
               
                let contact = new core.Contact(); // Creates an empty contact
                contact.deserialize(contactData)

                

                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>`;

                index++;
            }

            contactList.innerHTML = data;



            $("button.delete").on("click", function()
            {
                // confirm is a yes no alert/message box
                if(confirm("Are you sure?"))
                {
                    // The value is the value up in the button aka key
                    localStorage.removeItem($(this).val())
                }
                // refresh the contact list page
                location.href = "/contact-list";
            });

            $("button.edit").on("click", function()
            {
                // adds the this.val to the hash 
                location.href = "/edit#" + $(this).val();
            })
        }

        // Add contact button on click to take us to edit.html
        $("#addButton").on("click", ()=>
        {
            location.href = "/edit#add";
        });
    }

    function DisplayEditPage()
    {
        console.log("Edit Page");

        // Call validation
        ContactFormValidation();

        // Start the page after the hashtag
        let page = location.hash.substring(1);

        // see the key on log
        console.log(page);

        switch(page)
        {
            case "add":
                {
                    // Change H1 from edit to add
                    $("main>h1").text("Add Contact");
                    // Change edit button to add 
                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);

                    $("#editButton").on("click", (event) =>
                    {
                        // Prevent default to stop the form from working
                        event.preventDefault();
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);
                        location.href = "/contact-list";
                    });


                }
                break;
            default:
                {
                    // Gets contact information from local storage
                    let contact = new core.Contact();

                    // Get the contact from the page/key
                    contact.deserialize(localStorage.getItem(page));

                    // display the contact in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    // Page is the key
                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();

                        // get changes from the page
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();
    
                        // Prevent default to stop the form from normal behaviour
                        localStorage.setItem(page, contact.serialize());
                        location.href = "/contact-list";
                    });
                    
                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "/contact-list";
                    });
                    
                }
                break;
        }
        
    }

    // Displays user login page
    function DisplayLoginPage()
    {
        console.log("Login Page");
        let messageArea =  $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function()
        {
            let success = false;
            // create an empty user object
            let newUser = new core.User();

            // uses jQuery shortcut to load the users.json file
            $.get("./Data/users.json", function(data)
            {
                // for every user in the users.json file
                for (const user of data.users) 
                {
                    // check if the username and password entered in the form matches this user
                    if(username.value == user.Username && password.value == user.Password)
                    {
                        // get the user data from the file and assign to our empty user object
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                 // if username and password matches - success.. the perform the login sequence
                if(success)
                {
                    // add user to session storage
                    sessionStorage.setItem("user", newUser.serialize());

                    // hide any error message
                    messageArea.removeAttr("class").hide();

                    // redirect the user to the secure area of our site - contact-list.html
                    location.href = "/contact-list";
                }
                // else if bad credentials were entered...
                else
                {
                    // display an error message
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Login Information").show();
                    console.log(messageArea);
                }
            });
        });

        $("#cancelButton").on("click", function()
        {
            // clear the login form
            document.forms[0].reset();

            // return to the home page
            location.href = "/home";
        });
    }

    function CheckLogin()
    {
        // if user is logged in
        if(sessionStorage.getItem("user"))
        {
            // swap out the login link for logout
            $("#login").html(
                `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
            ); 

            $("#showContact").show();

            // logout if logged in
            $("#logout").on("click", function()
            {
                // perform logout
                sessionStorage.clear();

                // redirect back to login
                location.href = "/login";

            });
        }
    }

    function Display404Page()
    {

    }
    
    function DisplayRegisterPage()
    {
        console.log("Register Page");
    }


    /**
     * This method returns the appropriate function callback
     * @returns {function}
     */
    function ActiveLinkCallBack()
    {
        switch(router.ActiveLink)
        {
            case "home": return DisplayHomePage;
            case "about": return DisplayAboutPage;
            case "products": return DisplayProductsPage;
            case "services": return DisplayServicesPage;
            case "contact": return DisplayContactPage;
            case "contact-list": return DisplayContactListPage;
            case "edit": return DisplayEditPage;
            case "login": return DisplayLoginPage;
            case "register": return DisplayRegisterPage;
            case "404": return Display404Page;
            default:
                console.error("ERROR: callback does not exist: " + ActiveLink);
                break;
        }
    }


    // Named function option
    function Start()
    {
        console.log("Welcome to my App!");

        // Adds header to all files        
        LoadHeader();


        LoadContent();

        LoadFooter();
        
    }


    // Anonymous function
    //let Start = function()
    //{
    //    console.log("App Started!");
    //}

    // Git commands/help
    // git init (initializes and creates a hidden .git folder)
    // git add . (add everything "." to the staging area)
    // git commit -m "initial commit" ("-m" sends the quoted message to the commit)
    // GitHub (Cloud service)
    // We make a remote repo and connect our local files into the cloud repo
    // establish remote
    // git remote add origin "path to remote"
    // push (upload)
    // pull (downnload)
    // git push -U origin main

    // Calls the function when the window loads using an event listener
    window.addEventListener("load", Start);
    
})();