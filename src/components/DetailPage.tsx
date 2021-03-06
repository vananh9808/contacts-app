import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom"
import { Typography } from 'antd'
import type {ContactType} from '../ContactManage'

type Props = {
    contacts: ContactType[]
}


const DetailPage: FC<Props> = ({ contacts }) => {

    const history = useHistory()
    const  key  = useParams<number>()
    const [contact, setContact] = useState<ContactType>(Object)

    useEffect(() => {
        const oneContact: any = contacts?.find(function (e) {
            return e.key === key
        })
        setContact(oneContact)
    }, [contacts, key])
    console.log('key value:', key)
    console.log('key:', typeof(key))
    console.log('one contact:',contact)
    console.log('contact:',contacts)
    return (
        <Fragment>
            {/* <div>
                <Typography.Paragraph>{contact.stt || '---'}</Typography.Paragraph>
            </div>
            <div>
                <Typography.Paragraph>{contact.fullName || '---'}</Typography.Paragraph>
            </div>
            <div>
                <Typography.Paragraph>{contact.email || '---'}</Typography.Paragraph>
            </div>
            <div>
                <Typography.Paragraph>{contact.address || '---'}</Typography.Paragraph>
            </div> */}
            <div>
                <Button onClick={() => history.push('/')} >Quay lại</Button>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state: any) => {
    return {
        contacts: state.contacts && state.contacts.allContacts,
    }
}
export default connect(mapStateToProps)(DetailPage)