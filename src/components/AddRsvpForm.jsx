import { useState } from "react";

const AddRsvp = ({eventsId}) =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ message, setMessage ] = useState("");

    const handleRsvp = async(e) =>{
        e.preventDefault();
        if(!name || !email) {
            return setMessage("Please enter your details.")
        }
        try{
            const response = await fetch(`https://meetup-app-orcin.vercel.app/events/${eventsId}/rsvp`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({name, email})
                });

                if(response.ok){
                    setMessage("RSVP Successfully!")
                    setName("")
                    setEmail("")
                }else{
                    setMessage("Failed to RSVP. Please try again.")
                }
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div>
            <form onSubmit={handleRsvp}>
                <label>Enter Your Name:</label>
                <br />
                <input type="text" name="Name" value={name} onChange={(event)=> setName(event.target.value)} className="form-control mb-2"/>
                <br /><br />
                <label >Enter Your Email: </label>
                <br />
                <input type="text" name="Email" value={email} onChange={(event) => setEmail(event.target.value)} className="form-control mb-2" />
                <br /><br />
                <button type="submit" className="btn btn-primary">RSVP</button>
                {message && <p className="mt-2">{message}</p> }

            </form>
        </div>
    )

}

export default AddRsvp;