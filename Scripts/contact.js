(function (core) {
    
    class Contact
    {
        // Public properties (getters and setters)
        get FullName()
        {
            return this.m_fullName;
        }
    
        set FullName(fullName)
        {
            this.m_fullName = fullName;
        }
    
        get ContactNumber()
        {
            return this.m_contactNumber;
        }
    
        set ContactNumber(contactNumber)
        {
            this.m_contactNumber = contactNumber;
        }
    
        get EmailAddress()
        {
            return this.m_emailAddress;
        }
    
        set EmailAddress(emailAddress)
        {
            this.m_emailAddress = emailAddress;
        }
    
        // Constructor
        constructor(fullName = "", contactNumber = "", emailAddress = "") // Default parameters
        {
            this.FullName = fullName;
            this.ContactNumber = contactNumber;
            this.EmailAddress = emailAddress;
        }
    
        // public methods
        serialize()
        {
            if(this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "")
            {
                return `${this.FullName},${this.ContactNumber},${this.EmailAddress}`;
            }
            else
            {
                console.error("One or more properties of the Contact are missing or empty");
                return null;
            }
        }
    
        // Assume that data is a comma-separated list of properties (strings)
        deserialize(data)
        {
            let propertyArray = data.split(",");
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }
    
        // Public overrides
        toString()
        {
            return `Full Name: ${this.FullName}\nContact Number: ${this.ContactNumber}\nEmail Address: ${this.EmailAddress}`;
        }
    
    }

    core.Contact = Contact;
})(core || (core = {}));



