import React from 'react';
import axios from 'axios';

class HomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            min:'',
            max:'',
            status:false
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
        this.setState({status: !this.state.status});
    }
    onClickSave(event){
        event.preventDefault();
        // axios.get('http://127.0.0.1:5000/hello').then((response) =>{
        //     console.log("here");
        //     console.log(response);
        //     console.log(response.data)
        // });

        axios.post('http://127.0.0.1:5000/setTemp',{status:this.state.status, min: this.state.min, max:this.state.max}).then((result) => {
            console.log("succcccccccc", result);
        })
    }

    componentDidMount(){
        fetch("http://127.0.0.1:5000/hello",{}).then(function (response) {
            console.log("my response",response);
            return response.json();
        }).then(function (result) {
            console.log(result);
        })
    }

    render(){
        return (<div className="jumbotron">
                <h1> Device Name</h1>
                <button type ="button" className ="btn btn-primary" onClick={this.onClickStart}> start</button>
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