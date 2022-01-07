import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import LayoutAdd from "../../Layout/LayoutAdd";
import {
  addExpense,
  editExpense,
} from "../../../containers/OfficeExpense/action";
import { ROUTES } from "../../../utils/constants";

const initialExpense = {
  date: new Date().toISOString(),
  amount: 0,
  remarks: "",
};

const Office = (props) => {
  const [expense, setExpense] = useState(initialExpense);
  const { initialFields } = props;
  const history = props.history;
  const { addLoading, editLoading, loading } = props.officeExpense;

  useEffect(() => {
    if (initialFields) setExpense(initialFields);
  }, [initialFields]);

  const inputFields = [
    {
      id: "date",
      type: "date",
      handleChange: (date) => setExpense({ ...expense, date }),
      label: "Date",
      maxDate: new Date().toISOString(),
    },
    { id: "amount", type: "number", label: "Amount", required: true },
    { id: "remarks", label: "Remarks", required: true },
  ];

  const handleValueChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    history.push(ROUTES.OFFICE_EXPENSE);
  };

  const handleReset = () => {
    if (initialFields) setExpense(initialFields);
    else setExpense(initialExpense);
  };

  const handleSubmit = () => {
    const cb = () => {
      history.push(ROUTES.OFFICE_EXPENSE);
    };
    if (initialFields) props.editExpense(expense, cb);
    else props.addExpense(expense, cb);
  };

  return (
    <LayoutAdd
      title="Office Expenses"
      inputFields={inputFields}
      handleValueChange={handleValueChange}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      data={expense}
      loading={loading}
      submitLoading={addLoading || editLoading}
      edit={initialFields ? true : false}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    officeExpense: state.officeExpense,
    user: state.user,
  };
};

export default withRouter(
  connect(mapStateToProps, { addExpense, editExpense })(Office)
);
