import { use, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const  [ query, setQuery ] = useState ("")

    const handleSearch = (e) =>{
        e.preventDefault();
        console.log("Search for", query)
    }
    return (
        <nav className="navbar bg-body-tertiary  bg-light border-bottom">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                Let's Connect
                </Link>
                <form className="d-flex justify-content-between" role="search" onSubmit={handleSearch} >
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={query}  onChange={(e) => setQuery(e.target.value)}/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    </div>
                    </nav>
                   )
                }

export default Header