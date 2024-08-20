import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../Services/Axios";
import { toast } from "react-toastify";

const UpdateTracking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const data = query.get('data');
    const object = data ? JSON.parse(decodeURIComponent(data)) : null;

    // React States to manage form fields
    const [productName, setProductName] = useState();
    const [progress, setProgress] = useState();
    const [costDescription, setCostDescription] = useState();
    const [cost, setCost] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [status, setStatus] = useState();

    // Effect to set form fields with existing data on component mount
    useEffect(() => {
        if (object) {
            setProductName(object.product_name || "");
            setProgress(object.progress || "");
            setCostDescription(object.cost_description || "");
            setCost(object.cost || 0);
            setStartTime(object.start_time || "");
            setEndTime(object.end_time || "");
            setStatus(object.status || "upcoming");
        }
    }, [object]);

    // Function to handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("contract", object.id);
        formData.append("product_name", productName);
        formData.append("progress", progress);
        formData.append("cost_description", costDescription);
        formData.append("cost", cost);
        formData.append("start_time", startTime);
        formData.append("end_time", endTime);
        formData.append("status", status);

        try {
            // Make a POST request to update tracking data
            const { data } = await api.post(`post_tracking/${object.id}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Tracking Data Updated Successfully");
            navigate("/admin/contracts");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred during Updating Tracking Data.");
            }
        }
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-xl-8">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-4">Update Tracking Data</h4>
                        <form onSubmit={submitHandler}>
                            <div className="mb-3">
                                <label htmlFor="product-name-input" className="form-label">Product Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="product-name-input"
                                    onChange={(e) => setProductName(e.target.value)}
                                    value={productName}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="progress-input" className="form-label">Progress</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="progress-input"
                                    onChange={(e) => setProgress(e.target.value)}
                                    value={progress}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cost-description-input" className="form-label">Cost Description</label>
                                <textarea
                                    className="form-control"
                                    id="cost-description-input"
                                    onChange={(e) => setCostDescription(e.target.value)}
                                    value={costDescription}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cost-input" className="form-label">Cost</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="cost-input"
                                    onChange={(e) => {setCost(parseFloat(e.target.value))}}
                                    value={cost}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status-input" className="form-label">Status</label>
                                <select
                                    className="form-control"
                                    id="status-input"
                                    onChange={(e) => setStatus(e.target.value)}
                                    value={status}
                                    required
                                >
                                    <option value="upcoming">Upcoming</option>
                                    <option value="progress">In Progress</option>
                                    <option value="complete">Complete</option>
                                </select>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-lg-6">
                                    <label htmlFor="start-time-input" className="form-label">Start Time</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="start-time-input"
                                        onChange={(e) => setStartTime(e.target.value)}
                                        value={startTime}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-lg-6">
                                    <label htmlFor="end-time-input" className="form-label">End Time</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="end-time-input"
                                        onChange={(e) => setEndTime(e.target.value)}
                                        value={endTime}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-primary w-md">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTracking;
