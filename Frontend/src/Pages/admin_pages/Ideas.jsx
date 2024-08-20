import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../../Services/Axios"
import { useContext, useEffect, useState } from "react"
import { Store } from "../../Services/Store"

const Ideas = () => {
    const [idea_data, setIdeaData] = useState([])
    const {state , dispatch} = useContext(Store)
    const {UserInfo} = state
    const get_all_idea = async () => {
        try {
            const { data } = await api.get(`get_idea/${UserInfo.id}/`)
            setIdeaData(data)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        get_all_idea()
    }, get_all_idea)


    return (
        <>
             <div className="row mb-4">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-0 font-size-24 font-weight-bold text-primary">ALL IDEAS</h4>
                        <Link to="/admin/add/ideas" className="btn btn-primary">
                            <i className="bx bxs-bulb align-middle me-1"></i> ADD IDEAS
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row">
                {idea_data.length > 0 ? (
                    idea_data.map((idea) => (
                        <div className="col-md-4 mb-4" key={idea.id}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title mb-2 text-primary">ID: {idea.id}</h5>
                                    <h6 className="card-subtitle mb-3 text-muted">{idea.idea}</h6>
                                    <p className="card-text mb-1"><strong>Description:</strong> {idea.description}</p>
                                    <p className="card-text mb-1"><strong>Requested Amount:</strong> ${idea.req_amount}</p>
                                    <p className="card-text mb-1"><strong>Terms & Conditions:</strong> {idea.terms_conditions}</p>
                                    <p className="card-text mb-3"><strong>File:</strong> {idea.file}</p>
                                    <div className="mt-auto d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <Link
                                                to={`/admin/ideas/details?data=${encodeURIComponent(JSON.stringify(idea))}`}
                                                className="btn btn-primary btn-sm btn-rounded waves-effect waves-light me-2"
                                            >
                                                View
                                            </Link>
                                            <a
                                                href={`http://127.0.0.1:8000/${idea.file}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-info btn-sm btn-rounded waves-effect waves-light me-2"
                                            >
                                                View File
                                            </a>
                                        </div>
                                        <div className="btn-group">
                                            {UserInfo.category === 'investor' && !checking.some(contract => contract.idea.id === idea.id) ? (
                                                <button
                                                    onClick={() => { createContract(idea.id); }}
                                                    className="btn btn-success btn-sm btn-rounded waves-effect waves-light"
                                                >
                                                    Make Contract
                                                </button>
                                            ) : null}
                                            {UserInfo.is_admin ? (
                                                <button
                                                    onClick={() => { handleDelete(idea.id); }}
                                                    className="btn btn-danger btn-sm btn-rounded waves-effect waves-light ms-2"
                                                >
                                                    DELETE
                                                </button>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center">
                        <span className="text-danger font-weight-bold"><b>No Idea Data Available</b></span>
                    </div>
                )}
            </div>
        </>
    )
}

export default Ideas