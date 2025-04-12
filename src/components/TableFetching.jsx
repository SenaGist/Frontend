export const TableFetching = ({ headers, data, rowRenderer, emptyMessage = "No hay datos disponibles" }) => {
    return (
        <div className="table-responsive">
            <table className="maintenance-table">
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, i) => (
                            <tr key={item.id || i}>
                                {rowRenderer(item)}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={headers.length} className="no-data">
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
