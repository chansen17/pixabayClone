import React from 'react';
import Results from '../results/Results';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Search extends React.Component {

    state = {
        searchText: '',
        amount: '15',
        apiUrl: 'https://pixabay.com/api/',
        apiKey: '10364757-b11c8fcfc4dc617722fb8e7d2',
        images: []
    }

    handleTextChange = (e) => {
        const val = e.target.value;
        this.setState({
            [e.target.name]: val
        }, () => {
            if(val === '') {
                this.setState({
                    images: []
                })
            } else {
                fetch(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=false`)
                .then(res => res.json())
                .then(res => this.setState({
                    images: res.hits
                }))
                .catch(err => {console.log(err)})
            }
        })
    }

    handleAmountChange = (e, index, value) => {
        this.setState({
            amount: value
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <TextField 
                    name="searchText" // directly related to the state value
                    value={this.state.searchText}
                    onChange={this.handleTextChange}
                    floatingLabelText="Search for images.."
                    fullWidth={false}
                />
                <br/>
                <SelectField
                    name="amount"
                    floatingLabelText="Amount"
                    value={this.state.amount}
                    onChange={this.handleAmountChange}
                    >
                    <MenuItem value={10} primaryText="5" />
                    <MenuItem value={20} primaryText="20" />
                    <MenuItem value={30} primaryText="30" />
                    <MenuItem value={50} primaryText="50" />
                </SelectField>
                <br/>
                {
                    this.state.images.length > 0 ? ( <Results images={this.state.images}/> ) : null
                }
            </div>
        )
    }
    
}

export default Search;