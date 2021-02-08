import React from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children, ...rest }) {
console.log("🚀 ~ file: ProtectedRoute.js ~ line 8 ~ ProtectedRoute ~ isLoggedIn", isLoggedIn)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLoggedIn ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default ProtectedRoute;