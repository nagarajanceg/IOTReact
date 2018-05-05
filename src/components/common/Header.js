import React, {PropTypes} from 'react';
import {Link, IndexLink } from 'react-router';

const Header =() => {
    return (
        <nav>
            <IndexLink to="/" activeClassName = "active">Home </IndexLink>
            {" | "}
            <Link to="/notification" activeClassName="active">
                <button type="button" className="btn btn-primary">
                    Notifications <span className="badge badge-light">4</span>
                </button>
            </Link>
            {" | "}
            <Link to="/about" activeClassName="active">About</Link>
        </nav>
    );
};
export default Header;