import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './App.css';

function searchingFor(search) {
    return function (x) {
        return x.Country.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            search: '',
        }

        this.searchHandler = this.searchHandler.bind(this);
    }

    componentDidMount() {
        fetch('https://api.covid19api.com/summary')
            .then(results => results.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                    search: ''
                })
            });
    }

    searchHandler(event) {
        this.setState({ search: event.target.value })
    }


    render() {

        if (!this.state.isLoaded) {
            return (<div> Loading... </div>)
        } else {
            return (<div>
                <header>
                    <a>Latest Information of Covid 19</a>
                    <input type="text" placeholder="Search Country" onChange={this.searchHandler}></input>
                    <c>Latest Update:{this.state.items.Date}</c>  
                </header>

                <table>
                    <tr>
                        <th>Country</th>
                        <th>NewConfirmed</th>
                        <th>TotalConfirmed</th>
                        <th>NewDeaths</th>
                        <th>TotalDeaths</th>
                        <th>NewRecovered</th>
                        <th>TotalRecovered</th>

                    </tr>
                    {this.state.items.Countries.filter(searchingFor(this.state.search)).map((item) => (
                        //   console.log('get',item)
                        <tr id="container" key="{key}">
                            <td>{item.Country}</td>
                            <td>{item.NewConfirmed}</td>
                            <td>{item.TotalConfirmed}</td>
                            <td>{item.NewDeaths}</td>
                            <td>{item.TotalDeaths}</td>
                            <td>{item.NewRecovered}</td>
                            <td>{item.TotalRecovered}</td>
                        </tr>

                    ))}
                </table>
            </div>
            );
        }
    }
}



export default App;
