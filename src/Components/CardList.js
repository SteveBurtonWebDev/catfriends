import React from 'react';
import Card from './Card';

const CardList = ( { animals }) => {
    return (
        <div>
            {
               animals.map((user, i) => {
                    return (
                        <Card
                        key={i}
                        id ={animals[i].id}
                        name={animals[i].name}
                        email = {animals[i].email}
                        />
                    );
                 })
            }                 
        </div>
    );

}

export default CardList;