var mysql = require('mysql');
const { title } = require('process');
const connection = require('mysql/lib/Connection');
let yelpAPI = require('yelp-api');

const axios = require('axios');





let API_KEY = "Wz5WwfcG0RFGzTElCu8A0YYoeL55bGPJ54UxCqAAl1B8OusYTJX6ly99VrfaaoI1ieRCSY35GqtLeD5B_4jiMOupEI4ARMXWzn-eaJnvCub1xRZJ3JYmWgbQP401X3Yx";


documents.write('<script type=Business_Entry.js>' + '</script>')

let chosenResturants = new Array();

let queryResults = new Array();

let found = false;

//REST

//option 1:
let yelpREST = axios.create({
    baseURL: "https://api.yelp.com/v3/",
    headers: {
        Authorization: 'Bearer ${API_KEY}',
        "Content-type": "application/json",
    },
})

yelpREST(ENDPOINT, {params: {key: value} }).then(({data}) => {
    console.log(data);
})

if (document.getElementById('autocomplete') == true) {
    yelpREST("/autocomplete",{
        params: {
            terms: document.getElementsByName('terms').innerHTML,
            limit: 30,
        },
    }).then(({data}) => {
        for (i = 0; i < 30; ++i) {
            Business_Entry new_entry(data[i].name, data[i].location);
            queryResults.splice(new_entry, i);
            queryResults[i].setReviews(getReviews(data[i]));
        }
        found = true;

    }).catch(function (err) {
        console.error(err);
    });
}
else {
    if (document.getElementsByName('location') != null && document.getElementsByName('term') == null) {
        yelpREST("/businesses/search", {
            params: {
                location: document.getElementsByName('location'),
                limit: 30,
            },
        }).then(({ data }) => {
            found = true;
        }).catch(function (err) {
            console.error(err);
        });
    
    }
    if (document.getElementsByName('location') != null && document.getElementsByName('term') != null) {
        yelpREST("/businesses/search", {
            params: {
                location: document.getElementsByName('location'),
                location: document.getElementsByName('terms'),
                limit: 30,
            },
        }).then(({ data }) => {
            for (i = 0; i < 30; ++i) {
                Business_Entry new_entry(data[i].name, data[i].location);
                queryResults.splice(new_entry, i);
                queryResults[i].setReviews(getReviews(data[i]));
            }
            found = true;
        }).catch(function (err) {
            console.error(err);
        });
    
    }
}

function getReviews(buissness) {
    if (document.getElementById(review).innerHTML == "Yes") {
        yelpREST("/businesses/9QFiF_YBCKvWsUu50G_yxg/reviews").then(({data}) => {
            return data;
        });
    }
}


















