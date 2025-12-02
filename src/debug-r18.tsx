import * as React from 'react';
import { useMockServer } from '@mui/x-data-grid-generator';
import {
  DataGridPremium,
  DataGridPremiumProps,
  GridDataSource,
  GridGetRowsResponse,
  useGridApiRef,
} from '@mui/x-data-grid-premium';

export default function Component() {
  console.log('Component run');
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <button onClick={() => setShow((s) => !s)}>Toggle show ({show.toString()})</button>
      <br />
      <br />
      {show && <Test />}
    </div>
  );
}

function Test(props: any) {
  const apiRef = useGridApiRef();
  const { getAggregatedValue: getAggregatedValueProp, dataSetOptions, ...other } = props;
  const {
    fetchRows,
    columns: mockColumns,
    isReady,
    editRow,
  } = useMockServer<GridGetRowsResponse>(
    { rowLength: 10, maxColumns: 1, ...dataSetOptions },
    { useCursorPagination: false, minDelay: 0, maxDelay: 0, verbose: false },
  );

  const columns = React.useMemo(() => {
    return mockColumns.map((column) => ({
      ...column,
      editable: true,
    }));
  }, [mockColumns]);

  const dataSource: GridDataSource = React.useMemo(() => {
    return {
      getRows: async (params) => {
        const urlParams = new URLSearchParams({
          filterModel: JSON.stringify(params.filterModel),
          sortModel: JSON.stringify(params.sortModel),
          paginationModel: JSON.stringify(params.paginationModel),
          groupKeys: JSON.stringify(params.groupKeys),
          groupFields: JSON.stringify(params.groupFields),
          aggregationModel: JSON.stringify(params.aggregationModel),
        });

        const getRowsResponse = await fetchRows(
          `https://mui.com/x/api/data-grid?${urlParams.toString()}`,
        );

        return {
          rows: getRowsResponse.rows,
          rowCount: getRowsResponse.rowCount,
          aggregateRow: getRowsResponse.aggregateRow,
        };
      },
      getGroupKey: (row) => row.group,
      getChildrenCount: (row) => row.descendantCount,
      getAggregatedValue: getAggregatedValueProp ?? ((row, field) => row[field]),
      updateRow: async (params) => {
        const syncedRow = await editRow(params.rowId, params.updatedRow);
        return syncedRow;
      },
    };
  }, [fetchRows, editRow, getAggregatedValueProp]);

  if (!isReady) {
    return null;
  }

  return (
    <div style={{ width: 300, height: 300 }}>
      <DataGridPremium
        apiRef={apiRef}
        dataSource={dataSource}
        columns={columns}
        disableVirtualization
        aggregationFunctions={{
          sum: { columnTypes: ['number'] },
          avg: { columnTypes: ['number'] },
          min: { columnTypes: ['number', 'date', 'dateTime'] },
          max: { columnTypes: ['number', 'date', 'dateTime'] },
          size: {},
        }}
        {...other}
      />
    </div>
  );
}
