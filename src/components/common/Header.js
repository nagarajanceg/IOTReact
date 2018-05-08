import React, {PropTypes} from 'react';
import {Link, IndexLink } from 'react-router';

const Header =(props) => {
    return (
        <nav>
            <IndexLink to="/" activeClassName = "active">Home </IndexLink>
            {" | "}
            <Link to="/notification" activeClassName="active">
                <button type="button" className="btn btn-primary">
                    Notifications <span className="badge badge-light">{props.myVal}</span>
                </button>
            </Link>
        </nav>
    );
};
export default Header;