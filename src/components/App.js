import React, {PropTypes} from 'react';
import Header from './common/Header'
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            badge: 10
        };
    }
    render(){
        return(
            <div className="container-fluid">
            <Header myVal={this.state.badge}/>
                {this.props.children}
            </div>
        );
    }
}
App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;