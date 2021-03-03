import { Button } from 'antd';
import { Fragment } from 'react';
import {useParams} from 'react-router-dom';
import { connect } from 'react-redux'
import { Typography } from 'antd'
import { useHistory } from "react-router-dom";
const DetailPage = ({contacts}) =>{
    const history = useHistory();
    const { key } = useParams()
    const oneContact = contacts.find(
      (contact) => contact.key)
    console.log("One Contact: ",oneContact)
    console.log("Key: ",typeof(key),key)
    return(
      <Fragment>
        <h1>Key: {key}</h1>
        <div>
        <Typography.Paragraph>{oneContact.stt || '---'}</Typography.Paragraph>
      </div>
      <div>
        <Typography.Paragraph>{oneContact.fullName || '---'}</Typography.Paragraph>
      </div>
      <div>
        <Typography.Paragraph>{oneContact.email || '---'}</Typography.Paragraph>
      </div>
      <div>
        <Typography.Paragraph>{oneContact.address || '---'}</Typography.Paragraph>
      </div>
      <div>
        <Button onClick={() => history.push('/') } >Quay lại</Button>
      </div>
      </Fragment>
    )
}
const mapStateToProps = (state) =>{
    return {
      contacts: state.contacts && state.contacts.allContacts,
    }
  }
export default connect(mapStateToProps)(DetailPage)