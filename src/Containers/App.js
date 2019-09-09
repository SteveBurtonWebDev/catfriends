import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox'
import Scroll from '../Components/Scroll'
import ErrorBoundary from '../Components/ErrorBoundary'
import './App.css';
import { setSearchField, requestCats } from '../actions.js';

const mapStateToProps = state => {
    return {
        searchField: state.searchCats.searchField,
        animals: state.requestCats.animals,
        isPending: state.requestCats.isPending,
        error: state.requestCats.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestCats: () => dispatch(requestCats())
    }
}


class App extends Component {
      
    componentDidMount() {
      this.props.onRequestCats();
    }
   
    render() {
        const { searchField, onSearchChange, animals, isPending } = this.props;
        const filteredAnimals = animals.filter(animal => {
            return animal.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return  isPending ? 
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