import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import TableCell from "@mui/material/TableCell"
import { Link } from "react-router-dom"

import Layout from "../Layout/Layout"
import { monthStart, currentDate, fromToPayload } from "../../utils/constants"
import {
    VIEW_OWN_REPORT,
    headerAllSite as header,
    headerKeyAllSite as headerKey,
} from "./constants"
import { getReports } from "../../containers/Reports/action"
import { API } from "../../APIs/APIs"

const AllSite = (props) => {
    let { getReports } = props
    const [from, setFrom] = useState(monthStart)
    const [to, setTo] = useState(currentDate)
    let { loading, report } = props.reports

    const handleGo = () => {
        getReports({
            url: API.GET_ALL_SITE_REPORT,
            ...fromToPayload(from, to)
        })
    }

    useEffect(() => {
        handleGo()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const tableRow = header.map((headCell) => (
        <TableCell style={{ fontWeight: "600" }} key={headCell}>
            {headCell}
        </TableCell>
    ))

    const tableBodyFunc = (row) => {
        return headerKey.map((headVal) => {
            return <TableCell key={headVal}>
                {headVal === "location" ?
                    <Link to={VIEW_OWN_REPORT(row._id)}>{row[headVal]}</Link> :
                    row[headVal]}
            </TableCell>
        })
    }

    let data = report
    // If loading is false, and report has not been updated yet
    if (!loading && !Array.isArray(report)) data = []

    return (
        <Layout
            title="All Site Report"
            mssgTitle="Site"
            loading={loading}
            selectedFrom={from}
            selectedTo={to}
            data={data}
            handleGo={handleGo}
            tableRow={tableRow}
            tableBodyFunc={tableBodyFunc}
            setSelectedFrom={setFrom}
            setSelectedTo={setTo}
            defaultRowsPerPage={10}
        />
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
        getReports
    })(AllSite)
)
