(function (core) {

    class User
    {
        // getters and setters
        get DisplayName()
        {
            return this.m_displayName;
        }
        set DisplayName(name)
        {
            this.m_displayName = name;
        }

        get EmailAddress()
        {
            return this.m_emailAddress;
        }

        set EmailAddress(email_address)
        {
            this.m_emailAddress = email_address;
        }

        get Username()
        {
            return this.m_username;
        }

        set Username(username)
        {
            this.m_username = username;
        }

        get Password()
        {
            return this.m_password;
        }

        set Password(password)
        {
            this.m_password = password;
        }

        // Constructor
        constructor(displayName = "", emailAddres = "", userName = "", password = "")
        {
            this.DisplayName = displayName;
            this.EmailAddress = emailAddres;
            this.Username = userName;
            this.Password = password;
        }


        // method overrides
        toString()
        {
            return `Display Name    : ${this.DisplayName}\nEmail Address : ${this.EmailAddress} \nUsername : ${this.Username}`;
        }

        // Utiility methods

        // Returns a JSON object
        toJSON()
        {
            return{
                "DisplayName": this.DisplayName,
                "EmailAddress": this.EmailAddress,
                "Username": this.Username
            }
        }

        fromJSON(data)
        {
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }

        // Serialize method
        // Return a string of object or a null
        serialize()
        {
            if(this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "")
            {
                return `${this.DisplayName},${this.EmailAddress},${this.Username}`;
            }
            else
            {
                // Throw an error in console
                console.error("One or more properties of the User is empty");
                return null;
            }
        }

        // Deserialize method
        // Adds object to property array
        deserialize(data)
        {
            let propertyArray = data.split(",");

            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
        }


    }

    core.User = User;



})(core || (core={}));