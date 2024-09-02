import conn from "../utils/db.js";

const bookAppointment = (req, res) => {
    console.log("Hello", req.body);

    // Start a transaction
    conn.beginTransaction((err) => {
        if (err) {
            console.error("Error starting transaction:", err);
            return res.status(500).json({ status: false, Error: "Transaction error" });
        }

        // Lock the time slot for update
        console.log("Loking")
        conn.query(
            "SELECT COUNT(*) as bookingCount FROM appointments WHERE BranchID = ? AND Date = ? AND SlotTime = ? AND Status = 'Booked' FOR UPDATE",
            [req.body.bookingData.branchId, req.body.bookingData.date, req.body.bookingData.slot],
            (err, rows) => {
                if (err) {
                    console.error("Error selecting booking count:", err);
                    return conn.rollback(() => {
                        res.status(500).json({ status: false, Error: "Database error" });
                    });
                }
                console.log("counting",rows[0].bookingCount)
                const bookingCount = rows[0].bookingCount;

                if (bookingCount >= 2) {
                    return conn.rollback(() => {
                        console.log("Returning")
                        res.status(400).json({ status: false, Error: "This time slot is fully booked. Please choose another slot." });
                    });
                }
                console.log("continuing")

                // Proceed with booking if the slot is not full
                conn.query("SELECT ID FROM customers WHERE UserID=?", [req.body.bookingData.userId], (err, rows) => {
                    if (err) {
                        console.error("Error selecting customer ID:", err);
                        return conn.rollback(() => {
                            res.status(500).json({ status: false, Error: "Database error" });
                        });
                    }

                    if (rows.length === 0) {
                        return conn.rollback(() => {
                            res.status(404).json({ status: false, Error: "Customer not found" });
                        });
                    }

                    const CustomerID = rows[0].ID;

                    // Insert into appointments
                    conn.query(
                        "INSERT INTO `saloon`.`appointments` (`CustomerID`, `BranchID`, `Date`, `Status`, `SlotTime`) VALUES (?, ?, ?, 'Booked', ?)",
                        [CustomerID, req.body.bookingData.branchId, req.body.bookingData.date, req.body.bookingData.slot],
                        (err, result) => {
                            if (err) {
                                console.error("Error inserting appointment:", err);
                                return conn.rollback(() => {
                                    res.status(500).json({ status: false, Error: "Database error" });
                                });
                            }

                            const AppointmentID = result.insertId;

                            // Insert into appointmentservices
                            const services = req.body.bookingData.services;
                            
                            const serviceQueries = Array.isArray(services) ? services : [services];

                            let serviceInsertPromises = serviceQueries.map(service => {
                                console.log("getting :",service)
                                return new Promise((resolve, reject) => {
                                    conn.query("INSERT INTO appointmentservices (AppointmentID, ServiceID) VALUES (?, ?)", [AppointmentID, service.sId], (err, result) => {
                                        if (err) {
                                            console.error("Error inserting service:", err);
                                            return reject(err);
                                        }
                                        resolve(result);
                                    });
                                });
                            });

                            Promise.all(serviceInsertPromises)
                                .then(() => {
                                    // Insert into payments
                                    conn.query(
                                        "INSERT INTO payments (AppointmentID, Amount, PaymentMode) VALUES (?, ?, ?)",
                                        [AppointmentID, req.body.bookingData.totalAmount, req.body.bookingData.paymentMode],
                                        (err, result) => {
                                            if (err) {
                                                console.error("Error inserting payment:", err);
                                                return conn.rollback(() => {
                                                    res.status(500).json({ status: false, Error: "Database error" });
                                                });
                                            }

                                            // Commit the transaction
                                            conn.commit((err) => {
                                                if (err) {
                                                    console.error("Error committing transaction:", err);
                                                    return conn.rollback(() => {
                                                        res.status(500).json({ status: false, Error: "Transaction commit error" });
                                                    });
                                                }

                                                return res.status(201).json({ status: true, result });
                                            });
                                        }
                                    );
                                })
                                .catch((err) => {
                                    // Handle error and rollback
                                    console.error("Error during service insertion:", err);
                                    return conn.rollback(() => {
                                        res.status(500).json({ status: false, Error: "Service insertion error" });
                                    });
                                });
                        }
                    );
                });
            }
        );
    });
};

export default bookAppointment;
