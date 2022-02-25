"use strict";
((function(){
     // check if user is logged in
    let protected_routes = [
        "contact-list"

    ];
     
    if (protected_routes.indexOf(router.ActiveLink) > -1)
    {
        if (!sessionStorage.getItem("user"))
        {
            // if not... redirect them to back to the login page
            location.href = "/login";
           
        }
    }

    
}))();