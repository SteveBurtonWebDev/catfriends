import React, { Component } from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox'
import Scroll from '../Components/Scroll'
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            animals: [],
            searchfield: ''
        }
    }
    
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json())
            .then(users => this.setState({ animals: users}))   
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value});
    }
    
    render() {
        const { animals, searchfield } = this.state;
        const filteredAnimals = animals.filter(animal => {
            return animal.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return  !animals.length ? 
            <h1>Loading</h1> :
            <div className ='tc'>
                <h1 className='f1'>Cat Friends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <CardList animals={filteredAnimals}/>
                </Scroll>
            </div>
            ;
        }
};

export default App;