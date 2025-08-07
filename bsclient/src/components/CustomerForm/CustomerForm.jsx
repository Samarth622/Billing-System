const CustomerForm = ({
  customerName,
  setCustomerName,
  customerMobile,
  setCustomerMobile,
}) => {
  return (
    <div className="p-3">
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customerName" className="col-4">
            Customer Name
          </label>
          <input
            type="text"
            name="customerName"
            id="customerName"
            className="form-control form-control-sm"
            onChange={(e) => setCustomerName(e.target.value)}
            value={customerName}
          />
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customerMobile" className="col-4">
            Customer Mobile
          </label>
          <input
            type="text"
            name="customerMobile"
            id="customerMobile"
            className="form-control form-control-sm"
            onChange={(e) => setCustomerMobile(e.target.value)}
            value={customerMobile}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
