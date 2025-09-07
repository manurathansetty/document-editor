export function Sidebar(panelItems: any) {

    return (
        <div className="sidebar pt-5 max-sm:pt-20">
            <div className="flex flex-row justify-center">
                <h2 className="sidebar-title">Your Documents</h2>
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

