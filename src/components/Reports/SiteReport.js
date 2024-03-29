import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { withRouter } from "react-router"
import TableCell from "@mui/material/TableCell"

import { ROUTES, monthStart, currentDate, fromToPayload } from "../../utils/constants"
import {
    getReports,
    downloadReports
} from "../../containers/Reports/action"
import LayoutView from "../Layout/LayoutView"
import {
    checkBoxCondition,
    getLabelIdValue,
} from "../../utils/utilities"
import CustomTableOutput from "../CustomComponents/CustomTableOutput/CustomTableOutput"
import {
    headerSite as header,
    headerKeySite as headerKey,
    filterData
} from "./constants"
import { API } from "../../APIs/APIs"

const SiteReport = (props) => {
    const history = props.history
    const [search, setSearch] = useState("")
    const [from, setFrom] = useState(monthStart)
    const [to, setTo] = useState(currentDate)
    const params = useParams()
    const { siteId } = params
    let { loading, report, downloadLoading } = props.reports
    const { getReports } = props
    //const user = props?.user?.user
    let tableData = filterData(report?.records, search)

    let fields = []
    let selected = []

    // Fields and values to show Opening Balance, Closing Balance, Period Credit and Debit
    fields = [
        getLabelIdValue("Opening Balance", "openingBal"),
        getLabelIdValue("Closing Balance", "closingBal"),
        getLabelIdValue("Period Credit", "periodCred"),
        getLabelIdValue("Period Debit", "periodDeb"),
        getLabelIdValue("Office Expense", "officeExpense"),
        getLabelIdValue("Vehicle Expense", "vehicleExpense"),
        getLabelIdValue("Trip Expense", "tripExpense"),
        getLabelIdValue("No. Of Trips", "noOfTrips"),
    ]

    const handleGo = () => {
        getReports({
            siteId,
            url: API.GET_SITE_REPORT,
            ...fromToPayload(from, to)
        })
    }

    useEffect(() => {
        handleGo()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleBack = () => {
        if (history.length) history.goBack()
        else history.push(ROUTES.REPORTS)
    }

    const handleDownload = () => {
        props.downloadReports({
            siteId,
            url: API.DOWNLOAD_SITE_REPORT,
            ...fromToPayload(from, to)
        })
    }

    const tableRow = header.map((headCell) => (
        <TableCell style={{ fontWeight: "600" }} key={headCell}>
            {headCell}
        </TableCell>
    ))

    const tableBodyFunc = (row) => {
        return headerKey.map((headVal) => {
            return (
                <TableCell key={headVal}>
                    {row[headVal]}
                </TableCell>
            )
        })
    }

    return (
        <LayoutView
            title={report?.siteName ?? siteId}
            loading={loading}
            data={report}
            viewFields={fields}
            search={search}
            setSearch={setSearch}
            selectedFrom={from}
            setSelectedFrom={setFrom}
            handleGo={handleGo}
            selectedTo={to}
            setSelectedTo={setTo}
            handleBack={handleBack}
            numSelected={selected}
            downloadLoading={downloadLoading}
            handleDownload={handleDownload}
        >

            <CustomTableOutput
                data={tableData}
                mssgTitle="Entry"
                loading={loading}
                tableRow={tableRow}
                tableBodyFunc={tableBodyFunc}
                //tableStyle={{ tableLayout: "fixed", wordWrap: "break-word" }}
                //numSelected={numSelected}
                //setNumSelected={setNumSelected}
                checkBoxCondition={checkBoxCondition}
                selectedFrom={setFrom}
                selectedTo={setTo}
            />
        </LayoutView>
    )
}

const mapStateToProps = (state) => {
    return {
        reports: state.reports,
        user: state.user
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getReports,
        downloadReports
    })(SiteReport)
)
