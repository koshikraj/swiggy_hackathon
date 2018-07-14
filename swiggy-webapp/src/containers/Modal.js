import React, { Component } from 'react';
// import {getMenuList} from "../api/getMenuList.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import '../App.css';
import source from '../source.png';
import market from '../market.png';
import Avatar from '@material-ui/core/Avatar';
import {Timeline, TimelineEvent} from 'react-event-timeline'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';

const IconList = {0:source, 1:market}

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class Modal extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      open: false,
      ingredients:null,
      active_ingredient:null,
      openselect:false,
    };
    this.ChangeState = this.ChangeState.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.RenderTimeStamp = this.RenderTimeStamp.bind(this);
  }

  handleClickOpen = () => {
  	this.getIngredients(this.ChangeState, this.props.ItemData)
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getIngredients(callback, data){
  	let list = []
  	for (let i in data.ingredients){
  		list.push(data.ingredients[i]["ingredient_id"])
  	}
  	let str = list.toString()
    fetch("https://demo9648162.mockable.io/ingredients?list=" + str, 
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
        	// alert(response)
            if (response.status) {
                callback('ingredients',response.data);
            }else{
                callback('ingredients',null);
            }
        })
        .catch(function(error) {});
  }

  ChangeState(key, value){
    this.setState({[key]:value})
  }

  RenderTimeStamp(){
  	if(this.state.active_ingredient){
  		let _ingredients_chain = this.state.ingredients[this.state.active_ingredient]
  		let _ReturnTimeStamp = []
  		for(let i in _ingredients_chain){
  			_ReturnTimeStamp.push(<TimelineEvent
						style={{paddingBottom:30}}
						title={_ingredients_chain[i].owner_name}
				        createdAt={_ingredients_chain[i].time_stamp}
				        icon={<img style={{width:40}} src={IconList[i]}/>}
				    >
				    </TimelineEvent>)
  		}
  		return(
		<Timeline>{_ReturnTimeStamp}</Timeline>
  		)
  	}
  	else{
  		return null
  	}

  }

  handleSelectChange(event){
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSelectClose = () => {
    this.setState({ openselect: false });
  };

  handleSelectOpen = () => {
    this.setState({ openselect: true });
  };


  render() {
  	// alert(JSON.stringify(this.state))
  	const classes  = this.props;
    return (
      <div>
      <Avatar onClick={this.handleClickOpen} alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnFwLX-S70L4CGd5tUFGZCa_rDFEnUY8_l7LK3Ykl4SETp3YtE" className="avatar" />
      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle style={{paddingLeft:100,paddingRight:100}}>{"Where our ingredients are from"}</DialogTitle>
        <DialogContent style={{paddingLeft:100}}>
        	{(this.state.ingredients)?
        		<div>
        		<div>{this.props.ItemData.item_name}</div>
        	        	<div style={{paddingTop:30}}>
        	        	<FormControl className={classes.formControl}>
				          <InputLabel style={{fontSize:20}} htmlFor="demo-controlled-open-select">Ingredients</InputLabel>
				          <Select
				            open={this.state.openselect}
				            onClose={this.handleSelectClose}
				            onOpen={this.handleSelectOpen}
				            value={this.state.active_ingredient}
				            onChange={this.handleSelectChange}
				            inputProps={{
				              name: 'active_ingredient',
				              id: 'demo-controlled-open-select',
				            }}
				          >
				            {this.props.ItemData.ingredients.map(name => (
							      <MenuItem
							        value={name.ingredient_id}
							      >
							        {name.ingredient_name}
							      </MenuItem>
							    ))}
				          </Select>
				        </FormControl>
        	        	</div>
        	        	<div style={{paddingTop:20}}>{this.RenderTimeStamp()}</div>
        	        	</div>
        	        	:'LoAdInG'}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Modal;
