import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../Services/Axios";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../Services/Store";
import image from "../admin_pages/faq-bg-header.jpg"

const Gigs = () => {
    const [gigs, setGigs] = useState([]);
    const { state } = useContext(Store);
    const { UserInfo } = state;

    const get_gigs = async () => {
        try {
            const { data } = await api.get(`get_gig/${UserInfo.id}/`);
            setGigs(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.get(`/delete_gig_by_id/${id}`);
            setGigs(gigs.filter((gig) => gig.id !== id));
            toast.success("Gig Deleted Successfully");
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        get_gigs();
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18">GIGS</h4>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="row">
                        {gigs.length > 0 ? (
                            gigs.map((object, index) => (
                                <div className="col-sm-6 col-lg-4 mb-4" key={index}>
                                    <div className="card h-100 d-flex flex-column">
                                    <img
    src={image} // Replace with your actual static image URL
    className="card-img-top"
    alt="Gig Image"
    style={{ height: "200px", objectFit: "cover" }}
/>
                                        <div className="card-body d-flex flex-column" style={{ overflow: "hidden" }}>
                                            <h5 className="card-title">{object.title}</h5>
                                            <div style={{ flex: "1 1 auto", overflowY: "auto" }}>
                                                <p className="card-text">{object.description}</p>
                                            </div>
                                            <div className="mt-auto text-center">
                                                <a
                                                    href={`http://127.0.0.1:8000/${object.file}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-info btn-rounded waves-effect waves-light ml-2"
                                                >
                                                    VIEW
                                                </a>
                                                <Link
                                                    to={`/admin/edit/gig?data=${encodeURIComponent(JSON.stringify(object))}`}
                                                    className="btn btn-primary btn-rounded waves-effect waves-light ml-2"
                                                >
                                                    EDIT
                                                </Link>
                                                <button
                                                    onClick={() => { handleDelete(object.id); }}
                                                    type="button"
                                                    className="btn btn-danger btn-rounded waves-effect waves-light ml-2"
                                                >
                                                    DELETE
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-danger">
                                <h3>GIG NOT FOUND</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Gigs;
