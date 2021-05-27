// import "http://code.jquery.com/jquery-1.10.1.min.js";
// var $ = require('jQuery'); 
// const { JSDOM } = require( "jsdom" );

import { data } from "jquery";

// const { window } = new JSDOM( "" );
const $ = require( "jquery" )


export default class Search {
    constructor(query, type, callback) {
        this.client_id = '42e8941ace0e431e8f1bf3582bb9ccf9'; // Your client id
        this.client_secret = 'a02854db00914609b35f3c3620c2ef46'; // Your secret

        //send a POST request to get access token
        $.ajax({
            url: 'https://accounts.spotify.com/api/token',
            type: 'post',
            data: {
                grant_type: 'client_credentials'
            },
            headers: {
              Authorization	: 'Basic ' + btoa(this.client_id + ':' + this.client_secret)  //If your header name has spaces or any other char not appropriate
            },
            dataType: 'json',
            success:(data) => {
                this.access_token = data.access_token;
                this.token_type = data.token_type;
                console.log("successfully got a access token", data);
                this.result = this.get(query, type, data.access_token, data.token_type, callback);
            },
            error:(er) => {
                console.log(er);
            }
        }).then(
            () => {
                // this.result = this.get(query, type, callback);
                // console.log(this.result)
            }
        );
        // console.log(this.token_type, this.access_token)
        this.types = ["album", "artist", "playlist", "track", "show", "episode"]
    
    
    }
    get = (query, type, access_token, token_type, callback) => {
        console.log(query, type)
        let url = 'https://api.spotify.com/v1/search?q='+query+'&type='+type;
        if (this.access_token != undefined) {
            $.ajax({
                url: url,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Accept", "application/json")
                    xhr.setRequestHeader("Content-Type", "application/json")
                    xhr.setRequestHeader("Authorization", token_type + " " + access_token)
                }, 
                success: function(data){
                    callback(data);
                },
                error: function() {
                    console.log("error")
                }
            }).then(
                () => {
                    return data;
                }
            )
        }

    }

    getAccessToken = () => {
        $.ajax({
            url: 'https://accounts.spotify.com/api/token',
            type: 'post',
            data: {
                grant_type: 'client_credentials'
            },
            headers: {
              Authorization	: 'Basic ' + btoa(this.client_id + ':' + this.client_secret)  //If your header name has spaces or any other char not appropriate
            },
            dataType: 'json',
            success:(data) => {
                this.access_token = data.access_token;
                this.token_type = data.token_type;
                console.log("successfully got a access token", data.access_token);
            },
            error:(er) => {
                console.log(er);
            }
        })
    }

    getTrack = (query, callback) => {
        $.ajax({
            url: 'https://accounts.spotify.com/api/token',
            type: 'post',
            data: {
                grant_type: 'client_credentials'
            },
            headers: {
              Authorization	: 'Basic ' + btoa(this.client_id + ':' + this.client_secret)  //If your header name has spaces or any other char not appropriate
            },
            dataType: 'json',
            success:(data) => {
                this.access_token = data.access_token;
                this.token_type = data.token_type;
                console.log("successfully got a access token", data);
                this.get(query, "track", data.access_token, data.token_type, callback);
            },
            error:(er) => {
                console.log(er);
            }
        })
    }

    getTrackWithURL = (url, callback) => {
        $.ajax({
            url: 'https://accounts.spotify.com/api/token',
            type: 'post',
            data: {
                grant_type: 'client_credentials'
            },
            headers: {
              Authorization	: 'Basic ' + btoa(this.client_id + ':' + this.client_secret)  //If your header name has spaces or any other char not appropriate
            },
            dataType: 'json',
            success:(data) => {
                this.access_token = data.access_token;
                this.token_type = data.token_type;
                console.log("successfully got a access token", data.access_token);
                //search by track url
                if (this.access_token != undefined) {
                    $.ajax({
                        url: url,
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader("Accept", "application/json")
                            xhr.setRequestHeader("Content-Type", "application/json")
                            xhr.setRequestHeader("Authorization", data.token_type + " " + data.access_token)
                        }, 
                        success: function(data){
                            callback(data);
                        },
                        error: function() {
                            console.log("error")
                        }
                    })
                }
            },
            error:(er) => {
                console.log(er);
            }
        })
    }
}