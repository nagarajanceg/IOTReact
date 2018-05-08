import React from 'react';
import axios from 'axios';

class HomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            min:'',
            max:'',
            status:'',
            text:''
        };
        this.handleMinChange = this.onHandleMinChange.bind(this);
        this.handleMaxChange = this.onHandleMaxChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        this.onClickStart = this.onClickStart.bind(this);
    }
    onHandleMinChange(event){
        this.setState({min: event.target.value});
    }
    onHandleMaxChange(event){
        this.setState({max: event.target.value});
    }
    onClickStart(event){
        let start = this.state.status;

        axios.post('http://127.0.0.1:5000/startDevice', {status: !start}).then((result) =>{
            console.log("status update success", result);
        });
        if(!start){
            this.setState({status: !start, text:'Stop'});
        }else{
            this.setState({status: !start, text:'Start'});
        }

    }
    onClickSave(event){
        event.preventDefault();
        if(this.state.max > 120){
            alert("Set temperature less than 120F");
            return;
        }
        if(this.state.min < 5){
            alert("Set temperature greater than 5F");
            return;
        }
            axios.post('http://127.0.0.1:5000/setTemp',{name: 'Heater',status:this.state.status, min: this.state.min, max:this.state.max}).then((result) => {
            console.log("success", result);
        })
    }

    componentDidMount(){
        let self = this;
        fetch("http://127.0.0.1:5000/getSetting",{}).then(function (response) {
            console.log("my response",response);
            return response.json();
        }).then(function (result) {
            console.log(result);
            let status = result.setting[0].state;
            if(status){
                self.setState({
                    status: status,
                    text:'Stop'
                });
            }else{
                self.setState({
                    status: status,
                    text:'Start'
                });
            }

        })
    }

    render(){
        return (<div className="jumbotron">
                <h3> Heater </h3>
                <button type ="button" className ="btn btn-primary" onClick={this.onClickStart}> {this.state.text}</button>
                <form onSubmit={this.onClickSave}>
                    <label>
                        <p>Min:</p>
                        <input type="text" value={this.state.min} onChange={this.handleMinChange} />
                    </label>
                    <label>
                        <p>Max:</p>
                        <input type="text" value={this.state.max} onChange={this.handleMaxChange} />
                    </label>
                    <input type="submit" value="Submit" className ="btn btn-primary" />
                </form>
            </div>
        );
    }
}

export default HomePage;