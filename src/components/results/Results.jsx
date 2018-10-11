import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import CircleProgress from 'material-ui/CircularProgress';

class Results extends React.Component {

    state = {
        open: false,
        currentImg: ''
    }

    handleOpen = (img) => {
        this.setState({
            open: true,
            currentImg: img
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        let imageListContent;
        const { images } = this.props;

        if(images) {
            imageListContent = (
                <GridList cols={3}>
                    {
                        images.map(img => 
                            <GridTile
                                title={img.tags}
                                key={img.id}
                                subtitle={
                                    <span>
                                        By <strong>{img.user}</strong>
                                    </span>
                                }
                                actionIcon={
                                    <IconButton onClick={ () => this.handleOpen(img.largeImageURL)}>
                                        <ZoomIn color="white" />
                                    </IconButton>
                                }
                            >
                            <img src={img.largeImageURL} alt=""/>
                            </GridTile>
                        )
                    }
                </GridList>
            )
        } else {
            imageListContent = <CircleProgress size={50} color="secondary" />
        }

        const actions = [
            <FlatButton label="Close" primary={true} onClick={this.handleClose} />
        ];

        return (
            <div>
                {imageListContent}
                <Dialog 
                    actions={actions}
                    modals={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                <img src={this.state.currentImg} alt="" style={{ width: '100%'}}/>
                </Dialog>
            </div>
        )
    }
}

Results.propTypes = {
    images: PropTypes.array.isRequired
}

export default Results;