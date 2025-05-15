import { useCallback, useEffect, useRef, useState } from "react";
import { fetchAllMaintenances } from "../../services/maintenanceService";
import { TableFetching } from "../../components/TableFetching";
import { MoreInfo } from "../../components/MoreInfo";
import { useMaintenances } from "../../hooks/useMaintenances";
import { useUsers } from "../../hooks/useUsers";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

function AdminMaintenances() {
  2
  const API_URL = import.meta.env.VITE_API_URL;
  const moreRef = useRef(null);

  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [techs, setTechs] = useState([]);
  const [typeFilter, setTypeFilter] = useState(null);
  const [techFilter, setTechFilter] = useState(null);

  const { maintenances, setMaintenances } = useMaintenances(API_URL);
  const { getByRole } = useUsers(API_URL);

  const handleModalMore = useCallback((m) => {
    setSelectedMaintenance(m);
  }, [])
  const handleTypeChange = useCallback((e) => {
    setTypeFilter(e.target.value);
  }, [])



async function exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Mantenimientos");

    worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Fecha", key: "fecha", width: 15 },
        { header: "Equipamento", key: "equipamento", width: 25 },
        { header: "Tipo", key: "tipo", width: 20 },
        { header: "Descripción", key: "descripcion", width: 40 },
        { header: "Técnico", key: "tecnico", width: 25 },
    ];

    maintenances.forEach(m => {
        worksheet.addRow({
            id: m.id,
            fecha: new Date(m.start_date).toLocaleDateString(),
            equipamento: m.asset?.inventoryNumber ?? 'Desconocido',
            tipo: m.type ?? '',
            descripcion: m.description ?? '',
            tecnico: m.user?.name ?? 'No asignado',
        });
    });

    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFCCE5FF' } 
        };
        cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" }
        };
    });

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) return;
        row.eachCell((cell) => {
            cell.alignment = { vertical: "middle", wrapText: true };
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" }
            };
        });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "mantenimientos.xlsx");
}


  function handleTechChange(e) {
    setTechFilter(e.target.value);
  }
  useEffect(() => {
    if (selectedMaintenance && moreRef.current && !moreRef.current.open) {
      moreRef.current.showModal();
    }
  }, [selectedMaintenance]);
  useEffect(() => {
    async function fetchTechs() {
      const techs = await getByRole("tech");
      setTechs(techs);
    }
    fetchTechs();
  }, [getByRole])
  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        let data = await fetchAllMaintenances(API_URL);
        if (typeFilter) {
          data = data.filter(m => m.type.toLowerCase() === typeFilter.toLowerCase());
        }
        if (techFilter) {
          data = data.filter(m => m.user?.id === parseInt(techFilter));
        }
        setMaintenances(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMaintenances();
  }, [API_URL, typeFilter, techFilter, setMaintenances]);

  return (
    <div className="container">
      <h1 className="title">Todos los Mantenimientos Realizados</h1>
      <div className="create-button-wrapper">
        <select name="typeFilter" value={typeFilter ?? ""} onChange={handleTypeChange}>
          <option value="" disabled>Filtrar por tipo de mantenimiento</option>
          <option value="preventivo">Preventivo</option>
          <option value="correctivo">Correctivo</option>
        </select>
        <select name="techFilter" value={techFilter ?? ""} onChange={handleTechChange}>
          <option value="" disabled>Filtrar por técnico</option>
          {techs.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <button onClick={exportToExcel} className="btn-export">
          Exportar a Excel
        </button>
      </div>
      <TableFetching
        headers={["ID", "Fecha", "Tipo", "Descripción", "Acciones"]}
        data={maintenances}
        rowRenderer={(m) => (
          <>
            <td>{m.id}</td>
            <td>{new Date(m.start_date).toLocaleDateString()}</td>
            <td>{m.type}</td>
            <td>{m.description}</td>
            <td>
              <button className="btn-more" onClick={() => handleModalMore(m)}>Ver más</button>
            </td>
          </>
        )}
        emptyMessage="No hay mantenimientos registrados."
      />
      {selectedMaintenance && (
        <MoreInfo data={[{
          ...selectedMaintenance,
          image1Base64: `data:image/jpeg;base64,${selectedMaintenance.image_1}`,
          image2Base64: `data:image/jpeg;base64,${selectedMaintenance.image_2}`,
        }]} handleModalMore={() => handleModalMore(null)} moreRef={moreRef} />
      )}
    </div>
  )
}
export default AdminMaintenances;