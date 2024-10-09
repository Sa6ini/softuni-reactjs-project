import { Link } from "react-router-dom"
export default function Profile(props) {
    return (
        <>
            <div className="container-fluid p-5">
                <div className="row gx-5">
                    <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: 500 }}>
                        <div className="position-relative h-100">
                            <img
                                className="position-absolute w-100 h-80 rounded"
                                src={props.image}
                                style={{ objectFit: "cover" }}
                            />
                            <ul className="choose-file nav nav-pills justify-content-between mb-3 ">
                                <li>
                                    <button className="mb-4 bg-dark nav-link text-uppercase text-center w-100 active rounded">
                                        Choose Image
                                    </button>
                                </li>
                                <li>
                                    <button className="mb-4 nav-link text-uppercase text-center w-100 active rounded">
                                        Upload Profile Picture
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="mb-4">
                            <h5 className="text-primary text-uppercase">Welcome</h5>
                            <h1 className="display-3 text-uppercase mb-0">{props.name}</h1>
                        </div>
                        <h4 className="text-body mb-4">
                            <b>Username:</b> {props.username}
                        </h4>
                        <p className="mb-4">
                            <b>Role:</b> {props.role}
                        </p>
                        <p className="mb-4">
                            <b>Email:</b> {props.email}
                        </p>
                        <ul className="nav nav-pills justify-content-between mb-3">
                            <li>
                                <button className="mb-4 nav-link text-uppercase text-center w-100 active rounded">
                                    Change Password
                                </button>
                            </li>
                        </ul>

                        <div className="rounded bg-dark p-5">
                            <ul className="nav nav-pills justify-content-between mb-3">
                                <li className="nav-item w-50">
                                    <Link
                                        to=""
                                        className="nav-link text-uppercase text-center w-100 active"
                                        data-bs-toggle="pill"
                                    >
                                        Make Bio
                                    </Link>
                                </li>
                                <li className="nav-item w-50">
                                    <a
                                        href=""
                                        target="_blank"
                                        className="nav-link text-uppercase text-center w-100"
                                        data-bs-toggle="pill"

                                    >
                                        Upload Bio
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="pills-1">
                                    <p className="text-secondary mb-0">
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam eos nulla ex nostrum consequuntur unde, maxime dolores iure! Voluptate similique saepe, veniam maiores libero error odio voluptatem nam soluta vero? Doloribus sapiente distinctio temporibus totam, quibusdam laudantium perferendis dolores asperiores facere natus ullam delectus veritatis hic aliquam vel earum aut!
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}