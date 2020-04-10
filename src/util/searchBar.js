import React, { Component } from 'react'
import {submitSearch} from '../redux/actions/userActions'
import {connect} from'react-redux'
import {Link} from 'react-router-dom'
import MuiLink from "@material-ui/core/Link";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

export class SearchBar extends Component {
    state = {
        body: '',
        submitted:false
    }
    
    handleChange = event => {//handle onChange of the button
        this.setState({ body: event.target.value });
      };
    handleChangeAfterSubmit=event=>{
        this.setState({submitted:false})
        this.setState({ body: event.target.value });
    }
      handleSubmit = event => {//handle obSubmit of the form
        event.preventDefault();
        this.setState({submitted:true})
        this.props.submitSearch(this.state.body);//redux knowledge: load the function from redux store
      };
    render() {
        const {searchResult}=this.props;
        //console.log(searchResult)-for testing
        if(searchResult.length>0&&this.state.submitted) {
            return(
                <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="who are you searching for ?"
                    onChange={this.handleChangeAfterSubmit}/>
                    <button type="submit">Submit your search</button>
                </form>
                <ul>
                    {searchResult.map(element=>
                        <div className="dropdown">
                    <Avatar src={element.imageUrl}/>
                    <Link to={`/users/${element.handle}`}>{element.handle}</Link>
                        </div>
                    )}
                </ul>
            </div>
            );
        } ;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="who are you searching for ?"
                    onChange={this.handleChange}/>
                    <button type="submit">Submit your search</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state=>({
    searchResult : state.user.search_result
}
)
export default connect(mapStateToProps,{submitSearch})(SearchBar);
