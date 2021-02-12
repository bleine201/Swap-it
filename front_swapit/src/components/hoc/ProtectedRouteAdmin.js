import React from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";

function ProtectedRouteAdmin({
    isAdmin,
    children,
    ...rest
}) {

console.log("🚀 ~ file: ProtectedRoute.js ~ line 8 ~ ProtectedRoute ~ isLoggedIn", isAdmin)


    return (
        <Route
            {...rest}
            render={({ location }) =>
             isAdmin == 1 ? (

                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default ProtectedRouteAdmin;
