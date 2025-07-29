import { useEffect, useState } from "react";
import axios from "axios";

const AdminCustomerView = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("/api/customers");
      console.log("Fetched Customers:", res.data);
      setCustomers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setCustomers([]);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = Array.isArray(customers)
    ? customers.filter((customer) =>
        `${customer.fullName} ${customer.email} ${customer.plan}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="main-content">
      <div className="container my-5">
        <h2 className="mb-4 text-center text-primary">All Customer Data</h2>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by name, email, or plan"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredCustomers.length === 0 ? (
          <p className="text-center text-muted">No customers found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>WhatsApp</th>
                  <th>Plan</th>
                  <th>Registered On</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr key={customer._id}>
                    <td>{index + 1}</td>
                    <td>{customer.fullName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.mobileNumber}</td>
                    <td>{customer.whatsappNumber}</td>
                    <td>{customer.plan}</td>
                    <td>
                      {new Date(customer.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCustomerView;
