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
type paramsType = {
    key?: string
}

const DetailPage: FC<Props> = ({ contacts }) => {
    const history = useHistory()
    const  params  = useParams<paramsType>()
    const [contact, setContact] = useState<ContactType>(Object)

    useEffect(() => {
        const oneContact: any = contacts?.find(function (e) {
            return e.key === Number(params.key)
        })
        setContact(oneContact)
    }, [contacts, params.key])
    return (
        <Fragment>
            <div>
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
            </div>
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