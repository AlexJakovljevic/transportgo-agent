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
            <div className="container items-center px-5 py-4 mx-auto w-3/4">
                <div className="flex flex-wrap justify-center mb-10 divide-y-2 lg:divide-y-0 lg:divide-x-3">
                    <div className="w-full lg:w-2/3">
                        <div className="flex flex-wrap h-full rounded-xl lg:p-8 bg-gray-200">
                            <CustomerDetail
                                type="Email"
                                value={props.email}
                            />
                            <div className="inline-flex flex-wrap items-center justify-center p-8 space-x-4">
                                <Button
                                    type="button"
                                    onClick={props.onClose}
                                    text="Cancel"
                                ></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default CustomerInfo;