import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox'
import Scroll from '../Components/Scroll'
import ErrorBoundary from '../Components/ErrorBoundary'
import './App.css';
import { setSearchField } from '../actions.js';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}


class App extends Component {
    constructor() {
        super();
        this.state = {
            animals: [],
        }
    }
    
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json())
            .then(users => this.setState({ animals: users}))   
    }
   
    render() {
        const { animals } = this.state;
        const { searchField, onSearchChange } = this.props;
        const filteredAnimals = animals.filter(animal => {
            return animal.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return  !animals.length ? 
            <h1>Loading</h1> :
            <div className ='tc'>
                <h1 className='f1'>Cat Friends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList animals={filteredAnimals}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
            ;
        }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);