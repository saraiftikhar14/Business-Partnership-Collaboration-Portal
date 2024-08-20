import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../../Services/Axios"
import { useContext, useEffect, useState } from "react"
import { Store } from "../../Services/Store"
import image from "../admin_pages/idea.jpg"

const All_Ideas = () => {
    const [idea_data, setIdeaData] = useState([])
    const [checking, setChecking] = useState([])
    const { state, dispatch } = useContext(Store)
    const { UserInfo } = state
    const get_all_idea = async () => {
        try {
            const { data } = await api.get(`get_all_idea/`)
            setIdeaData(data)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const get_all_contract_list = async () => {
        try {
            const { data } = await api.get(`get_contract_by_id/${UserInfo.id}/`)
            setChecking(data)
        } catch (error) {
            toast.error(error.message)
        }
    }


    const handleDelete = async (id) => {

        try {
            await api.get(`/delete_idea_by_id/${id}`);
            toast.success("Idea Deleted");
            setIdeaData(idea_data.filter(idea => idea.id !== id))
        } catch (error) {
            toast.error(error.message)
        }

    }

    const createContract = async (id) => {
        try {
            const data = {
                idea_id: id,
                user_id: UserInfo.id
            }
            await api.post('creating_contract/', data)
            toast.success("Contracted Created SuccessFully")
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }


    useEffect(() => {
        get_all_idea()
        get_all_contract_list()
    }, get_all_idea)


    return (
        <>
             <div className="row mb-4">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18">ALL IDEAS</h4>
                    </div>
                </div>
            </div>
            <div className="row">
                {idea_data.length > 0 ? (
                    idea_data.map((object, index) => (
                        <div className="col-md-6 col-lg-4 mb-4 d-flex" key={index}>
                            <div className="card border-light shadow-sm d-flex flex-column">
                                <img
                                    src={image} // Placeholder or actual image URL
                                    className="card-img-top"
                                    alt="Idea Image"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{object.idea}</h5>
                                    <p className="card-text" style={{ flex: "1 1 auto", overflow: "hidden" }}>
                                        {object.description}
                                    </p>
                                    <p className="card-text"><strong>Required Amount:</strong> {object.req_amount}</p>
                                    <p className="card-text"><strong>Terms & Conditions:</strong> {object.terms_conditions}</p>
                                    <p className="card-text"><strong>File:</strong> {object.file}</p>
                                    <div className="d-flex justify-content-between mt-2">
                                        <div>
                                            {!UserInfo.is_admin ? (
                                                <>
                                                    <Link
                                                        to={`/admin/ideas/details?data=${encodeURIComponent(JSON.stringify(object))}`}
                                                        className="btn btn-primary btn-sm btn-rounded waves-effect waves-light mr-2"
                                                    >
                                                        View
                                                    </Link>
                                                    <a
                                                        href={`http://127.0.0.1:8000/${object.file}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-info btn-sm btn-rounded waves-effect waves-light mr-2"
                                                    >
                                                        View File
                                                    </a>
                                                    {UserInfo.category === 'investor' && !checking.some(contract => contract.idea.id === object.id) ? (
                                                        <button
                                                            onClick={() => { createContract(object.id); }}
                                                            className="btn btn-success btn-sm btn-rounded waves-effect waves-light"
                                                        >
                                                            Make Contract
                                                        </button>
                                                    ) : null}
                                                </>
                                            ) : null}
                                            {UserInfo.is_admin ? (
                                                <button
                                                    onClick={() => { handleDelete(object.id); }}
                                                    className="btn btn-danger btn-sm btn-rounded waves-effect waves-light"
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
                    <div className="text-center text-danger">
                        <h3>No Idea Data Available</h3>
                    </div>
                )}
            </div>
        </>
    )
}

export default All_Ideas