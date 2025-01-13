import React from 'react'
import PlanContent from '../../../components/Plan/PlanContent'
import PlanInfoModal from '../../../components/Plan/PlanInfoModal'
import RsvInfoModal from '../../../components/Plan/RsvInfoModal'
import PlanInsertModal from '../../../components/Plan/PlanInsertModal'

const Plan = () => {
  return (
    <div>
        <PlanContent />
        <PlanInsertModal />
        <PlanInfoModal />
        <RsvInfoModal />
    </div>
  )
}

export default Plan