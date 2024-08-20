import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../../Services/Axios"
import { useContext, useEffect, useState } from "react"
import { Store } from "../../Services/Store"
import Ideas from "./Ideas"

const SkilledPerson = () => {
    const [skilled_person, setSkilledPerson] = useState([])
    const {state , dispatch} = useContext(Store)
    const {UserInfo} = state
    const get_all_skilled_person = async () => {
        try {
            const { data } = await api.get(`get_user_skilled/`)
            setSkilledPerson(data)
        } catch (error) {
            toast.error(error.message)
        }
    }
console.log(skilled_person)
    useEffect(() => {
        get_all_skilled_person()
    }, get_all_skilled_person)


    return (
        <>
            <div className="row mb-4">
    <div className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">SKILLED PERSON</h4>
        </div>
    </div>
</div>
<div className="row">
    <div className="col-lg-12">
        <div className="card">
            <div className="card-body">
                {skilled_person.length > 0 ? (
                    <div className="row">
                        {skilled_person.map((person) => (
                            <div className="col-md-4 mb-4 d-flex" key={person.id}>
                                <div className="card w-100 d-flex flex-column">
                                    <div className="card-body flex-grow-1">
                                        <h5 className="card-title">ID: {person.id}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Username: {person.user.username}</h6>
                                        <p className="card-text">Description: {person.description}</p>
                                        <p className="card-text">Title: {person.title}</p>
                                    </div>
                                    <div className="card-footer text-center">
                                        <Link
                                            to={'#'}
                                            className="btn btn-success btn-sm btn-rounded waves-effect waves-light"
                                        >
                                            HIRE
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <span className="text-danger font-weight-bold"><b>No Skilled Persons Available</b></span>
                    </div>
                )}
            </div>
        </div>
    </div>
</div>
        </>
    )
}

export default SkilledPerson