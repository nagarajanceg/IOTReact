import React from 'react';

class Notification extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
        Notification.formatDate = Notification.formatDate.bind(this);
        this.closeAction = this.closeAction.bind(this);
    }
    closeAction(event){
        console.log("close Action", event, this);
        // this.re
    }
    componentDidMount(){
        let self = this;
        fetch("http://127.0.0.1:5000/fetchNotifications",{}).then(function (response) {
            console.log("my notifications",response);
            return response.json();
        }).then(function (result) {
            console.log(result);
            if(result.status){
                self.setState({
                    data: result.notifications
                })
            }
            console.log(self.state);
        }).catch(function (error) {
            console.log("error ==>",error);
        })

    }
    static formatDate(date) {
        date = new Date(date);
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var time = date.getHours() +':' +(date.getMinutes()<10 ? 0+''+date.getMinutes(): date.getMinutes());

        return time +' '+ monthNames[monthIndex] + ' '+ day + ' '  + year;
    }
    render(){
        return (<div className="jumbotron">
                <h3> Heater Notification History</h3>
                <ul className="list-group">
                    {
                        this.state.data.map(e => (
                            <li className="list-group-item list-group-item-info">
                                {e.message} | {Notification.formatDate(e.created_at)}
                                <span className="close" onClick={this.closeAction.bind(this)}>×</span>
                            </li>
                        )
                    )}
                </ul>
            </div>
        );
    }
}

export default Notification;