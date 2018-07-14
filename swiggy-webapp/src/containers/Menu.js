import React, { Component } from 'react';
// import {getMenuList} from "../api/getMenuList.js";
import MenuCategories from "../components/MenuCategories.js"
import '../App.css';
import MenuBody from "./MenuBody";
import header from '../head.png';

class Menu extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      list: null
    };
    this.ChangeState = this.ChangeState.bind(this);
  }

  getMenuList(callback){
    fetch("http://demo9648162.mockable.io/menulist?restaurant=1", 
    {
        method: 'GET'
        // headers: {
        //     "Authorization": "Basic "+access_token,
        //     'Refresh-Token': "Basic "+refresh_token,
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json',
        // },
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            if (response.status) {
                callback('list',response.data);
            }else{
                callback('list',null);
            }
        })
        .catch(function(error) {});
  }

  componentDidMount() {
    this.getMenuList(this.ChangeState)
  }

  ChangeState(key, value){
    this.setState({[key]:value})
  }

  render() {
    return (
      <div>
      {(this.state.list)?
        <div>
        <img src={header}/>
        <MenuBody MenuCategories={this.state.list.categories}/>
        </div>
        :'LOaDiNg'}
      </div>
    );
  }
}

export default Menu;
