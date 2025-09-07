import { useEffect, useState } from "react";
import { loginUser, signupUser } from "./fetch-functions/user";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getDocuments } from "./fetch-functions/documentHandling";

export default function Footer({ updatePanelItems }: { updatePanelItems: any }) {
    const [userName, setUserName] = useState(sessionStorage.getItem("name") || "World !");
    const [showPopup, setShowPopup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [popupText, setPopupText] = useState<"Sign In" | "Sign Up" | "">("");
    const [displayName, setDisplayName] = useState("");
    useEffect(() => {
        setDisplayName(userName || sessionStorage.getItem("name") || "");
    }, [userName]);

    useEffect(() => {
        if(sessionStorage.getItem("email")) {
            getDocuments(sessionStorage.getItem("email") || "").then((result) => {
                if(result.success) {

                    const documents = result.documents.map((document: any) => {
                        return {
                            id: document.content,
                            title: document.title
                        }
                    });

                    updatePanelItems(documents);
                }
            });
        }
    }, []);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (showPopup) setShowPopup(false)
            }
        }

        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [showPopup])

    const handleLoginClick = () => {
        setPopupText("Sign In");
        setShowPopup(true);
    };

    const handleSignUpClick = () => {
        setPopupText("Sign Up");
        setShowPopup(true);
    };

    const handleClosePopup = () => setShowPopup(false);

    const handleSubmit = () => {
        const saveUserToSession = (user: string) => {
            // Ensure we store a string in sessionStorage
            const userStr = user;
            console.log("userStr", userStr);
            setUserName(userStr);
            sessionStorage.setItem("username", userStr);
            sessionStorage.setItem("name", userStr);
        };

        if (popupText === "Sign In") {
            loginUser(email, password).then((result) => {
                if (result.success) {
                    sessionStorage.setItem("username", result.user);
                    sessionStorage.setItem("name", result.user);
                    sessionStorage.setItem("email", email);
                    saveUserToSession(result.user);
                    toast.success("Logged in successfully");

                    const documents = result.documents.map((document: any) => {
                        return {
                            id: document.content,
                            title: document.title
                        }
                    });
                    updatePanelItems(documents);
                    setShowPopup(false);
                } else {
                    toast.error("Failed to login");
                }
            });
        } else if (popupText === "Sign Up") {
            signupUser(username, email, password).then((result) => {
                if (result.success) {
                    saveUserToSession(result.user);
                    toast.success("Signed up successfully");
                    setShowPopup(false);
                } else {
                    toast.error("Failed to sign up");
                }
            });
        }
    };


    return (
        <div className="flex flex-row items-center justify-between w-full px-2">
            <div className="flex flex-row gap-3 h-6">
                <button className="btn" onClick={handleLoginClick}>Sign In</button>
                <button className="btn" onClick={handleSignUpClick}>Sign Up</button>
            </div>
            <div>
                <p className="footer-text">Hello {displayName} !</p>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-black/50">
                    <div className="popup-base">
                        <h2 className="text-lg font-bold mb-4 text-center text-black dark:text-white">
                            {popupText}
                        </h2>

                        {/* Username only for Sign Up */}
                        {popupText === "Sign Up" && (
                            <input
                                type="text"
                                placeholder="Username"
                                className="input"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        )}

                        {/* Email always required */}
                        <input
                            type="email"
                            placeholder="Email"
                            className="input"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* Password always required */}
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
                            <button
                                className="px-3 py-1 bg-purple-600 text-white rounded"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
}
