import React, { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { withRouter } from "react-router"

import styles from "./styles.module.css"
import { formatDate, ROUTES } from "../../../utils/constants"
import {
  getVouchers,
  deleteVouchers,
} from "../../../containers/Vouchers/action"
import LayoutView from "../../Layout/LayoutView"
import { header, headerKey, EDIT_URL, viewMoreFields } from "./constants"
import PrintVoucher from "./PrintVoucher"
import {
  access,
  isOperationAllowed,
  operations,
} from "../../../utils/utilities"

const ViewVoucher = (props) => {
  const history = props.history
  const params = useParams()
  const { voucherId } = params
  let { loading, vouchers } = props.vouchers
  const { getVouchers } = props

  let fields = []
  let selected = []

  if (vouchers && !Array.isArray(vouchers)) {
    fields = header.map((head, index) => {
      return {
        label: head,
        id: headerKey[index],
        value:
          head === "Date"
            ? formatDate(vouchers[headerKey[index]])
            : head === "Paid On"
            ? vouchers.paidOn
              ? formatDate(vouchers.paidOn)
              : ""
            : null,
      }
    })
    fields = [...fields, ...viewMoreFields(vouchers)]
    selected.push(vouchers._id)
  } else vouchers = { addedBy: {} }

  useEffect(() => {
    getVouchers({ voucherId })
  }, [voucherId, getVouchers])

  const handleBack = () => {
    history.push(ROUTES.VOUCHERS)
  }

  const handleDeleteAgree = () => {
    props.deleteVouchers(selected, handleBack)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_VOUCHER)
  }

  const handleEditButton = () => {
    history.push(EDIT_URL(vouchers._id))
  }

  return (
    <React.Fragment>
      <PrintVoucher />
      <LayoutView
        title={vouchers?.diNo}
        loading={loading}
        data={vouchers}
        viewFields={fields}
        handleBack={handleBack}
        handleDeleteAgree={
          isOperationAllowed(access.VOUCHERS, operations.DELETE, vouchers) &&
          handleDeleteAgree
        }
        handleAddButton={
          isOperationAllowed(access.VOUCHERS, operations.CREATE) &&
          handleAddButton
        }
        handleEditButton={
          isOperationAllowed(access.VOUCHERS, operations.EDIT, vouchers) &&
          handleEditButton
        }
        numSelected={selected}
        print
        className={styles.viewDiv}
      />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    vouchers: state.vouchers,
  }
}

export default withRouter(
  connect(mapStateToProps, { getVouchers, deleteVouchers })(ViewVoucher)
)
