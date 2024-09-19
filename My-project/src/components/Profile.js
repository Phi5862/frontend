import React from 'react';

// const user = {
//     firstName : 'Phirapat',
//     lastName : 'Buakhao',
//     imageUrl : 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww'
// }

function Profile(prop){
    const p = prop.data
    return(
        <div>
            <h1> My Profile </h1>
            <h3> {p.firstName} {p.lastName} </h3>
            <img src = {p.imageUrl} ></img>
    
        </div>
    )
}

export default Profile