import React from 'react';
import axios from 'axios';
import NewsFeed from '../components/News';
const xml2js = require('xml2js');
const builder = new xml2js.Builder();




export default function Uutiset(){

    
    return (
    <div>
        < NewsFeed />
    </div>
    );
}