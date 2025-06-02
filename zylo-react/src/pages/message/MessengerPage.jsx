import React from 'react'
import Messenger from '../../components/message/mainMessage/Messenger'
import { MessengerLayout } from '../../layouts/MessengerLayout'

export const MessengerPage = () => {
  return (
    <MessengerLayout>
      <Messenger />
    </MessengerLayout>
    
  )
}
