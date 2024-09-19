import React from 'react';
const products = [
    {id:1,
    title:'brroccoli',
    isFruit : false
    },

    {id:2,
        title:'basil',
        isFruit : false
    },

    {id:3,
        title:'apple',
        isFruit : true
    }
];

function Product(){
    return(
        <div>

            { products.map( (b) => (
            <div key = {b.id} style = {{color:b.isFruit? 'red' : 'green'}} >
                {b.title}
            </div>
            )

            )            
            }
            {/* 
            <div>
                {products[1].title}
            </div>
            <div>
                {products[2].title}
            </div> */}
        </div>
    )
}

export default Product