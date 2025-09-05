import { useState, useEffect } from "react";
import { getUser, loginUser } from "./fetch-functions/user";

export default function Footer() {

    const [userName, setUserName] = useState("John Doe");
    const [showPopup, setShowPopup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [popupText, setPopupText] = useState("Default value");

    console.log(username, password);
    const handleLoginClick = () => {
        setPopupText("Sign In");
        setShowPopup(true); // show popup
    };

    const handleSignUpClick = () => {
        setPopupText("Sign Up");
        setShowPopup(true); // show popup
    };

    const handleClosePopup = () => {
        setShowPopup(false); // hide popup
    };

    const handleSubmit = () => {
        loginUser(username, password).then((result) => {
            setUserName(result.user.username);
            setShowPopup(false);
        });
    };

    useEffect(() => {
        getUser("1").then((result) => {
            setUserName(result.user.username);
        });
    }, []);

    return (
        <div className="flex flex-row items-center justify-between w-full px-2">
            <div className="flex flex-row gap-3 h-6">
                <button className="btn" onClick={handleLoginClick}>Sign In</button>
                <button className="btn" onClick={handleSignUpClick}>Sign Up</button>
            </div>
            <div>
                <p className="footer-text">Hello {userName}</p>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-black/50">
                    <div className="popup-base">
                        <h2 className="text-lg font-bold mb-4 text-center text-black dark:text-white">{popupText}</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            className="input"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleClosePopup}
                                className="px-3 py-1 bg-gray-400 rounded"
                            >
                                Cancel
                            </button>
                            <button className="px-3 py-1 bg-purple-600 text-white rounded" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}