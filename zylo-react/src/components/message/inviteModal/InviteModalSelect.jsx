import React from 'react'
import { InviteSearchBody } from './inviteSearch/InviteSearchBody'
import { InviteMarksBody } from './inviteMarks/InviteMarksBody'


export const InviteModalSelect = () => {
  return (
    <>
        {/* 사용자 검색 목록 */}
        <InviteSearchBody />
        <InviteMarksBody />
    </>
  )
}
