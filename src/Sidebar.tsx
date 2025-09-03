const panelItems = [
    { id: 1, title: "Dashboard" },
    { id: 2, title: "Documents" },
    { id: 3, title: "Settings" },
    { id: 4, title: "Profile" },
];

export function Sidebar() {
    return (
        <div className="sidebar">
            <div className="pt-4 mb-4 flex flex-row justify-center">
                <h2 className="sidebar-title">Left Panel</h2>
            </div>

            <div className="mt-6 space-y-3 px-4">
                {panelItems.map((item) => (
                    <div key={item.id} className="sidebar-item">
                        {item.title}
                    </div>
                ))}
            </div>
        </div>
    );
}

