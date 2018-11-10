import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import PersonFormDialog from '../PersonFormDialog/PersonFormDialog';
import Grid from '@material-ui/core/Grid';
import People from '@material-ui/icons/People';
import EmailIcon from '@material-ui/icons/Email';
import FaceIcon from '@material-ui/icons/Face';
import styles from './PersonListItem.css';
import DeleteDialog from '../../../App/components/DeleteDialog/DeleteDialog';
import Assignment from '@material-ui/icons/Assignment';

class PersonListItem extends Component {
  state = { openDelete: false };

  handleOpenDelete = () => {
    this.setState({ openDelete: true });
  };

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  handleDelete = () => {
    this.props.onDelete()
    this.handleCloseDelete();
  };

  render() {
    const propsPerson = this.props.person;
    const propsIntlMessages = this.props.intl.messages;
    const textDelete = this.props.person.surname + ', ' + this.props.person.name;
    return (
      <div>
        <ExpansionPanel className={styles['paper-description']}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Grid container spacing={24}>
              <Grid item xs={4}>
                <div className={styles['primiry-heading']}>
                  <FaceIcon/> <div className={styles['detail-item']}><strong>{this.props.person.surname} , {this.props.person.name}</strong></div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={styles['secondary-heading']}>
                  <EmailIcon/> <div className={styles['detail-item']}>{this.props.person.email}</div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={styles['secondary-heading']}>
                  <People/> <div className={styles['detail-item']}>{this.props.person.type}</div>
                </div>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container justify={this.props.sorted}>
              {Object.keys(propsPerson)
                .map(function (key) {
                  if ((propsPerson[key].length > 0)) {
                    switch (key) {
                      case 'dni':
                        return <Chip key={key} label={propsIntlMessages.dni.toString().toUpperCase() + ': ' + propsPerson[key]}/>;
                      case 'address':
                        return <Chip key={key} label={propsIntlMessages.address.toString().toUpperCase() + ': ' + propsPerson[key]}/>;
                      case 'telephone':
                        return <Chip key={key} label={propsIntlMessages.telephone.toString().toUpperCase() + ': ' + propsPerson[key]}/>;
                      case 'birthDate':
                        return <Chip key={key} label={propsIntlMessages.birthDate.toString().toUpperCase() + ': ' + propsPerson[key].substr(0, 10)}/>;
                      case 'cellphone':
                        return <Chip key={key} label={propsIntlMessages.cellphone.toString().toUpperCase() + ': ' + propsPerson[key].substr(0, 10)}/>;
                      case 'profession':
                        return <Chip key={key} label={propsIntlMessages.profession.toString().toUpperCase() + ': ' + propsPerson[key]}/>;
                      case 'professionPlace':
                        return <Chip key={key} label={propsIntlMessages.professionPlace.toString().toUpperCase() + ': ' + propsPerson[key]}/>;
                      case 'birthPlace':
                        return <Chip key={key} label={propsIntlMessages.birthPlace.toString().toUpperCase() + ': ' + propsPerson[key].substr(0, 10)}/>;
                      default:
                        return null;
                    }
                  } else {
                    return null;
                  }
                })}
            </Grid>
          </ExpansionPanelDetails>
          <Divider/>
          <ExpansionPanelActions>
            <PersonFormDialog personAction={this.props.onEdit} editMode={true} person={this.props.person}/>
            <Button onClick={this.handleOpenDelete} mini variant="fab" color="secondary" aria-label="delete">
              <DeleteIcon/>
            </Button>
            <DeleteDialog id={this.props.person._id} text={textDelete} openDialog={this.state.openDelete} deleteAction={this.handleDelete} closeAction={this.handleCloseDelete}/>
            {(this.props.person.type === 'Alumno') ? <Button onClick={this.handleOpenDelete} mini variant="fab" aria-label="Inscribir"> <Assignment /> </Button> : null}
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

PersonListItem.propTypes = {
  person: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    cellphone: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    profession: PropTypes.string.isRequired,
    professionPlace: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  sorted: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PersonListItem);
