export function Sidebar(panelItems: any) {
    
    return (
        <div className="sidebar">
            <div className="pt-4 mb-4 flex flex-row justify-center">
                <h2 className="sidebar-title">Left Panel</h2>
            </div>

            <div className="mt-6 space-y-3 px-4">
                {panelItems.panelItems.map((item: any) => (
                    <div key={item.id} className="sidebar-item" onClick={() => panelItems.selectedDocument(item)}>
                        {item.title}
                    </div>
                ))}
            </div>

        </div>
    );
}

