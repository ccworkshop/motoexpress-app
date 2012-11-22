/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor

    initialize: function() {
 
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(this.populateDB, this.errorCB, this.successCB);

        this.db=db;       

        this.db.transaction(this.initQuery, this.errorCB);



        this.bindEvents();

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        $(".btn.save").on('click', this.doSave);






    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');
        
        //取得 gps location
        // if(navigator.geolocation) {
        //     // This is the specific PhoneGap API call
        //     navigator.geolocation.getCurrentPosition(function(p) {
        //         // p is the object returned
        //         alert('Latitude '+p.coords.latitude);
        //         alert('Longitude '+p.coords.longitude);
        //     }, function(error){
        //         alert("Failed to get GPS location");
        //     });
        // } else {
        //     alert("Failed to get GPS working");
        // }


        console.log('Received Event: ' + id);
    },
    doLogin: function(){
       $.ajax({ 
            type: "GET",
            dataType: "json",
            url: "http://localhost:8080/motoExpress/user/login.json",
            data: $("form").serialize(),
             success: function(data){        
                alert(data.success);
             }
        });
        return false;


    },
    doSave:function (){
        console.log("doSave")
    },
    loadData:function(){

    },
    populateDB:function(tx) {
         tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data,type)');
         // tx.executeSql('INSERT INTO DEMO (id, data,type) VALUES (1, "First row")');
         // tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    },
    errorCB:function(err) {
        alert("Error processing SQL: "+err.code);
    },
    successCB:function(err) {
        alert("success!");
    },
    iniQquerySuccess:function(tx, results){
        var len = results.rows.length;
        console.log("DEMO table: " + len + " rows found.");
        for (var i=0; i<len; i++){
            console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
        }
    },
    initQuery:function(tx){
        tx.executeSql('SELECT * FROM DEMO', [], this.iniQquerySuccess, this.errorCB);
    }
};



