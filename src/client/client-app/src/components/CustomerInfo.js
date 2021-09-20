import Button from "./Icons/Buttons";

    function CustomerDetail(props) {
        return (
            <div className="mx-5">
                <p className="text-l my-2">{props.type}</p>
                    <div>
                        {" "}
                        <p className="text-l my-2">{props.value}</p>
                    </div>
            </div>
        );
    }

    function CustomerInfo(props) {
        return (
            <div className="fixed top-0 left-0 w-full h-full z-20">
                <div
                    className="bg-white w-full px-5 mx-auto my-20 border rounded-lg shadow-xl lg:px-0 text-blueGray-500 lg:w-1/2"
                    aria-hidden="false"
                    aria-describedby="modalDescription"
                    role="dialog"
                ></div>
                <div className="container items-center px-5 py-4 mx-auto w-3/4">
                    <div className="flex flex-wrap justify-center mb-10 divide-y-2 lg:divide-y-0 lg:divide-x-3">
                        <div className="w-full lg:w-2/3">
                            <div className="flex flex-wrap h-full rounded-xl lg:p-8 bg-gray-200">
                                <CustomerDetail
                                    type="Email"
                                    value={props.customerInfo.email}
                                />
                                <CustomerDetail
                                    type="Phone"
                                    value={props.customerInfo.phone != "" ? props.customerInfo.phone : "No number"}
                                />
                                <CustomerDetail
                                    type="Fax"
                                    value={props.customerInfo.fax != "" ? props.customerInfo.fax : "No fax"}
                                />
                                <div className="inline-flex flex-wrap items-center justify-center p-8 space-x-4">
                                    <Button
                                        type="button"
                                        onClick={props.onClose}
                                        text="Close"
                                    ></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default CustomerInfo;